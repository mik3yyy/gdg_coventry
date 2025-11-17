import { useEffect, useState } from 'react';
import { Header } from '../../../components/feature/Header';
import { Footer } from '../../../components/feature/Footer';
import { Link } from 'react-router-dom';
import { useOpportunitiesContext, type Opportunity } from '../../../contexts/OppurtunityContext';
import { useAuth } from '../../../contexts/AuthContext';
import { MyOpportunityCard } from '../../admin/jobs/local_component/MyOppurtunityCard';
import { JobFormCard } from './JobPostForm';
import { CollaborationFormCard } from './component/CollaborationPostForm';


export default function PostOpportunityPage() {
  const [activeTab, setActiveTab] = useState<'job' | 'collaboration' | 'my-opportunity' | 'edit'>('job');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { addOpportunity, listMyOpportunities, myOpportunities, updateOpportunity } = useOpportunitiesContext()


  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    email: "",
    description: "",
    companyName: "",
    location: "",
    type: "full-time",
    external_url: "",
    experience: "entry",
    skills: ""
  })
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [showOpportunityModal, setShowOpportunityModal] = useState(false);
  const [showEditOpportunityModal, setShowEditOpportunityModal] = useState(false);
  const [collaborationData, setCollaborationData] = useState({
    title: '',
    email: '',
    description: '',
    projectType: 'web-development',
    duration: 'short-term',
    skills: '',
    external_url: '',
    commitment: 'part-time'
  });
  useEffect(() => {
    listMyOpportunities();
  }, [])

  const handleJobSubmit = async (e: React.FormEvent, existing: boolean = false) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitSuccess(false)

    try {
      // editing existing
      if (existing) {
        await updateOpportunity(selectedOpportunity?.id ?? "", {
          title: formData.title,
          email: formData.email,
          description: formData.description,
          companyName: formData.companyName,
          location: formData.location,
          jobType: formData.type,
          external_url: formData.external_url,
          experience: formData.experience,
          skills: formData.skills,
          status: "pending" // important: editing approved should send it back to pending
        })
      }
      else {
        // creating new
        await addOpportunity({
          type: "job",
          title: formData.title,
          email: formData.email,
          description: formData.description,
          companyName: formData.companyName,
          location: formData.location,
          jobType: formData.type,
          external_url: formData.external_url,
          experience: formData.experience,
          skills: formData.skills,
          user_email: user?.email || "",
        })
      }

      setSubmitSuccess(true)


      setFormData({
        title: "",
        email: "",
        description: "",
        companyName: "",
        location: "",
        external_url: "",
        type: "full-time",
        experience: "entry",
        skills: ""
      })

    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
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
  const handleCollaborationSubmit = async (e: React.FormEvent, existing: boolean = false) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitSuccess(false)

    try {
      if (existing) {
        await updateOpportunity(selectedOpportunity?.id ?? "", {
          title: collaborationData.title,
          email: collaborationData.email,
          description: collaborationData.description,
          projectType: collaborationData.projectType,
          duration: collaborationData.duration,
          skills: collaborationData.skills,
          external_url: collaborationData.external_url,
          commitment: collaborationData.commitment,
          status: "pending"
        })
      } else {

        await addOpportunity({
          type: "collaboration",
          title: collaborationData.title,
          email: collaborationData.email,
          description: collaborationData.description,
          projectType: collaborationData.projectType,
          duration: collaborationData.duration,
          skills: collaborationData.skills,
          external_url: collaborationData.external_url,
          commitment: collaborationData.commitment,
          user_email: user?.email || ""
        })
      }

      setSubmitSuccess(true)


      setCollaborationData({
        title: "",
        email: "",
        description: "",
        projectType: "web-development",
        duration: "short-term",
        skills: "",
        external_url: "",
        commitment: "part-time"
      })

    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }



  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page Header */}
      <section className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4 mb-6">
            <Link
              to="/dashboard"
              className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
            >
              <i className="ri-arrow-left-line text-gray-600"></i>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Post Opportunity</h1>
              <p className="text-gray-600">Share job openings or find collaboration partners</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('job')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'job'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              <i className="ri-briefcase-line mr-2"></i>
              Post a Job
            </button>
            <button
              onClick={() => setActiveTab('collaboration')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'collaboration'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              <i className="ri-team-line mr-2"></i>
              Find Collaborators
            </button>
            <button
              onClick={() => setActiveTab('my-opportunity')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'my-opportunity'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              <i className="ri-team-line mr-2"></i>
              My Opportunities
            </button>
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {submitSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
              <div className="flex items-center">
                <i className="ri-check-circle-line text-green-500 text-xl mr-3"></i>
                <div>
                  <h3 className="font-medium text-green-900">Successfully Posted!</h3>
                  <p className="text-green-700 text-sm">Your {activeTab} posting has been submitted and will be reviewed by our team.</p>
                </div>
              </div>
            </div>
          )}

          {/* Job Posting Form */}
          {activeTab === "job" && (
            <JobFormCard
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleJobSubmit}
              isSubmitting={isSubmitting}
            />
          )}


          {/* Collaboration Form */}
          {activeTab === "collaboration" && (
            <CollaborationFormCard
              collaborationData={collaborationData}
              setCollaborationData={setCollaborationData}
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleCollaborationSubmit}
              isSubmitting={isSubmitting}
            />
          )}

          {activeTab === 'my-opportunity' && (
            <div className="space-y-6">
              {myOpportunities.map((opp) => (
                <MyOpportunityCard
                  key={opp.id}
                  opportunity={opp}
                  statusColorClass={getStatusColor}
                  typeColorClass={getTypeColor}
                  onView={() => {
                    setSelectedOpportunity(opp)
                    setShowOpportunityModal(true)
                  }}
                  onEdit={() => {
                    setSelectedOpportunity(opp)

                    if (opp.type === "job") {
                      setFormData({
                        title: opp.title,
                        email: opp.email,
                        companyName: opp.companyName ?? "",
                        location: opp.location ?? "",
                        type: opp.jobType ?? "full-time",
                        experience: opp.experience ?? "entry",
                        skills: opp.skills ?? "",
                        external_url: opp.external_url ?? "",
                        description: opp.description,
                      })
                    } else {
                      setCollaborationData({
                        title: opp.title,
                        email: opp.email,
                        projectType: opp.projectType ?? "",
                        duration: opp.duration ?? "",
                        commitment: opp.commitment ?? "",
                        skills: opp.skills ?? "",
                        description: opp.description,
                        external_url: opp.external_url ?? ""
                      })

                      setFormData((prev) => ({
                        ...prev,
                        external_url: opp.external_url ?? ""
                      }))
                    }

                    setActiveTab('edit')
                  }}


                />
              ))}

              {myOpportunities.length === 0 && (
                <div className="text-center py-16 text-gray-500">
                  <i className="ri-briefcase-line text-4xl text-gray-400 mb-3"></i>
                  <p>No opportunities posted yet</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'edit' && selectedOpportunity && (
            <>
              {selectedOpportunity.type === "job" ? (
                <JobFormCard
                  formData={formData}
                  setFormData={setFormData}
                  handleSubmit={(e) => handleJobSubmit(e, true)}
                  isSubmitting={isSubmitting}
                  editingExisting={true} // optional later
                />
              ) : (
                <CollaborationFormCard
                  collaborationData={collaborationData}
                  setCollaborationData={setCollaborationData}
                  formData={formData}
                  setFormData={setFormData}
                  handleSubmit={(e) => handleCollaborationSubmit(e, true)}
                  isSubmitting={isSubmitting}
                  editingExisting={true} // optional later
                />
              )}
            </>
          )}



          {/* Guidelines */}
          <div className="mt-8 bg-blue-50 rounded-2xl p-6">
            <h3 className="font-semibold text-blue-900 mb-4 flex items-center">
              <i className="ri-information-line mr-2"></i>
              Posting Guidelines
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-800">
              <div>
                <h4 className="font-medium mb-2">✅ Do:</h4>
                <ul className="space-y-1">
                  <li>• Be clear and specific about requirements</li>
                  <li>• Include realistic timelines and expectations</li>
                  <li>• Provide accurate contact information</li>
                  <li>• Respect our community guidelines</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">❌ Don't:</h4>
                <ul className="space-y-1">
                  <li>• Post spam or irrelevant content</li>
                  <li>• Include discriminatory language</li>
                  <li>• Share personal or sensitive information</li>
                  <li>• Post duplicate opportunities</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}