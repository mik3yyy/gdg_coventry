export const CommunityStats = () => {
  const stats = [
    {
      number: '500+',
      label: 'Active Members',
      icon: 'ri-group-line',
      color: '#4285F4'
    },
    {
      number: '50+',
      label: 'Events Hosted',
      icon: 'ri-calendar-event-line',
      color: '#34A853'
    },
    {
      number: '25+',
      label: 'Expert Speakers',
      icon: 'ri-mic-line',
      color: '#FBBC05'
    },
    {
      number: '30+',
      label: 'Projects Showcased',
      icon: 'ri-code-box-line',
      color: '#EA4335'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        data-aos="fade-up"
        data-aos-duration="900"
      >
        <div
          className="text-center mb-12"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Growing Together as a Community
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We’re building Coventry’s most active tech community.
            We’re just getting started, here’s where we’re going...
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center"
              data-aos="fade-up"
              data-aos-delay={200 + index * 120}  // staggered subtle animation
            >
              <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4 border-2 border-gray-100">
                <i className={`${stat.icon} text-2xl`} style={{ color: stat.color }}></i>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-16 bg-white rounded-2xl shadow-lg p-8 md:p-12"
          data-aos="fade-up"
          data-aos-duration="900"
          data-aos-delay="150"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">

            {/* Left Text */}
            <div
              data-aos="fade-right"
              data-aos-duration="900"
              data-aos-delay="200"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Why Join GDG Coventry?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: 'rgba(66, 133, 244, 0.1)' }}>
                    <i className="ri-check-line text-sm" style={{ color: '#4285F4' }}></i>
                  </div>
                  <span className="text-gray-700">Access to exclusive Google technology workshops and training</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: 'rgba(52, 168, 83, 0.1)' }}>
                    <i className="ri-check-line text-sm" style={{ color: '#34A853' }}></i>
                  </div>
                  <span className="text-gray-700">Networking opportunities with industry professionals</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: 'rgba(251, 188, 5, 0.1)' }}>
                    <i className="ri-check-line text-sm" style={{ color: '#FBBC05' }}></i>
                  </div>
                  <span className="text-gray-700">Mentorship programs and career guidance</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: 'rgba(234, 67, 53, 0.1)' }}>
                    <i className="ri-check-line text-sm" style={{ color: '#EA4335' }}></i>
                  </div>
                  <span className="text-gray-700">Platform to showcase your projects and innovations</span>
                </li>
              </ul>
            </div>

            {/* Right Image */}
            <div
              className="relative"
              data-aos="fade-left"
              data-aos-duration="900"
              data-aos-delay="300"
            >
              <img
                src="https://developers.google.com/static/community/devfest/images/2025/developers.png"
                alt="GDG Coventry Community"
                className="rounded-xl shadow-lg object-cover w-full h-64 md:h-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
