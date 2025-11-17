import { Button } from '../../../components/base/Button';

export const JoinCommunity = () => {
  return (
    <section
      id="join-community"
      className="py-20 relative overflow-hidden bg-[#1F1F1F]"
      data-aos="fade-up"
      data-aos-duration="900"
    >

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border border-white rounded-full"></div>
        <div className="absolute bottom-20 left-32 w-12 h-12 border border-white rounded-full"></div>
        <div className="absolute bottom-32 right-10 w-24 h-24 border border-white rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center text-white">

          {/* Heading */}
          <h2
            className="text-3xl md:text-5xl font-bold mb-6"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Ready to Join Our Community?
          </h2>

          <p
            className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="180"
          >
            Connect with passionate developers, learn cutting-edge technologies,
            and build amazing projects together.
          </p>

          {/* 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

            <div
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="ri-user-add-line text-3xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">Join for Free</h3>
              <p className="text-blue-100">
                Become a member of our growing community and get access to all events and resources.
              </p>
            </div>

            <div
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="ri-calendar-check-line text-3xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">Attend Events</h3>
              <p className="text-blue-100">
                RSVP to workshops, study jams, and meetups. Learn from industry experts and Google Developer Experts.
              </p>
            </div>

            <div
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="ri-rocket-line text-3xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">Grow Your Career</h3>
              <p className="text-blue-100">
                Access mentorship, showcase your projects, and connect with potential employers and collaborators.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            data-aos="fade-up"
            data-aos-delay="450"
          >

            {/* Join GDG Coventry */}
            <button
              onClick={() => window.open("https://gdg.community.dev/gdg-coventry/", "_blank")}
              type="button"
              className="whitespace-nowrap cursor-pointer font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-white shadow-md hover:shadow-lg px-6 py-3 text-lg"
              style={{ backgroundColor: '#4285F4' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#3367D6'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#4285F4'}
            >
              <i className="ri-group-line text-xl"></i>
              Join GDG Coventry
            </button>

            {/* Linktree Button */}
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white text-lg px-8 py-4"
              style={{ '--hover-color': '#4285F4' }}
              onMouseEnter={(e) => e.target.style.color = '#4285F4'}
              onMouseLeave={(e) => e.target.style.color = 'white'}
              onClick={() => window.open("https://linktr.ee/GDGCoventry", "_blank")}
            >
              <i className="ri-links-line text-xl"></i>
              View All Our Platforms
            </Button>
          </div>

          {/* Footer Small Features */}
          <div
            className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-blue-100"
            data-aos="fade-up"
            data-aos-delay="550"
          >
            <div className="flex items-center space-x-2">
              <i className="ri-shield-check-line text-xl"></i>
              <span>Free to join</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="ri-time-line text-xl"></i>
              <span>Flexible schedule</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="ri-global-line text-xl"></i>
              <span>Online & in-person events</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
