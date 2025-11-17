
import { useState } from 'react';
import { Header } from '../../components/feature/Header';
import { Footer } from '../../components/feature/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        type: 'general'
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      title: 'Email Us',
      description: 'Send us an email and we\'ll get back to you within 24 hours.',
      icon: 'ri-mail-line',
      contact: 'gdgcoventry@gmail.com',
      color: '#4285F4'
    },
    {
      title: 'Join Our Discord',
      description: 'Connect with our community members in real-time.',
      icon: 'ri-discord-line',
      contact: 'discord.gg/svtEFqT56A',
      color: '#34A853'
    },
    {
      title: 'Linktree',
      description: 'Stay updated with our latest news and announcements.',
      icon: 'ri-link-m',
      contact: 'https://linktr.ee/GDGCoventry',
      color: '#1F1F1F'
    },
    // {
    //   title: 'LinkedIn',
    //   description: 'Connect with us professionally and see our latest updates.',
    //   icon: 'ri-linkedin-line',
    //   contact: 'linkedin.com/company/gdgcoventry',
    //   color: '#EA4335'
    // }
  ];

  const faqItems = [
    {
      question: 'How do I join GDG Coventry?',
      answer: 'Joining is free and easy! Simply attend one of our events or join our Discord community. You can also follow us on social media to stay updated with upcoming events.'
    },
    {
      question: 'Do I need to be an expert to attend events?',
      answer: 'Not at all! Our events welcome developers of all skill levels, from complete beginners to seasoned professionals. We have content tailored for everyone.'
    },
    {
      question: 'Are your events free to attend?',
      answer: 'Yes, all our regular meetups and workshops are completely free. For special events like DevFest, we may charge a small fee to cover venue and catering costs.'
    },
    {
      question: 'Can I speak at a GDG Coventry event?',
      answer: 'Absolutely! We\'re always looking for speakers. Whether you want to share a project, teach a technology, or discuss industry trends, we\'d love to hear from you.'
    },
    {
      question: 'How often do you organize events?',
      answer: 'We typically host 2-3 events per month, including workshops, study jams, and networking meetups. Check our events page for the latest schedule.'
    }
  ];

  const officeInfo = {
    address: 'Coventry University Technology Park, Puma Way, Coventry CV1 2TT, UK',
    hours: [
      { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
      { day: 'Saturday', time: '10:00 AM - 4:00 PM' },
      { day: 'Sunday', time: 'Closed' }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className=" bg-[#1F1F1F] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Have questions about our community? Want to speak at an event? We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ways to Connect
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the best way to reach out to us. We're active on multiple platforms and always ready to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                  style={{ backgroundColor: `${method.color}20` }}
                >
                  <i className={`${method.icon} text-2xl`} style={{ color: method.color }}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{method.description}</p>
                <p className="font-medium" style={{ color: method.color }}>{method.contact}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="https://linktr.ee/GDGCoventry"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img
                src="/QRcode.png"
                alt="GDG Coventry QR Code"
                className="mx-auto w-48 h-48 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              />
              <h2 className="text-lg mt-4 text-gray-700 font-medium">
                Tap or Scan to Explore All Our Links
              </h2>
            </a>
          </div>

        </div>
      </section>

      {/* Contact Form & Info */}
      {/* <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6" data-readdy-form id="contact-form">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                    Inquiry Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm pr-8"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="speaking">Speaking Opportunity</option>
                    <option value="partnership">Partnership</option>
                    <option value="sponsorship">Sponsorship</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm"
                    placeholder="Brief subject of your message"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm resize-none"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">{formData.message.length}/500 characters</p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#4285F4] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#3367D6] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                    <i className="ri-check-circle-line mr-2"></i>
                    Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    <i className="ri-error-warning-line mr-2"></i>
                    Sorry, there was an error sending your message. Please try again.
                  </div>
                )}
              </form>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Visit Our Hub</h3>
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 bg-[#4285F4]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className="ri-map-pin-line text-xl text-[#4285F4]"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Address</h4>
                      <p className="text-gray-600">{officeInfo.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#34A853]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className="ri-time-line text-xl text-[#34A853]"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Office Hours</h4>
                      <div className="space-y-1">
                        {officeInfo.hours.map((hour, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-gray-600">{hour.day}</span>
                            <span className="text-gray-900 font-medium">{hour.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2435.8234567890123!2d-1.5197!3d52.4068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDI0JzI0LjUiTiAxwrAzMScxMS4wIlc!5e0!3m2!1sen!2suk!4v1234567890123"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="GDG Coventry Location"
        ></iframe>
      </div>
    </div>
          </div >
        </div >
      </section > */
      }

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Quick answers to common questions about GDG Coventry.
            </p>
          </div>

          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div >
  );
}
