import React, { useEffect, useState } from "react"
import axios from "axios"
import type { Project } from "../../../contexts/ProjectContext"

type Mode = "create" | "edit"

interface Category {
    id: string
    name: string
}

interface Props {
    mode: Mode
    categories: Category[]
    defaultData?: Project
    onSubmit: (
        data: {
            title: string
            description: string
            category: string
            tech_stack: string[] // will be split from comma string
            github_url?: string
            linkedurl: string
            demo_url?: string
            image_url?: string
        },
        projectId?: string
    ) => Promise<void>
}

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

const ProjectForm: React.FC<Props> = ({ mode, categories, defaultData, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        tech_stack: "", // comma string in UI; split on submit
        github_url: "",
        linkedurl: "",
        demo_url: "",
        image_url: "",
        category: categories?.[0]?.id ?? "web",
    })

    const [isUploading, setIsUploading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

    // Prefill when editing
    useEffect(() => {
        if (mode === "edit" && defaultData) {
            setFormData({
                title: defaultData.title ?? "",
                description: defaultData.description ?? "",
                tech_stack: Array.isArray(defaultData.tech_stack)
                    ? defaultData.tech_stack.join(", ")
                    : (defaultData.tech_stack as unknown as string) ?? "",
                github_url: defaultData.github_url ?? "",
                linkedurl: defaultData.linkedurl ?? "",
                demo_url: defaultData.demo_url ?? "",
                image_url: defaultData.image_url ?? "",
                category: defaultData.category ?? categories?.[0]?.id ?? "web",
            })
        }
    }, [mode, defaultData, categories])

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    // Cloudinary image upload with type restrictions (no HEIC)
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"]
        if (!allowedTypes.includes(file.type)) {
            alert("Unsupported file type. Please upload PNG, JPG, JPEG, or WEBP only.")
            return
        }

        setIsUploading(true)
        try {
            const form = new FormData()
            form.append("file", file)
            form.append("upload_preset", UPLOAD_PRESET)

            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                form
            )
            const imageUrl = res.data.secure_url as string
            setFormData(prev => ({ ...prev, image_url: imageUrl }))
        } catch (error) {
            console.error("Image upload failed:", error)
            alert("Failed to upload image. Please try again.")
        } finally {
            setIsUploading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus("idle")

        try {
            const techArray = formData.tech_stack
                .split(",")
                .map(t => t.trim())
                .filter(Boolean)

            const payload = {
                title: formData.title,
                description: formData.description,
                category: formData.category,
                tech_stack: techArray,
                github_url: formData.github_url || undefined,
                linkedurl: formData.linkedurl,
                demo_url: formData.demo_url || undefined,
                image_url: formData.image_url || undefined,
                ...(mode === "edit" && { status: "pending" as const })  // ✅ add this line
            }

            if (mode === "edit" && defaultData?.id) {
                await onSubmit(payload, defaultData.id)
            } else {
                await onSubmit(payload)
            }

            setSubmitStatus("success")

            if (mode === "create") {
                setFormData(prev => ({
                    ...prev,
                    title: "",
                    description: "",
                    tech_stack: "",
                    github_url: "",
                    linkedurl: "",
                    demo_url: "",
                    image_url: "",
                    category: categories?.[0]?.id ?? "web",
                }))
            }
        } catch (err) {
            console.error(err)
            setSubmitStatus("error")
        } finally {
            setIsSubmitting(false)
        }
    }

    const successTitle =
        mode === "edit" ? "Project Updated Successfully!" : "Project Shared Successfully!"
    const successBody =
        mode === "edit"
            ? "Your project has been updated successfully."
            : "Your project has been shared for review. You'll be notified once it's approved."

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
                <h1 className="text-3xl font-bold text-white">
                    {mode === "edit" ? "Edit Your Project" : "Share Your Project"}
                </h1>
                <p className="text-blue-100 mt-2">
                    {mode === "edit"
                        ? "Update your project details below."
                        : "Share your amazing work with the community and get feedback from fellow developers."}
                </p>
            </div>

            {/* Form */}
            <div className="p-6">
                {submitStatus === "success" && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center">
                            <i className="ri-check-circle-line text-green-600 text-xl mr-3"></i>
                            <div>
                                <h3 className="text-green-800 font-medium">{successTitle}</h3>
                                <p className="text-green-700 text-sm mt-1">{successBody}</p>
                            </div>
                        </div>
                    </div>
                )}

                {submitStatus === "error" && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center">
                            <i className="ri-error-warning-line text-red-600 text-xl mr-3"></i>
                            <div>
                                <h3 className="text-red-800 font-medium">
                                    {mode === "edit" ? "Update Failed" : "Sharing Failed"}
                                </h3>
                                <p className="text-red-700 text-sm mt-1">
                                    There was an error {mode === "edit" ? "updating" : "sharing"} your project. Please try
                                    again.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Project Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                            Project Title *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your project title"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                            Description *
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            required
                            rows={4}
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Describe your project, its features, and what makes it special"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                            Category *
                        </label>
                        <select
                            id="category"
                            name="category"
                            required
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Tech Stack */}
                    <div>
                        <label htmlFor="tech_stack" className="block text-sm font-medium text-gray-700 mb-2">
                            Tech Stack *
                        </label>
                        <input
                            type="text"
                            id="tech_stack"
                            name="tech_stack"
                            required
                            value={formData.tech_stack}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="React, Node.js, MongoDB, TypeScript (comma separated)"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            List the technologies used in your project, separated by commas
                        </p>
                    </div>

                    {/* GitHub URL */}
                    <div>
                        <label htmlFor="github_url" className="block text-sm font-medium text-gray-700 mb-2">
                            GitHub Repository
                        </label>
                        <input
                            type="url"
                            id="github_url"
                            name="github_url"
                            value={formData.github_url}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="https://github.com/username/repository"
                        />
                    </div>

                    {/* LinkedIn URL */}
                    <div>
                        <label htmlFor="linkedurl" className="block text-sm font-medium text-gray-700 mb-2">
                            LinkedIn Profile*
                        </label>
                        <input
                            type="url"
                            id="linkedurl"
                            name="linkedurl"
                            value={formData.linkedurl}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="https://www.linkedin.com/in/yourprofile"
                        />
                    </div>

                    {/* Demo URL */}
                    <div>
                        <label htmlFor="demo_url" className="block text-sm font-medium text-gray-700 mb-2">
                            Live Demo URL
                        </label>
                        <input
                            type="url"
                            id="demo_url"
                            name="demo_url"
                            value={formData.demo_url}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="https://your-project-demo.com"
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-2">
                            Project Screenshot (Optional)
                        </label>
                        <div className="flex items-center space-x-4">
                            <input
                                type="file"
                                accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/jpg,image/webp"
                                onChange={handleImageUpload}
                                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                           file:rounded-lg file:border-0 file:text-sm file:font-semibold
                           file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {isUploading && (
                                <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                            )}
                        </div>
                        <div className="h-10" />

                        {/* Preview */}
                        {formData.image_url && (
                            <div className="aspect-video bg-gray-200 relative overflow-hidden">
                                <img
                                    src={formData.image_url}
                                    alt="Project preview"
                                    className=" rounded-lg w-full h-full object-cover object-cover object-center"
                                />
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-medium whitespace-nowrap"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    {mode === "edit" ? "Updating..." : "Sharing..."}
                                </span>
                            ) : mode === "edit" ? (
                                "Update Project"
                            ) : (
                                "Share Project"
                            )}
                        </button>
                    </div>
                </form>

                {/* Guidelines */}
                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-blue-900 font-medium mb-2">Sharing Guidelines</h3>
                    <ul className="text-blue-800 text-sm space-y-1">
                        <li>• Ensure your project is original work or properly attributed</li>
                        <li>• Include a clear description of what your project does</li>
                        <li>• Add a README file to your GitHub repository</li>
                        <li>• Make sure your demo URL is accessible and working</li>
                        <li>• Projects will be reviewed before being published</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProjectForm
