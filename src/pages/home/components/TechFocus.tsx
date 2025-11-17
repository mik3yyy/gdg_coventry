export const TechFocus = () => {
  const technologies = [
    {
      name: 'Flutter',
      description: 'Build beautiful, natively compiled applications for mobile, web, and desktop',
      icon: 'ri-flutter-line',
      color: '#4285F4',
      bgColor: 'rgba(66, 133, 244, 0.1)',
      textColor: '#4285F4'
    },
    {
      name: 'Android',
      description: 'Create powerful mobile applications for the world\'s most popular platform',
      icon: 'ri-android-line',
      color: '#34A853',
      bgColor: 'rgba(52, 168, 83, 0.1)',
      textColor: '#34A853'
    },
    {
      name: 'Google Cloud',
      description: 'Scale your applications with powerful cloud infrastructure and services',
      icon: 'ri-cloud-line',
      color: '#4285F4',
      bgColor: 'rgba(66, 133, 244, 0.1)',
      textColor: '#4285F4'
    },
    {
      name: 'AI & Machine Learning',
      description: 'Explore artificial intelligence and machine learning with TensorFlow and more',
      icon: 'ri-brain-line',
      color: '#EA4335',
      bgColor: 'rgba(234, 67, 53, 0.1)',
      textColor: '#EA4335'
    },
    {
      name: 'Web Technologies',
      description: 'Modern web development with Angular, Progressive Web Apps, and more',
      icon: 'ri-global-line',
      color: '#FBBC05',
      bgColor: 'rgba(251, 188, 5, 0.1)',
      textColor: '#FBBC05'
    },
    {
      name: 'Firebase',
      description: 'Build and scale applications quickly with Google\'s app development platform',
      icon: 'ri-fire-line',
      color: '#EA4335',
      bgColor: 'rgba(234, 67, 53, 0.1)',
      textColor: '#EA4335'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        data-aos="fade-up"
        data-aos-duration="900"
      >

        {/* Section Header */}
        <div
          className="text-center mb-16"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Technologies We Focus On
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Dive deep into Google's cutting-edge technologies through hands-on workshops, study jams, and real-world projects.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={150 + index * 120}   // subtle stagger effect
              data-aos-duration="800"
            >
              <div className="h-2" style={{ backgroundColor: tech.color }}></div>
              <div className="p-8">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: tech.bgColor }}
                >
                  <i className={`${tech.icon} text-2xl`} style={{ color: tech.textColor }}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {tech.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {tech.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
