
import { useEffect, useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { useProjects, type Project } from "../../../contexts/ProjectContext"
import axios from "axios"
import { Button } from '../../../components/base/Button'
import Loader from '../../../components/base/Loader'
import ProjectAdminCard from '../../../components/base/ProjectAdminCard'
import ProjectMemberCard from '../../../components/base/ProjectMemberCard'
import ProjectForm from './prject-form'


export default function SubmitProjectPage() {
  const { user } = useAuth()
  const { addProject, myProjects, myprojects, loading, deleteProject, editProject } = useProjects()

  useEffect(() => {
    myProjects()
  }, [])

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    github_url: '',
    demo_url: '',
    tech_stack: '',
    category: 'web',
    image_url: "",
    linkedurl: ''

  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editMode, setEditMode] = useState(null as string | null)

  const [showProjects, setShowProjects] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const categories = [
    { id: 'web', name: 'Web Development', icon: 'ri-global-line' },
    { id: 'mobile', name: 'Mobile Apps', icon: 'ri-smartphone-line' },
    { id: 'data', name: 'Data Science', icon: 'ri-bar-chart-line' },
    { id: 'blockchain', name: 'Blockchain', icon: 'ri-links-line' },
    { id: 'iot', name: 'IoT', icon: 'ri-wifi-line' },
    { id: 'ai', name: 'AI/ML', icon: 'ri-brain-line' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET


  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // only allow major valid formats
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

      const imageUrl = res.data.secure_url
      setFormData(prev => ({ ...prev, image_url: imageUrl }))
    } catch (error) {
      console.error("Image upload failed:", error)
      alert("Failed to upload image. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }
  const handleUpdateProjectSubmit = async (
    data: {
      title: string
      description: string
      github_url?: string
      demo_url?: string
      image_url?: string
      tech_stack: string[]
      category: string
      linkedurl: string
    },
    projectId?: string
  ) => {
    if (!projectId) return

    try {
      await editProject(projectId, data)   // ✅ correct usage

      setEditMode(null) // exit edit mode after update
    } catch (err) {
      console.error("Failed to update project:", err)
    }
  }


  const handleCreateProjectSubmit = async (data: {
    title: string
    description: string
    github_url?: string
    demo_url?: string
    image_url?: string
    tech_stack: string[]
    category: string
    linkedurl: string
  }) => {
    if (!user) throw new Error("User not logged in.")

    const projectData = {
      ...data,
      user_name: user?.name,
      user_email: user.email,
      status: "pending" as const,
      featured: false,
      likes: 0,
      views: 0,
      created_at: new Date().toISOString(),
    }

    await addProject(projectData)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="ri-lock-line text-6xl text-gray-300 mb-4"></i>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600">Please sign in to submit a project.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Dashboard Button */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            Back to Dashboard
          </Link>

          <Button
            onClick={() => {
              if (editMode) {
                setEditMode(null);
                setShowProjects(true)

              } else {
                setShowProjects(!showProjects)

              }
            }}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          >
            {editMode ? "Back To Projects" : showProjects ? "Share Project" : "View Projects"}
          </Button>
        </div>

        {!showProjects && editMode == null && (
          // <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          //   {/* Header */}
          //   <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
          //     <h1 className="text-3xl font-bold text-white">Share Your Project</h1>
          //     <p className="text-blue-100 mt-2">
          //       Share your amazing work with the community and get feedback from fellow developers.
          //     </p>
          //   </div>

          //   {/* Form */}
          //   <div className="p-6">
          //     {submitStatus === 'success' && (
          //       <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          //         <div className="flex items-center">
          //           <i className="ri-check-circle-line text-green-600 text-xl mr-3"></i>
          //           <div>
          //             <h3 className="text-green-800 font-medium">Project Shared Successfully!</h3>
          //             <p className="text-green-700 text-sm mt-1">
          //               Your project has been shared for review. You'll be notified once it's approved.
          //             </p>
          //           </div>
          //         </div>
          //       </div>
          //     )}

          //     {submitStatus === 'error' && (
          //       <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          //         <div className="flex items-center">
          //           <i className="ri-error-warning-line text-red-600 text-xl mr-3"></i>
          //           <div>
          //             <h3 className="text-red-800 font-medium">Sharing Failed</h3>
          //             <p className="text-red-700 text-sm mt-1">
          //               There was an error sharing your project. Please try again.
          //             </p>
          //           </div>
          //         </div>
          //       </div>
          //     )}

          //     <form onSubmit={handleSubmit} className="space-y-6">
          //       {/* Project Title */}
          //       <div>
          //         <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          //           Project Title *
          //         </label>
          //         <input
          //           type="text"
          //           id="title"
          //           name="title"
          //           required
          //           value={formData.title}
          //           onChange={handleInputChange}
          //           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          //           placeholder="Enter your project title"
          //         />
          //       </div>

          //       {/* Description */}
          //       <div>
          //         <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          //           Description *
          //         </label>
          //         <textarea
          //           id="description"
          //           name="description"
          //           required
          //           rows={4}
          //           value={formData.description}
          //           onChange={handleInputChange}
          //           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          //           placeholder="Describe your project, its features, and what makes it special"
          //         />
          //       </div>

          //       {/* Category */}
          //       <div>
          //         <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
          //           Category *
          //         </label>
          //         <select
          //           id="category"
          //           name="category"
          //           required
          //           value={formData.category}
          //           onChange={handleInputChange}
          //           className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          //         >
          //           {categories.map((category) => (
          //             <option key={category.id} value={category.id}>
          //               {category.name}
          //             </option>
          //           ))}
          //         </select>
          //       </div>

          //       {/* Tech Stack */}
          //       <div>
          //         <label htmlFor="tech_stack" className="block text-sm font-medium text-gray-700 mb-2">
          //           Tech Stack *
          //         </label>
          //         <input
          //           type="text"
          //           id="tech_stack"
          //           name="tech_stack"
          //           required
          //           value={formData.tech_stack}
          //           onChange={handleInputChange}
          //           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          //           placeholder="React, Node.js, MongoDB, TypeScript (comma separated)"
          //         />
          //         <p className="text-sm text-gray-500 mt-1">
          //           List the technologies used in your project, separated by commas
          //         </p>
          //       </div>

          //       {/* GitHub URL */}
          //       <div>
          //         <label htmlFor="github_url" className="block text-sm font-medium text-gray-700 mb-2">
          //           GitHub Repository
          //         </label>
          //         <input
          //           type="url"
          //           id="github_url"
          //           name="github_url"
          //           value={formData.github_url}
          //           onChange={handleInputChange}
          //           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          //           placeholder="https://github.com/username/repository"
          //         />
          //       </div>
          //       {/* LinkedIn URL */}
          //       <div>
          //         <label htmlFor="linkedurl" className="block text-sm font-medium text-gray-700 mb-2">
          //           LinkedIn Profile*
          //         </label>
          //         <input
          //           type="url"
          //           id="linkedurl"
          //           name="linkedurl"
          //           value={formData.linkedurl}
          //           onChange={handleInputChange}
          //           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          //           placeholder="https://www.linkedin.com/in/yourprofile"
          //         />
          //       </div>

          //       {/* Demo URL */}
          //       <div>
          //         <label htmlFor="demo_url" className="block text-sm font-medium text-gray-700 mb-2">
          //           Live Demo URL
          //         </label>
          //         <input
          //           type="url"
          //           id="demo_url"
          //           name="demo_url"
          //           value={formData.demo_url}
          //           onChange={handleInputChange}
          //           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          //           placeholder="https://your-project-demo.com"
          //         />
          //       </div>
          //       {/* 📸 Image Upload */}
          //       <div>
          //         <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-2">
          //           Project Screenshot (Optional)
          //         </label>
          //         <div className="flex items-center space-x-4">
          //           <input
          //             type="file"
          //             accept="image/*"
          //             onChange={handleImageUpload}
          //             className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
          //                      file:rounded-lg file:border-0 file:text-sm file:font-semibold
          //                      file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          //           />
          //           {isUploading && (
          //             <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          //           )}
          //         </div>
          //         <div className="h-10" />


          //         {/* Preview */}
          //         {formData.image_url && (
          //           <div className="aspect-video bg-gray-200 relative overflow-hidden">
          //             <img
          //               src={formData.image_url}
          //               alt="Project preview"
          //               className=" rounded-lg w-full h-full object-cover object-cover object-center"
          //             />
          //           </div>
          //           // <div className="mt-3">
          //           //   <img
          //           // src={formData.image_url}
          //           //     alt="Project preview"
          //           // className="rounded-lg w-full max-h-64 object-cover border border-gray-200"
          //           //   />
          //           // </div>
          //         )}
          //       </div>


          //       {/* Submit Button */}
          //       <div className="pt-4">
          //         <button
          //           type="submit"
          //           disabled={isSubmitting}
          //           className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-medium whitespace-nowrap"
          //         >
          //           {isSubmitting ? (
          //             <span className="flex items-center justify-center">
          //               <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          //               Sharing...
          //             </span>
          //           ) : (
          //             'Share Project'
          //           )}
          //         </button>
          //       </div>
          //     </form>

          //     {/* Guidelines */}
          //     <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          //       <h3 className="text-blue-900 font-medium mb-2">Sharing Guidelines</h3>
          //       <ul className="text-blue-800 text-sm space-y-1">
          //         <li>• Ensure your project is original work or properly attributed</li>
          //         <li>• Include a clear description of what your project does</li>
          //         <li>• Add a README file to your GitHub repository</li>
          //         <li>• Make sure your demo URL is accessible and working</li>
          //         <li>• Projects will be reviewed before being published</li>
          //       </ul>
          //     </div>
          //   </div>
          // </div>
          <ProjectForm
            mode="create"
            categories={categories}
            onSubmit={async (data) => {
              // create in your backend
              await handleCreateProjectSubmit(data)
            }}
          />

        )}
        {
          editMode && (
            <ProjectForm
              mode="edit"
              categories={categories}
              defaultData={myprojects.find(p => p.id === editMode)}
              onSubmit={handleUpdateProjectSubmit}
            />

          )
        }

        {/* My Projects List */}
        {showProjects && editMode == null && (
          loading ? (
            <Loader text="Loading your projects..." />
          ) : myprojects.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <i className="ri-folder-open-line text-4xl text-gray-400 mb-4"></i>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-500">You haven't submitted any projects yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {myprojects.map((project) => (
                <ProjectMemberCard
                  key={project.id}
                  project={project}
                  deleteProject={deleteProject}
                  onEditProject={(id) => setEditMode(id)}
                />
              ))}
            </div>
          )
        )}





      </div>
    </div>
  )
}
