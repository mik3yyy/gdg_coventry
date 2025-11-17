

import { useEffect, useState } from 'react';
import { Header } from '../../components/feature/Header';
import { Footer } from '../../components/feature/Footer';
import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
export default function DashboardPage() {
  const { user } = useAuth();

  // useState({
  //   name: 'John Doe',
  //   email: 'john.doe@example.com',
  //   avatar: 'https://readdy.ai/api/search-image?query=Professional%20male%20software%20developer%20with%20friendly%20smile%2C%20modern%20office%20background%2C%20tech%20industry%20professional%20headshot%2C%20confident%20and%20approachable%20demeanor%2C%20clean%20contemporary%20lighting&width=100&height=100&seq=user-avatar&orientation=squarish',
  //   memberSince: 'January 2024',
  //   isMentor: false
  // });
  useEffect(() => {
    console.log("Dashboard loaded for user:", user);
  }, []);

  const features = [
    {
      title: 'Share Project',
      description: 'Share your projects with the community',
      icon: 'ri-folder-add-line',
      color: '#4285F4',
      link: '/dashboard/submit-project'
    },
    {
      title: 'Find a Mentor',
      description: 'Connect with experienced developers',
      icon: 'ri-user-search-line',
      color: '#EA4335',
      link: '/dashboard/mentors'
    },
    {
      title: 'Become a Mentor',
      description: 'Help others grow in their tech journey',
      icon: 'ri-graduation-cap-line',
      color: '#FBBC05',
      link: '/dashboard/become-mentor'
    },
    {
      title: 'Post Opportunity',
      description: 'Share jobs or find collaboration partners',
      icon: 'ri-briefcase-line',
      color: '#EA4335',
      link: '/dashboard/post-opportunity'
    },
    {
      title: 'Job Board',
      description: 'Discover opportunities with our partners',
      icon: 'ri-search-line',
      color: '#4285F4',
      link: '/dashboard/jobs'
    },
    {
      title: 'Resource Library',
      description: 'Access learning materials and guides',
      icon: 'ri-book-open-line',
      color: '#4285F4',
      link: '/dashboard/resources'
    },
    {
      title: 'Member Certificate',
      description: 'Generate your membership certificate',
      icon: 'ri-award-line',
      color: '#EA4335',
      link: '/dashboard/certificate'
    }
  ];

  const recentActivity = [
    {
      type: 'project',
      title: 'New project "EcoTracker" shared',
      time: '2 hours ago',
      icon: 'ri-folder-line'
    },
    {
      type: 'mentor',
      title: 'Mentor request approved',
      time: '1 day ago',
      icon: 'ri-user-check-line'
    },
    {
      type: 'job',
      title: 'New job posting: Frontend Developer',
      time: '3 days ago',
      icon: 'ri-briefcase-line'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Dashboard Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-6">
            <img
              src={user?.photo}
              alt={user?.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
              {/* {user?.isMentor && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#34A853]/10 text-[#34A853] mt-2">
                  <i className="ri-star-line mr-1"></i>
                  Mentor
                </span>
              )} */}
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Main Features */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Member Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <Link
                    key={index}
                    to={feature.link}
                    className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
                        style={{ backgroundColor: `${feature.color}20` }}
                      >
                        <i className={`${feature.icon} text-xl`} style={{ color: feature.color }}></i>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-gray-600 text-sm">{feature.description}</p>
                      </div>
                      <i className="ri-arrow-right-line text-gray-400 group-hover:text-gray-600 transition-colors duration-200"></i>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">

              {/* Quick Stats
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Your Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Projects Shared</span>
                    <span className="font-semibold text-gray-900">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Events Attended</span>
                    <span className="font-semibold text-gray-900">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Mentorship Sessions</span>
                    <span className="font-semibold text-gray-900">5</span>
                  </div>
                </div>
              </div> */}

              {/* Recent Activity */}
              {/* <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className={`${activity.icon} text-sm text-gray-600`}></i>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-[#4285F4] to-[#34A853] rounded-2xl p-6 text-white">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <a
                    href="https://gdg.community.dev/gdg-coventry/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-white/90 hover:text-white transition-colors duration-200"
                  >
                    <i className="ri-calendar-line"></i>
                    <span className="text-sm">View Upcoming Events</span>
                  </a>

                  <Link
                    to="/community"
                    className="flex items-center space-x-3 text-white/90 hover:text-white transition-colors duration-200"
                  >
                    <i className="ri-team-line"></i>
                    <span className="text-sm">Browse Community</span>
                  </Link>
                  <Link
                    to="/contact"
                    className="flex items-center space-x-3 text-white/90 hover:text-white transition-colors duration-200"
                  >
                    <i className="ri-mail-line"></i>
                    <span className="text-sm">Contact Organizers</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

