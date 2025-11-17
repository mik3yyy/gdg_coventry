import React, { useState } from "react"
import type { Project } from "../../contexts/ProjectContext"

interface Props {
    project: Project
    isAdmin?: boolean
    updateProjectStatus?: (id: string, status: "approved" | "rejected", reason?: string) => Promise<void>
    toggleFeatured?: (id: string, current: boolean) => Promise<void> | void
}


const ProjectAdminCard: React.FC<Props> = ({ project, isAdmin = false, updateProjectStatus, toggleFeatured }) => {
    const [showRejectModal, setShowRejectModal] = useState(false)
    const [rejectReason, setRejectReason] = useState("")

    return (
        <>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                    <div className="flex items-start justify-between mb-4">

                        <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${project.status === 'approved' ? 'bg-green-100 text-green-800' :
                                    project.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                    {project.status}
                                </span>

                                {project.featured && (
                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                        Featured
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center text-sm text-gray-500 mb-3">
                                <span>By {project.user_name}</span>
                                <span className="mx-2">•</span>
                                <span>{project.category}</span>
                                <span className="mx-2">•</span>
                                <span>{new Date(project.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>

                        {project.image_url && (
                            <div className="ml-4 flex-shrink-0">
                                <img
                                    src={project.image_url}
                                    alt={project.title}
                                    className="w-24 h-16 object-cover rounded-lg"
                                />
                            </div>
                        )}
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-3">{project.description}</p>

                    {project.tech_stack && project.tech_stack.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tech_stack.map((tech, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            {project.github_url && (
                                <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
                                    <i className="ri-github-line text-lg"></i>
                                </a>
                            )}
                            {project.demo_url && (
                                <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
                                    <i className="ri-external-link-line text-lg"></i>
                                </a>
                            )}
                            <div className="flex items-center text-sm text-gray-500">
                                <i className="ri-heart-line mr-1"></i>{project.likes}
                                <span className="mx-2">•</span>
                                <i className="ri-eye-line mr-1"></i>{project.views}
                            </div>
                        </div>


                        {/* only render admin controls if isAdmin === true */}
                        {isAdmin && (
                            <div className="flex items-center space-x-2">
                                {project.status === 'pending' && (
                                    <>
                                        <button
                                            onClick={() => setShowRejectModal(true)}
                                            className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm whitespace-nowrap"
                                        >
                                            Reject
                                        </button>

                                        <button
                                            onClick={() => updateProjectStatus?.(project.id, 'approved')}
                                            className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors text-sm whitespace-nowrap"
                                        >
                                            Approve
                                        </button>
                                    </>
                                )}

                                {project.status === 'approved' && (
                                    <button
                                        onClick={() => toggleFeatured?.(project.id, project.featured)}
                                        className={`px-3 py-1 rounded transition-colors text-sm whitespace-nowrap ${project.featured
                                            ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {project.featured ? 'Unfeature' : 'Feature'}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {showRejectModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                        <h3 className="text-lg font-semibold mb-2">Reject Project</h3>
                        <p className="text-gray-600 mb-4 text-sm">
                            Please add a reason why this project is being rejected.
                        </p>

                        <textarea
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            placeholder="Reason..."
                            className="w-full border border-gray-300 rounded p-2 text-sm mb-4"
                            rows={3}
                        />

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowRejectModal(false)}
                                className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition text-sm"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={async () => {
                                    await updateProjectStatus?.(project.id, "rejected", rejectReason)
                                    setShowRejectModal(false)
                                    setRejectReason("")
                                }}
                                disabled={!rejectReason.trim()}
                                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition text-sm disabled:bg-red-300"
                            >
                                Confirm Reject
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>

    )
}

export default ProjectAdminCard
