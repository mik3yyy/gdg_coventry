
import { useEffect, useState } from 'react'
import { useOpportunitiesContext, type Opportunity } from "../../../contexts/OppurtunityContext"
import { PublicOpportunityCard } from './component/PublicOppurtunityCard'
import { Link } from 'react-router-dom'

export default function JobsPage() {

  const { opportunities, listOpportunities } = useOpportunitiesContext()

  useEffect(() => {
    listOpportunities()
    setLoading(false)
  }, [])
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedJobType, setSelectedJobType] = useState<string>('all')
  const [selectedExperience, setSelectedExperience] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // useEffect(() => {
  //   // Simulate loading delay
  //   setTimeout(() => {
  //     const jobs = mockJobs.filter(j => j.status === 'active')
  //     const collaborations = mockCollaborations.filter(c => c.status === 'active')
  //     setOpportunities([...jobs, ...collaborations])
  //     setLoading(false)
  //   }, 500)
  // }, [])

  const opportunityTypes = [
    { id: 'all', name: 'All Opportunities', icon: 'ri-briefcase-line' },
    { id: 'job', name: 'Jobs', icon: 'ri-briefcase-line' },
    { id: 'collaboration', name: 'Collaborations', icon: 'ri-team-line' }
  ]

  const jobTypes = [
    { id: 'all', name: 'All Types', icon: 'ri-briefcase-line' },
    { id: 'full-time', name: 'Full-time', icon: 'ri-time-line' },
    { id: 'part-time', name: 'Part-time', icon: 'ri-timer-line' },
    { id: 'contract', name: 'Contract', icon: 'ri-file-text-line' },
    { id: 'internship', name: 'Internship', icon: 'ri-graduation-cap-line' }
  ]

  const experienceLevels = [
    { id: 'all', name: 'All Levels' },
    { id: 'entry', name: 'Entry Level' },
    { id: 'mid', name: 'Mid Level' },
    { id: 'senior', name: 'Senior Level' }
  ]

  const isJob = (opp: Opportunity) => opp.type === "job"
  const isCollaboration = (opp: Opportunity) => opp.type === "collaboration"

  const filteredOpportunities = opportunities.filter(opportunity => {

    // TYPE filter
    const matchesType =
      selectedType === 'all' ||
      (selectedType === 'job' && isJob(opportunity)) ||
      (selectedType === 'collaboration' && isCollaboration(opportunity))

    // JOB TYPE filter (only for job)
    const matchesJobType =
      selectedJobType === 'all' ||
      (isJob(opportunity) && opportunity.jobType === selectedJobType)

    // EXPERIENCE filter (only for job)
    const matchesExperience =
      selectedExperience === 'all' ||
      (isJob(opportunity) && opportunity.experience === selectedExperience)

    // SEARCH filter (updated to new fields)
    const search = searchTerm.toLowerCase()

    const matchesSearch =
      opportunity.title.toLowerCase().includes(search) ||
      opportunity.description.toLowerCase().includes(search) ||
      (opportunity.companyName && opportunity.companyName.toLowerCase().includes(search)) ||
      (opportunity.skills && opportunity.skills.toLowerCase().includes(search))

    return matchesType && matchesJobType && matchesExperience && matchesSearch
  })

  const getJobTypeColor = (type: string) => {
    const colors = {
      'full-time': 'bg-blue-100 text-blue-800',
      'part-time': 'bg-green-100 text-green-800',
      'contract': 'bg-purple-100 text-purple-800',
      'internship': 'bg-orange-100 text-orange-800'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getExperienceColor = (level: string) => {
    const colors = {
      entry: 'bg-green-100 text-green-800',
      mid: 'bg-yellow-100 text-yellow-800',
      senior: 'bg-red-100 text-red-800'
    }
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getProjectTypeColor = (type: string) => {
    const colors = {
      'web-development': 'bg-blue-100 text-blue-800',
      'mobile-app': 'bg-green-100 text-green-800',
      'desktop-app': 'bg-purple-100 text-purple-800',
      'ai-ml': 'bg-red-100 text-red-800',
      'blockchain': 'bg-yellow-100 text-yellow-800',
      'game-development': 'bg-indigo-100 text-indigo-800',
      'other': 'bg-gray-100 text-gray-800'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getDurationColor = (duration: string) => {
    const colors = {
      'short-term': 'bg-green-100 text-green-800',
      'medium-term': 'bg-yellow-100 text-yellow-800',
      'long-term': 'bg-red-100 text-red-800',
      'ongoing': 'bg-purple-100 text-purple-800'
    }
    return colors[duration as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return '1 day ago'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return `${Math.floor(diffDays / 30)} months ago`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading opportunities...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Opportunities</h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              Discover exciting career opportunities and collaboration projects. Find your next role or partner.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="ri-search-line text-gray-400"></i>
              </div>
              <input
                type="text"
                placeholder="Search opportunities, companies, skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Opportunity Type Filter */}
            <div className="flex flex-wrap gap-2">
              {opportunityTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${selectedType === type.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                >
                  <i className={`${type.icon} mr-2`}></i>
                  {type.name}
                </button>
              ))}
            </div>

            {/* Job Type Filter (only show for jobs) */}
            {(selectedType === 'all' || selectedType === 'job') && (
              <div className="flex flex-wrap gap-2">
                {jobTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedJobType(type.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${selectedJobType === type.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                      }`}
                  >
                    <i className={`${type.icon} mr-2`}></i>
                    {type.name}
                  </button>
                ))}
              </div>
            )}

            {/* Experience Level Filter (only show for jobs) */}
            {(selectedType === 'all' || selectedType === 'job') && (
              <div className="flex flex-wrap gap-2">
                {experienceLevels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setSelectedExperience(level.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${selectedExperience === level.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                      }`}
                  >
                    {level.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Opportunities List */}
        {filteredOpportunities.length === 0 ? (
          <div className="text-center py-12">
            <i className="ri-briefcase-line text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No opportunities found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOpportunities.map((opportunity) => (
              <PublicOpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                formatDate={formatDate}
                getJobTypeColor={getJobTypeColor}
                getExperienceColor={getExperienceColor}
                getProjectTypeColor={getProjectTypeColor}
                getDurationColor={getDurationColor}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
