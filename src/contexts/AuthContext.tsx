import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"
import { auth, provider, db } from "../firebase"
import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth"
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore"
import type { Organizer } from "./OrganizerContext"

// ---------------------------
// TYPES
// ---------------------------
interface Member {
  id: string
  name: string
  email: string
  photo?: string

  role: "member" | "admin" | "mentor"
  admin_type?: "lead" | "events" | "community" | "technical" | "marketing" | "none"
  permissions?: string
  status: "active" | "inactive"
  consented: boolean
  gdgOfficial: boolean
  joinedAt: string
  lastActive?: string
  created_at: string
  updated_at: string
}

interface AuthContextType {
  user: Member | null
  loading: boolean
  currentView: "admin" | "member"
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<Member>) => Promise<void>
  switchView: (view: "admin" | "member") => void
}

// ---------------------------
// CONTEXT
// ---------------------------

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

// ---------------------------
// PROVIDER
// ---------------------------


export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<Member | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentView, setCurrentView] = useState<"admin" | "member">("member")

  // ---------------------------
  // SIGN IN WITH GOOGLE
  // ---------------------------
  const signInWithGoogle = async () => {
    setLoading(true)
    try {
      const result = await signInWithPopup(auth, provider)
      const fbUser = result.user

      const ref = doc(db, "members", fbUser.uid)
      const snapshot = await getDoc(ref)

      const organizersRef = collection(db, "organizers")
      const q = query(organizersRef, where("email", "==", fbUser.email))
      const querySnapshot = await getDocs(q)
      let isOrganizer = false
      let organizerRole: Organizer["role"] | undefined
      let organizerPermissions: Organizer["permissions"] | undefined

      if (!querySnapshot.empty) {
        isOrganizer = true
        const organizerData = querySnapshot.docs[0].data() as Organizer
        organizerPermissions = organizerData.permissions
        organizerRole = organizerData.role
      }

      // const isAdmin = fbUser.email === "mikeokpechi@gmail.com"

      let memberData: Member

      if (snapshot.exists()) {
        const data = snapshot.data() as Member

        memberData = {
          ...data,
          role: data.role || (isOrganizer ? "admin" : "member"),
          admin_type: data.admin_type || (isOrganizer ? organizerRole : "none"),
          permissions: data.permissions || (isOrganizer ? organizerPermissions : ""),
          status: data.status || "active",
          consented: data.consented ?? false,
          gdgOfficial: data.gdgOfficial ?? false,
          updated_at: new Date().toISOString(),
        }
        console.log("Member data:", memberData)

        // Optional: merge back missing fields to Firestore
        await setDoc(ref, memberData, { merge: true })
      }
      else {
        memberData = {
          id: fbUser.uid,
          name: fbUser.displayName || "",
          email: fbUser.email || "",
          photo: fbUser.photoURL || "",
          role: isOrganizer ? "admin" : "member",
          admin_type: isOrganizer ? organizerRole : undefined,
          permissions: isOrganizer ? organizerPermissions : undefined,
          status: "active",
          consented: false,
          gdgOfficial: false,
          joinedAt: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
        console.log("Member data:", memberData)

        const filteredMemberData = Object.fromEntries(
          Object.entries(memberData).filter(([_, value]) => value !== undefined)
        )

        await setDoc(ref, filteredMemberData, { merge: true })
      }


      // Update context + localStorage
      setUser(memberData)
      setCurrentView(isOrganizer ? "admin" : "member")
      memberData.role = isOrganizer ? "admin" : memberData.role || "member"

      localStorage.setItem("gdg_session", JSON.stringify(memberData))

      // ✅ DO NOT NAVIGATE YET — let the SignInPage handle next steps
      console.log("✅ Signed in as", memberData.email, "role:", memberData.role)
    } catch (err) {
      console.error("Sign-in failed:", err)
      throw err
    } finally {
      setLoading(false)
    }
  }



  // ---------------------------
  // SIGN OUT
  // ---------------------------
  const signOut = async () => {
    try {
      setLoading(true)
      await firebaseSignOut(auth)

      setUser(null)
      // setProfile(null)
      // setSession(null)
      setCurrentView("member")
      localStorage.removeItem("gdg_session")

      if (window.REACT_APP_NAVIGATE) {
        window.REACT_APP_NAVIGATE("/")
      }
    } catch (error) {
      console.error("Error signing out:", error)
    } finally {
      setLoading(false)
    }
  }

  // ---------------------------
  // UPDATE MEMBER PROFILE
  // ---------------------------
  const updateProfile = async (updates: Partial<Member>) => {
    if (!user) throw new Error("No user found")

    const updatedUser: Member = {
      ...user,
      ...updates,
      updated_at: new Date().toISOString(),
    }

    // Update local state
    setUser(updatedUser)

    // Persist to localStorage
    const stored = localStorage.getItem("gdg_session")
    if (stored) {
      const data = JSON.parse(stored)
      data.user = updatedUser
      localStorage.setItem("gdg_session", JSON.stringify(updatedUser))
    }

    // Sync to Firestore
    try {
      await setDoc(doc(db, "members", user.id), updatedUser, { merge: true })
      console.log("✅ Member profile updated successfully")
    } catch (error) {
      console.error("❌ Failed to sync member profile:", error)
      throw new Error("Failed to update member profile")
    }
  }


  // ---------------------------
  // SWITCH VIEW
  // ---------------------------
  const switchView = (view: "admin" | "member") => {
    setCurrentView(view)
    const stored = localStorage.getItem("gdg_session")
    if (stored) {
      const data = JSON.parse(stored)
      data.currentView = view
      localStorage.setItem("gdg_session", JSON.stringify(data))
    }
  }

  // ---------------------------
  // SESSION RESTORE
  // ---------------------------
  useEffect(() => {
    const stored = localStorage.getItem("gdg_session")
    if (stored) {
      try {
        const sessionData = JSON.parse(stored)

        // If it’s just a Member object (not wrapped)
        if (sessionData && sessionData.email) {
          setUser(sessionData)
          setCurrentView(sessionData.role === "admin" ? "admin" : "member")
        }
        // If it’s the new structure { user, currentView }
        else if (sessionData.user) {
          setUser(sessionData.user)
          setCurrentView(sessionData.currentView || "member")
        }
      } catch (err) {
        console.error("Failed to parse stored session:", err)
        localStorage.removeItem("gdg_session")
      }
    }

    const unsubscribe = onAuthStateChanged(auth, (fbUser: FirebaseUser | null) => {
      if (!fbUser) {
        setUser(null)
        localStorage.removeItem("gdg_session")
      }
    })

    setLoading(false)
    return () => unsubscribe()
  }, [])


  // ---------------------------
  // CONTEXT VALUE
  // ---------------------------

  const value: AuthContextType = {
    user,

    loading,
    currentView,
    signInWithGoogle,
    signOut,
    updateProfile,
    switchView,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
