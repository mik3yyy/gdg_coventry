import React from "react";
import type { Project } from "../../contexts/ProjectContext";

const FeaturedProjectCard = ({ project }: { project: Project }) => {
    return (
        <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow" >
            <div className="aspect-video bg-gray-200 relative overflow-hidden">
                <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                    </span>
                </div>
            </div>
            <div className="p-6">
                {/* <div className="flex items-center mb-3">
          <img
            src={project?.author?.avatar_url}
            alt={project.author?.full_name}
            className="w-8 h-8 rounded-full mr-3"
          />
          <span className="text-sm text-gray-600">{project.author?.full_name}</span>
        </div> */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech_stack?.slice(0, 4).map((tech, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.tech_stack && project.tech_stack.length > 4 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{project.tech_stack.length - 4} more
                        </span>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <span className="flex items-center text-sm text-gray-500">
                            <i className="ri-heart-line mr-1"></i>
                            {project.likes}
                        </span>
                    </div>
                    <div className="flex space-x-2">
                        {project.github_url && (
                            <a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <i className="ri-github-fill text-lg"></i>
                            </a>
                        )}
                        {project.demo_url && (
                            <a
                                href={project.demo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                <i className="ri-external-link-line text-lg"></i>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default FeaturedProjectCard;
