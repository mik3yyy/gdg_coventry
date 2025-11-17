import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../../components/feature/Header';
import { Footer } from '../../../components/feature/Footer';
import { useOpportunitiesContext, type Opportunity } from '../../../contexts/OppurtunityContext';

import { OpportunityCard } from './local_component/OppurtunityCard';
import { OpportunityDetailsModal } from './local_component/OppurtunityModal';



export default function JobApprovalPage() {
  const { listAllOpportunities, opportunities, updateOpportunity } = useOpportunitiesContext();
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [selectedJob, setSelectedJob] = useState<Opportunity | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [rejectOpportunityId, setRejectOpportunityId] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState("")
  const startReject = (id: string) => {
    setRejectOpportunityId(id)
  }

  useEffect(() => {
    listAllOpportunities();
  }, []);



  const filteredJobs = opportunities.filter(job => job.status === activeTab);

  const handleApprove = async (id: string) => {
    await updateOpportunity(id, { status: "approved" })

  }

  const handleReject = async (id: string) => {
    await updateOpportunity(id, { status: "rejected" })

  }


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
      case 'Full-time': return 'bg-blue-100 text-blue-800';
      case 'Part-time': return 'bg-purple-100 text-purple-800';
      case 'Contract': return 'bg-orange-100 text-orange-800';
      case 'Internship': return 'bg-green-100 text-green-800';
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
              <h1 className="text-3xl font-bold text-gray-900">Job Opportunities & Collaborations</h1>
              <p className="text-gray-600 mt-2">Review and approve job postings from community members</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'pending', label: 'Pending', count: opportunities.filter(j => j.status === 'pending').length },
                { key: 'approved', label: 'Approved', count: opportunities.filter(j => j.status === 'approved').length },
                { key: 'rejected', label: 'Rejected', count: opportunities.filter(j => j.status === 'rejected').length }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === tab.key
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

        {/* Jobs List */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <OpportunityCard
              key={job.id}
              opportunity={job}
              statusColorClass={getStatusColor}
              typeColorClass={getTypeColor}
              onView={() => {
                setSelectedJob(job);
                setShowModal(true);
              }}
              onApprove={() => handleApprove(job.id)}
              onReject={() => startReject(job.id)}   // <-- THIS IS THE CORRECT CHANGE
            />
          ))}



          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <i className="ri-briefcase-line text-4xl text-gray-400 mb-4"></i>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No {activeTab} jobs</h3>
              <p className="text-gray-500">There are no {activeTab} job opportunities at the moment.</p>
            </div>
          )}
        </div>
      </div>

      {showModal && selectedJob && (
        <OpportunityDetailsModal
          opportunity={selectedJob}
          onClose={() => setShowModal(false)}
          statusColorClass={getStatusColor}
          typeColorClass={getTypeColor}
          onApprove={() => { handleApprove(selectedJob.id); setShowModal(false) }}
          onReject={() => { handleReject(selectedJob.id); setShowModal(false) }}
        />
      )}
      {rejectOpportunityId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Reject Opportunity</h3>

            <textarea
              className="w-full border rounded-lg p-3 text-sm"
              rows={4}
              placeholder="Reason for rejection..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />

            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => { setRejectOpportunityId(null); setRejectReason("") }}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>

              <button
                disabled={!rejectReason.trim()}
                onClick={async () => {
                  await updateOpportunity(rejectOpportunityId!, {
                    status: "rejected",
                    rejected_reason: rejectReason.trim()
                  })
                  setRejectOpportunityId(null)
                  setRejectReason("")
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}



      <Footer />
    </div>
  );
}