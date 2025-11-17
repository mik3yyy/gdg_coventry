
import { Header } from '../../components/feature/Header';
import { Footer } from '../../components/feature/Footer';

export default function AboutPage() {
  const timeline = [
    {
      year: '2022',
      title: 'GDG Coventry Founded',
      description: 'Started as a small group of passionate developers wanting to bring Google technologies to the Midlands.',
      color: '#4285F4'
    },
    {
      year: '2022',
      title: 'First Workshop',
      description: 'Hosted our inaugural Flutter workshop with 25 attendees at Coventry University.',
      color: '#EA4335'
    },
    {
      year: '2023',
      title: 'DevFest Coventry',
      description: 'Organized our first DevFest with 300+ participants and 15 expert speakers.',
      color: '#FBBC05'
    },
    {
      year: '2024',
      title: 'Google I/O Extended',
      description: 'Hosted the largest Google I/O Extended event in the Midlands with 200+ attendees.',
      color: '#EA4335'
    }
  ];

  const values = [
    {
      title: 'Inclusive Community',
      description: 'We welcome developers of all skill levels and backgrounds, fostering an environment where everyone can learn and grow.',
      icon: 'ri-team-line',
      color: '#4285F4'
    },
    {
      title: 'Knowledge Sharing',
      description: 'We believe in the power of sharing knowledge and experiences to help the entire community advance together.',
      icon: 'ri-book-open-line',
      color: '#EA4335'
    },
    {
      title: 'Innovation Focus',
      description: 'We encourage experimentation with cutting-edge Google technologies and support innovative project development.',
      icon: 'ri-lightbulb-line',
      color: '#FBBC05'
    },
    {
      title: 'Professional Growth',
      description: 'We provide mentorship, networking opportunities, and career guidance to help members achieve their professional goals.',
      icon: 'ri-rocket-line',
      color: '#EA4335'
    }
  ];

  const organizers = [
    {
      name: 'Sarah Johnson',
      role: 'Lead Organizer',
      bio: 'Software engineer with 8+ years of experience in mobile development. Passionate about building inclusive tech communities.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20software%20developer%20with%20friendly%20smile%2C%20modern%20office%20background%2C%20tech%20industry%20professional%20headshot%2C%20confident%20and%20approachable%20demeanor%2C%20clean%20contemporary%20lighting&width=300&height=300&seq=organizer-1&orientation=squarish'
    },
    {
      name: 'Michael Chen',
      role: 'Cloud Advocate',
      bio: 'Google Cloud architect helping businesses scale their applications. Loves teaching cloud technologies to developers.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20male%20software%20engineer%20with%20glasses%2C%20modern%20tech%20workspace%20background%2C%20friendly%20developer%20headshot%2C%20contemporary%20office%20environment%2C%20professional%20lighting&width=300&height=300&seq=organizer-2&orientation=squarish'
    },
    {
      name: 'Emma Rodriguez',
      role: 'AI/ML Specialist',
      bio: 'PhD in Computer Science researching ethical AI applications. Dedicated to making AI accessible to all developers.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20data%20scientist%20with%20warm%20smile%2C%20modern%20tech%20office%20background%2C%20AI%20researcher%20headshot%2C%20confident%20and%20intelligent%20demeanor%2C%20bright%20professional%20lighting&width=300&height=300&seq=organizer-3&orientation=squarish'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-[#1F1F1F]"
        // style={{
        //   backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20tech%20community%20workspace%20with%20diverse%20group%20of%20developers%20collaborating%2C%20Google%20technology%20logos%20and%20screens%20visible%2C%20bright%20contemporary%20office%20environment%2C%20innovation%20and%20teamwork%20atmosphere%2C%20professional%20lighting&width=1200&height=600&seq=about-hero&orientation=landscape')`,
        //   backgroundSize: 'cover',
        //   backgroundPosition: 'center'
        // }}
        >
          <div className="absolute bg-[#1F1F1F]"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About GDG Coventry
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Building a vibrant tech community in the heart of England, connecting developers with Google technologies and each other.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                GDG Coventry is part of the global Google Developer Groups program, dedicated to fostering a thriving tech ecosystem in the Midlands. We bring together developers, designers, and tech enthusiasts to learn, share, and build with Google technologies.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our community serves as a bridge between Google's cutting-edge technologies and local talent, providing hands-on learning experiences, networking opportunities, and a platform for innovation.
              </p>
              {/* <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#4285F4] mb-2">500+</div>
                  <div className="text-gray-600">Community Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#34A853] mb-2">50+</div>
                  <div className="text-gray-600">Events Organized</div>
                </div>
              </div> */}
            </div>
            <div className="relative">
              <img
                src="https://readdy.ai/api/search-image?query=Modern%20tech%20meetup%20with%20diverse%20developers%20working%20together%20on%20laptops%2C%20Google%20technology%20presentations%20on%20screens%2C%20collaborative%20workspace%20environment%2C%20professional%20networking%20atmosphere%2C%20bright%20contemporary%20lighting&width=600&height=400&seq=mission&orientation=landscape"
                alt="GDG Coventry Mission"
                className="rounded-2xl shadow-lg object-cover w-full h-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide our community and shape every event, workshop, and interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                  style={{ backgroundColor: `${value.color}20` }}
                >
                  <i className={`${value.icon} text-2xl`} style={{ color: value.color }}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      {/* <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From a small group of passionate developers to a thriving community of 500+ members.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div
                        className="text-2xl font-bold mb-2"
                        style={{ color: item.color }}
                      >
                        {item.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div
                      className="w-4 h-4 rounded-full border-4 border-white shadow-lg"
                      style={{ backgroundColor: item.color }}
                    ></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Organizers Section */}
      {/* <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Organizers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate individuals who dedicate their time to building and nurturing our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {organizers.map((organizer, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={organizer.image}
                    alt={organizer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{organizer.name}</h3>
                  <p className="text-[#4285F4] font-medium mb-3">{organizer.role}</p>
                  <p className="text-gray-600 text-sm">{organizer.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}


      <Footer />
    </div>
  );
}
