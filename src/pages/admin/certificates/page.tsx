
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../../components/feature/Header';
import { Footer } from '../../../components/feature/Footer';
import { Button } from '../../../components/base/Button';

export default function AdminCertificatesPage() {
  const [activeTab, setActiveTab] = useState('generate');
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventVolunteered: '',
    role: '',
    hoursContributed: '',
    certificateType: 'volunteer'
  });

  const [generatedCertificates, setGeneratedCertificates] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      eventVolunteered: 'DevFest 2024',
      role: 'Event Organizer',
      hoursContributed: 12,
      certificateType: 'organizer',
      generatedDate: '2024-01-10',
      downloadCount: 3
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      eventVolunteered: 'Android Study Jam',
      role: 'Technical Mentor',
      hoursContributed: 8,
      certificateType: 'mentor',
      generatedDate: '2024-01-08',
      downloadCount: 1
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      email: 'emma.rodriguez@email.com',
      eventVolunteered: 'Women in Tech Workshop',
      role: 'Workshop Facilitator',
      hoursContributed: 6,
      certificateType: 'volunteer',
      generatedDate: '2024-01-05',
      downloadCount: 2
    }
  ]);

  const certificateTemplates = [
    {
      id: 'volunteer',
      name: 'Volunteer Appreciation',
      description: 'Standard volunteer certificate for community contributors',
      color: '#4285F4'
    },
    {
      id: 'organizer',
      name: 'Event Organizer',
      description: 'Special recognition for event organization leadership',
      color: '#34A853'
    },
    {
      id: 'mentor',
      name: 'Technical Mentor',
      description: 'Certificate for technical mentorship and guidance',
      color: '#FBBC05'
    },
    {
      id: 'outstanding',
      name: 'Outstanding Contribution',
      description: 'Highest recognition for exceptional community service',
      color: '#EA4335'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenerateCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.eventVolunteered) {
      alert('Please fill in all required fields');
      return;
    }

    setIsGenerating(true);
    
    // Simulate certificate generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Add to generated certificates list
    const newCertificate = {
      id: Date.now(),
      ...formData,
      hoursContributed: parseInt(formData.hoursContributed) || 0,
      generatedDate: new Date().toISOString().split('T')[0],
      downloadCount: 0
    };
    
    setGeneratedCertificates(prev => [newCertificate, ...prev]);
    
    // Create mock download
    const selectedTemplate = certificateTemplates.find(t => t.id === formData.certificateType);
    const link = document.createElement('a');
    link.href = '#';
    link.download = `GDG-Coventry-${selectedTemplate?.name.replace(' ', '-')}-Certificate-${formData.name.replace(' ', '-')}.pdf`;
    link.click();
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      eventVolunteered: '',
      role: '',
      hoursContributed: '',
      certificateType: 'volunteer'
    });
    
    setIsGenerating(false);
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
            <span className="text-gray-600">Certificate Generator</span>
          </nav>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Certificate Generator</h1>
            <p className="text-gray-600 mt-2">Generate volunteer recognition certificates</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white rounded-lg px-4 py-2 border">
              <span className="text-sm text-gray-600">Total Generated: </span>
              <span className="font-semibold text-[#34A853]">{generatedCertificates.length}</span>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 border">
              <span className="text-sm text-gray-600">This Month: </span>
              <span className="font-semibold text-[#4285F4]">
                {generatedCertificates.filter(cert => 
                  new Date(cert.generatedDate).getMonth() === new Date().getMonth()
                ).length}
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Certificates</p>
                <p className="text-2xl font-bold text-gray-900">{generatedCertificates.length}</p>
              </div>
              <div className="w-12 h-12 bg-[#4285F4]/10 rounded-lg flex items-center justify-center">
                <i className="ri-award-line text-xl text-[#4285F4]"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Volunteer Certificates</p>
                <p className="text-2xl font-bold text-gray-900">
                  {generatedCertificates.filter(cert => cert.certificateType === 'volunteer').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#34A853]/10 rounded-lg flex items-center justify-center">
                <i className="ri-user-heart-line text-xl text-[#34A853]"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Organizer Certificates</p>
                <p className="text-2xl font-bold text-gray-900">
                  {generatedCertificates.filter(cert => cert.certificateType === 'organizer').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#FBBC05]/10 rounded-lg flex items-center justify-center">
                <i className="ri-calendar-check-line text-xl text-[#FBBC05]"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Downloads</p>
                <p className="text-2xl font-bold text-gray-900">
                  {generatedCertificates.reduce((sum, cert) => sum + cert.downloadCount, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#EA4335]/10 rounded-lg flex items-center justify-center">
                <i className="ri-download-line text-xl text-[#EA4335]"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('generate')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === 'generate'
                    ? 'border-[#4285F4] text-[#4285F4]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Generate Certificate
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === 'history'
                    ? 'border-[#34A853] text-[#34A853]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Certificate History ({generatedCertificates.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'generate' ? (
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Certificate Form */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Volunteer Information</h3>
                  
                  <form onSubmit={handleGenerateCertificate} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm"
                        placeholder="Enter volunteer's full name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm"
                        placeholder="volunteer@example.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event Volunteered *
                      </label>
                      <input
                        type="text"
                        name="eventVolunteered"
                        value={formData.eventVolunteered}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm"
                        placeholder="e.g., DevFest 2024, Android Study Jam"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Volunteer Role
                      </label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm"
                        placeholder="e.g., Event Organizer, Technical Mentor"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hours Contributed
                      </label>
                      <input
                        type="number"
                        name="hoursContributed"
                        value={formData.hoursContributed}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm"
                        placeholder="0"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Certificate Type *
                      </label>
                      <select
                        name="certificateType"
                        value={formData.certificateType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm pr-8"
                        required
                      >
                        {certificateTemplates.map((template) => (
                          <option key={template.id} value={template.id}>
                            {template.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <Button
                      type="submit"
                      disabled={isGenerating}
                      className="w-full bg-[#4285F4] text-white hover:bg-[#3367D6] whitespace-nowrap"
                    >
                      {isGenerating ? (
                        <>
                          <i className="ri-loader-4-line animate-spin mr-2"></i>
                          Generating Certificate...
                        </>
                      ) : (
                        <>
                          <i className="ri-award-line mr-2"></i>
                          Generate Certificate
                        </>
                      )}
                    </Button>
                  </form>
                </div>

                {/* Certificate Templates */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Certificate Templates</h3>
                  
                  <div className="space-y-4">
                    {certificateTemplates.map((template) => (
                      <div
                        key={template.id}
                        className={`border-2 rounded-xl p-4 transition-colors duration-200 ${
                          formData.certificateType === template.id
                            ? 'border-gray-400 bg-gray-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{backgroundColor: `${template.color}20`}}
                          >
                            <i className="ri-award-line text-lg" style={{color: template.color}}></i>
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900">{template.name}</h5>
                            <p className="text-sm text-gray-600">{template.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Certificate History */
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Generated Certificates</h3>
                
                <div className="space-y-4">
                  {generatedCertificates.map((certificate) => (
                    <div key={certificate.id} className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div 
                            className="w-12 h-12 rounded-lg flex items-center justify-center"
                            style={{
                              backgroundColor: `${certificateTemplates.find(t => t.id === certificate.certificateType)?.color}20`
                            }}
                          >
                            <i 
                              className="ri-award-line text-xl"
                              style={{
                                color: certificateTemplates.find(t => t.id === certificate.certificateType)?.color
                              }}
                            ></i>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{certificate.name}</h4>
                            <p className="text-[#4285F4] font-medium">{certificate.eventVolunteered}</p>
                            <p className="text-sm text-gray-600">{certificate.email}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-8">
                          <div className="text-center">
                            <p className="text-sm text-gray-600">Type</p>
                            <p className="font-medium text-gray-900 capitalize">
                              {certificateTemplates.find(t => t.id === certificate.certificateType)?.name}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-600">Hours</p>
                            <p className="font-medium text-gray-900">{certificate.hoursContributed}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-600">Generated</p>
                            <p className="font-medium text-gray-900">{certificate.generatedDate}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-600">Downloads</p>
                            <p className="font-medium text-gray-900">{certificate.downloadCount}</p>
                          </div>
                          
                          <Button
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = '#';
                              link.download = `GDG-Coventry-Certificate-${certificate.name.replace(' ', '-')}.pdf`;
                              link.click();
                            }}
                            className="bg-[#34A853] text-white hover:bg-[#2E7D32] whitespace-nowrap"
                          >
                            <i className="ri-download-line mr-2"></i>
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
