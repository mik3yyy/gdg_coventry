
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { user } = useAuth();

  const footerLinks = {
    community: [
      { name: 'Events', href: '/events' },
      { name: 'Organizers', href: '/about' },
      { name: 'Member Directory', href: '/community' },
      { name: 'Project Gallery', href: '/projects' }
    ],
    learning: [
      { name: 'Study Jams', href: '/dashboard/resources' },
      { name: 'Workshops', href: '/events' },
      { name: 'Resource Library', href: '/dashboard/resources' },
      { name: 'Mentorship', href: '/dashboard/mentors' }
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Join Community', href: '/auth/signin' },
      { name: 'Code of Conduct', href: '/code' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' }

    ]
  };

  const socialLinks = [

    { name: 'LinkedIn', icon: 'ri-linkedin-line', href: 'https://www.linkedin.com/company/gdg-coventry/?' },
    { name: 'Linktree', icon: 'ri-link-m', href: 'https://linktr.ee/GDGCoventry' }


  ];
  const navigate = useNavigate();
  const handleLearningClick = (href: string) => {
    if (!user) {
      // Redirect to sign-in if not logged in
      navigate('/auth/signin', { replace: true });
      return;
    }

    // Navigate to the learning resource if logged in
    navigate(href);
  };
  const logoCertificatePath = '/main_logo-removebg.png';  // The path starts from the root of the public folder

  return (
    <footer className=" bg-[#1F1F1F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              {/* <div className="w-10 h-10 bg-gradient-to-br from-[#4285F4] to-[#EA4335] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div> */}
              <img src={logoCertificatePath} alt="Logo" className="w-7 h-7 object-contain" />

              <div>
                <h3 className="text-xl font-bold">GDG Coventry</h3>
                <p className="text-sm text-gray-400">Google Developer Group</p>
              </div>
            </div>

            <p className="text-gray-300 mb-6 max-w-md">
              Building a vibrant tech community in Coventry. Join us for workshops, networking, and learning opportunities with Google technologies.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#4285F4] transition-colors duration-200 cursor-pointer"
                  aria-label={social.name}
                >
                  <i className={`${social.icon} text-lg`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Community Links Section */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Community</h4>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Links Section */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Learning</h4>
            <ul className="space-y-2">
              {footerLinks.learning.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLearningClick(link.href)}
                    className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links Section */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} GDG Coventry. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <p className="text-gray-400 text-sm">
              GDG Coventry is an independent community and not an official Google site.
            </p>


          </div>
        </div>
      </div>
    </footer>
  );
};
