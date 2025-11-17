import { createContext, useContext, useEffect, useState } from "react"
import { db } from "../firebase"
import {
    collection,
    getDocs,
    query,
    where,
    addDoc,
    updateDoc,
    doc,
    serverTimestamp,
} from "firebase/firestore"
import { data } from "react-router-dom"

// export interface Organizer {
//     id: string
//     name: string
//     email: string
//     role: string
//     permissions: string[]
//     avatar_url?: string
//     status: "active" | "inactive"
//     join_date: string
//     last_active?: string
//     created_at: string
//     updated_at: string
// }

export interface Organizer {
    id: string
    email: string
    permissions: "admin" | "super-admin"
    role: "lead" | "events" | "community" | "technical" | "marketing"
}

interface OrganizerContextType {
    organizers: Organizer[]
    loading: boolean
    error: string | null
    fetchOrganizers: () => Promise<void>
    addOrganizer: (data: Omit<Organizer, "id" | "created_at" | "updated_at">) => Promise<void>
    updateOrganizer: (id: string, updates: Partial<Organizer>) => Promise<void>
}

const OrganizerContext = createContext<OrganizerContextType | undefined>(undefined)

export function OrganizerProvider({ children }: { children: React.ReactNode }) {
    const [organizers, setOrganizers] = useState<Organizer[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    // --------------------------------
    // ✅ Fetch all admin members
    // --------------------------------
    const fetchOrganizers = async () => {
        setLoading(true);
        try {
            const ref = collection(db, "organizers"); // fetching from the "organizers" collection
            const q = query(ref, where("role", "in", ["lead", "events", "community", "technical", "marketing"])); // Filtering by roles
            const snapshot = await getDocs(q);

            const list: Organizer[] = snapshot.docs.map((docSnap) => {
                const data = docSnap.data();
                return {
                    id: docSnap.id,
                    email: data.email || "", // Assign email
                    role: data.role || "lead", // Default to "lead" if role is missing
                    permissions: data.permissions || "admin", // Default to "admin" if permissions are missing
                };
            });
            console.log("list", list)
            setOrganizers(list); // Assuming you have a setter function for storing the list
        } catch (err: any) {
            console.error("Failed to fetch organizers:", err);
            setError(err.message); // Assuming you have an error setter
        } finally {
            setLoading(false); // Ensure loading state is reset after fetch
        }
    };

    // --------------------------------
    // ✅ Add new organizer
    // --------------------------------
    const addOrganizer = async (
        data: Omit<Organizer, "id" | "created_at" | "updated_at">
    ) => {
        try {
            const newOrganizer = {
                ...data,
                created_at: new Date().toISOString(), // Add created_at field
                updated_at: new Date().toISOString(), // Add updated_at field
            };

            // Add the new organizer to Firestore in the "organizers" collection
            const ref = await addDoc(collection(db, "organizers"), newOrganizer);

            // After successfully adding the organizer, update the local state (organizers list)
            setOrganizers((prev) => [
                ...prev,
                { ...newOrganizer, id: ref.id }, // Include the generated document ID from Firestore
            ]);
        } catch (err: any) {
            console.error("Failed to add organizer:", err);
            setError(err.message); // Set the error state
        }
    };

    // --------------------------------
    // ✅ Update organizer details
    // --------------------------------
    const updateOrganizer = async (id: string, updates: Partial<Organizer>) => {
        try {
            const ref = doc(db, "organizers", id)
            const updatedData = {
                ...updates,
                updated_at: new Date().toISOString(),
            }
            await updateDoc(ref, updatedData)
            setOrganizers((prev) =>
                prev.map((o) => (o.id === id ? { ...o, ...updatedData } : o))
            )
        } catch (err: any) {
            console.error("Failed to update organizer:", err)
            setError(err.message)
        }
    }

    useEffect(() => {
        fetchOrganizers()
    }, [])

    return (
        <OrganizerContext.Provider
            value={{
                organizers,
                loading,
                error,
                fetchOrganizers,
                addOrganizer,
                updateOrganizer,
            }}
        >
            {children}
        </OrganizerContext.Provider>
    )
}

export const useOrganizers = () => {
    const context = useContext(OrganizerContext)
    if (!context) throw new Error("useOrganizers must be used within OrganizerProvider")
    return context
}
