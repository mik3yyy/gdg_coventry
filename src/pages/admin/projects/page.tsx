import { useState, useEffect } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { useProjects } from '../../../contexts/ProjectContext'  // ✅ new import
import ProjectAdminCard from '../../../components/base/ProjectAdminCard'
import Loader from '../../../components/base/Loader'


export default function AdminProjectsPage() {
  const { user } = useAuth()
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const { projects, loading, fetchProjects, updateProjectStatus, toggleFeatured } = useProjects()
  useEffect(() => {
    fetchProjects(filter)
  }, [filter])




  // if (user?.role !== 'admin') {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="text-center">
  //         <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
  //         <p className="text-gray-600">You don't have permission to access this page {user?.email}.</p>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/admin"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            Back to Admin Dashboard
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Projects</h1>
          <p className="text-gray-600">Review and manage community project submissions</p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'all', label: 'All Projects', count: projects.length },
                { key: 'pending', label: 'Pending Review', count: projects.filter(p => p.status === 'pending').length },
                { key: 'approved', label: 'Approved', count: projects.filter(p => p.status === 'approved').length },
                { key: 'rejected', label: 'Rejected', count: projects.filter(p => p.status === 'rejected').length }
              ].map((tab) => (

                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${filter === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {tab.label}
                  <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Projects List */}
        {loading ? <Loader text="Loading projects..." /> : projects.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <i className="ri-folder-open-line text-4xl text-gray-400 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-500">No projects match the current filter.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {projects.map((project) => (
              <ProjectAdminCard project={project} isAdmin={true} updateProjectStatus={updateProjectStatus} toggleFeatured={toggleFeatured} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
