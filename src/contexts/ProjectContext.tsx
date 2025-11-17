import { createContext, useContext, useState, useEffect } from "react"
import { db } from "../firebase"
import { useAuth } from './AuthContext';

import {
    collection,
    getDocs,
    query,
    where,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    serverTimestamp,
    orderBy,
} from "firebase/firestore"

// ----------------------------
// Type Definition
// ----------------------------
export interface Project {
    id: string
    title: string
    description: string
    tech_stack: string[]
    github_url?: string
    linkedurl: string
    demo_url?: string

    image_url?: string
    user_name: string
    user_email: string
    category: string
    status: "pending" | "approved" | "rejected"
    featured: boolean
    likes: number
    views: number
    created_at: string
    rejected_reason?: string
    updated_at?: string

}

// ----------------------------
// Context Type
// ----------------------------
interface ProjectContextType {
    projects: Project[]
    myprojects: Project[]
    loading: boolean
    error: string | null
    fetchProjects: (filter?: "all" | "pending" | "approved" | "rejected") => Promise<void>
    addProject: (data: Omit<Project, "id" | "created_at" | "updated_at" | "likes" | "views" | "featured" | "status">) => Promise<void>
    updateProjectStatus: (projectId: string, status: "approved" | "rejected", reason?: string) => Promise<void>
    toggleFeatured: (projectId: string, featured: boolean) => Promise<void>
    editProject: (projectId: string, updates: Partial<Project>) => Promise<void>
    myProjects: () => Promise<void>
    deleteProject: (projectId: string) => Promise<void>
}

// ----------------------------
// Context Initialization
// ----------------------------
const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

// ----------------------------
// Provider Component
// ----------------------------
export function ProjectProvider({ children }: { children: React.ReactNode }) {
    const [projects, setProjects] = useState<Project[]>([])
    const [myprojects, setMyProjects] = useState<Project[]>([])

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { user, signOut, currentView, switchView } = useAuth();

    // ----------------------------
    // FETCH PROJECTS
    // ----------------------------
    const fetchProjects = async (filter: "all" | "pending" | "approved" | "rejected" = "all") => {
        setLoading(true)
        try {
            let q = query(collection(db, "projects"), orderBy("created_at", "desc"))
            if (filter !== "all") {
                q = query(collection(db, "projects"), where("status", "==", filter))
            }
            const snapshot = await getDocs(q)
            const list: Project[] = snapshot.docs.map((docSnap) => {
                const data = docSnap.data()
                return {
                    id: docSnap.id,
                    title: data.title || "",
                    description: data.description || "",
                    tech_stack: data.tech_stack || [],
                    github_url: data.github_url || "",
                    linkedurl: data.linkedurl || "",
                    demo_url: data.demo_url || "",
                    image_url: data.image_url || "",
                    user_name: data.user_name || "",
                    user_email: data.user_email || "",
                    category: data.category || "",
                    status: data.status || "pending",
                    featured: data.featured || false,
                    likes: data.likes || 0,
                    views: data.views || 0,
                    created_at: data.created_at || new Date().toISOString(),
                    updated_at: data.updated_at || new Date().toISOString(),
                }
            })
            setProjects(list)
        } catch (err: any) {
            console.error("Error fetching projects:", err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const myProjects = async () => {
        setLoading(true)
        try {
            let q = query(collection(db, "projects"), orderBy("created_at", "desc"))
            q = query(collection(db, "projects"), where("user_email", "==", user?.email))

            const snapshot = await getDocs(q)
            const list: Project[] = snapshot.docs.map((docSnap) => {
                const data = docSnap.data()
                return {
                    id: docSnap.id,
                    title: data.title || "",
                    description: data.description || "",
                    tech_stack: data.tech_stack || [],
                    github_url: data.github_url || "",
                    linkedurl: data.linkedurl || "",
                    demo_url: data.demo_url || "",
                    image_url: data.image_url || "",
                    user_name: data.user_name || "",
                    user_email: data.user_email || "",
                    category: data.category || "",
                    status: data.status || "pending",
                    rejected_reason: data.rejected_reason || "",
                    featured: data.featured || false,
                    likes: data.likes || 0,
                    views: data.views || 0,
                    created_at: data.created_at || new Date().toISOString(),
                    updated_at: data.updated_at || new Date().toISOString(),
                }
            })
            setMyProjects(list)
        } catch (err: any) {
            console.error("Error fetching projects:", err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // ----------------------------
    // ADD NEW PROJECT (for Members)
    // ----------------------------
    const addProject = async (
        data: Omit<Project, "id" | "created_at" | "updated_at" | "likes" | "views" | "featured" | "status">
    ) => {
        try {
            const newProject: Omit<Project, "id"> = {
                ...data,
                status: "pending",
                featured: false,
                likes: 0,
                views: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            }

            const ref = await addDoc(collection(db, "projects"), newProject)
            const projectWithId: Project = { ...newProject, id: ref.id }
            setProjects((prev) => [projectWithId, ...prev])
        } catch (err: any) {
            console.error("Error adding project:", err)
            setError(err.message)
        }
    }

    // ----------------------------
    // UPDATE STATUS (for Admins)
    // ----------------------------
    const updateProjectStatus = async (projectId: string, status: "approved" | "rejected", reason?: string) => {
        try {
            const ref = doc(db, "projects", projectId)
            await updateDoc(ref, { status, updated_at: new Date().toISOString(), rejected_reason: reason })
            setProjects((prev) =>
                prev.map((p) => (p.id === projectId ? { ...p, status } : p))
            )
        } catch (err: any) {
            console.error("Error updating project status:", err)
            setError(err.message)
        }
    }

    // ----------------------------
    // TOGGLE FEATURED
    // ----------------------------
    const toggleFeatured = async (projectId: string, featured: boolean) => {
        try {
            const ref = doc(db, "projects", projectId)
            await updateDoc(ref, { featured: !featured, updated_at: new Date().toISOString() })
            setProjects((prev) =>
                prev.map((p) =>
                    p.id === projectId ? { ...p, featured: !featured } : p
                )
            )
        } catch (err: any) {
            console.error("Error toggling featured:", err)
            setError(err.message)
        }
    }

    // ----------------------------
    // EDIT PROJECT DETAILS
    // ----------------------------
    const editProject = async (projectId: string, updates: Partial<Project>) => {
        try {
            const ref = doc(db, "projects", projectId)
            await updateDoc(ref, { ...updates, updated_at: new Date().toISOString() })
            setProjects((prev) =>
                prev.map((p) =>
                    p.id === projectId ? { ...p, ...updates } : p
                )
            )
        } catch (err: any) {
            console.error("Error editing project:", err)
            setError(err.message)
        }
    }
    const deleteProject = async (projectId: string) => {
        try {
            const ref = doc(db, "projects", projectId)
            await deleteDoc(ref)
            setMyProjects((prev) =>
                prev.filter((p) => p.id !== projectId)
            )
        } catch (err: any) {
            console.error("Error editing project:", err)
            setError(err.message)
        }
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    return (
        <ProjectContext.Provider
            value={{
                projects,
                myprojects,
                loading,
                error,
                myProjects,
                fetchProjects,
                addProject,
                updateProjectStatus,
                toggleFeatured,
                editProject,
                deleteProject
            }}
        >
            {children}
        </ProjectContext.Provider>
    )
}

// ----------------------------
// Hook for easy access
// ----------------------------
export const useProjects = () => {
    const ctx = useContext(ProjectContext)
    if (!ctx) throw new Error("useProjects must be used within ProjectProvider")
    return ctx
}
