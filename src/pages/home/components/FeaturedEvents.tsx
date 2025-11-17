
export const FeaturedEvents = () => {
  const pastEvents = [
    {
      title: 'DevFest Coventry 2024',
      description: 'Our biggest annual event featuring talks on AI, Cloud, and Mobile development',
      attendees: 200,
      image: 'https://readdy.ai/api/search-image?query=Large%20tech%20conference%20DevFest%20event%20with%20hundreds%20of%20developers%2C%20main%20stage%20with%20speaker%20presenting%2C%20audience%20engaged%2C%20Google%20DevFest%20branding%2C%20professional%20conference%20atmosphere%2C%20modern%20venue%20with%20tech%20displays&width=600&height=300&seq=devfest-1&orientation=landscape',
      highlights: ['15 Expert Speakers', '8 Technical Sessions', 'Networking Lunch', 'Swag & Prizes']
    },
    {
      title: 'Android Study Jam Series',
      description: 'Comprehensive 6-week program covering modern Android development',
      attendees: 85,
      image: 'https://readdy.ai/api/search-image?query=Android%20development%20study%20jam%20with%20developers%20learning%20mobile%20app%20development%2C%20Android%20Studio%20on%20screens%2C%20collaborative%20coding%20session%2C%20modern%20classroom%20with%20Android%20logos%2C%20professional%20learning%20environment&width=600&height=300&seq=android-jam-1&orientation=landscape',
      highlights: ['6 Weekly Sessions', 'Hands-on Projects', 'Certification Path', 'Mentor Support']
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Events & Success Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Highlights from our recent events and the impact we're making in the Coventry tech community.
          </p>
        </div>

        <div className="space-y-16">
          {pastEvents.map((event, index) => (
            <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <img
                  src={event.image}
                  alt={event.title}
                  className="rounded-2xl shadow-lg object-cover w-full h-80"
                />
              </div>
              
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {event.title}
                </h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {event.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {event.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{backgroundColor: 'rgba(52, 168, 83, 0.1)'}}>
                        <i className="ri-check-line text-sm" style={{color: '#34A853'}}></i>
                      </div>
                      <span className="text-gray-700 font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center space-x-6 mb-8">
                  <div className="flex items-center space-x-2">
                    <i className="ri-group-line text-xl" style={{color: '#4285F4'}}></i>
                    <span className="text-gray-700">
                      <span className="font-bold text-gray-900">{event.attendees}</span> attendees
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="ri-star-fill text-xl" style={{color: '#FBBC05'}}></i>
                    <span className="text-gray-700">
                      <span className="font-bold text-gray-900">4.9/5</span> rating
                    </span>
                  </div>
                </div>
                
                <button className="text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2" style={{backgroundColor: '#4285F4'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#3367D6'} onMouseLeave={(e) => e.target.style.backgroundColor = '#4285F4'}>
                  <i className="ri-play-circle-line"></i>
                  <span>Watch Event Highlights</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Community Impact Section */}
        <div className="mt-20 rounded-2xl p-8 md:p-12" style={{background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.1) 0%, rgba(52, 168, 83, 0.1) 100%)'}}>
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Community Impact
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how our events are making a difference in the local tech ecosystem.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#4285F4'}}>
                <i className="ri-graduation-cap-line text-2xl text-white"></i>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">150+</div>
              <div className="text-gray-600">Developers Trained</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#34A853'}}>
                <i className="ri-briefcase-line text-2xl text-white"></i>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">45+</div>
              <div className="text-gray-600">Career Transitions</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#EA4335'}}>
                <i className="ri-rocket-line text-2xl text-white"></i>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">30+</div>
              <div className="text-gray-600">Startups Launched</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
