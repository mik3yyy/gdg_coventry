

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../../components/feature/Header';
import { Footer } from '../../../components/feature/Footer';
import { Button } from '../../../components/base/Button';
import { useAuth } from '../../../contexts/AuthContext';
import { useOrganizers } from "../../../contexts/OrganizerContext"

import type { Organizer } from "../../../contexts/OrganizerContext"




export default function OrganizersPage() {
  // const { user, session } = useAuth();
  // const [organizers, setOrganizers] = useState<Organizer[]>([]);
  // const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingOrganizer, setEditingOrganizer] = useState<Organizer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [submitting, setSubmitting] = useState(false);
  const { organizers, loading, addOrganizer, updateOrganizer, fetchOrganizers } = useOrganizers()

  // Form state
  const [formData, setFormData] = useState({
    // name: '',
    email: '',
    role: '',
    permissions: ''
  });
  // ADD ORGANIZER
  // ADD ORGANIZER
  const handleAddOrganizer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.role || formData.permissions.length === 0) {
      alert("Please fill in all required fields");
      return;
    }

    // Check if the email already exists in the organizers state
    const existingOrganizer = organizers.find((org) => org.email === formData.email);

    if (existingOrganizer) {
      alert("An organizer with this email already exists.");
      return;  // Exit function if email is duplicate
    }

    setSubmitting(true);
    await addOrganizer({
      email: formData.email,
      role: formData.role as "lead" | "events" | "community" | "technical" | "marketing",
      permissions: formData.permissions as "admin" | "super-admin",
    });
    setSubmitting(false);
    setShowAddModal(false);
    setFormData({ email: "", role: "", permissions: '' });
  };



  // UPDATE ORGANIZER
  const handleUpdateOrganizer = async (e: React.FormEvent) => {
    console.log("DEV")
    e.preventDefault()
    if (!editingOrganizer) return
    if (!formData.email || !formData.role || formData.permissions.length === 0) {
      alert("Please fill in all required fields")
      return
    }
    console.log(formData)
    console.log({

      email: formData.email,
      role: formData.role as "lead" | "events" | "community" | "technical" | "marketing",
      permissions: formData.permissions as "admin" | "super-admin",
    })
    setSubmitting(true)
    await updateOrganizer(editingOrganizer.id, {

      email: formData.email,
      role: formData.role as "lead" | "events" | "community" | "technical" | "marketing",
      permissions: formData.permissions as "admin" | "super-admin",
    })
    setSubmitting(false)
    setShowEditModal(false)
    setEditingOrganizer(null)
  }

  const handleEditOrganizer = (organizer: Organizer) => {
    setEditingOrganizer(organizer);
    setFormData({
      // name: organizer.name,
      email: organizer.email,
      role: organizer.role,
      permissions: organizer.permissions
    });
    setShowEditModal(true);
  };

  const roleColors = {
    'Lead Organizer': 'bg-[#EA4335]/10 text-[#EA4335]',
    'Event Coordinator': 'bg-[#4285F4]/10 text-[#4285F4]',
    'Community Manager': 'bg-[#34A853]/10 text-[#34A853]',
    'Technical Lead': 'bg-[#9334E9]/10 text-[#9334E9]',
    'Marketing Coordinator': 'bg-[#FBBC05]/10 text-[#FBBC05]'
  };

  const permissionLabels = {
    admin: 'Admin',
    'super-admin': 'Super Admin',
  };


  useEffect(() => {
    fetchOrganizers();
  }, []);




  const handlePermissionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPermission = e.target.value;
    setFormData({
      ...formData,
      permissions: selectedPermission, // Update the permissions field with the selected value
    });
  };


  const formatLastActive = (lastActive?: string) => {
    // handle missing or placeholder values
    if (!lastActive || lastActive === 'N/A') return 'Unknown';

    const date = new Date(lastActive);
    if (isNaN(date.getTime())) return 'Unknown';

    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)} days ago`;
    return `${Math.floor(diffInHours / 168)} weeks ago`;
  };

  const filteredOrganizers = organizers.filter(organizer => {
    const matchesSearch = organizer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      organizer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || organizer.role === filterRole;
    return matchesSearch && matchesRole;
  });




  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4285F4] mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading organizers...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link to="/admin" className="hover:text-gray-700">Admin Dashboard</Link>
          <i className="ri-arrow-right-s-line"></i>
          <span className="text-gray-900">Organizers</span>
        </nav>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Organizers</h1>
            <p className="text-gray-600 mt-2">Manage team members, roles and permissions</p>
          </div>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-[#4285F4] text-white px-6 py-3 rounded-lg hover:bg-[#3367D6] transition-colors duration-200 whitespace-nowrap"
          >
            <i className="ri-add-line mr-2"></i>
            Add Organizer
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search organizers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm pr-8"
              >
                {/* "lead" | "events" | "community" | "technical" | "marketing", */}
                <option value="all">All Roles</option>
                <option value="lead">Lead Organizer</option>
                <option value="events">Event Coordinator</option>
                <option value="community">Community Manager</option>
                <option value="technical">Technical Lead</option>
                <option value="marketing">Marketing Coordinator</option>
              </select>
            </div>
          </div>
        </div>

        {/* Organizers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrganizers.map((organizer) => (
            <div key={organizer.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {/* <img
                    src={organizer.avatar_url}
                    alt={organizer.name}
                    className="w-12 h-12 rounded-full object-cover"
                  /> */}
                  <div>
                    {/* <h3 className="font-semibold text-gray-900">{organizer.name}</h3> */}
                    <p className="text-sm text-gray-500">{organizer.email}</p>
                  </div>
                </div>
                {/* <div className={`w-3 h-3 rounded-full ${organizer.status === 'active' ? 'bg-[#34A853]' : 'bg-gray-400'}`}></div> */}
              </div>

              <div className="space-y-3">
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${roleColors[organizer.role as keyof typeof roleColors]}`}>
                    {organizer.role}
                  </span>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Permissions:</p>
                  <div className="flex flex-wrap gap-1">
                    <span
                      // key={permission}
                      className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                    >
                      {permissionLabels[organizer.permissions as keyof typeof permissionLabels]}
                    </span>
                    {/* {organizer.permissions.map((permission) => (
                     
                    ))} */}
                  </div>
                </div>

                {/* <div className="text-sm text-gray-500">
                  <p>Joined: {new Date(organizer.join_date).toLocaleDateString()}</p>
                  <p>Last active: {formatLastActive(organizer.last_active)}</p>
                </div> */}
              </div>

              <div className="mt-6 flex space-x-2">
                <button
                  onClick={() => handleEditOrganizer(organizer)}
                  className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium whitespace-nowrap"
                >
                  <i className="ri-edit-line mr-1"></i>
                  Edit
                </button>
                <button className="px-3 py-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                  <i className="ri-more-line"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredOrganizers.length === 0 && !loading && (
          <div className="text-center py-12">
            <i className="ri-team-line text-4xl text-gray-400 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No organizers found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Add Organizer Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Add New Organizer</h2>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <i className="ri-close-line text-xl"></i>
                  </button>
                </div>

                <form onSubmit={handleAddOrganizer} className="space-y-4">
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm"
                      placeholder="Enter full name"
                      required
                    />
                  </div> */}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm"
                      placeholder="Enter email address"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm pr-8"
                      required
                    >
                      {/* "lead" | "events" | "community" | "technical" | "marketing", */}
                      <option value="all">All Roles</option>
                      <option value="lead">Lead Organizer</option>
                      <option value="events">Event Coordinator</option>
                      <option value="community">Community Manager</option>
                      <option value="technical">Technical Lead</option>
                      <option value="marketing">Marketing Coordinator</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Permissions *
                    </label>
                    <div className="space-y-2">
                      {/* Single select dropdown for permissions */}
                      <select
                        value={formData.permissions}
                        onChange={handlePermissionChange}
                        className="block w-full rounded border-gray-300 text-gray-700 focus:ring-[#4285F4]"
                      >
                        <option value="">Select a permission</option> {/* Default placeholder */}
                        {['admin', 'super-admin'].map((permission) => (
                          <option key={permission} value={permission}>
                            {permissionLabels[permission as keyof typeof permissionLabels]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 whitespace-nowrap"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 bg-[#4285F4] text-white px-4 py-2 rounded-lg hover:bg-[#3367D6] transition-colors duration-200 whitespace-nowrap disabled:opacity-50"
                    >
                      {submitting ? 'Adding...' : 'Add Organizer'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Edit Organizer Modal */}
        {showEditModal && editingOrganizer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Edit Organizer</h2>
                  <button
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingOrganizer(null);
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <i className="ri-close-line text-xl"></i>
                  </button>
                </div>

                <form onSubmit={handleUpdateOrganizer} className="space-y-4">
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm"
                      placeholder="Enter full name"
                      required
                    />
                  </div> */}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm"
                      placeholder="Enter email address"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm pr-8"
                      required
                    >
                      {/* "lead" | "events" | "community" | "technical" | "marketing", */}
                      <option value="all">All Roles</option>
                      <option value="lead">Lead Organizer</option>
                      <option value="events">Event Coordinator</option>
                      <option value="community">Community Manager</option>
                      <option value="technical">Technical Lead</option>
                      <option value="marketing">Marketing Coordinator</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Permissions *
                    </label>
                    <div className="space-y-2">
                      {/* Single select dropdown for permissions */}
                      <select
                        value={formData.permissions}
                        onChange={handlePermissionChange}
                        className="block w-full rounded border-gray-300 text-gray-700 focus:ring-[#4285F4]"
                      >
                        <option value="">Select a permission</option> {/* Default placeholder */}
                        {['admin', 'super-admin'].map((permission) => (
                          <option key={permission} value={permission}>
                            {permissionLabels[permission as keyof typeof permissionLabels]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={editingOrganizer.status}
                      onChange={(e) => setEditingOrganizer(prev => prev ? { ...prev, status: e.target.value as 'active' | 'inactive' } : null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm pr-8"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div> */}

                  <div className="flex space-x-3 pt-4">
                    <Button
                      type="button"
                      onClick={() => {
                        setShowEditModal(false);
                        setEditingOrganizer(null);
                      }}
                      className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 whitespace-nowrap"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 bg-[#4285F4] text-white px-4 py-2 rounded-lg hover:bg-[#3367D6] transition-colors duration-200 whitespace-nowrap disabled:opacity-50"
                    >
                      {submitting ? 'Updating...' : 'Update Organizer'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

