import React from "react"

interface Props {
    formData: any
    setFormData: (data: any) => void
    handleSubmit: (e: React.FormEvent) => void
    isSubmitting: boolean
    editingExisting?: boolean
}


export function JobFormCard({ formData, setFormData, handleSubmit, isSubmitting, editingExisting }: Props) {

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <i className="ri-briefcase-line text-blue-600 text-xl"></i>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-900">
                        {editingExisting ? "Edit Job Opening" : "Post a Job Opening"}
                    </h2>
                    <p className="text-gray-600">
                        {editingExisting ? "Update and resubmit this role" : "Share opportunities with our developer community"}
                    </p>
                </div>
            </div>

            <form id="job-form" data-readdy-form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Job Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            placeholder="e.g. Frontend Developer"
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
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            placeholder="recruiter@company.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company Name *
                        </label>
                        <input
                            type="text"
                            name="companyName"
                            required
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            placeholder="Company name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Location *
                        </label>
                        <input
                            type="text"
                            name="location"
                            required
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            placeholder="e.g. London, UK or Remote"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Job Type *
                        </label>
                        <div className="relative">
                            <select
                                name="jobType"
                                required
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8 appearance-none"
                            >
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part-time</option>
                                <option value="contract">Contract</option>
                                <option value="internship">Internship</option>
                            </select>
                            <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Experience Level *
                        </label>
                        <div className="relative">
                            <select
                                name="experience"
                                required
                                value={formData.experience}
                                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8 appearance-none"
                            >
                                <option value="entry">Entry Level</option>
                                <option value="mid">Mid Level</option>
                                <option value="senior">Senior Level</option>
                                <option value="lead">Lead/Principal</option>
                            </select>
                            <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Required Skills *
                    </label>
                    <input
                        type="text"
                        name="skills"
                        required
                        value={formData.skills}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="e.g. React, TypeScript, Node.js"
                    />
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
                        Job Description *
                    </label>
                    <textarea
                        name="description"
                        required
                        rows={6}
                        maxLength={500}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                        placeholder="Describe the role, responsibilities, and requirements..."
                    ></textarea>
                    <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500 characters</p>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center">
                            <i className="ri-loader-4-line animate-spin mr-2"></i>
                            {editingExisting ? "Saving Changes..." : "Posting Job..."}
                        </span>
                    ) : (
                        <span className="flex items-center justify-center">
                            <i className="ri-send-plane-line mr-2"></i>
                            {editingExisting ? "Save Job Changes" : "Post Job Opening"}
                        </span>
                    )}
                </button>
            </form>
        </div>
    )
}
