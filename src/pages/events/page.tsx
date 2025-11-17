

import { useState, useEffect } from 'react'
import { Header } from '../../components/feature/Header'
import { Footer } from '../../components/feature/Footer'
import { mockEvents } from '../../mocks/events'

interface Event {
  id: string
  title: string
  description?: string
  image_url?: string
  event_date?: string
  location?: string
  event_type: 'workshop' | 'meetup' | 'conference' | 'hackathon'
  max_attendees?: number
  current_attendees: number
  organizer_id?: string
  category_id?: string
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  featured: boolean
  created_at: string
  updated_at: string
  organizer?: {
    id: string
    email: string
    full_name?: string
    avatar_url?: string
    role: 'admin' | 'mentor' | 'member'
    created_at: string
    updated_at: string
  }
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState<string>('all')

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setEvents(mockEvents.filter(e => e.status === 'upcoming'))
      setLoading(false)
    }, 500)
  }, [])

  const eventTypes = [
    { id: 'all', name: 'All Events', icon: 'ri-calendar-line' },
    { id: 'workshop', name: 'Workshops', icon: 'ri-tools-line' },
    { id: 'meetup', name: 'Meetups', icon: 'ri-group-line' },
    { id: 'conference', name: 'Conferences', icon: 'ri-presentation-line' },
    { id: 'hackathon', name: 'Hackathons', icon: 'ri-code-line' }
  ]

  const filteredEvents = events.filter(event => 
    selectedType === 'all' || event.event_type === selectedType
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getEventTypeColor = (type: string) => {
    const colors = {
      workshop: 'bg-blue-100 text-blue-800',
      meetup: 'bg-green-100 text-green-800',
      conference: 'bg-purple-100 text-purple-800',
      hackathon: 'bg-orange-100 text-orange-800'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading events...</p>
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
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Community Events</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Join our upcoming events, workshops, and meetups. Connect with fellow developers and expand your skills.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Event Type Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {eventTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedType === type.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                <i className={`${type.icon} mr-2`}></i>
                {type.name}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <i className="ri-calendar-line text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">Check back soon for upcoming events!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-full object-cover object-top"
                  />
                  {event.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEventTypeColor(event.event_type)}`}>
                      {event.event_type.charAt(0).toUpperCase() + event.event_type.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <img
                      src={event.organizer?.avatar_url}
                      alt={event.organizer?.full_name}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <div>
                      <span className="text-sm text-gray-600">Organized by</span>
                      <p className="text-sm font-medium text-gray-900">{event.organizer?.full_name}</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                  {/* Event Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <i className="ri-calendar-line mr-2 text-blue-600"></i>
                      {event.event_date && formatDate(event.event_date)}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <i className="ri-map-pin-line mr-2 text-blue-600"></i>
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <i className="ri-group-line mr-2 text-blue-600"></i>
                      {event.current_attendees} / {event.max_attendees} attendees
                    </div>
                  </div>

                  {/* Attendance Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Attendance</span>
                      <span>{Math.round((event.current_attendees / (event.max_attendees || 1)) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min((event.current_attendees / (event.max_attendees || 1)) * 100, 100)}%`
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap">
                    {event.current_attendees >= (event.max_attendees || 0) ? 'Event Full' : 'Register Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  )
}

