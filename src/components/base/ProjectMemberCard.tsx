import React, { useState } from "react"
import type { Project } from "../../contexts/ProjectContext"

interface Props {
    project: Project
    deleteProject: (id: string) => Promise<void>
    onEditProject?: (id: string) => void // optional, you will define usage later
}

const ProjectMemberCard: React.FC<Props> = ({ project, deleteProject, onEditProject }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const handleDelete = async () => {
        await deleteProject(project.id)
        setShowDeleteModal(false)
    }

    return (
        <>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
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

                    <p className="text-gray-700 mb-4 line-clamp-3">{project.description}</p>

                    {project.status === "rejected" && project.rejected_reason && (
                        <div className="mb-4 bg-red-50 text-red-700 text-sm p-3 rounded">
                            <strong>Rejected Reason:</strong> {project.rejected_reason}
                        </div>
                    )}

                    {project.tech_stack?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tech_stack.map((tech, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center text-sm text-gray-500 space-x-3">
                            <span className="flex items-center">
                                <i className="ri-heart-line mr-1"></i>{project.likes}
                            </span>
                            <span className="flex items-center">
                                <i className="ri-eye-line mr-1"></i>{project.views}
                            </span>
                        </div>

                        <div className="flex items-center space-x-3">
                            {(project.status === "rejected" || project.status === "pending") && (
                                <button
                                    onClick={() => onEditProject?.(project.id)}
                                    className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 transition-colors text-sm whitespace-nowrap"
                                >
                                    Edit
                                </button>
                            )}

                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm whitespace-nowrap"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Modal UI */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
                        <h3 className="text-lg font-semibold mb-2">Are you sure?</h3>
                        <p className="text-gray-600 mb-6">
                            This action will permanently delete this project.
                        </p>

                        <div className="flex justify-center space-x-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition text-sm"
                            >
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ProjectMemberCard
