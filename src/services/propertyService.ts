import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  getDocs,
  writeBatch,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errors';
import { PropertyListing } from '../types/property';
import { SAMPLE_PROPERTIES } from '../data/properties';

export const subscribeToProperties = (
  onData: (properties: PropertyListing[]) => void,
  onError?: (err: Error) => void
) => {
  const collectionPath = 'properties';

  const unsubscribe = onSnapshot(
    collection(db, collectionPath),
    (snapshot) => {
      if (snapshot.empty) {
        // Fallback to sample listings when cloud database hasn't been populated yet
        onData(SAMPLE_PROPERTIES);
        return;
      }

      const list: PropertyListing[] = [];
      snapshot.forEach((snap) => {
        list.push({ id: snap.id, ...(snap.data() as Omit<PropertyListing, 'id'>) });
      });
      onData(list);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, collectionPath);
      } catch (wrapped) {
        // If error occurs, fallback gracefully to initial verified samples
        onData(SAMPLE_PROPERTIES);
        if (onError && wrapped instanceof Error) onError(wrapped);
      }
    }
  );

  return unsubscribe;
};

export const compressImageForFirestore = (
  file: File,
  maxWidth = 1400,
  maxHeight = 1000,
  quality = 0.8
): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      reject(new Error('Selected file is not an image'));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.src = readerEvent.target?.result as string;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(readerEvent.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Use JPEG for optimal compression ratio under Firestore document limits
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

export const saveProperty = async (property: PropertyListing): Promise<void> => {
  const collectionPath = 'properties';
  const docId = property.id || `prop_${Date.now()}`;
  const docRef = doc(db, collectionPath, docId);

  const cleanData: Record<string, unknown> = {
    title: property.title.slice(0, 200),
    location: property.location.slice(0, 200),
    microMarket: property.microMarket.slice(0, 100),
    city: property.city.slice(0, 100),
    state: property.state.slice(0, 100),
    priceDisplay: property.priceDisplay.slice(0, 50),
    priceNumeric: Number(property.priceNumeric) || 0,
    type: property.type,
    configuration: property.configuration.slice(0, 100),
    carpetAreaSqFt: Number(property.carpetAreaSqFt) || 0,
    superAreaSqFt: Number(property.superAreaSqFt) || 0,
    floorLevel: property.floorLevel.slice(0, 50),
    furnishingStatus: property.furnishingStatus,
    facing: property.facing.slice(0, 50),
    overview: property.overview.slice(0, 4000),
    specifications: property.specifications,
    amenities: property.amenities || [],
    heroImage: (property.heroImage || '').slice(0, 800000),
    gallery: (property.gallery || []).slice(0, 10).map((g) => g.slice(0, 800000)),
    isFeatured: Boolean(property.isFeatured),
    isSamplePlaceholder: Boolean(property.isSamplePlaceholder),
    updatedAt: new Date().toISOString(),
  };

  try {
    await setDoc(docRef, cleanData, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${collectionPath}/${docId}`);
  }
};

export const deleteProperty = async (propertyId: string): Promise<void> => {
  const path = `properties/${propertyId}`;
  try {
    await deleteDoc(doc(db, 'properties', propertyId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
};

export const uploadPropertyImage = async (file: File): Promise<string> => {
  // 100% Free Mode: Compresses image into high-resolution web format and stores directly
  // inside the Firestore document. No paid Cloud Storage buckets or Blaze plan required!
  try {
    const directDataUrl = await compressImageForFirestore(file);
    return directDataUrl;
  } catch (err) {
    console.warn('Direct canvas compression error, trying fallback read:', err);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
};

export const seedSamplePropertiesToFirestore = async (): Promise<void> => {
  const collectionPath = 'properties';
  try {
    const existing = await getDocs(collection(db, collectionPath));
    if (existing.empty) {
      const batch = writeBatch(db);
      for (const item of SAMPLE_PROPERTIES) {
        const itemRef = doc(db, collectionPath, item.id);
        batch.set(itemRef, {
          ...item,
          updatedAt: new Date().toISOString(),
        });
      }
      await batch.commit();
    }
  } catch (error) {
    console.warn('Initial seeding note:', error);
  }
};
