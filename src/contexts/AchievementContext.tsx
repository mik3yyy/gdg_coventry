import React, { createContext, useState, useEffect, useContext } from 'react';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase'; // Import Firestore db instance

// Define Achievement type
interface Achievement {
    id: string;
    title: string;
    description: string;
    date: string;
    icon: string;
    color: string;
    status: 'published' | 'draft';
}

// Create the Achievement Context
interface AchievementContextProps {
    achievements: Achievement[];
    showAddModal: boolean;
    setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
    editingAchievement: Achievement | null;
    setEditingAchievement: React.Dispatch<React.SetStateAction<Achievement | null>>;
    formData: Achievement;
    setFormData: React.Dispatch<React.SetStateAction<Achievement>>;
    addAchievement: (newAchievement: Omit<Achievement, 'id'>) => void;
    editAchievement: (id: string, updatedData: Partial<Achievement>) => void;
    deleteAchievement: (id: string) => void;
    publishAchievement: (id: string) => void;
    unpublishAchievement: (id: string) => void;
}

const AchievementContext = createContext<AchievementContextProps | undefined>(undefined);

export const useAchievement = (): AchievementContextProps => {
    const context = useContext(AchievementContext);
    if (!context) {
        throw new Error('useAchievement must be used within an AchievementProvider');
    }
    return context;
};

// Correct the type definition for AchievementProvider component
export const AchievementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
    const [formData, setFormData] = useState<Achievement>({
        id: '',
        title: '',
        description: '',
        date: '',
        icon: 'ri-trophy-line',
        color: '#FBBC05',
        status: 'draft'
    });

    // Fetch achievements from Firestore
    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "achievements"));
                const fetchedAchievements: Achievement[] = [];
                querySnapshot.forEach((doc) => {
                    fetchedAchievements.push({ id: doc.id, ...doc.data() } as Achievement);
                });
                setAchievements(fetchedAchievements);
            } catch (error) {
                console.error("Error fetching achievements:", error);
            }
        };
        fetchAchievements();
    }, []);

    // Add Achievement to Firestore
    // Add Achievement to Firestore
    const addAchievement = async (newAchievement: Omit<Achievement, 'id'>) => {
        try {
            // Add the new achievement to Firestore (id will be generated automatically)
            const docRef = await addDoc(collection(db, "achievements"), newAchievement);

            // After successfully adding, include the generated id in the state
            setAchievements((prev) => [...prev, { ...newAchievement, id: docRef.id }]);
        } catch (error) {
            console.error("Error adding achievement:", error);
        }
    };

    // Edit Achievement in Firestore
    const editAchievement = async (id: string, updatedData: Partial<Achievement>) => {
        try {
            const docRef = doc(db, "achievements", id);
            await updateDoc(docRef, updatedData);
            setAchievements((prev) =>
                prev.map((ach) => (ach.id === id ? { ...ach, ...updatedData } : ach))
            );
        } catch (error) {
            console.error("Error editing achievement:", error);
        }
    };

    // Delete Achievement from Firestore
    const deleteAchievement = async (id: string) => {
        try {
            await deleteDoc(doc(db, "achievements", id));
            setAchievements((prev) => prev.filter((ach) => ach.id !== id));
        } catch (error) {
            console.error("Error deleting achievement:", error);
        }
    };

    // Publish Achievement in Firestore
    const publishAchievement = async (id: string) => {
        await editAchievement(id, { status: 'published' });
    };

    // Unpublish Achievement in Firestore
    const unpublishAchievement = async (id: string) => {
        await editAchievement(id, { status: 'draft' });
    };

    return (
        <AchievementContext.Provider
            value={{
                achievements,
                showAddModal,
                setShowAddModal,
                editingAchievement,
                setEditingAchievement,
                formData,
                setFormData,
                addAchievement,
                editAchievement,
                deleteAchievement,
                publishAchievement,
                unpublishAchievement
            }}
        >
            {children}
        </AchievementContext.Provider>
    );
};
