import { useState, useEffect } from 'react'
import { mockResources } from '../../../mocks/resources'
import { useResources } from '../../../contexts/ResourceContext'
import { Link } from 'react-router-dom'

// interface Resource {
//   id: string
//   title: string
//   description?: string
//   resource_type: 'video' | 'article' | 'tool' | 'interview'
//   url?: string
//   thumbnail_url?: string
//   author?: string
//   duration?: string
//   difficulty_level?: 'beginner' | 'intermediate' | 'advanced'
//   category_id?: string
//   status: 'published' | 'draft'
//   views_count: number
//   created_at: string
//   updated_at: string
// }

export default function ResourcesPage() {
  // const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const { resources, } = useResources();


  const resourceTypes = [
    { id: 'all', name: 'All Resources', icon: 'ri-folder-line' },
    { id: 'video', name: 'Videos', icon: 'ri-play-circle-line' },
    { id: 'article', name: 'Articles', icon: 'ri-article-line' },
    { id: 'tool', name: 'Tools', icon: 'ri-tools-line' },
    { id: 'interview', name: 'Interviews', icon: 'ri-mic-line' }
  ]

  const difficultyLevels = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' }
  ]
  const flattenedResources = [
    ...resources.videos,
    ...resources.articles,
    ...resources.tools,
    ...resources.interview
  ];

  const filteredResources = flattenedResources.filter(resource => {
    const matchesType = selectedType === 'all' || resource.type === selectedType;

    // Only filter by difficulty if the resource type is 'interview'
    const matchesDifficulty = selectedDifficulty === 'all' || (resource.type === 'interview' && resource.difficulty === selectedDifficulty);

    return matchesType && matchesDifficulty;
  });


  const getResourceTypeIcon = (type: string) => {
    const icons = {
      video: 'ri-play-circle-fill',
      article: 'ri-article-fill',
      tool: 'ri-tools-fill',
      interview: 'ri-mic-fill'
    }
    return icons[type as keyof typeof icons] || 'ri-file-line'
  }

  const getResourceTypeColor = (type: string) => {
    const colors = {
      video: 'bg-red-100 text-red-800',
      article: 'bg-blue-100 text-blue-800',
      tool: 'bg-green-100 text-green-800',
      interview: 'bg-purple-100 text-purple-800'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getDifficultyColor = (level: string) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800'
    }
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading resources...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* <button
            onClick={() => window.REACT_APP_NAVIGATE('/dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            Back to Dashboard
          </button> */}
          <Link
            to="/dashboard"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Learning Resources</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Curated collection of tutorials, articles, tools, and interviews to help you grow as a developer.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Resource Type Filter */}
            <div className="flex flex-wrap gap-2">
              {resourceTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${selectedType === type.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                >
                  <i className={`${type.icon} mr-2`}></i>
                  {type.name}
                </button>
              ))}
            </div>

            {/* Difficulty Filter */}
            <div className="flex flex-wrap gap-2">
              {difficultyLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSelectedDifficulty(level.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${selectedDifficulty === level.id
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                >
                  {level.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        {filteredResources.length === 0 ? (
          <div className="text-center py-12">
            <i className="ri-folder-open-line text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-600">Try adjusting your filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                  {/* Show thumbnail only for videos */}
                  {'thumbnail' in resource && (
                    <img
                      src={resource.thumbnail}
                      alt={resource.title}
                      className="w-full h-full object-cover object-top"
                    />
                  )}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getResourceTypeColor(resource.type)}`}>
                      <i className={`${getResourceTypeIcon(resource.type)} mr-1`}></i>
                      {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                    </span>
                  </div>
                  {/* Show difficulty level only for interviews */}
                  {'difficulty' in resource && (
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                        {resource.difficulty.charAt(0).toUpperCase() + resource.difficulty.slice(1)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {('title' in resource ? resource.title : '') || ('name' in resource ? resource.name : '')}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {('description' in resource ? resource.description : '')}
                  </p>

                  {/* Resource Details */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <i className="ri-user-line mr-1"></i>
                      <span>{('author' in resource ? resource.author : '') || 'N/A'}</span>
                    </div>
                    {'duration' in resource && (
                      <div className="flex items-center">
                        <i className="ri-time-line mr-1"></i>
                        <span>{resource.duration}</span>
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  {/* <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <i className="ri-eye-line mr-1"></i>
                      <span>{resource.views_count?.toLocaleString() || 0} views</span>
                    </div>
                  </div> */}

                  {/* Action Button */}
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center block whitespace-nowrap"
                  >
                    <i className="ri-external-link-line mr-2"></i>
                    View Resource
                  </a>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  )
}