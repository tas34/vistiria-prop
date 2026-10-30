import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errors';

export interface InquiryRecord {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  type: 'general' | 'site_visit' | 'buyer_desk';
  propertyId?: string;
  propertyTitle?: string;
  budgetRange?: string;
  preferredLocation?: string;
  preferredDate?: string;
  preferredTimeSlot?: string;
  message?: string;
  status: 'pending' | 'contacted' | 'scheduled' | 'closed';
  userId?: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export const createInquiry = async (
  inquiry: Omit<InquiryRecord, 'id' | 'status' | 'createdAt' | 'userId'>
): Promise<string> => {
  const collectionPath = 'inquiries';
  const id = `inq_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const currentUser = auth.currentUser;

  const newRecord: Record<string, unknown> = {
    fullName: inquiry.fullName.trim().slice(0, 120),
    phone: inquiry.phone.trim().slice(0, 30),
    type: inquiry.type,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  if (inquiry.email?.trim()) newRecord.email = inquiry.email.trim().slice(0, 150);
  if (inquiry.propertyId?.trim()) newRecord.propertyId = inquiry.propertyId.trim().slice(0, 128);
  if (inquiry.propertyTitle?.trim()) newRecord.propertyTitle = inquiry.propertyTitle.trim().slice(0, 200);
  if (inquiry.budgetRange?.trim()) newRecord.budgetRange = inquiry.budgetRange.trim().slice(0, 100);
  if (inquiry.preferredLocation?.trim()) newRecord.preferredLocation = inquiry.preferredLocation.trim().slice(0, 150);
  if (inquiry.preferredDate?.trim()) newRecord.preferredDate = inquiry.preferredDate.trim().slice(0, 50);
  if (inquiry.preferredTimeSlot?.trim()) newRecord.preferredTimeSlot = inquiry.preferredTimeSlot.trim().slice(0, 50);
  if (inquiry.message?.trim()) newRecord.message = inquiry.message.trim().slice(0, 3000);
  if (currentUser?.uid) newRecord.userId = currentUser.uid;

  try {
    const docRef = doc(db, collectionPath, id);
    await setDoc(docRef, newRecord);
    return id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, collectionPath);
  }
};

export const subscribeToInquiries = (
  isAdmin: boolean,
  userId: string | null,
  onData: (inquiries: InquiryRecord[]) => void,
  onError?: (err: Error) => void
) => {
  const collectionPath = 'inquiries';

  let q;
  if (isAdmin) {
    q = query(collection(db, collectionPath));
  } else if (userId) {
    q = query(collection(db, collectionPath), where('userId', '==', userId));
  } else {
    onData([]);
    return () => {};
  }

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const records: InquiryRecord[] = [];
      snapshot.forEach((snap) => {
        records.push({ id: snap.id, ...(snap.data() as Omit<InquiryRecord, 'id'>) });
      });
      // Sort client-side by date descending
      records.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      onData(records);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.GET, collectionPath);
      } catch (wrapped) {
        if (onError && wrapped instanceof Error) onError(wrapped);
      }
    }
  );

  return unsubscribe;
};

export const updateInquiryStatus = async (
  inquiryId: string,
  status: 'pending' | 'contacted' | 'scheduled' | 'closed',
  notes?: string
) => {
  const path = `inquiries/${inquiryId}`;
  try {
    const docRef = doc(db, 'inquiries', inquiryId);
    const updatePayload: Record<string, unknown> = {
      status,
      updatedAt: new Date().toISOString(),
    };
    if (notes !== undefined) {
      updatePayload.notes = notes.slice(0, 1000);
    }
    await updateDoc(docRef, updatePayload);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
};

export const deleteInquiry = async (inquiryId: string) => {
  const path = `inquiries/${inquiryId}`;
  try {
    await deleteDoc(doc(db, 'inquiries', inquiryId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
};
