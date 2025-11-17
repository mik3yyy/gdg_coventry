import React from "react"
import type { MentorMessage } from "../page"

interface Props {
    message: MentorMessage
    onClose: () => void
    getStatusColor: (status: string) => string
    getPriorityColor: (priority: string) => string
    getCategoryColor: (category: string) => string
    markAsRead: (id: string) => void
    markAsReplied: (id: string) => void
}

export default function MentorMessageModal({
    message,
    onClose,
    getStatusColor,
    getPriorityColor,
    getCategoryColor,
    markAsRead,
    markAsReplied
}: Props) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Message Details</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <i className="ri-close-line text-xl"></i>
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{message.subject}</h3>
                            <div className="flex items-center space-x-4 text-sm">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                                    {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(message.priority)}`}>
                                    {message.priority.charAt(0).toUpperCase() + message.priority.slice(1)} Priority
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(message.category)}`}>
                                    {message.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                            <div className="flex items-center space-x-3">
                                <img src={message.sender.avatar} className="w-10 h-10 rounded-full object-cover" />
                                <div>
                                    <p className="font-medium text-gray-900">{message.sender.name}</p>
                                    <p className="text-sm text-gray-500">{message.sender.email}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                            <div className="flex items-center space-x-3">
                                <img src={message.mentor.avatar} className="w-10 h-10 rounded-full object-cover" />
                                <div>
                                    <p className="font-medium text-gray-900">{message.mentor.name}</p>
                                    <p className="text-sm text-gray-500">{message.mentor.position} at {message.mentor.company}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-gray-700 leading-relaxed">{message.message}</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sent Date</label>
                            <p className="text-gray-900">{new Date(message.sentDate).toLocaleDateString()}</p>
                        </div>

                        {message.status !== "replied" && (
                            <div className="flex space-x-3 pt-4 border-t">
                                {message.status === "unread" && (
                                    <button
                                        onClick={() => { markAsRead(message.id); onClose(); }}
                                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
                                    >
                                        <i className="ri-check-line mr-2"></i>
                                        Mark as Read
                                    </button>
                                )}

                                {message.status === "read" && (
                                    <button
                                        onClick={() => { markAsReplied(message.id); onClose(); }}
                                        className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium"
                                    >
                                        <i className="ri-reply-line mr-2"></i>
                                        Mark as Replied
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
