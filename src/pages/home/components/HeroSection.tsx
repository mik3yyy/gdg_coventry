import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Button } from '../../../components/base/Button';

export function HeroSection() {
  useEffect(() => {
    AOS.init({
      once: true,
      mirror: false,
      duration: 800
    });
  }, []);
  const logoCertificatePath = '/main_logo-removebg.png';  // The path starts from the root of the public folder

  const scrollToSection = () => {
    const section = document.getElementById('community-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="min-h-[70vh] flex flex-col">
        {/* Header with Logo */}

        {/* Main Hero Content */}
        <div className="flex-1 flex items-center px-6 md:px-12 lg:px-16 py-12">
          <div className="max-w-7xl w-full mx-auto">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-center">
              {/* Left: Text Content */}
              <div>
                <p
                  className="text-base md:text-lg mb-6 text-[#5F6368]"
                  data-aos="fade-right"
                  data-aos-delay="100"
                >
                  // hello world
                </p>
                <h1
                  className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-10 leading-tight text-[#1F1F1F]"
                  data-aos="fade-right"
                  data-aos-duration="1000"
                  data-aos-delay="200"
                >
                  Welcome to<br />
                  GDG Coventry
                </h1>
                <button
                  onClick={() => window.open("https://gdg.community.dev/gdg-coventry/", "_blank")}
                  type="button"
                  className="px-8 py-4 rounded-lg font-medium text-white text-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 bg-[#4285F4]"
                  style={{ boxShadow: '0 4px 12px rgba(66, 133, 244, 0.3)' }}
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  Join Our Community
                </button>
                {/* Buttons */}

              </div>

              {/* Right: GDG Logo */}
              {/* Right: GDG Logo */}
              <div
                className="hidden lg:flex justify-center lg:justify-end"
                data-aos="zoom-in"
                data-aos-duration="1200"
                data-aos-delay="300"
              >
                <img
                  src={logoCertificatePath}
                  alt="GDG Logo"
                  className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain drop-shadow-2xl"
                />
              </div>

            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="pb-8 flex justify-center"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <div className="animate-bounce">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5F6368" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </section>

      {/* Black Description Section */}
      <section
        id="community-section"
        className="w-full py-16 md:py-24 bg-[#1F1F1F]"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <p
            className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Our community brings together developers, designers, and tech enthusiasts to learn, build, and grow with modern technologies including Flutter, Android, AI, and Cloud.
          </p>
        </div>
      </section>


    </div>
  );
}