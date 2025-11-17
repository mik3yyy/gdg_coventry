import { useEffect, useMemo, useState } from "react"
import { Header } from "../../../components/feature/Header"
import { Footer } from "../../../components/feature/Footer"
import { Link } from "react-router-dom"
import { useMentorContext, type Mentor } from "../../../contexts/MentorContext"
import { useAuth } from "../../../contexts/AuthContext"
import MentorApplicationForm from "./local-components/MentorApplicationForm"
import { MentorHeader } from "./local-components/MentorHeader"

export default function BecomeMentorPage() {
  const { addMentor, updateMentor, getMyMentorApplication } = useMentorContext()
  const { user } = useAuth()

  const [existing, setExisting] = useState<Mentor | null>(null)
  const [checking, setChecking] = useState<boolean>(true)
  const [showEdit, setShowEdit] = useState<boolean>(false) // for rejected -> reveal edit form

  // load user's current mentor application (by user_email)
  useEffect(() => {
    let mounted = true
    const run = async () => {
      if (!user?.email) {
        setExisting(null)
        setChecking(false)
        return
      }
      try {
        const res = await getMyMentorApplication(user.email) // must query by user_email in context
        if (mounted) {
          setExisting(res)
        }
      } finally {
        if (mounted) setChecking(false)
      }
    }
    run()
    return () => {
      mounted = false
    }
  }, [user, getMyMentorApplication])

  // Simple loader while checking status
  const StatusLoader = useMemo(
    () => (
      <div className="flex items-center justify-center py-10">
        <div className="flex items-center space-x-3 text-gray-600">
          <i className="ri-loader-4-line animate-spin text-xl"></i>
          <span>Checking your application status…</span>
        </div>
      </div>
    ),
    []
  )

  // Pending UI (friendly tone)
  const PendingCard = useMemo(
    () => (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
        <div className="flex items-start space-x-3">
          <i className="ri-time-line text-blue-600 text-xl"></i>
          <div>
            <h3 className="text-blue-900 font-semibold">Application Under Review</h3>
            <p className="text-blue-800 text-sm mt-1">
              Thanks for applying! Our team is reviewing your mentor request. We’ll notify you soon once a decision is made.
            </p>
          </div>
        </div>
      </div>
    ),
    []
  )

  // Approved UI
  const ApprovedCard = useMemo(
    () => (
      <div className="bg-green-50 border border-green-200 rounded-lg p-5">
        <div className="flex items-start space-x-3">
          <i className="ri-badge-line text-green-600 text-xl"></i>
          <div>
            <h3 className="text-green-900 font-semibold">You’re an Approved Mentor!</h3>
            <p className="text-green-800 text-sm mt-1">
              Thank you for being part of our mentor program. If someone wants you to be their mentor, you’ll receive an email at{" "}
              <span className="font-medium">{existing?.email}</span>.
            </p>
          </div>
        </div>
      </div>
    ),
    [existing?.email]
  )

  // Rejected UI (reason + button to reveal edit form)
  const RejectedCard = useMemo(
    () => (
      <div className="bg-red-50 border border-red-200 rounded-lg p-5">
        <div className="flex items-start space-x-3">
          <i className="ri-close-circle-line text-red-600 text-xl"></i>
          <div className="flex-1">
            <h3 className="text-red-900 font-semibold">Application Rejected</h3>
            <p className="text-red-800 text-sm mt-1">
              Unfortunately your application was not approved this time.
            </p>

            {existing?.rejected_reason && (
              <div className="mt-3 bg-white border border-red-200 rounded-md p-3">
                <div className="text-sm text-red-900">
                  <span className="font-medium">Reason:</span> {existing.rejected_reason}
                </div>
              </div>
            )}

            <div className="mt-4">
              <button
                onClick={() => setShowEdit(s => !s)}
                className="inline-flex items-center px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                <i className="ri-edit-2-line mr-2"></i>
                {showEdit ? "Hide Edit Form" : "Edit & Resubmit Application"}
              </button>
            </div>
          </div>
        </div>
      </div>
    ),
    [existing?.rejected_reason, showEdit]
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Centered content wrapper matches header width */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Breadcrumb + title + benefits (no outer sections inside) */}
            <MentorHeader />

            {/* Conditional states */}
            {checking ? (
              StatusLoader
            ) : !user ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
                <div className="flex items-start space-x-3">
                  <i className="ri-user-3-line text-yellow-600 text-xl"></i>
                  <div>
                    <h3 className="text-yellow-900 font-semibold">Sign in required</h3>
                    <p className="text-yellow-800 text-sm mt-1">
                      Please sign in to apply to become a mentor.
                    </p>
                  </div>
                </div>
              </div>
            ) : existing ? (
              <>
                {existing.status === "pending" && PendingCard}

                {existing.status === "approved" && ApprovedCard}

                {existing.status === "rejected" && (
                  <>
                    {RejectedCard}

                    {/* Reveal edit form when user clicks */}
                    {showEdit && (
                      <div className="mt-8">
                        <div className="max-w-4xl mx-auto">
                          <MentorApplicationForm
                            mode="edit"
                            currentUserEmail={user.email!}
                            defaultData={existing}
                            onSubmit={async (data, mentorId) => {
                              if (!mentorId) return
                              // Ensure status resets to pending on edit inside form already,
                              // but if you want to be extra safe you can also enforce here:
                              await updateMentor(mentorId, { ...data, status: "pending" as const })
                              // After successful update, refresh and hide edit form
                              const refreshed = await getMyMentorApplication(user.email!)
                              setExisting(refreshed)
                              setShowEdit(false)
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            ) : (
              // No application yet -> show create form (center + same width)
              <div className="max-w-4xl mx-auto">
                <MentorApplicationForm
                  mode="create"
                  currentUserEmail={user.email!}
                  onSubmit={async (data) => {
                    // You can add created_at here or inside context
                    await addMentor({
                      ...data,
                      // any extra fields like created_at can be added by context
                    } as any)
                    // Refresh page state to show pending
                    const refreshed = await getMyMentorApplication(user.email!)
                    setExisting(refreshed)
                  }}
                />
              </div>
            )}

            {/* Back to Dashboard (kept aligned to theme) */}
            <div className="mt-10 flex justify-between items-center border-t border-gray-100 pt-6">
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                ← Back to Dashboard
              </Link>
              {/* optional: could place a help / FAQ link here */}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
