
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../../components/feature/Header';
import { Footer } from '../../../components/feature/Footer';
import { useMentorContext, type Mentor } from '../../../contexts/MentorContext';
import { MentorCard } from './local-component/MentorCard';
import MentorModal from './local-component/MentorModel';
import MentorMessageModal from './local-component/MentorMessage';

export interface MentorMessage {
  id: string;
  mentorId: string;
  mentor: {
    name: string;
    email: string;
    avatar: string;
    expertise: string[];
    company: string;
    position: string;
  };
  sender: {
    name: string;
    email: string;
    avatar: string;
  };
  subject: string;
  message: string;
  sentDate: string;
  status: 'unread' | 'read' | 'replied';
  priority: 'low' | 'medium' | 'high';
  category: 'mentorship_request' | 'general_inquiry' | 'collaboration' | 'feedback';
}

// interface Mentor {
//   id: string;
//   name: string;
//   email: string;
//   avatar: string;
//   expertise: string[];
//   company: string;
//   position: string;
//   bio: string;
//   rating: number;
//   totalMentees: number;
//   activeMentees: number;
//   joinedDate: string;
//   status: 'active' | 'inactive';
//   linkedin?: string;
//   github?: string;
//   totalMessages: number;
//   unreadMessages: number;
// }

export default function MentorManagementPage() {


  const { mentors, listMentors, updateMentor, loadingMentors, deleteMentor, listMentorRequests, mentorRequests } = useMentorContext()

  useEffect(() => {
    listMentors()
    listMentorRequests()
  }, [])
  const [mentorStatusTab, setMentorStatusTab] = useState<"pending" | "approved" | "rejected">("pending")
  const pendingList = mentors.filter(m => m.status === "pending")
  const approvedList = mentors.filter(m => m.status === "approved")
  const rejectedList = mentors.filter(m => m.status === "rejected")

  const filteredMentors = mentors.filter(m => m.status === mentorStatusTab)




  const [activeTab, setActiveTab] = useState<'messages' | 'mentors'>('messages');
  const [messageTab, setMessageTab] = useState<'unread' | 'read' | 'replied'>('unread');
  const [selectedMessage, setSelectedMessage] = useState<MentorMessage | null>(null);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showMentorModal, setShowMentorModal] = useState(false);

  const [mentorMessages, setMentorMessages] = useState<MentorMessage[]>([
    {
      id: '1',
      mentorId: '1',
      mentor: {
        name: 'Dr. James Rodriguez',
        email: 'james.rodriguez@university.edu',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20hispanic%20man%20professor%20computer%20science%20business%20portrait%20headshot%20corporate%20linkedin%20style%20clean%20background&width=100&height=100&seq=14&orientation=squarish',
        expertise: ['Computer Science', 'Algorithms', 'Academic Research'],
        company: 'University of Technology',
        position: 'Professor of Computer Science'
      },
      sender: {
        name: 'Emily Chen',
        email: 'emily.chen@student.edu',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20young%20asian%20woman%20student%20business%20portrait%20headshot%20corporate%20linkedin%20style%20clean%20background&width=100&height=100&seq=17&orientation=squarish'
      },
      subject: 'PhD Research Guidance Request',
      message: 'Dear Dr. Rodriguez, I am a PhD student working on machine learning algorithms for healthcare applications. I would love to discuss my research direction and get your insights on the current challenges in this field. Would you be available for a mentorship session?',
      sentDate: '2024-01-16',
      status: 'unread',
      priority: 'high',
      category: 'mentorship_request'
    },
    {
      id: '2',
      mentorId: '2',
      mentor: {
        name: 'Lisa Thompson',
        email: 'lisa.thompson@startup.com',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20woman%20startup%20founder%20business%20portrait%20headshot%20corporate%20linkedin%20style%20clean%20background&width=100&height=100&seq=15&orientation=squarish',
        expertise: ['Entrepreneurship', 'Product Management', 'Startup Strategy'],
        company: 'InnovateTech',
        position: 'Founder & CEO'
      },
      sender: {
        name: 'Michael Park',
        email: 'michael.park@entrepreneur.com',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20young%20man%20entrepreneur%20business%20portrait%20headshot%20corporate%20linkedin%20style%20clean%20background&width=100&height=100&seq=18&orientation=squarish'
      },
      subject: 'Startup Funding Strategy Discussion',
      message: 'Hi Lisa, I\'m launching a fintech startup and would appreciate your guidance on fundraising strategies. Your experience with successful exits would be invaluable. Could we schedule a mentorship call?',
      sentDate: '2024-01-15',
      status: 'unread',
      priority: 'medium',
      category: 'mentorship_request'
    },
    {
      id: '3',
      mentorId: '3',
      mentor: {
        name: 'David Park',
        email: 'david.park@cloudtech.com',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20asian%20man%20cloud%20engineer%20business%20portrait%20headshot%20corporate%20linkedin%20style%20clean%20background&width=100&height=100&seq=16&orientation=squarish',
        expertise: ['Cloud Architecture', 'DevOps', 'AWS', 'Kubernetes'],
        company: 'CloudTech Solutions',
        position: 'Principal Cloud Architect'
      },
      sender: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@developer.com',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20woman%20software%20developer%20business%20portrait%20headshot%20corporate%20linkedin%20style%20clean%20background&width=100&height=100&seq=19&orientation=squarish'
      },
      subject: 'Cloud Migration Best Practices',
      message: 'Hello David, I\'m leading a cloud migration project at my company and would love to learn from your expertise. Could you share some insights on best practices for migrating legacy systems to AWS?',
      sentDate: '2024-01-14',
      status: 'read',
      priority: 'medium',
      category: 'general_inquiry'
    },
    {
      id: '4',
      mentorId: '1',
      mentor: {
        name: 'Dr. James Rodriguez',
        email: 'james.rodriguez@university.edu',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20hispanic%20man%20professor%20computer%20science%20business%20portrait%20headshot%20corporate%20linkedin%20style%20clean%20background&width=100&height=100&seq=14&orientation=squarish',
        expertise: ['Computer Science', 'Algorithms', 'Academic Research'],
        company: 'University of Technology',
        position: 'Professor of Computer Science'
      },
      sender: {
        name: 'Alex Thompson',
        email: 'alex.thompson@researcher.com',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20young%20man%20researcher%20business%20portrait%20headshot%20corporate%20linkedin%20style%20clean%20background&width=100&height=100&seq=20&orientation=squarish'
      },
      subject: 'Research Collaboration Opportunity',
      message: 'Dear Professor Rodriguez, I\'m working on a research project about distributed algorithms and would like to explore potential collaboration opportunities. Your recent publications align perfectly with our research goals.',
      sentDate: '2024-01-13',
      status: 'replied',
      priority: 'high',
      category: 'collaboration'
    },
    {
      id: '5',
      mentorId: '2',
      mentor: {
        name: 'Lisa Thompson',
        email: 'lisa.thompson@startup.com',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20woman%20startup%20founder%20business%20portrait%20headshot%20corporate%20linkedin%20style%20clean%20background&width=100&height=100&seq=15&orientation=squarish',
        expertise: ['Entrepreneurship', 'Product Management', 'Startup Strategy'],
        company: 'InnovateTech',
        position: 'Founder & CEO'
      },
      sender: {
        name: 'Jennifer Lee',
        email: 'jennifer.lee@feedback.com',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20woman%20business%20analyst%20business%20portrait%20headshot%20corporate%20linkedin%20style%20clean%20background&width=100&height=100&seq=21&orientation=squarish'
      },
      subject: 'Mentorship Program Feedback',
      message: 'Hi Lisa, I wanted to share my positive experience with the mentorship program. Your guidance has been instrumental in helping me navigate my career transition into product management. Thank you!',
      sentDate: '2024-01-12',
      status: 'read',
      priority: 'low',
      category: 'feedback'
    }
  ]);

  // const [mentors, setMentors] = useState<Mentor[]>([
  //   {
  //     id: '1',
  //     name: 'Dr. James Rodriguez',
  //     email: 'james.rodriguez@university.edu',
  //     avatar: 'https://readdy.ai/api/search-image?query=professional%20hispanic%20man%20professor%20computer%20science%20business%20portrait%20headshot%20corporate%20linkedin%20style%20clean%20background&width=100&height=100&seq=14&orientation=squarish',
  //     expertise: ['Computer Science', 'Algorithms', 'Academic Research', 'PhD Guidance'],
  //     company: 'University of Technology',
  //     position: 'Professor of Computer Science',
  //     bio: 'Computer Science professor with 15+ years of experience in academia and industry research.',
  //     rating: 4.9,
  //     totalMentees: 45,
  //     activeMentees: 8,
  //     joinedDate: '2023-06-15',
  //     status: 'active',
  //     linkedin: 'linkedin.com/in/jamesrodriguez',
  //     totalMessages: 23,
  //     unreadMessages: 3
  //   },
  //   {
  //     id: '2',
  //     name: 'Lisa Thompson',
  //     email: 'lisa.thompson@startup.com',
  //     avatar: 'https://readdy.ai/api/search-image?query=professional%20woman%20startup%20founder%20business%20portrait%20headshot%20corporate%20linkedin%20style%20clean%20background&width=100&height=100&seq=15&orientation=squarish',
  //     expertise: ['Entrepreneurship', 'Product Management', 'Startup Strategy', 'Fundraising'],
  //     company: 'InnovateTech',
  //     position: 'Founder & CEO',
  //     bio: 'Serial entrepreneur with 3 successful exits. Passionate about helping others build impactful businesses.',
  //     rating: 4.8,
  //     totalMentees: 32,
  //     activeMentees: 6,
  //     joinedDate: '2023-08-20',
  //     status: 'active',
  //     linkedin: 'linkedin.com/in/lisathompson',
  //     totalMessages: 18,
  //     unreadMessages: 2
  //   },
  //   {
  //     id: '3',
  //     name: 'David Park',
  //     email: 'david.park@cloudtech.com',
  //     avatar: 'https://readdy.ai/api/search-image?query=professional%20asian%20man%20cloud%20engineer%20business%20portrait%20headshot%20corporate%20linkedin%20style%20clean%20background&width=100&height=100&seq=16&orientation=squarish',
  //     expertise: ['Cloud Architecture', 'DevOps', 'AWS', 'Kubernetes', 'Infrastructure'],
  //     company: 'CloudTech Solutions',
  //     position: 'Principal Cloud Architect',
  //     bio: 'Cloud infrastructure expert helping organizations scale their technology platforms.',
  //     rating: 4.7,
  //     totalMentees: 28,
  //     activeMentees: 5,
  //     joinedDate: '2023-09-10',
  //     status: 'active',
  //     linkedin: 'linkedin.com/in/davidpark',
  //     github: 'github.com/davidpark',
  //     totalMessages: 15,
  //     unreadMessages: 1
  //   }
  // ]);

  const filteredMessages = mentorMessages.filter(message => message.status === messageTab);

  const markAsRead = (messageId: string) => {
    setMentorMessages(mentorMessages.map(message =>
      message.id === messageId ? { ...message, status: 'read' } : message
    ));
  };

  const markAsReplied = (messageId: string) => {
    setMentorMessages(mentorMessages.map(message =>
      message.id === messageId ? { ...message, status: 'replied' } : message
    ));
  };

  // const toggleMentorStatus = (mentorId: string) => {
  //   setMentors(mentors.map(mentor =>
  //     mentor.id === mentorId
  //       ? { ...mentor, status: mentor.status === 'active' ? 'inactive' : 'active' }
  //       : mentor
  //   ));
  // };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-red-100 text-red-800';
      case 'read': return 'bg-blue-100 text-blue-800';
      case 'replied': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'mentorship_request': return 'bg-purple-100 text-purple-800';
      case 'general_inquiry': return 'bg-blue-100 text-blue-800';
      case 'collaboration': return 'bg-orange-100 text-orange-800';
      case 'feedback': return 'bg-green-100 text-green-800';
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
              <h1 className="text-3xl font-bold text-gray-900">Mentor Management</h1>
              <p className="text-gray-600 mt-2">View mentor messages and manage active mentors in the community</p>
            </div>
          </div>
        </div>

        {/* Main Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'messages', label: 'Mentor Messages', count: mentorRequests.length },
                { key: 'mentors', label: 'Mentors', count: mentors.length }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {tab.label} {tab.key === 'messages' && tab.count > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {tab.count}
                    </span>
                  )}
                  {tab.key === 'mentors' && (
                    <span className="ml-2 text-gray-500">({tab.count})</span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Mentor Messages Tab */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            {/* <h2 className="text-xl font-semibold text-gray-900 mb-4">Mentorship Requests</h2> */}

            {mentorRequests.map((req) => (
              <div key={req.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">

                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">{req.from_name} → {req.to_name}</h3>
                    </div>

                    <div className="flex items-center space-x-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{req.from_email}</p>
                        <p className="text-xs text-gray-500">Requester Email</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        <i className="ri-arrow-right-line mx-2"></i>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{req.to_email}</p>
                        <p className="text-xs text-gray-500">Mentor Email</p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 whitespace-pre-line">{req.message}</p>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <i className="ri-calendar-line mr-1"></i>
                        {new Date(req.created_at).toLocaleDateString()}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            ))}

            {mentorRequests.length === 0 && (
              <div className="text-center py-12">
                <i className="ri-message-line text-4xl text-gray-400 mb-4"></i>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No mentorship requests</h3>
                <p className="text-gray-500">Users haven’t requested mentorship yet.</p>
              </div>
            )}
          </div>
        )}


        {/* Mentors Tab */}
        {activeTab === "mentors" && (
          <div>

            {/* Status Filter Tabs */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { key: "pending", label: "Pending" },
                    { key: "approved", label: "Approved" },
                    { key: "rejected", label: "Rejected" },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setMentorStatusTab(tab.key as any)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${mentorStatusTab === tab.key
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* LIST rendering */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loadingMentors ? (
                <div className="text-center py-20 text-gray-500 col-span-full">Loading mentors...</div>
              ) : filteredMentors.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <i className="ri-user-line text-4xl text-gray-400 mb-4"></i>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No {mentorStatusTab} mentors</h3>
                  <p className="text-gray-500">Mentors will appear here based on selected status.</p>
                </div>
              ) : (
                filteredMentors.map((mentor) => (
                  <MentorCard
                    key={mentor.id}
                    mentor={mentor}
                    statusColorClass={getStatusColor}
                    onView={() => { setSelectedMentor(mentor); setShowMentorModal(true) }}
                    onApprove={(id) => updateMentor(id, { status: "approved" })}
                    onReject={(id, reason) => updateMentor(id, { status: "rejected", rejected_reason: reason })}
                    onDelete={(id) => deleteMentor(id)}
                  />

                ))
              )}
            </div>
          </div>
        )}

      </div>

      {/* Message Details Modal */}
      {showMessageModal && selectedMessage && (
        <MentorMessageModal
          message={selectedMessage}
          onClose={() => setShowMessageModal(false)}
          getStatusColor={getStatusColor}
          getPriorityColor={getPriorityColor}
          getCategoryColor={getCategoryColor}
          markAsRead={markAsRead}
          markAsReplied={markAsReplied}
        />
      )}


      {/* Mentor Profile Modal */}
      {showMentorModal && selectedMentor && (
        <MentorModal
          mentor={selectedMentor}
          onClose={() => setShowMentorModal(false)}
        />
      )}


      <Footer />
    </div>
  );
}
