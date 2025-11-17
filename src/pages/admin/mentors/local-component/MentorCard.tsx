import type { Mentor } from "../../../../contexts/MentorContext"
import { useState } from "react"

interface MentorCardProps {
    mentor: Mentor
    statusColorClass: (status: string) => string
    onView?: () => void
    onApprove?: (id: string) => void
    onReject?: (id: string, reason: string) => void
    onDelete?: (id: string) => void
}

export function MentorCard({ mentor, statusColorClass, onView, onApprove, onReject, onDelete }: MentorCardProps) {
    const [showRejectInput, setShowRejectInput] = useState(false)
    const [reason, setReason] = useState("")

    const handleRejectConfirm = () => {
        if (!reason.trim()) return
        onReject?.(mentor.id, reason.trim())
        setShowRejectInput(false)
        setReason("")
    }

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{mentor.name}</h3>
                    <p className="text-sm text-gray-600">{mentor.title} @ {mentor.company}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColorClass(mentor.status)}`}>
                    {mentor.status.charAt(0).toUpperCase() + mentor.status.slice(1)}
                </span>
            </div>

            <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                {mentor.description}
            </p>

            <div className="flex flex-wrap gap-1 mb-4">
                {mentor.expertise.slice(0, 3).map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs">
                        {skill}
                    </span>
                ))}
                {mentor.expertise.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                        +{mentor.expertise.length - 3}
                    </span>
                )}
            </div>

            <div className="flex justify-end gap-3 flex-wrap">

                {onView && (
                    <button onClick={onView} className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                        <i className="ri-eye-line mr-1"></i>
                        View
                    </button>
                )}

                {mentor.status === "pending" && (
                    <>
                        <button
                            onClick={() => onApprove?.(mentor.id)}
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                        >Approve</button>

                        <button
                            onClick={() => setShowRejectInput(true)}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                        >Reject</button>
                    </>
                )}

                {mentor.status === "approved" && onDelete && (
                    <button
                        onClick={() => onDelete(mentor.id)}
                        className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 text-sm"
                    >Delete</button>
                )}
            </div>

            {showRejectInput && (
                <div className="mt-4 border-t pt-3 space-y-2">
                    <textarea
                        className="w-full border p-2 rounded text-sm"
                        rows={2}
                        placeholder="Reason for rejection"
                        value={reason}
                        onChange={e => setReason(e.target.value)}
                    />
                    <div className="flex justify-end gap-2 text-sm">
                        <button onClick={() => setShowRejectInput(false)} className="text-gray-600">Cancel</button>
                        <button onClick={handleRejectConfirm} className="bg-red-600 text-white px-3 py-1 rounded text-sm">
                            Confirm Reject
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
