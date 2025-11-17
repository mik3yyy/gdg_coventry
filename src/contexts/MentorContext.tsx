import { createContext, useState, useContext, useEffect } from "react"
import { db } from "../firebase" // your firebase init
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc, orderBy, query, where } from "firebase/firestore"

export interface Mentor {
    id: string
    name: string
    email: string              // email they want to use for mentorship contact
    user_email: string         // email from your auth (owner of the application)
    linkedin: string
    title: string
    company: string
    experience: string
    expertise: string[]
    description: string
    motivation: string
    status: "pending" | "approved" | "rejected"
    rejected_reason?: string
    created_at: string
    updated_at?: string
}


interface MentorContextType {
    mentors: Mentor[]
    loadingMentors: boolean

    addMentor: (payload: Omit<Mentor, "id" | "created_at" | "updated_at" | "status">) => Promise<void>
    listMentors: () => Promise<void>
    updateMentor: (id: string, updates: Partial<Mentor>) => Promise<void>
    deleteMentor: (id: string) => Promise<void>
    getMyMentorApplication: (email: string) => Promise<Mentor | null>
    addMentorRequest: (payload: any) => Promise<void>
    listMentorRequests: () => Promise<void>
    mentorRequests: any[]
    loadingRequests: boolean
}

const MentorContext = createContext<MentorContextType>({} as MentorContextType)

export const MentorProvider = ({ children }: { children: React.ReactNode }) => {
    const [mentors, setMentors] = useState<Mentor[]>([])
    const [loadingMentors, setLoadingMentors] = useState(false)
    const [mentorRequests, setMentorRequests] = useState<any[]>([])
    const [loadingRequests, setLoadingRequests] = useState(false)
    const listMentors = async () => {
        setLoadingMentors(true)
        const q = query(collection(db, "mentors"), orderBy("created_at", "desc"))
        const snapshot = await getDocs(q)
        const items = snapshot.docs.map(docSnap => ({
            id: docSnap.id,
            ...(docSnap.data() as Omit<Mentor, "id">)
        }))
        setMentors(items)
        setLoadingMentors(false)
    }
    const getMyMentorApplication = async (email: string): Promise<Mentor | null> => {
        const q = query(collection(db, "mentors"), where("user_email", "==", email))
        const snapshot = await getDocs(q)

        if (snapshot.empty) return null

        const docSnap = snapshot.docs[0]
        return { id: docSnap.id, ...(docSnap.data() as Omit<Mentor, "id">) }
    }

    const addMentor = async (payload: any) => {
        await addDoc(collection(db, "mentors"), {
            ...payload,
            status: "pending",
            created_at: new Date().toISOString()
        })
        await listMentors()
    }
    const addMentorRequest = async (payload: any) => {
        await addDoc(collection(db, "mentor_requests"), {
            ...payload,
            created_at: new Date().toISOString()
        })
    }

    const listMentorRequests = async () => {
        setLoadingRequests(true)
        const q = query(collection(db, "mentor_requests"), orderBy("created_at", "desc"))
        const snapshot = await getDocs(q)

        const data = snapshot.docs.map(d => ({
            id: d.id,
            ...d.data()
        }))

        setMentorRequests(data)
        setLoadingRequests(false)
    }

    const updateMentor = async (id: string, updates: Partial<Mentor>) => {
        await updateDoc(doc(db, "mentors", id), {
            ...updates,
            updated_at: new Date().toISOString()
        })
        await listMentors()
    }

    const deleteMentor = async (id: string) => {
        await deleteDoc(doc(db, "mentors", id))
        await listMentors()
    }

    useEffect(() => {
        listMentors()
    }, [])

    return (
        <MentorContext.Provider value={{ mentors, loadingMentors, addMentor, listMentors, updateMentor, deleteMentor, getMyMentorApplication, addMentorRequest, listMentorRequests, mentorRequests, loadingRequests }}>
            {children}
        </MentorContext.Provider>
    )
}

export const useMentorContext = () => useContext(MentorContext)
