import React, { useEffect, useState } from "react"
import type { Mentor } from "../../../../contexts/MentorContext"

export type Mode = "create" | "edit"


interface Props {
    /** "create" for new application, "edit" for updating an existing one */
    mode: Mode
    /** The current authenticated user's email (for user_email field) */
    currentUserEmail: string
    /** Optional prefill when editing */
    defaultData?: Mentor
    /** Submission callback. If edit mode, mentorId will be provided as 2nd param. */
    onSubmit: (
        data: {
            name: string
            email: string
            user_email: string
            linkedin: string
            title: string
            company: string
            experience: string
            expertise: string[]
            description: string
            motivation: string
            status?: "pending" // auto-added in edit mode
        },
        mentorId?: string
    ) => Promise<void>
}

const MentorApplicationForm: React.FC<Props> = ({
    mode,
    currentUserEmail,
    defaultData,
    onSubmit
}) => {
    // ----- Options kept INSIDE (as requested) -----
    const expertiseOptions = [
        "Flutter", "React", "Angular", "Vue.js", "Node.js", "Python", "Java", "Kotlin",
        "Swift", "TypeScript", "JavaScript", "Firebase", "Google Cloud", "AWS", "Azure",
        "TensorFlow", "Machine Learning", "AI", "Data Science", "DevOps", "Docker",
        "Kubernetes", "Android", "iOS", "Web Development", "Mobile Development",
        "UI/UX Design", "Product Management", "Startup", "Leadership"
    ]

    const experienceOptions = [
        "2-3 years",
        "3-5 years",
        "5-7 years",
        "7-10 years",
        "10+ years"
    ]

    const availabilityOptions = [
        "1-2 hours per week",
        "3-5 hours per week",
        "5-10 hours per week",
        "10+ hours per week",
        "Flexible schedule"
    ]

    // ----- Local form state (mirrors your current screen) -----
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        linkedin: "",
        title: "",
        company: "",
        experience: "",
        expertise: [] as string[],
        description: "",
        motivation: ""
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<"" | "success" | "error">("")

    // Prefill when editing
    useEffect(() => {
        if (mode === "edit" && defaultData) {
            setFormData({
                name: defaultData.name ?? "",
                email: defaultData.email ?? "",
                linkedin: defaultData.linkedin ?? "",
                title: defaultData.title ?? "",
                company: defaultData.company ?? "",
                experience: defaultData.experience ?? "",
                expertise: Array.isArray(defaultData.expertise) ? defaultData.expertise : [],
                description: defaultData.description ?? "",
                motivation: defaultData.motivation ?? ""
            })
        }
    }, [mode, defaultData])

    // Handlers
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleExpertiseChange = (skill: string) => {
        setFormData(prev => ({
            ...prev,
            expertise: prev.expertise.includes(skill)
                ? prev.expertise.filter(s => s !== skill)
                : [...prev.expertise, skill]
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus("")

        try {

            const payload = {
                ...formData,
                user_email: currentUserEmail,
                ...(mode === "edit" && { status: "pending" as const })
            }


            if (mode === "edit" && defaultData?.id) {
                await onSubmit(payload, defaultData.id)
            } else {
                await onSubmit(payload)
            }

            setSubmitStatus("success")

            if (mode === "create") {
                // reset after successful create
                setFormData({
                    name: "",
                    email: "",
                    linkedin: "",
                    title: "",
                    company: "",
                    experience: "",
                    expertise: [],
                    description: "",
                    motivation: ""
                })
            }
        } catch (err) {
            console.error(err)
            setSubmitStatus("error")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm"
                            placeholder="Your full name"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address (no one would see it directly) *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm"
                            placeholder="your.email@example.com"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Your account email is <span className="font-medium">{currentUserEmail}</span> (saved as <code>user_email</code>).
                        </p>
                    </div>

                    <div>
                        <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-2">
                            LinkedIn Profile *
                        </label>
                        <input
                            type="url"
                            id="linkedin"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm"
                            placeholder="https://linkedin.com/in/yourprofile"
                        />
                    </div>

                    <div>
                        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                            Years of Experience *
                        </label>
                        <select
                            id="experience"
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm pr-8"
                        >
                            <option value="">Select experience level</option>
                            {experienceOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Professional Information */}
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Professional Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                            Current Job Title /Profession *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm"
                            placeholder="e.g., Senior Software Engineer"
                        />
                    </div>

                    <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                            Company / Organization *
                        </label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm"
                            placeholder="Your current company"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                            Professional Description *
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            rows={4}
                            maxLength={500}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm resize-none"
                            placeholder="Describe your background, experience, and what you can help mentees with..."
                        />
                        <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500 characters</p>
                    </div>
                </div>
            </div>

            {/* Expertise */}
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Areas of Expertise</h2>
                <p className="text-gray-600 mb-4">Select the technologies and areas you can mentor in:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {expertiseOptions.map(skill => (
                        <button
                            key={skill}
                            type="button"
                            onClick={() => handleExpertiseChange(skill)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap ${formData.expertise.includes(skill)
                                ? "bg-[#4285F4] text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            {skill}
                        </button>
                    ))}
                </div>
            </div>

            {/* Mentoring Details */}
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Mentoring Details</h2>
                <div className="grid grid-cols-1 gap-6">
                    {/* <div>
                        <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                            Availability *
                        </label>
                        <select
                            id="availability"
                            name="availability"
                            value={formData.availability}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm pr-8"
                        >
                            <option value="">Select availability</option>
                            {availabilityOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div> */}

                    <div>
                        <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-2">
                            Why do you want to become a mentor? *
                        </label>
                        <textarea
                            id="motivation"
                            name="motivation"
                            value={formData.motivation}
                            onChange={handleInputChange}
                            required
                            rows={4}
                            maxLength={500}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm resize-none"
                            placeholder="Share your motivation for mentoring and what you hope to achieve..."
                        />
                        <p className="text-xs text-gray-500 mt-1">{formData.motivation.length}/500 characters</p>
                    </div>
                </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end items-center pt-6 border-t border-gray-200">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#4285F4] text-white hover:bg-[#3367D6] px-8 py-3 rounded-lg whitespace-nowrap transition-colors disabled:opacity-70"
                >
                    {isSubmitting ? (mode === "edit" ? "Updating..." : "Submitting...") : (mode === "edit" ? "Update Application" : "Submit Application")}
                </button>
            </div>

            {submitStatus === "success" && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                    <i className="ri-check-circle-line mr-2"></i>
                    {mode === "edit"
                        ? "Application updated! Your changes have been sent for review."
                        : "Application submitted successfully! We'll review your application and get back to you within 3-5 business days."}
                </div>
            )}

            {submitStatus === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    <i className="ri-error-warning-line mr-2"></i>
                    Error submitting application. Please try again.
                </div>
            )}
        </form>
    )
}

export default MentorApplicationForm
