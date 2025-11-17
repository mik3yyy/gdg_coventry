import React from "react"
import type { Mentor } from "../../../../contexts/MentorContext"

interface Props {
    mentor: Mentor
    onClose: () => void
}

export default function MentorModal({ mentor, onClose }: Props) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Mentor Application</h2>

                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <i className="ri-close-line text-xl"></i>
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">{mentor.name}</h3>
                            <p className="text-gray-600 text-sm">{mentor.title} at {mentor.company}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                            <a className="text-blue-600 hover:underline break-all" href={mentor.linkedin} target="_blank">
                                {mentor.linkedin}
                            </a>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <p className="text-gray-700 leading-relaxed">{mentor.description}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Motivation</label>
                            <p className="text-gray-700 leading-relaxed">{mentor.motivation}</p>
                        </div>

                        {mentor.rejected_reason && mentor.status === "rejected" && (
                            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                                <p className="font-medium text-sm">Rejection Reason:</p>
                                <p className="text-sm mt-1">{mentor.rejected_reason}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
