import { useEffect, useState } from "react"
import { useAuth } from "../../../contexts/AuthContext"
import { Button } from "../../../components/base/Button"
import { useNavigate } from "react-router-dom"

export default function SignInPage() {
  const { signInWithGoogle, loading, user, updateProfile } = useAuth()
  const navigate = useNavigate()

  const [showConsent, setShowConsent] = useState(false)
  const [showRolePrompt, setShowRolePrompt] = useState(false)
  const [consented, setConsented] = useState(false)
  const [error, setError] = useState<string | null>(null)


  // ---------------------------
  // HANDLE GOOGLE SIGN-IN
  // ---------------------------
  const handleGoogleSignIn = async () => {
    try {
      setError(null)
      await signInWithGoogle()
      console.log("User after sign-in:", localStorage.getItem("gdg_session"))

      const stored = localStorage.getItem("gdg_session")
      if (stored) {
        const member = JSON.parse(stored)

        if (member.role === "admin") {
          setShowRolePrompt(true) // ✅ Show choose view screen
        } else if (!member.consented) {
          setShowConsent(true) // ✅ Show consent screen
        } else {
          navigate("/dashboard") // ✅ Redirect with React Router
        }
      } else {
        // setError("Unable to load session. Please try again.")
      }
    } catch (err: any) {
      console.error("Sign-in failed:", err)
      setError(err.message || "Failed to sign in. Please try again.")
    }
  }
  useEffect(() => {
    // If user is already signed in, redirect accordingly
    const stored = localStorage.getItem("gdg_session")
    if (stored) {
      const member = JSON.parse(stored)

      if (member.role === "admin") {
        setShowRolePrompt(true) // ✅ Show choose view screen
      } else if (!member.consented) {
        setShowConsent(true) // ✅ Show consent screen
      } else {
        navigate("/dashboard") // ✅ Redirect with React Router
      }
    } else {
      // setError("Unable to load session. Please try again.")
    }
  }, [])
  // ---------------------------
  // HANDLE ROLE SELECTION
  // ---------------------------
  const handleRoleSelection = (role: "admin" | "member") => {
    if (role === "admin") {
      // simulateAdminLogin()
      navigate("/admin")
    } else {
      navigate("/dashboard")
    }
  }

  // ---------------------------
  // HANDLE CONSENT SUBMIT
  // ---------------------------
  const handleConsentSubmit = async () => {
    if (!consented) {
      setError("Please consent to become a GDG Coventry member.")
      return
    }

    try {
      alert("✅ Welcome! You’re now officially registered with GDG Coventry 🎉")
      setShowConsent(false)
      await updateProfile({ consented: true })
      navigate("/dashboard")
    } catch (error) {
      console.error("Consent submission failed:", error)
      setError("Failed to save consent. Please try again.")
    }
  }


  // ===============================
  // 1️⃣ ADMIN VIEW SELECTION
  // ===============================
  if (showRolePrompt && user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-200 px-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-40 h-40 bg-blue-200 rounded-full opacity-40 -z-10 blur-2xl animate-pulse" />
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Welcome back, {user.name.split(" ")[0]} 👋</h1>
          <p className="text-gray-600 mb-8">
            You have admin access. Choose how you’d like to proceed.
          </p>

          <div className="flex flex-col gap-4">
            <Button
              onClick={() => handleRoleSelection("admin")}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-md hover:scale-[1.01] transition-transform"
            >
              <i className="ri-admin-line mr-2 text-lg"></i>
              Continue as Admin
            </Button>

            <Button
              onClick={() => handleRoleSelection("member")}
              className="w-full py-4 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:shadow-md transition"
            >
              <i className="ri-user-line mr-2 text-lg"></i>
              Continue as Member
            </Button>
          </div>

          <p className="mt-6 text-xs text-gray-500">
            Signed in as <span className="font-medium">{user.email}</span>
          </p>
        </div>
      </div>
    )
  }

  // ===============================
  // 2️⃣ CONSENT SCREEN
  // ===============================
  if (showConsent && user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-100 px-6">
        <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg text-center">
          <div className="mx-auto mb-4">
            <img
              src={user.photo}
              alt="User Avatar"
              className="w-16 h-16 rounded-full mx-auto shadow-md"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Join GDG Coventry
          </h2>
          <p className="text-gray-600 mb-6">
            Hi <span className="font-semibold">{user.name}</span>, welcome!
            Please confirm your membership consent below.
          </p>

          <div className="flex items-start gap-3 mb-6 text-left">
            <input
              type="checkbox"
              id="consent"
              checked={consented}
              onChange={(e) => setConsented(e.target.checked)}
              className="mt-1 h-5 w-5 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="consent" className="text-sm text-gray-700 leading-relaxed">
              I agree to allow GDG Coventry to store and use my information
              for community membership registration in accordance with Google’s
              GDG community guidelines.
            </label>
          </div>

          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

          <Button
            onClick={handleConsentSubmit}
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:shadow-md transition-colors"
          >
            {loading ? "Registering..." : "Confirm & Join"}
          </Button>

          <p className="mt-4 text-xs text-gray-500">
            Your data will be securely stored and only used for official GDG community purposes.
          </p>
        </div>
      </div>
    )
  }

  // ===============================
  // 3️⃣ MAIN SIGN-IN SCREEN
  // ===============================
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-200">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md text-center relative overflow-hidden">
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-blue-200 opacity-40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-indigo-300 opacity-40 rounded-full blur-3xl animate-pulse" />

        <h1 className="text-3xl font-extrabold mb-4 text-gray-900">Welcome to GDG Coventry</h1>
        <p className="text-gray-600 mb-8">
          Join our tech community and connect with developers and innovators across the UK.
        </p>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <Button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex justify-center items-center py-3 border border-gray-300 rounded-xl bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md transition"
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          {loading ? "Signing in..." : "Continue with Google"}
        </Button>

        <p className="mt-6 text-xs text-gray-500">
          By signing in, you agree to our <span className="underline">Terms</span> and <span className="underline">Privacy Policy</span>.
        </p>
      </div>
    </div>
  )
}
