import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../../components/feature/Header';
import { Footer } from '../../../components/feature/Footer';

interface Collaboration {
  id: string;
  title: string;
  description: string;
  type: 'Project' | 'Research' | 'Startup' | 'Event' | 'Mentorship';
  skills: string[];
  duration: string;
  commitment: string;
  submittedBy: {
    name: string;
    email: string;
    avatar: string;
    role: string;
  };
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  contactInfo: {
    email: string;
    linkedin?: string;
    github?: string;
  };
}

export default function CollaborationApprovalPage() {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [selectedCollaboration, setSelectedCollaboration] = useState<Collaboration | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [collaborations, setCollaborations] = useState<Collaboration[]>([
    {
      id: '1',
      title: 'AI-Powered Healthcare Platform',
      description: 'Looking for developers and designers to build a revolutionary healthcare platform that uses AI to predict health issues and provide personalized recommendations.',
      type: 'Startup',
      skills: ['React', 'Python', 'Machine Learning', 'UI/UX Design', 'Healthcare Domain'],
      duration: '6-12 months',
      commitment: '15-20 hours/week',
      submittedBy: {
        name: 'Dr. Priya Sharma',
        email: 'priya.sharma@healthtech.com',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20indian%20woman%20doctor%20business%20portrait%20headshot%20corporate%20linkedin%20style%20clean%20background&width=100&height=100&seq=6&orientation=squarish',
        role: 'Healthcare Entrepreneur'
      },
      submittedDate: '2024-01-16',
      status: 'pending',
      contactInfo: {
        email: 'priya.sharma@healthtech.com',
        linkedin: 'linkedin.com/in/priyasharma',
        github: 'github.com/priyasharma'
      }
    },
    {
      id: '2',
      title: 'Open Source Climate Data Visualization',
      description: 'Join our mission to create an open-source platform for visualizing climate data. We need frontend developers, data scientists, and environmental researchers.',
      type: 'Research',
      skills: ['D3.js', 'Python', 'Data Science', 'Environmental Science', 'Open Source'],
      duration: '3-6 months',
      commitment: '10-15 hours/week',
      submittedBy: {
        name: 'Alex Thompson',
        email: 'alex.thompson@climatedata.org',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20young%20man%20environmental%20scientist%20business%20portrait%20headshot%20corporate%20linkedin%20style%20clean%20background&width=100&height=100&seq=7&orientation=squarish',
        role: 'Environmental Data Scientist'
      },
      submittedDate: '2024-01-15',
      status: 'pending',
      contactInfo: {
        email: 'alex.thompson@climatedata.org',
        linkedin: 'linkedin.com/in/alexthompson',
        github: 'github.com/alexthompson'
      }
    },
    {
      id: '3',
      title: 'Community Learning Platform',
      description: 'Building a platform where community members can share knowledge and learn from each other. Looking for full-stack developers and education specialists.',
      type: 'Project',
      skills: ['Node.js', 'React', 'MongoDB', 'Education Technology', 'Community Building'],
      duration: '4-8 months',
      commitment: '12-18 hours/week',
      submittedBy: {
        name: 'Maria Rodriguez',
        email: 'maria.rodriguez@edutech.com',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20hispanic%20woman%20education%20technology%20business%20portrait%20headshot%20corporate%20linkedin%20style%20clean%20background&width=100&height=100&seq=8&orientation=squarish',
        role: 'EdTech Product Manager'
      },
      submittedDate: '2024-01-14',
      status: 'approved',
      contactInfo: {
        email: 'maria.rodriguez@edutech.com',
        linkedin: 'linkedin.com/in/mariarodriguez'
      }
    },
    {
      id: '4',
      title: 'Blockchain Supply Chain Tracker',
      description: 'Developing a blockchain-based solution for tracking products through supply chains. Need blockchain developers and supply chain experts.',
      type: 'Startup',
      skills: ['Blockchain', 'Solidity', 'Web3', 'Supply Chain', 'Smart Contracts'],
      duration: '8-12 months',
      commitment: '20-25 hours/week',
      submittedBy: {
        name: 'David Kim',
        email: 'david.kim@blockchaintech.com',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20asian%20man%20blockchain%20developer%20business%20portrait%20headshot%20corporate%20linkedin%20style%20clean%20background&width=100&height=100&seq=9&orientation=squarish',
        role: 'Blockchain Developer'
      },
      submittedDate: '2024-01-13',
      status: 'approved',
      contactInfo: {
        email: 'david.kim@blockchaintech.com',
        linkedin: 'linkedin.com/in/davidkim',
        github: 'github.com/davidkim'
      }
    },
    {
      id: '5',
      title: 'Social Media Analytics Tool',
      description: 'Basic social media analytics tool that lacks innovation and proper technical implementation.',
      type: 'Project',
      skills: ['JavaScript', 'Social Media APIs'],
      duration: '2-3 months',
      commitment: '5-8 hours/week',
      submittedBy: {
        name: 'John Smith',
        email: 'john.smith@example.com',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20man%20business%20portrait%20headshot%20corporate%20linkedin%20style%20clean%20background&width=100&height=100&seq=10&orientation=squarish',
        role: 'Junior Developer'
      },
      submittedDate: '2024-01-10',
      status: 'rejected',
      contactInfo: {
        email: 'john.smith@example.com'
      }
    }
  ]);

  const filteredCollaborations = collaborations.filter(collab => collab.status === activeTab);

  const handleApprove = (collabId: string) => {
    setCollaborations(collaborations.map(collab => 
      collab.id === collabId ? { ...collab, status: 'approved' } : collab
    ));
  };

  const handleReject = (collabId: string) => {
    setCollaborations(collaborations.map(collab => 
      collab.id === collabId ? { ...collab, status: 'rejected' } : collab
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Project': return 'bg-blue-100 text-blue-800';
      case 'Research': return 'bg-purple-100 text-purple-800';
      case 'Startup': return 'bg-orange-100 text-orange-800';
      case 'Event': return 'bg-green-100 text-green-800';
      case 'Mentorship': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <Link
                to="/admin"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors duration-200"
              >
                <i className="ri-arrow-left-line mr-2"></i>
                Back to Admin Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Collaboration Requests</h1>
              <p className="text-gray-600 mt-2">Review and approve collaboration opportunities from community members</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'pending', label: 'Pending', count: collaborations.filter(c => c.status === 'pending').length },
                { key: 'approved', label: 'Approved', count: collaborations.filter(c => c.status === 'approved').length },
                { key: 'rejected', label: 'Rejected', count: collaborations.filter(c => c.status === 'rejected').length }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Collaborations List */}
        <div className="space-y-6">
          {filteredCollaborations.map((collaboration) => (
            <div key={collaboration.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{collaboration.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(collaboration.status)}`}>
                      {collaboration.status.charAt(0).toUpperCase() + collaboration.status.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(collaboration.type)}`}>
                      {collaboration.type}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4 line-clamp-2">{collaboration.description}</p>

                  <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <i className="ri-time-line mr-1"></i>
                      {collaboration.duration}
                    </div>
                    <div className="flex items-center">
                      <i className="ri-calendar-check-line mr-1"></i>
                      {collaboration.commitment}
                    </div>
                    <div className="flex items-center">
                      <i className="ri-calendar-line mr-1"></i>
                      {new Date(collaboration.submittedDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {collaboration.skills.slice(0, 4).map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                        {skill}
                      </span>
                    ))}
                    {collaboration.skills.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                        +{collaboration.skills.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={collaboration.submittedBy.avatar}
                        alt={collaboration.submittedBy.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{collaboration.submittedBy.name}</p>
                        <p className="text-xs text-gray-500">{collaboration.submittedBy.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => {
                          setSelectedCollaboration(collaboration);
                          setShowModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm whitespace-nowrap"
                      >
                        <i className="ri-eye-line mr-1"></i>
                        View Details
                      </button>
                      
                      {collaboration.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(collaboration.id)}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium whitespace-nowrap"
                          >
                            <i className="ri-check-line mr-1"></i>
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(collaboration.id)}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm font-medium whitespace-nowrap"
                          >
                            <i className="ri-close-line mr-1"></i>
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredCollaborations.length === 0 && (
            <div className="text-center py-12">
              <i className="ri-team-line text-4xl text-gray-400 mb-4"></i>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No {activeTab} collaborations</h3>
              <p className="text-gray-500">There are no {activeTab} collaboration requests at the moment.</p>
            </div>
          )}
        </div>
      </div>

      {/* Collaboration Details Modal */}
      {showModal && selectedCollaboration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Collaboration Details</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedCollaboration.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedCollaboration.status)}`}>
                      {selectedCollaboration.status.charAt(0).toUpperCase() + selectedCollaboration.status.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(selectedCollaboration.type)}`}>
                      {selectedCollaboration.type}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <p className="text-gray-700 leading-relaxed">{selectedCollaboration.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <p className="text-gray-900">{selectedCollaboration.duration}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time Commitment</label>
                    <p className="text-gray-900">{selectedCollaboration.commitment}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Required Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedCollaboration.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Submitted By</label>
                  <div className="flex items-center space-x-3">
                    <img
                      src={selectedCollaboration.submittedBy.avatar}
                      alt={selectedCollaboration.submittedBy.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{selectedCollaboration.submittedBy.name}</p>
                      <p className="text-sm text-gray-500">{selectedCollaboration.submittedBy.role}</p>
                      <p className="text-sm text-gray-500">{selectedCollaboration.submittedBy.email}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Information</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <i className="ri-mail-line text-gray-400"></i>
                      <span className="text-gray-700">{selectedCollaboration.contactInfo.email}</span>
                    </div>
                    {selectedCollaboration.contactInfo.linkedin && (
                      <div className="flex items-center space-x-2">
                        <i className="ri-linkedin-line text-gray-400"></i>
                        <span className="text-gray-700">{selectedCollaboration.contactInfo.linkedin}</span>
                      </div>
                    )}
                    {selectedCollaboration.contactInfo.github && (
                      <div className="flex items-center space-x-2">
                        <i className="ri-github-line text-gray-400"></i>
                        <span className="text-gray-700">{selectedCollaboration.contactInfo.github}</span>
                      </div>
                    )}
                  </div>
                </div>

                {selectedCollaboration.status === 'pending' && (
                  <div className="flex space-x-3 pt-4 border-t">
                    <button
                      onClick={() => {
                        handleApprove(selectedCollaboration.id);
                        setShowModal(false);
                      }}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium whitespace-nowrap"
                    >
                      <i className="ri-check-line mr-2"></i>
                      Approve Collaboration
                    </button>
                    <button
                      onClick={() => {
                        handleReject(selectedCollaboration.id);
                        setShowModal(false);
                      }}
                      className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium whitespace-nowrap"
                    >
                      <i className="ri-close-line mr-2"></i>
                      Reject Collaboration
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}