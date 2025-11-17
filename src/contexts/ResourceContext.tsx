// ResourcesContext.tsx
import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import { db } from '../firebase'; // Firebase config
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    getDocs,
    doc,
    query,
    where
} from 'firebase/firestore';

import type { Resource, Video, Article, Tool, Interview, Category, ResourceCategory } from './type';


interface ResourcesContextType {
    categories: Category[];
    resources: {
        videos: Video[];
        articles: Article[];
        tools: Tool[];
        interview: Interview[];
    };
    addCategory: (category: Category) => Promise<void>;
    editCategory: (categoryId: string, updatedCategory: Category) => Promise<void>;
    deleteCategory: (categoryId: string) => Promise<void>;
    addResource: (resource: Resource) => Promise<void>;
    updateResource: (resourceId: string, updatedResource: Resource) => Promise<void>;
    deleteResource: (resourceId: string, category: string) => Promise<void>;
}

const ResourcesContext = createContext<ResourcesContextType | undefined>(undefined);

interface ResourcesProviderProps {
    children: ReactNode;
}

export const ResourcesProvider: React.FC<ResourcesProviderProps> = ({ children }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [resources, setResources] = useState<{
        videos: Video[];
        articles: Article[];
        tools: Tool[];
        interview: Interview[];
    }>({
        videos: [],
        articles: [],
        tools: [],
        interview: [],
    });

    // Fetch categories from Firestore
    useEffect(() => {
        const fetchCategories = async () => {
            const querySnapshot = await getDocs(collection(db, 'categories'));
            const categoriesList: Category[] = [];
            querySnapshot.forEach((doc) => {
                categoriesList.push({ id: doc.id, ...doc.data() } as Category);
            });
            setCategories(categoriesList);
        };
        fetchCategories();
    }, []);

    // Fetch resources from Firestore
    useEffect(() => {
        const fetchResources = async () => {
            const querySnapshot = await getDocs(collection(db, 'resources'));

            // Explicitly typing resourcesMap to match the structure
            const resourcesMap: {
                videos: Video[];
                articles: Article[];
                tools: Tool[];
                interview: Interview[];
            } = {
                videos: [],
                articles: [],
                tools: [],
                interview: [],
            };

            querySnapshot.forEach((doc) => {
                const resourceData = doc.data();
                const resourceType = resourceData.type;

                // Assign the resource to the appropriate category
                switch (resourceType) {
                    case 'video':
                        resourcesMap.videos.push({ id: doc.id, ...resourceData } as Video);
                        break;
                    case 'article':
                        resourcesMap.articles.push({ id: doc.id, ...resourceData } as Article);
                        break;
                    case 'tool':
                        resourcesMap.tools.push({ id: doc.id, ...resourceData } as Tool);
                        break;
                    case 'interview':
                        resourcesMap.interview.push({ id: doc.id, ...resourceData } as Interview);
                        break;
                    default:
                        break;
                }
            });

            // Setting the resources state with the properly structured resourcesMap
            setResources(resourcesMap);
        };

        fetchResources();
    }, []);


    // Add a category
    const addCategory = async (category: Category) => {
        const { id, ...categoryData } = category; // Destructure to avoid including the 'id' field
        const docRef = await addDoc(collection(db, 'categories'), categoryData); // Only save category data without 'id'
        setCategories([...categories, { id: docRef.id, ...categoryData }]); // Attach Firestore-generated 'id'
    };

    const updateCategory = (categoryId: string, updatedCategory: Category) => {
        setCategories(
            categories.map((cat) =>
                cat.id === categoryId ? { ...cat, ...updatedCategory } : cat
            )
        );
    };
    // Edit a category
    // Edit a category
    const editCategory = async (categoryId: string, updatedCategory: Category) => {
        const { id, ...categoryData } = updatedCategory; // Destructure to avoid passing 'id' in the update
        const categoryRef = doc(db, 'categories', categoryId);
        await updateDoc(categoryRef, categoryData); // Only pass the fields to update (no 'id')

        // Update the categories state (local state or context)
        setCategories(categories.map(cat =>
            cat.id === categoryId ? { ...cat, ...categoryData } : cat
        ));
    };



    // Delete a category
    const deleteCategory = async (categoryId: string) => {
        const categoryRef = doc(db, 'categories', categoryId);
        await deleteDoc(categoryRef);
        setCategories(categories.filter(cat => cat.id !== categoryId));
    };
    // Add a resource
    const addResource = async (resource: Resource) => {
        const { category, id, ...resourceData } = resource; // Destructure 'category' and 'id' from resource
        const resourceWithCategory = { ...resourceData, category }; // Include 'category' in the resource data

        const docRef = await addDoc(collection(db, 'resources'), resourceWithCategory); // Save resource with 'category' to Firestore

        const newResource = { id: docRef.id, ...resourceWithCategory }; // Attach Firestore-generated 'id' and include 'category'

        // Safely handle the category by ensuring the previous resources for the category are an array
        setResources(prevResources => ({
            ...prevResources,
            [category as ResourceCategory]: [
                ...(prevResources[category as ResourceCategory] || []), // Default to an empty array if category doesn't exist
                newResource
            ]
        }));
    };



    // Update a resource
    const updateResource = async (resourceId: string, updatedResource: Resource) => {
        const { category, id, ...resourceData } = updatedResource; // Destructure 'id' to avoid conflicts
        const resourceRef = doc(db, 'resources', `${resourceId}`);
        await updateDoc(resourceRef, resourceData); // Only pass the fields to update (not 'id')

        // Type assertion for category to make sure it's valid
        setResources(prevResources => ({
            ...prevResources,
            [category as ResourceCategory]: prevResources[category as ResourceCategory].map(res =>
                res.id === `${resourceId}` ? { ...res, ...updatedResource } : res // Convert resourceId to string for comparison
            )
        }));
    };

    // Delete a resource
    const deleteResource = async (resourceId: string, category: string) => {
        const resourceRef = doc(db, 'resources', `${resourceId}`);
        await deleteDoc(resourceRef);

        // Type assertion for category to make sure it's valid
        setResources(prevResources => ({
            ...prevResources,
            [category as ResourceCategory]: prevResources[category as ResourceCategory].filter(res => res.id !== `${resourceId}`) // Convert resourceId to string for comparison
        }));
    };


    return (
        <ResourcesContext.Provider value={{
            categories, resources, addCategory, editCategory, deleteCategory, addResource, updateResource, deleteResource
        }}>
            {children}
        </ResourcesContext.Provider>
    );
};

export const useResources = () => {
    const context = React.useContext(ResourcesContext);
    if (!context) {
        throw new Error('useResources must be used within a ResourcesProvider');
    }
    return context;
};
