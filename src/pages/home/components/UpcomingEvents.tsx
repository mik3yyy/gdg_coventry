
import { Button } from '../../../components/base/Button';

export function UpcomingEvents() {
  const events = [
    {
      id: 1,
      title: 'Flutter Workshop: Building Your First App',
      date: 'December 15, 2024',
      time: '10:00 AM - 4:00 PM',
      location: 'Coventry University Tech Hub',
      attendees: 45,
      maxAttendees: 50,
      image: 'https://readdy.ai/api/search-image?query=Flutter%20mobile%20app%20development%20workshop%20with%20developers%20coding%20on%20laptops%2C%20Flutter%20logo%20visible%2C%20modern%20classroom%20setting%20with%20projector%20screen%20showing%20code%2C%20collaborative%20learning%20environment%2C%20bright%20professional%20atmosphere&width=400&height=250&seq=flutter-workshop&orientation=landscape',
      tags: ['Flutter', 'Mobile Development', 'Beginner Friendly']
    },
    {
      id: 2,
      title: 'Google Cloud Study Jam: Cloud Architecture',
      date: 'December 22, 2024',
      time: '2:00 PM - 6:00 PM',
      location: 'Online & Hybrid',
      attendees: 32,
      maxAttendees: 40,
      image: 'https://readdy.ai/api/search-image?query=Google%20Cloud%20Platform%20study%20session%20with%20developers%20learning%20cloud%20architecture%2C%20multiple%20screens%20showing%20GCP%20dashboard%2C%20modern%20tech%20workspace%2C%20collaborative%20online%20learning%20setup%2C%20professional%20development%20atmosphere&width=400&height=250&seq=gcp-study&orientation=landscape',
      tags: ['Google Cloud', 'Architecture', 'Certification']
    },
    {
      id: 3,
      title: 'AI/ML with TensorFlow: Hands-on Session',
      date: 'January 8, 2025',
      time: '6:00 PM - 9:00 PM',
      location: 'Innovation Centre Coventry',
      attendees: 28,
      maxAttendees: 35,
      image: 'https://readdy.ai/api/search-image?query=Machine%20learning%20workshop%20with%20TensorFlow%2C%20developers%20working%20on%20AI%20models%2C%20data%20visualization%20on%20screens%2C%20modern%20tech%20lab%20environment%2C%20collaborative%20coding%20session%2C%20professional%20learning%20atmosphere&width=400&height=250&seq=tensorflow-ml&orientation=landscape',
      tags: ['AI/ML', 'TensorFlow', 'Data Science']
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our upcoming workshops, study jams, and meetups to learn, network, and grow with the community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="text-sm font-medium text-gray-700">
                    {event.attendees}/{event.maxAttendees} attending
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {event.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <i className="ri-calendar-line w-5 h-5 mr-3 flex items-center justify-center"></i>
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <i className="ri-time-line w-5 h-5 mr-3 flex items-center justify-center"></i>
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <i className="ri-map-pin-line w-5 h-5 mr-3 flex items-center justify-center"></i>
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {event.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-3">
                  <Button 
                    className="flex-1 whitespace-nowrap" 
                    size="sm" 
                    style={{backgroundColor: '#4285F4', color: 'white'}} 
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#3367D6'} 
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#4285F4'}
                  >
                    <i className="ri-calendar-check-line mr-2"></i>
                    RSVP
                  </Button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <i className="ri-share-line text-gray-600"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="/events">
            <Button 
              variant="outline" 
              className="whitespace-nowrap"
              style={{borderColor: '#4285F4', color: '#4285F4'}} 
              onMouseEnter={(e) => {e.target.style.backgroundColor = '#4285F4'; e.target.style.color = 'white';}} 
              onMouseLeave={(e) => {e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#4285F4';}}
            >
              <i className="ri-calendar-event-line mr-2"></i>
              View All Events
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
