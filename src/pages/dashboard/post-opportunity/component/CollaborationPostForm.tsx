import React from "react"
interface Props {
    collaborationData: any
    setCollaborationData: (data: any) => void
    formData: any
    setFormData: (data: any) => void
    handleSubmit: (e: React.FormEvent) => void
    isSubmitting: boolean
    editingExisting?: boolean
}
export function CollaborationFormCard({
    collaborationData,
    setCollaborationData,
    formData,
    setFormData,
    handleSubmit,
    isSubmitting,
    editingExisting
}: Props) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <i className="ri-team-line text-green-600 text-xl"></i>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-900">
                        {editingExisting ? "Edit Collaboration Post" : "Find Collaboration Partners"}
                    </h2>
                    <p className="text-gray-600">
                        {editingExisting ? "Update and resubmit this project collaboration" : "Connect with developers for your project"}
                    </p>
                </div>
            </div>

            <form id="collaboration-form" data-readdy-form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Project Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            required
                            value={collaborationData.title}
                            onChange={(e) => setCollaborationData({ ...collaborationData, title: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                            placeholder="e.g. E-commerce Platform"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Contact Email *
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={collaborationData.email}
                            onChange={(e) => setCollaborationData({ ...collaborationData, email: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                            placeholder="your.email@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Project Type *
                        </label>
                        <div className="relative">
                            <select
                                name="projectType"
                                required
                                value={collaborationData.projectType}
                                onChange={(e) => setCollaborationData({ ...collaborationData, projectType: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm pr-8 appearance-none"
                            >
                                <option value="web-development">Web Development</option>
                                <option value="mobile-app">Mobile App</option>
                                <option value="desktop-app">Desktop Application</option>
                                <option value="ai-ml">AI/Machine Learning</option>
                                <option value="blockchain">Blockchain</option>
                                <option value="game-development">Game Development</option>
                                <option value="other">Other</option>
                            </select>
                            <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Project Duration *
                        </label>
                        <div className="relative">
                            <select
                                name="duration"
                                required
                                value={collaborationData.duration}
                                onChange={(e) => setCollaborationData({ ...collaborationData, duration: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm pr-8 appearance-none"
                            >
                                <option value="short-term">Short-term (1-3 months)</option>
                                <option value="medium-term">Medium-term (3-6 months)</option>
                                <option value="long-term">Long-term (6+ months)</option>
                                <option value="ongoing">Ongoing</option>
                            </select>
                            <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Time Commitment *
                        </label>
                        <div className="relative">
                            <select
                                name="commitment"
                                required
                                value={collaborationData.commitment}
                                onChange={(e) => setCollaborationData({ ...collaborationData, commitment: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm pr-8 appearance-none"
                            >
                                <option value="part-time">Part-time (5-15 hrs/week)</option>
                                <option value="full-time">Full-time (30+ hrs/week)</option>
                                <option value="flexible">Flexible schedule</option>
                                <option value="weekend">Weekends only</option>
                            </select>
                            <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Skills Needed *
                        </label>
                        <input
                            type="text"
                            name="skills"
                            required
                            value={collaborationData.skills}
                            onChange={(e) => setCollaborationData({ ...collaborationData, skills: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                            placeholder="e.g. React, Python, UI/UX Design"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        External URL *
                    </label>
                    <input
                        type="url"
                        name="external_url"
                        required
                        value={formData.external_url}
                        onChange={(e) => setFormData({ ...formData, external_url: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="e.g. https://example.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Description *
                    </label>
                    <textarea
                        name="description"
                        required
                        rows={6}
                        maxLength={500}
                        value={collaborationData.description}
                        onChange={(e) => setCollaborationData({ ...collaborationData, description: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm resize-none"
                        placeholder="Describe your project, goals, and what kind of collaborators you're looking for..."
                    ></textarea>
                    <p className="text-xs text-gray-500 mt-1">{collaborationData.description.length}/500 characters</p>
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center">
                            <i className="ri-loader-4-line animate-spin mr-2"></i>
                            {editingExisting ? "Saving Changes..." : "Finding Collaborators..."}
                        </span>
                    ) : (
                        <span className="flex items-center justify-center">
                            <i className="ri-send-plane-line mr-2"></i>
                            {editingExisting ? "Save Collaboration Changes" : "Find Collaborators"}
                        </span>
                    )}
                </button>
            </form>
        </div>
    )
}
