

import { useState, useEffect } from 'react'
import { Header } from '../../components/feature/Header'
import { Footer } from '../../components/feature/Footer'
import { useProjects } from "../../contexts/ProjectContext"

import FeaturedProjectCard from '../../components/base/FeaturedProjectcard'
import RegularProjectCard from '../../components/base/RegularProjectCard'

export default function ProjectsPage() {
  // const [categories] = useState<Category[]>(mockCategories)
  const [categories] = useState([
    { id: 'web', name: 'Web Development', icon: 'ri-global-line' },
    { id: 'mobile', name: 'Mobile Apps', icon: 'ri-smartphone-line' },
    { id: 'data', name: 'Data Science', icon: 'ri-bar-chart-line' },
    { id: 'blockchain', name: 'Blockchain', icon: 'ri-links-line' },
    { id: 'iot', name: 'IoT', icon: 'ri-wifi-line' },
    { id: 'ai', name: 'AI/ML', icon: 'ri-brain-line' },
  ])

  const { projects, loading, fetchProjects } = useProjects()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Fetch only approved projects
  useEffect(() => {
    fetchProjects("approved")
  }, [])


  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tech_stack?.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredProjects = filteredProjects.filter(project => project.featured)
  const regularProjects = filteredProjects.filter(project => !project.featured)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading projects...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-[#1F1F1F]  text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Community Projects</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Discover amazing projects built by our community members. Get inspired, learn from others, and showcase your own work.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="ri-search-line text-gray-400"></i>
              </div>
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
              >
                All Projects
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                >
                  <i className={`${category.icon} mr-2`}></i>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <i className="ri-star-fill text-yellow-500 mr-2"></i>
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredProjects.map((project) => (
                <FeaturedProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {/* Regular Projects */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Projects</h2>
          {regularProjects.length === 0 ? (
            <div className="text-center py-12">
              <i className="ri-folder-open-line text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularProjects.map((project) => (
                <RegularProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

