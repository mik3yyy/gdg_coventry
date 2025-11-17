

import { useEffect, useState, type FormEvent, type ChangeEvent } from 'react';
import { Header } from '../../../components/feature/Header';
import { Footer } from '../../../components/feature/Footer';
import { Button } from '../../../components/base/Button';
import { Link } from 'react-router-dom';
import { useMentorContext, type Mentor } from '../../../contexts/MentorContext';
import { PublicMentorCard } from './PubliicMentorCard';
import { db } from '../../../firebase';
import { useAuth } from '../../../contexts/AuthContext';

export default function MentorsPage() {

  const { mentors, listMentors, addMentorRequest } = useMentorContext()

  const { user } = useAuth()
  useEffect(() => {
    listMentors()
  }, [])
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');


  const expertiseOptions = [
    'All', 'Flutter', 'React', 'Android', 'Google Cloud', 'Machine Learning',
    'DevOps', 'Mobile Development', 'Web Development', 'AI/ML', 'Cloud'
  ];

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesExpertise = selectedExpertise === '' || selectedExpertise === 'All' ||
      mentor.expertise.includes(selectedExpertise);

    return matchesSearch && matchesExpertise;
  });

  const handleRequestMentorship = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setShowRequestForm(true);
    setFormData({ from_name: '', from_email: '', message: '' });
    setSubmitStatus('');
  };

  const handleCloseForm = () => {
    setShowRequestForm(false);
    setSelectedMentor(null);
    setFormData({ from_name: '', from_email: '', message: '' });
    setSubmitStatus('');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const currentUserEmail = user?.email || ""  // auth email

      const payload = {
        from_name: formData.from_name,
        from_email: formData.from_email,
        from_user_email: currentUserEmail,
        to_name: selectedMentor?.name,
        to_email: selectedMentor?.email,
        to_user_email: selectedMentor?.user_email,
        message: formData.message,
        created_at: new Date().toISOString(),
        status: "pending"
      }

      await addMentorRequest(payload)

      setSubmitStatus('success')
      setFormData({ from_name: '', from_email: '', message: '' })

      setTimeout(() => {
        handleCloseForm()
      }, 2000)
    } catch (err) {
      console.log(err)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/dashboard" className="text-[#4285F4] hover:underline">Dashboard</Link>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            <span className="text-gray-600">Find a Mentor</span>
          </nav>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Find a Mentor
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Connect with experienced developers who can guide you in your tech journey. Get personalized advice and accelerate your learning.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  Search Mentors
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm"
                    placeholder="Search by name, title, or expertise..."
                  />
                  <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
              </div>

              <div>
                <label htmlFor="expertise" className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Expertise
                </label>
                <select
                  id="expertise"
                  value={selectedExpertise}
                  onChange={(e) => setSelectedExpertise(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm pr-8"
                >
                  {expertiseOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Mentors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMentors.map(m => (
              <PublicMentorCard key={m.id} mentor={m} onRequest={handleRequestMentorship} />
            ))}

          </div>

          {filteredMentors.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(66, 133, 244, 0.1)' }}>
                <i className="ri-user-search-line text-3xl" style={{ color: '#4285F4' }}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No mentors found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or browse all mentors.</p>
            </div>
          )}
        </div>
      </section>

      {/* Mentorship Request Form Modal */}
      {showRequestForm && selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Request Mentorship</h3>
                <button
                  onClick={handleCloseForm}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <i className="ri-close-line text-gray-600"></i>
                </button>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-900">{selectedMentor?.name}</h4>
                <p className="text-sm text-gray-600">{selectedMentor?.title} @ {selectedMentor?.company}</p>
                <p className="text-xs text-gray-500 mt-1">Contact Email: {selectedMentor?.email}</p>
              </div>

              <form id="mentorship-request-form" onSubmit={handleSubmit} className="space-y-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                  <input
                    type="text"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Email (public reach email) *</label>
                  <input
                    type="email"
                    name="from_email"
                    value={formData.from_email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm resize-none"
                    placeholder="Tell the mentor what you need help with..."
                  />
                  <p className="text-xs text-gray-500 mt-1">{formData.message.length}/500 characters</p>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 whitespace-nowrap"
                  >
                    Cancel
                  </button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-[#4285F4] text-white hover:bg-[#3367D6] whitespace-nowrap"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Request'}
                  </Button>
                </div>

                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                    <i className="ri-check-circle-line mr-2"></i>
                    Mentorship request sent successfully!
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    <i className="ri-error-warning-line mr-2"></i>
                    Something went wrong. Try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}


      <Footer />
    </div>
  );
}

