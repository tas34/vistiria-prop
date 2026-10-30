import React, { createContext, useContext, useState, useEffect } from 'react';
import { PropertyListing } from '../types/property';
import {
  subscribeToProperties,
  saveProperty as fbSaveProperty,
  deleteProperty as fbDeleteProperty,
  uploadPropertyImage,
  seedSamplePropertiesToFirestore,
} from '../services/propertyService';
import { SAMPLE_PROPERTIES } from '../data/properties';
import { useAuth } from './AuthContext';

interface PropertyContextType {
  properties: PropertyListing[];
  featuredProperties: PropertyListing[];
  loading: boolean;
  saveProperty: (property: PropertyListing) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  uploadImage: (file: File) => Promise<string>;
  seedInitialData: () => Promise<void>;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<PropertyListing[]>(SAMPLE_PROPERTIES);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const unsubscribe = subscribeToProperties(
      (data) => {
        if (data && data.length > 0) {
          setProperties(data);
        } else {
          setProperties(SAMPLE_PROPERTIES);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Property synchronization notice:', error);
        setProperties(SAMPLE_PROPERTIES);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const saveProperty = async (property: PropertyListing) => {
    await fbSaveProperty(property);
  };

  const deleteProperty = async (id: string) => {
    await fbDeleteProperty(id);
  };

  const uploadImage = async (file: File) => {
    return await uploadPropertyImage(file);
  };

  const seedInitialData = async () => {
    if (isAdmin) {
      await seedSamplePropertiesToFirestore();
    }
  };

  const featuredProperties = properties.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        featuredProperties: featuredProperties.length > 0 ? featuredProperties : properties.slice(0, 4),
        loading,
        saveProperty,
        deleteProperty,
        uploadImage,
        seedInitialData,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
};
