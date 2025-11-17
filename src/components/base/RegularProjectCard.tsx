import React from "react"
import type { Project } from "../../contexts/ProjectContext"

interface Props {
    project: Project
}

const RegularProjectCard: React.FC<Props> = ({ project }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gray-200 relative overflow-hidden">
                <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover object-cover object-center"
                />
            </div>
            <div className="p-5">
                <div className="flex items-center mb-3">
                    <span className="text-sm text-gray-600">{project?.user_name}</span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                    {project.tech_stack?.slice(0, 3).map((tech, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.tech_stack && project.tech_stack.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            +{project.tech_stack.length - 3}
                        </span>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <span className="flex items-center text-sm text-gray-500">
                        <i className="ri-heart-line mr-1"></i>
                        {project.likes}
                    </span>
                    <div className="flex space-x-2">
                        {project.linkedurl && (
                            <a
                                href={project.linkedurl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <i className="ri-linkedin-box-fill"></i>
                            </a>
                        )}
                        {project.github_url && (
                            <a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <i className="ri-github-fill"></i>
                            </a>
                        )}
                        {project.demo_url && (
                            <a
                                href={project.demo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                <i className="ri-external-link-line"></i>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegularProjectCard
