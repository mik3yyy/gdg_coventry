
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../../components/feature/Header';
import { Footer } from '../../../components/feature/Footer';
import { Button } from '../../../components/base/Button';

import { useAchievement } from '../../../contexts/AchievementContext';
export default function AdminAchievementsPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<any>(null);



  const {
    achievements,

    addAchievement,
    editAchievement,
    deleteAchievement,
    publishAchievement,
    unpublishAchievement
  } = useAchievement();


  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    icon: 'ri-trophy-line',
    color: '#FBBC05'
  });

  // const [achievements, setAchievements] = useState([
  //   {
  //     id: 1,
  //     title: 'Google I/O Extended 2024',
  //     description: 'Successfully hosted the largest Google I/O Extended event in the Midlands with 200+ attendees.',
  //     date: 'May 2024',
  //     icon: 'ri-trophy-line',
  //     color: '#FBBC05',

  //     status: 'published'
  //   },
  //   {
  //     id: 2,
  //     title: 'DevFest Coventry 2023',
  //     description: 'Organized our first DevFest with 15 speakers and 300+ participants from across the UK.',
  //     date: 'October 2023',
  //     icon: 'ri-medal-line',
  //     color: '#EA4335',

  //     status: 'published'
  //   },
  //   {
  //     id: 3,
  //     title: 'Women Techmakers Partnership',
  //     description: 'Established partnership to promote diversity and inclusion in tech within our community.',
  //     date: 'March 2024',
  //     icon: 'ri-team-line',
  //     color: '#34A853',

  //     status: 'published'
  //   },
  //   {
  //     id: 4,
  //     title: 'University Collaboration',
  //     description: 'Partnered with Coventry University to provide tech workshops for 500+ students.',
  //     date: 'September 2023',
  //     icon: 'ri-graduation-cap-line',
  //     color: '#4285F4',
  //     status: 'published'
  //   },
  //   {
  //     id: 5,
  //     title: 'Cloud Study Jam 2024',
  //     description: 'Completed intensive Google Cloud training program with 80+ participants earning certificates.',
  //     date: 'February 2024',
  //     icon: 'ri-cloud-line',
  //     color: '#9334E9',

  //     status: 'draft'
  //   }
  // ]);

  const iconOptions = [
    { value: 'ri-trophy-line', label: 'Trophy' },
    { value: 'ri-medal-line', label: 'Medal' },
    { value: 'ri-team-line', label: 'Team' },
    { value: 'ri-graduation-cap-line', label: 'Education' },
    { value: 'ri-cloud-line', label: 'Cloud' },
    { value: 'ri-code-line', label: 'Code' },
    { value: 'ri-rocket-line', label: 'Rocket' },
    { value: 'ri-star-line', label: 'Star' },
    { value: 'ri-heart-line', label: 'Heart' },
    { value: 'ri-lightbulb-line', label: 'Innovation' }
  ];

  const colorOptions = [
    { value: '#FBBC05', label: 'Google Yellow' },
    { value: '#EA4335', label: 'Google Red' },
    { value: '#34A853', label: 'Google Green' },
    { value: '#4285F4', label: 'Google Blue' },
    { value: '#9334E9', label: 'Purple' },
    { value: '#F59E0B', label: 'Orange' },
    { value: '#EF4444', label: 'Red' },
    { value: '#10B981', label: 'Emerald' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingAchievement) {

      editAchievement(editingAchievement.id, editingAchievement)
    } else {


      // Add new achievement

      const newAchievement = {
        ...formData,
        status: 'draft' as "published" | "draft"
      };
      addAchievement(newAchievement)
      // setAchievements([newAchievement, ...achievements]);
    }

    setShowAddModal(false);
    setEditingAchievement(null);
    setFormData({
      title: '',
      description: '',
      date: '',
      icon: 'ri-trophy-line',
      color: '#FBBC05'
    });
  };

  const handleEdit = (achievement: any) => {
    setEditingAchievement(achievement);
    setFormData({
      title: achievement.title,
      description: achievement.description,
      date: achievement.date,
      icon: achievement.icon,
      color: achievement.color
    });
    setShowAddModal(true);
  };

  const handleDelete = (id: string) => {
    deleteAchievement(id)
  };

  const toggleStatus = async (id: string) => {
    // Find the achievement that needs to be toggled
    const achievementToToggle = achievements.find(ach => ach.id === id);
    if (!achievementToToggle) return;

    const newStatus = achievementToToggle.status === 'published' ? 'draft' : 'published';

    // Update the status locally
    // setAchievements(achievements.map(achievement =>
    //   achievement.id === id
    //     ? { ...achievement, status: newStatus }
    //     : achievement
    // ));

    // Update the status in Firestore
    if (newStatus === 'published') {
      await publishAchievement(id); // Mark as published
    } else {
      await unpublishAchievement(id); // Mark as draft
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/admin" className="text-[#4285F4] hover:underline">Admin Dashboard</Link>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            <span className="text-gray-600">Community Achievements</span>
          </nav>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Community Achievements</h1>
            <p className="text-gray-600 mt-2">Manage and showcase community milestones and accomplishments</p>
          </div>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-[#4285F4] text-white hover:bg-[#3367D6] whitespace-nowrap"
          >
            <i className="ri-add-line mr-2"></i>
            Add Achievement
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Achievements</p>
                <p className="text-2xl font-bold text-gray-900">{achievements.length}</p>
              </div>
              <div className="w-12 h-12 bg-[#FBBC05]/10 rounded-lg flex items-center justify-center">
                <i className="ri-trophy-line text-xl text-[#FBBC05]"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-gray-900">
                  {achievements.filter(a => a.status === 'published').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#34A853]/10 rounded-lg flex items-center justify-center">
                <i className="ri-check-line text-xl text-[#34A853]"></i>
              </div>
            </div>
          </div>


        </div>

        {/* Achievements List */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">All Achievements</h2>
          </div>

          <div className="divide-y divide-gray-200">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${achievement.color}20` }}
                    >
                      <i className={`${achievement.icon} text-xl`} style={{ color: achievement.color }}></i>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{achievement.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${achievement.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                          }`}>
                          {achievement.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{achievement.description}</p>
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <i className="ri-calendar-line"></i>
                          <span>{achievement.date}</span>
                        </span>

                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => toggleStatus(achievement.id)}
                      className={`${achievement.status === 'published'
                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                        } whitespace-nowrap`}
                    >
                      <i className={`${achievement.status === 'published' ? 'ri-eye-off-line' : 'ri-eye-line'} mr-2`}></i>
                      {achievement.status === 'published' ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button
                      onClick={() => handleEdit(achievement)}
                      className="bg-gray-100 text-gray-700 hover:bg-gray-200 whitespace-nowrap"
                    >
                      <i className="ri-edit-line mr-2"></i>
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(achievement.id)}
                      className="bg-red-100 text-red-700 hover:bg-red-200 whitespace-nowrap"
                    >
                      <i className="ri-delete-line mr-2"></i>
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add/Edit Achievement Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {editingAchievement ? 'Edit Achievement' : 'Add New Achievement'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Achievement Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                  placeholder="Enter achievement title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                  placeholder="Describe the achievement and its impact"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                  placeholder="e.g., May 2024"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon
                  </label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                  >
                    {iconOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color
                  </label>
                  <select
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                  >
                    {colorOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-3">Preview:</p>
                <div className="flex items-start space-x-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${formData.color}20` }}
                  >
                    <i className={`${formData.icon} text-xl`} style={{ color: formData.color }}></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{formData.title || 'Achievement Title'}</h4>
                    <p className="text-gray-600 text-sm">{formData.description || 'Achievement description'}</p>
                    <p className="text-sm font-medium mt-1" style={{ color: formData.color }}>
                      {formData.date || 'Date'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingAchievement(null);
                    setFormData({
                      title: '',
                      description: '',
                      date: '',
                      icon: 'ri-trophy-line',
                      color: '#FBBC05'
                    });
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300 whitespace-nowrap"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-[#4285F4] text-white hover:bg-[#3367D6] whitespace-nowrap"
                >
                  {editingAchievement ? 'Update Achievement' : 'Add Achievement'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
