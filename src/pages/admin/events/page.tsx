
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../../components/feature/Header';
import { Footer } from '../../../components/feature/Footer';
import { Button } from '../../../components/base/Button';
import { useEvents } from '../../../contexts/EventsProvider';
function getEventStatus(date: string | undefined, time: string | undefined): "upcoming" | "completed" {
  if (!date || !time) return "upcoming";

  const now = new Date();
  const eventDateTime = new Date(`${date}T${time}`);

  return eventDateTime > now ? "upcoming" : "completed";
}
export default function AdminEventsPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    type: 'workshop',
    capacity: '',
    registrationLink: '',
    image: '', // initially no file
  });

  type EventData = {
    id?: string;
    title: string;
    image: File | string;   // 👈 can be either a File or URL string
    description: string;
    date: string;
    time: string;
    location: string;
    eventType: string;
    capacity: number;
    link: string;
    createdAt?: Date;
  };

  const { addEvent, events, updateEvent, deleteEvent } = useEvents();


  const eventTypes = [
    { value: 'workshop', label: 'Workshop', color: '#4285F4' },
    { value: 'conference', label: 'Conference', color: '#EA4335' },
    { value: 'study-group', label: 'Study Group', color: '#34A853' },
    { value: 'masterclass', label: 'Masterclass', color: '#FBBC05' },
    { value: 'networking', label: 'Networking', color: '#9334E9' },
    { value: 'hackathon', label: 'Hackathon', color: '#F59E0B' }
  ];


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingEvent) {
      // Update existing event

    } else {
      // Add new event

    }

    setShowAddModal(false);
    setEditingEvent(null);
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      type: 'workshop',
      capacity: '',
      registrationLink: '',
      image: ''
    });
  };

  const handleEdit = (event: any) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      type: event.type,
      capacity: event.capacity.toString(),
      registrationLink: event.registrationLink,
      image: event.image
    });
    setShowAddModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
    }
  };

  const getEventTypeColor = (type: string) => {
    const eventType = eventTypes.find(t => t.value === type);
    return eventType ? eventType.color : '#4285F4';
  };

  const getEventTypeLabel = (type: string) => {
    const eventType = eventTypes.find(t => t.value === type);
    return eventType ? eventType.label : type;
  };
  const now = new Date();

  const upcomingEvents = events.filter((e) => {
    if (!e.date || !e.time) return false;

    // Combine date and time fields into one Date object
    const eventDateTime = new Date(`${e.date}T${e.time}`);

    // Keep events whose datetime is still in the future
    return eventDateTime > now;
  });
  const completedEvents = events.filter((e) => {
    if (!e.date || !e.time) return false;

    // Combine date and time fields into one Date object
    const eventDateTime = new Date(`${e.date}T${e.time}`);

    // Keep events whose datetime is still in the future
    return eventDateTime < now;
  });
  // const completedEvents = events.filter(e => e.status === 'completed');


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/admin" className="text-[#4285F4] hover:underline">Admin Dashboard</Link>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            <span className="text-gray-600">Events Management</span>
          </nav>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Events Management</h1>
            <p className="text-gray-600 mt-2">Create, manage, and track community events</p>
          </div>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-[#4285F4] text-white hover:bg-[#3367D6] whitespace-nowrap"
          >
            <i className="ri-add-line mr-2"></i>
            Add New Event
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-2xl font-bold text-gray-900">{events.length}</p>
              </div>
              <div className="w-12 h-12 bg-[#4285F4]/10 rounded-lg flex items-center justify-center">
                <i className="ri-calendar-line text-xl text-[#4285F4]"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
                <p className="text-2xl font-bold text-gray-900">{upcomingEvents.length}</p>
              </div>
              <div className="w-12 h-12 bg-[#34A853]/10 rounded-lg flex items-center justify-center">
                <i className="ri-calendar-check-line text-xl text-[#34A853]"></i>
              </div>
            </div>
          </div>
          {/* 
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Registrations</p>
                <p className="text-2xl font-bold text-gray-900">
                  {events.reduce((sum, e) => sum + e.registered, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#FBBC05]/10 rounded-lg flex items-center justify-center">
                <i className="ri-user-line text-xl text-[#FBBC05]"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Attendance</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round((events.reduce((sum, e) => sum + e.registered, 0) / events.length) || 0)}%
                </p>
              </div>
              <div className="w-12 h-12 bg-[#EA4335]/10 rounded-lg flex items-center justify-center">
                <i className="ri-bar-chart-line text-xl text-[#EA4335]"></i>
              </div>
            </div>
          </div> */}
        </div>

        {/* Events List */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">All Events</h2>
          </div>

          <div className="divide-y divide-gray-200">
            {events.map((event) => (
              <div key={event.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Event Image */}
                  <div className="lg:w-1/4">
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="lg:w-3/4">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                          <span
                            className="px-3 py-1 rounded-full text-xs font-medium text-white"
                            style={{ backgroundColor: getEventTypeColor(event.eventType) }}
                          >
                            {getEventTypeLabel(event.eventType)}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEventStatus(event.date, event.time) === 'upcoming'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                            }`}>
                            {getEventStatus(event.date, event.time)}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{event.description}</p>
                      </div>
                    </div>

                    {/* Event Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <i className="ri-calendar-line text-[#4285F4]"></i>
                        <span>{event.date} at {event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <i className="ri-map-pin-line text-[#EA4335]"></i>
                        <span>{event.location}</span>
                      </div>

                    </div>

                    {/* Registration Progress */}


                    {/* Registration Link */}
                    <div className="mb-4">
                      <a
                        href={event.link}
                        className="text-[#4285F4] hover:underline text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="ri-external-link-line mr-1"></i>
                        {event.link}
                      </a>
                    </div>
                    {/* --- Image Upload --- */}


                    {/* Actions */}
                    <div className="flex items-center space-x-3">
                      <Button
                        onClick={() => handleEdit(event)}
                        className="bg-gray-100 text-gray-700 hover:bg-gray-200 whitespace-nowrap"
                      >
                        <i className="ri-edit-line mr-2"></i>
                        Edit Event
                      </Button>
                      <Button
                        onClick={() => handleDelete(event.id)}
                        className="bg-red-100 text-red-700 hover:bg-red-200 whitespace-nowrap"
                      >
                        <i className="ri-delete-line mr-2"></i>
                        Delete
                      </Button>
                      <Button className="bg-[#4285F4] text-white hover:bg-[#3367D6] whitespace-nowrap">
                        <i className="ri-download-line mr-2"></i>
                        Export Attendees
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add/Edit Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {editingEvent ? 'Edit Event' : 'Add New Event'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                  placeholder="Enter event title"
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
                  placeholder="Describe the event"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFormData({ ...formData, image: (file.name) });
                    }
                  }}
                  className="w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                />
                {formData.image && typeof formData.image !== "string" && (
                  <p className="text-xs text-gray-500 mt-1">
                    Selected: {formData.image}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                  placeholder="Event location or online platform"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                  >
                    {eventTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacity
                  </label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                    placeholder="Maximum attendees"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Link
                </label>
                <input
                  type="url"
                  value={formData.registrationLink}
                  onChange={(e) => setFormData({ ...formData, registrationLink: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                  placeholder="https://gdgcoventry.dev/events/..."
                  required
                />
              </div>

              <div className="flex space-x-4">
                <Button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingEvent(null);
                    setFormData({
                      title: '',
                      description: '',
                      date: '',
                      time: '',
                      location: '',
                      type: 'workshop',
                      capacity: '',
                      registrationLink: '',
                      image: ''
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
                  {editingEvent ? 'Update Event' : 'Create Event'}
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
