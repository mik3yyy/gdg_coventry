import { createContext, useContext, useEffect, useState } from "react"
import { db } from "../firebase"
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where } from "firebase/firestore"
import { useAuth } from "./AuthContext"

export type OpportunityStatus = "pending" | "approved" | "rejected"
export type OpportunityType = "job" | "collaboration"

export interface Opportunity {
    id: string
    type: OpportunityType
    title: string
    email: string
    user_email: string
    created_by: string
    description: string
    skills?: string
    external_url?: string

    companyName?: string
    location?: string
    jobType?: string
    experience?: string

    projectType?: string
    duration?: string
    commitment?: string

    status: OpportunityStatus
    created_at: string
    updated_at?: string
    rejected_reason?: string
}

interface OppContextType {
    opportunities: Opportunity[]
    myOpportunities: Opportunity[]
    loadingOpps: boolean
    listOpportunities: () => Promise<void>
    listMyOpportunities: () => Promise<void>
    addOpportunity: (data: Omit<Opportunity, "id" | "created_at" | "created_by" | "status">) => Promise<void>
    updateOpportunity: (id: string, updates: Partial<Opportunity>) => Promise<void>
    deleteOpportunity: (id: string) => Promise<void>
    listAllOpportunities: () => Promise<void>
}

const OpportunitiesContext = createContext<OppContextType | undefined>(undefined)

export function OpportunitiesProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth()
    const [opportunities, setOpportunities] = useState<Opportunity[]>([])
    const [loadingOpps, setLoadingOpps] = useState(false)
    const [myOpportunities, setMyOpportunities] = useState<Opportunity[]>([])


    const listOpportunities = async () => {
        setLoadingOpps(true)
        const q = query(collection(db, "opportunities"), where("status", "==", "approved"))
        const snap = await getDocs(q)
        const data = snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Opportunity, "id">) }))
        setOpportunities(data)
        setLoadingOpps(false)
    }
    const listAllOpportunities = async () => {
        setLoadingOpps(true)
        const q = query(collection(db, "opportunities"))
        const snap = await getDocs(q)
        const data = snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Opportunity, "id">) }))
        setOpportunities(data)
        setLoadingOpps(false)
    }

    const listMyOpportunities = async () => {
        setLoadingOpps(true)
        const q = query(collection(db, "opportunities"), where("user_email", "==", user?.email || ""))
        const snap = await getDocs(q)
        const data = snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Opportunity, "id">) }))
        setMyOpportunities(data)
        setLoadingOpps(false)
    }

    const addOpportunity = async (data: Omit<Opportunity, "id" | "status" | "created_at" | "created_by">) => {
        await addDoc(collection(db, "opportunities"), {
            ...data,
            created_by: user?.email || "",
            status: "pending",
            created_at: new Date().toISOString()
        })
        await listAllOpportunities()
    }

    const updateOpportunity = async (id: string, updates: Partial<Opportunity>) => {
        await updateDoc(doc(db, "opportunities", id), {
            ...updates,
            updated_at: new Date().toISOString()
        })
        await listAllOpportunities()
    }

    const deleteOpportunity = async (id: string) => {
        await deleteDoc(doc(db, "opportunities", id))
        await listAllOpportunities()
    }

    useEffect(() => {
        listAllOpportunities()
    }, [])

    return (
        <OpportunitiesContext.Provider value={{
            opportunities,
            loadingOpps,
            myOpportunities,
            listOpportunities,
            listMyOpportunities,
            addOpportunity,
            updateOpportunity,
            listAllOpportunities,
            deleteOpportunity
        }}>
            {children}
        </OpportunitiesContext.Provider>
    )
}

export const useOpportunitiesContext = () => {
    const ctx = useContext(OpportunitiesContext)
    if (!ctx) throw new Error("useOpportunitiesContext must be used inside OpportunitiesProvider")
    return ctx
}
