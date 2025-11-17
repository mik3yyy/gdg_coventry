// src/context/EventsProvider.jsx
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    orderBy
} from "firebase/firestore";
import { db } from "../firebase"; // your initialized Firebase Firestore instance


type EventData = {
    id: string;
    title: string;
    image: string;
    description: string;
    date: string;
    time: string;
    location: string;
    eventType: string;
    capacity: number;
    link: string;
    createdAt?: Date;
};
type EventsContextType = {
    events: EventData[];
    loading: boolean;
    addEvent: (event: EventData) => Promise<void>;
    updateEvent: (id: string, data: Partial<EventData>) => Promise<void>;
    deleteEvent: (id: string) => Promise<void>;
};

// ✅ Provide default values to satisfy TypeScript
const EventsContext = createContext<EventsContextType>({
    events: [],
    loading: true,
    addEvent: async () => { },
    updateEvent: async () => { },
    deleteEvent: async () => { },
});

export const EventsProvider = ({ children }: { children: ReactNode }) => {
    const [events, setEvents] = useState<EventData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "events"), orderBy("date", "desc"));
        const unsub = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as EventData[];
            setEvents(data);
            setLoading(false);
        });
        return () => unsub();
    }, []);

    const addEvent = async (event: EventData) => {
        await addDoc(collection(db, "events"), event);
    };

    const updateEvent = async (id: string, data: Partial<EventData>) => {
        const ref = doc(db, "events", id);
        await updateDoc(ref, data);
    };

    const deleteEvent = async (id: string) => {
        const ref = doc(db, "events", id);
        await deleteDoc(ref);
    };

    return (
        <EventsContext.Provider
            value={{
                events,
                loading,
                addEvent,
                updateEvent,
                deleteEvent,
            }}
        >
            {children}
        </EventsContext.Provider>
    );
};

export const useEvents = () => useContext(EventsContext);
