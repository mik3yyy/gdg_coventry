import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/feature/Header';
import { Footer } from '../../components/feature/Footer';
import { useAuth } from '../../contexts/AuthContext';
import { useOrganizers } from '../../contexts/OrganizerContext';

export default function AdminDashboard() {
  const { organizers, fetchOrganizers } = useOrganizers()
  const { user } = useAuth()
  const [isSuperAdmin, setisSuperAdmin] = useState(false);
  useEffect(() => {

    const fetchData = async () => {
      await fetchOrganizers(); // Wait for organizers to be fetched

      console.log(organizers)

      const org = organizers.find(e => e.email == user?.email)
      console.log(org)
      if (org) {
        setisSuperAdmin(org!.permissions == 'super-admin')
      }

      console.log("DEVVV");
    };

    fetchData();


  }, []);

  const [stats] = useState({
    totalMembers: 1247,
    activeProjects: 89,
    pendingApprovals: 12,
    upcomingEvents: 8,
    totalOrganizers: 15,
    certificatesIssued: 342,
    totalResources: 174
  });

  const adminSections = [

    ...(isSuperAdmin ? [
      {
        title: 'Organizers',
        description: 'Add new organizers, edit roles and permissions',
        icon: 'ri-team-line',
        color: 'from-[#4285F4] to-[#1a73e8]',
        href: '/admin/organizers',
        stats: `${stats.totalOrganizers} Active`
      }
    ] : []),
    {
      title: 'Projects',
      description: 'Approve, reject, edit, feature projects',
      icon: 'ri-folder-line',
      color: 'from-[#34A853] to-[#137333]',
      href: '/admin/projects',
      stats: `${stats.pendingApprovals} Pending`
    },
    {
      title: 'Job Opportunities & Collaborations',
      description: 'Review and approve job postings from community',
      icon: 'ri-briefcase-line',
      color: 'from-[#FF6B6B] to-[#ee5a52]',
      href: '/admin/jobs',
      stats: '5 Pending'
    },
    // {
    //   title: 'Collaborations',
    //   description: 'Manage collaboration requests and partnerships',
    //   icon: 'ri-team-fill',
    //   color: 'from-[#9334E9] to-[#7c3aed]',
    //   href: '/admin/collaborations',
    //   stats: '3 New Requests'
    // },
    {
      title: 'Mentor Management',
      description: 'Approve mentor applications and manage mentors',
      icon: 'ri-user-star-line',
      color: 'from-[#F59E0B] to-[#d97706]',
      href: '/admin/mentors',
      stats: '2 Applications'
    },
    {
      title: 'Community Achievements',
      description: 'Add new achievements, edit team details',
      icon: 'ri-trophy-line',
      color: 'from-[#FBBC05] to-[#f29900]',
      href: '/admin/achievements',
      stats: '24 Achievements'
    },
    {
      title: 'Volunteer Certificates',
      description: 'Generate and track volunteer certificates',
      icon: 'ri-award-line',
      color: 'from-[#EA4335] to-[#d33b2c]',
      href: '/admin/certificates',
      stats: `${stats.certificatesIssued} Issued`
    },
    // {
    //   title: 'Events',
    //   description: 'Add, edit, track events, manage RSVP and recap links',
    //   icon: 'ri-calendar-line',
    //   color: 'from-[#06B6D4] to-[#0891b2]',
    //   href: '/admin/events',
    //   stats: `${stats.upcomingEvents} Upcoming`
    // },
    {
      title: 'Resource Library',
      description: 'Manage categories, videos, articles, tools, and interview resources',
      icon: 'ri-book-line',
      color: 'from-[#10B981] to-[#059669]',
      href: '/admin/resources',
      stats: `${stats.totalResources} Resources`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage GDG Coventry community and operations</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 whitespace-nowrap"
              >
                <i className="ri-user-line mr-2"></i>
                Switch to Member View
              </Link>
              <div className="w-10 h-10 bg-gradient-to-br from-[#EA4335] to-[#FBBC05] rounded-full flex items-center justify-center">
                <i className="ri-shield-line text-white text-lg"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Members</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalMembers.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-[#4285F4]/10 rounded-lg flex items-center justify-center">
                <i className="ri-user-line text-xl text-[#4285F4]"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeProjects}</p>
              </div>
              <div className="w-12 h-12 bg-[#34A853]/10 rounded-lg flex items-center justify-center">
                <i className="ri-folder-line text-xl text-[#34A853]"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingApprovals}</p>
              </div>
              <div className="w-12 h-12 bg-[#FBBC05]/10 rounded-lg flex items-center justify-center">
                <i className="ri-time-line text-xl text-[#FBBC05]"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Resources</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalResources}</p>
              </div>
              <div className="w-12 h-12 bg-[#FF6B6B]/10 rounded-lg flex items-center justify-center">
                <i className="ri-book-line text-xl text-[#FF6B6B]"></i>
              </div>
            </div>
          </div>
        </div> */}

        {/* Admin Sections */}
        <div>
          {/* <h2 className="text-xl font-semibold text-gray-900 mb-6">Admin Controls</h2> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminSections.map((section) => (
              <Link
                key={section.title}
                to={section.href}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${section.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <i className={`${section.icon} text-xl text-white`}></i>
                  </div>
                  <span className="text-sm font-medium text-gray-500">{section.stats}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{section.title}</h3>
                <p className="text-gray-600 text-sm">{section.description}</p>
                <div className="mt-4 flex items-center text-sm font-medium text-gray-500 group-hover:text-gray-700">
                  Manage <i className="ri-arrow-right-line ml-1"></i>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
