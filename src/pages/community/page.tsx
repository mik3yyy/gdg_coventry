
import { useState, useEffect } from 'react';
import { Header } from '../../components/feature/Header';
import { Footer } from '../../components/feature/Footer';
import { Link, useSearchParams } from 'react-router-dom';
import { useAchievement } from '../../contexts/AchievementContext';

export default function CommunityPage() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('members');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['members', 'projects', 'achievements'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const members = [
    {
      id: 1,
      name: 'John Idogun',
      role: 'Co-Organizer',
      expertise: ['Software Developer', 'Full Stack'],
      image: 'https://res.cloudinary.com/dwwzrtzb8/image/upload/v1763385052/GDSC/Users/ddb1ed5f-c31d-4818-bded-0ed487db6a21_co45jh.jpg',
      bio: 'Passionate about software development and community building.',
      github: 'johnidogun',
      linkedin: 'john-idogun-a756a6192'
    },
    {
      id: 2,
      name: 'Michael Okpechi',
      role: 'Co-Organizer',
      expertise: ['Mobile Development', 'Flutter', 'Swift'],
      image: "https://res.cloudinary.com/dwwzrtzb8/image/upload/v1763384979/GDSC/Users/IMG_1182_mxtwx0.jpg",
      bio: 'Software engineer and GDG organizer focused on mobile, cloud, and AI innovation.',
      github: 'mik3yyy',
      linkedin: 'chibuikem-michael-okpechi'
    }
  ];

  const projects = [
    {
      id: 1,
      title: 'EcoTrack Mobile App',
      description: 'Flutter app for tracking carbon footprint with Firebase backend and ML recommendations.',
      author: 'Sarah Johnson',
      tech: ['Flutter', 'Firebase', 'TensorFlow Lite'],
      image: 'https://readdy.ai/api/search-image?query=Modern%20mobile%20app%20interface%20showing%20environmental%20tracking%20dashboard%2C%20green%20eco-friendly%20design%2C%20clean%20UI%20with%20charts%20and%20sustainability%20metrics%2C%20professional%20app%20mockup%20on%20smartphone%20screen&width=400&height=300&seq=project-1&orientation=landscape',
      github: 'https://github.com/gdgcoventry/ecotrack',
      demo: 'https://ecotrack-demo.web.app',
      featured: true
    },
    {
      id: 2,
      title: 'CloudOps Dashboard',
      description: 'Google Cloud monitoring dashboard built with Angular and Cloud Functions.',
      author: 'Michael Chen',
      tech: ['Angular', 'Google Cloud', 'Cloud Functions'],
      image: 'https://readdy.ai/api/search-image?query=Professional%20cloud%20computing%20dashboard%20interface%2C%20modern%20analytics%20charts%20and%20monitoring%20graphs%2C%20blue%20and%20white%20tech%20design%2C%20clean%20enterprise%20software%20UI%20on%20computer%20screen&width=400&height=300&seq=project-2&orientation=landscape',
      github: 'https://github.com/gdgcoventry/cloudops',
      demo: 'https://cloudops-dashboard.web.app',
      featured: true
    },
    {
      id: 3,
      title: 'AI Study Buddy',
      description: 'TensorFlow.js powered study assistant with personalized learning recommendations.',
      author: 'Emma Rodriguez',
      tech: ['TensorFlow.js', 'React', 'Firebase'],
      image: 'https://readdy.ai/api/search-image?query=AI-powered%20educational%20app%20interface%20showing%20study%20recommendations%20and%20learning%20analytics%2C%20modern%20educational%20technology%20design%2C%20bright%20and%20engaging%20UI%20with%20study%20materials%20and%20progress%20tracking&width=400&height=300&seq=project-3&orientation=landscape',
      github: 'https://github.com/gdgcoventry/ai-study-buddy',
      demo: 'https://ai-study-buddy.web.app',
      featured: false
    },
    {
      id: 4,
      title: 'PWA Event Manager',
      description: 'Progressive Web App for managing community events with offline capabilities.',
      author: 'David Thompson',
      tech: ['PWA', 'TypeScript', 'Workbox'],
      image: 'https://readdy.ai/api/search-image?query=Progressive%20web%20app%20interface%20for%20event%20management%2C%20modern%20calendar%20and%20scheduling%20UI%2C%20professional%20event%20planning%20dashboard%2C%20clean%20responsive%20design%20on%20multiple%20devices&width=400&height=300&seq=project-4&orientation=landscape',
      github: 'https://github.com/gdgcoventry/pwa-events',
      demo: 'https://pwa-events.web.app',
      featured: false
    }
  ];
  const {
    achievements,
  } = useAchievement();
  // const achievements = [
  //   {
  //     title: 'Google I/O Extended 2024',
  //     description: 'Successfully hosted the largest Google I/O Extended event in the Midlands with 200+ attendees.',
  //     date: 'May 2024',
  //     icon: 'ri-trophy-line',
  //     color: '#FBBC05'
  //   },
  //   {
  //     title: 'DevFest Coventry 2023',
  //     description: 'Organized our first DevFest with 15 speakers and 300+ participants from across the UK.',
  //     date: 'October 2023',
  //     icon: 'ri-medal-line',
  //     color: '#EA4335'
  //   },
  //   {
  //     title: 'Women Techmakers Partnership',
  //     description: 'Established partnership to promote diversity and inclusion in tech within our community.',
  //     date: 'March 2024',
  //     icon: 'ri-team-line',
  //     color: '#34A853'
  //   },
  //   {
  //     title: 'University Collaboration',
  //     description: 'Partnered with Coventry University to provide tech workshops for 500+ students.',
  //     date: 'September 2023',
  //     icon: 'ri-graduation-cap-line',
  //     color: '#4285F4'
  //   }
  // ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br bg-[#1F1F1F] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our Community
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            We’re building Coventry’s most active tech community. We’re just getting started, here’s where we’re going...
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold">500+</div>
              <div className="text-lg opacity-90">Active Members</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">50+</div>
              <div className="text-lg opacity-90">Events Hosted</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">25+</div>
              <div className="text-lg opacity-90">Expert Speakers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('members')}
              className={`py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${activeTab === 'members'
                ? 'border-[#4285F4] text-[#4285F4]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              Members & Organizers
            </button>
            {/* <button
              onClick={() => setActiveTab('projects')}
              className={`py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                activeTab === 'projects'
                  ? 'border-[#4285F4] text-[#4285F4]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Community Projects
            </button> */}
            <button
              onClick={() => setActiveTab('achievements')}
              className={`py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${activeTab === 'achievements'
                ? 'border-[#4285F4] text-[#4285F4]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              Achievements
            </button>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Members Tab */}
          {activeTab === 'members' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Meet Our Team
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Our diverse team of organizers and active members who drive the community forward.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {members.map((member) => (
                  <div key={member.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-[#4285F4] font-medium mb-3">{member.role}</p>
                      <p className="text-gray-600 text-sm mb-4">{member.bio}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {member.expertise.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex space-x-3">
                        <a
                          href={`https://github.com/${member.github}`}
                          className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-[#4285F4] hover:text-white transition-colors duration-200"
                        >
                          <i className="ri-github-line text-sm"></i>
                        </a>
                        <a
                          href={`https://linkedin.com/in/${member.linkedin}`}
                          className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-[#4285F4] hover:text-white transition-colors duration-200"
                        >
                          <i className="ri-linkedin-line text-sm"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Community Projects
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Innovative projects built by our community members using Google technologies.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {projects.map((project) => (
                  <div key={project.id} className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${project.featured ? 'ring-2 ring-[#4285F4]' : ''}`}>
                    {project.featured && (
                      <div className="bg-[#4285F4] text-white px-4 py-2 text-sm font-medium">
                        <i className="ri-star-line mr-2"></i>
                        Featured Project
                      </div>
                    )}
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      <p className="text-sm text-[#4285F4] font-medium mb-4">By {project.author}</p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex space-x-4">
                          <a
                            href={project.github}
                            className="flex items-center space-x-2 text-gray-700 hover:text-[#4285F4] transition-colors duration-200"
                          >
                            <i className="ri-github-line"></i>
                            <span className="text-sm">Code</span>
                          </a>
                          <a
                            href={project.demo}
                            className="flex items-center space-x-2 text-gray-700 hover:text-[#4285F4] transition-colors duration-200"
                          >
                            <i className="ri-external-link-line"></i>
                            <span className="text-sm">Demo</span>
                          </a>
                        </div>
                        <Link
                          to={`/projects/${project.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                          className="inline-flex items-center px-4 py-2 bg-[#4285F4] text-white rounded-lg hover:bg-[#3367D6] transition-colors duration-200 text-sm font-medium whitespace-nowrap"
                        >
                          View Details
                          <i className="ri-arrow-right-line ml-2"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Community Achievements
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Celebrating our milestones and the impact we've made in the tech community.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {achievements.filter(a => a.status === "published").map((achievement, index) => (

                  <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-start space-x-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${achievement.color}20` }}
                      >
                        <i className={`${achievement.icon} text-xl`} style={{ color: achievement.color }}></i>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
                        <p className="text-gray-600 mb-3">{achievement.description}</p>
                        <p className="text-sm font-medium" style={{ color: achievement.color }}>{achievement.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
