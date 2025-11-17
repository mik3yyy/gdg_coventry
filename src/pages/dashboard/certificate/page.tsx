
import { useState } from 'react';
import { Header } from '../../../components/feature/Header';
import { Footer } from '../../../components/feature/Footer';
import { Button } from '../../../components/base/Button';
import { Link } from 'react-router-dom';
import CertificatePreview from './component/certificate_file';
import { useAuth } from '../../../contexts/AuthContext';
import html2pdf from "html2pdf.js"; // Import html2pdf.js
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
export default function CertificatePage() {
  // const [user] = useState({
  //   name: 'John Doe',
  //   email: 'john.doe@example.com',
  //   memberSince: 'January 2024',
  //   memberId: 'GDG-COV-2024-001',
  //   isMentor: false
  // });
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [certificateType, setCertificateType] = useState('member');


  const handleGenerateCertificate = async (type: string) => {
    setIsGenerating(true);

    // Capture the content of the certificate-container using html2canvas
    const element = document.getElementById("certificate-container");

    if (element) {
      // Use html2canvas to capture the content as an image
      html2canvas(element, { scale: 2 }).then((canvas) => {
        // Convert the canvas to an image (PNG format)
        const imgData = canvas.toDataURL("image/png");

        // Create a link to trigger the download of the image
        const link = document.createElement('a');
        link.href = imgData;
        link.download = `GDG-Coventry-Certificate-${user?.name.replace(' ', '-')}.png`; // Set filename for image download
        link.click();

        setIsGenerating(false); // Stop the loading state
      });
    }
  };
  // const handleGenerateCertificate = async (type: string) => {
  //   setIsGenerating(true);
  //   setCertificateType(type);

  //   // Capture the content of the certificate-container using html2canvas
  //   const element = document.getElementById("certificate-container");

  //   if (element) {
  //     // Use html2canvas to capture the content as an image
  //     html2canvas(element, { scale: 2 }).then((canvas) => {
  //       // Convert the canvas to an image
  //       const imgData = canvas.toDataURL("image/png");

  //       // Create a PDF document using jsPDF
  //       const pdf = new jsPDF("p", "mm", "a4");

  //       // Add the image to the PDF
  //       pdf.addImage(imgData, "PNG", 10, 10, 190, 250); // Adjust size and position

  //       // Save the PDF
  //       const filename = `GDG-Coventry-${type}-Certificate-${user?.name.replace(' ', '-')}.pdf`;
  //       pdf.save(filename);

  //       setIsGenerating(false);
  //     });
  //   }
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header />

      {/* Breadcrumb */}
      <section className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/dashboard" className="text-[#4285F4] hover:underline font-medium">Dashboard</Link>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            <span className="text-gray-600">Member Certificate</span>
          </nav>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#4285F4] to-[#EA4335] rounded-2xl mb-6 shadow-lg">
              <i className="ri-award-line text-3xl text-white"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05] bg-clip-text text-transparent mb-6">
              Member Certificate
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Generate your official GDG Coventry membership certificate to showcase your community involvement and professional development journey.
            </p>
          </div>
          {/* Certificate Preview */}
          <div id="certificate-container" >
            <CertificatePreview user={user!} />
          </div>


          {/* Certificate Options */}
          <div className="grid md:grid-cols-1 gap-8 mb-16">

            {/* Member Certificate */}
            <div className="group bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="flex items-center space-x-6 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#4285F4] to-[#4285F4]/70 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <i className="ri-award-line text-white text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Member Certificate</h3>
                  <p className="text-gray-600">Official membership certificate</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3 text-gray-700">
                  <div className="w-6 h-6 bg-[#4285F4]/10 rounded-full flex items-center justify-center">
                    <i className="ri-check-line text-[#4285F4] text-sm"></i>
                  </div>
                  <span>Official GDG Coventry branding</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <div className="w-6 h-6 bg-[#4285F4]/10 rounded-full flex items-center justify-center">
                    <i className="ri-check-line text-[#4285F4] text-sm"></i>
                  </div>
                  <span>Member ID and join date</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <div className="w-6 h-6 bg-[#4285F4]/10 rounded-full flex items-center justify-center">
                    <i className="ri-check-line text-[#4285F4] text-sm"></i>
                  </div>
                  <span>High-quality PDF format</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <div className="w-6 h-6 bg-[#4285F4]/10 rounded-full flex items-center justify-center">
                    <i className="ri-check-line text-[#4285F4] text-sm"></i>
                  </div>
                  <span>Suitable for LinkedIn and portfolios</span>
                </div>
              </div>

              <Button
                onClick={() => handleGenerateCertificate('member')}
                disabled={isGenerating && certificateType === 'member'}
                className="w-full bg-gradient-to-r from-[#4285F4] to-[#4285F4]/80 text-white hover:from-[#3367D6] hover:to-[#3367D6]/80 whitespace-nowrap py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isGenerating && certificateType === 'member' ? (
                  <>
                    <i className="ri-loader-4-line animate-spin mr-3"></i>
                    Generating Certificate...
                  </>
                ) : (
                  <>
                    <i className="ri-download-line mr-3"></i>
                    Generate Member Certificate
                  </>
                )}
              </Button>
            </div>

            {/* Mentor Certificate */}
            {/* <div className={`group bg-white rounded-3xl shadow-xl p-8 border border-gray-100 transition-all duration-300 ${!user.isMentor ? 'opacity-60' : 'hover:shadow-2xl hover:-translate-y-2'}`}>
              <div className="flex items-center space-x-6 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#EA4335] to-[#EA4335]/70 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <i className="ri-graduation-cap-line text-white text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Mentor Certificate</h3>
                  <p className="text-gray-600">Official mentor recognition</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3 text-gray-700">
                  <div className="w-6 h-6 bg-[#EA4335]/10 rounded-full flex items-center justify-center">
                    <i className="ri-check-line text-[#EA4335] text-sm"></i>
                  </div>
                  <span>Mentor status verification</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <div className="w-6 h-6 bg-[#EA4335]/10 rounded-full flex items-center justify-center">
                    <i className="ri-check-line text-[#EA4335] text-sm"></i>
                  </div>
                  <span>Areas of expertise listed</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <div className="w-6 h-6 bg-[#EA4335]/10 rounded-full flex items-center justify-center">
                    <i className="ri-check-line text-[#EA4335] text-sm"></i>
                  </div>
                  <span>Professional recognition</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <div className="w-6 h-6 bg-[#EA4335]/10 rounded-full flex items-center justify-center">
                    <i className="ri-check-line text-[#EA4335] text-sm"></i>
                  </div>
                  <span>Enhanced credibility</span>
                </div>
              </div>

              {user.isMentor ? (
                <Button
                  onClick={() => handleGenerateCertificate('mentor')}
                  disabled={isGenerating && certificateType === 'mentor'}
                  className="w-full bg-gradient-to-r from-[#EA4335] to-[#EA4335]/80 text-white hover:from-[#D33B2C] hover:to-[#D33B2C]/80 whitespace-nowrap py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isGenerating && certificateType === 'mentor' ? (
                    <>
                      <i className="ri-loader-4-line animate-spin mr-3"></i>
                      Generating Certificate...
                    </>
                  ) : (
                    <>
                      <i className="ri-download-line mr-3"></i>
                      Generate Mentor Certificate
                    </>
                  )}
                </Button>
              ) : (
                <div className="text-center">
                  <p className="text-gray-500 mb-4 text-lg">Available for mentors only</p>
                  <Link
                    to="/dashboard/become-mentor"
                    className="inline-flex items-center px-6 py-3 border-2 border-gray-300 rounded-2xl font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 whitespace-nowrap"
                  >
                    <i className="ri-user-add-line mr-3"></i>
                    Become a Mentor
                  </Link>
                </div>
              )}
            </div> */}
          </div>

          {/* Usage Guidelines */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#FBBC05] to-[#FBBC05]/70 rounded-2xl mb-4 shadow-lg">
                <i className="ri-information-line text-2xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Certificate Usage Guidelines</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                    <i className="ri-check-line text-white text-xl"></i>
                  </div>
                  <h4 className="text-xl font-bold text-green-800">Appropriate Use</h4>
                </div>
                <ul className="space-y-3 text-green-700">
                  <li className="flex items-center space-x-3">
                    <i className="ri-arrow-right-s-line text-green-500"></i>
                    <span>Add to your LinkedIn profile</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <i className="ri-arrow-right-s-line text-green-500"></i>
                    <span>Include in your portfolio</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <i className="ri-arrow-right-s-line text-green-500"></i>
                    <span>Share on professional networks</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <i className="ri-arrow-right-s-line text-green-500"></i>
                    <span>Use in job applications</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <i className="ri-arrow-right-s-line text-green-500"></i>
                    <span>Display at conferences</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100/50 rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
                    <i className="ri-close-line text-white text-xl"></i>
                  </div>
                  <h4 className="text-xl font-bold text-red-800">Prohibited Use</h4>
                </div>
                <ul className="space-y-3 text-red-700">
                  <li className="flex items-center space-x-3">
                    <i className="ri-arrow-right-s-line text-red-500"></i>
                    <span>Modifying the certificate design</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <i className="ri-arrow-right-s-line text-red-500"></i>
                    <span>Claiming false credentials</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <i className="ri-arrow-right-s-line text-red-500"></i>
                    <span>Commercial use without permission</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <i className="ri-arrow-right-s-line text-red-500"></i>
                    <span>Misrepresenting your role</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <i className="ri-arrow-right-s-line text-red-500"></i>
                    <span>Using expired certificates</span>
                  </li>
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
