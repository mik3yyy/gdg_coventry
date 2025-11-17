import { Link } from "react-router-dom"

export const MentorHeader = () => {
    return (
        <>
            {/* Breadcrumb */}
            <section className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex items-center space-x-2 text-sm">
                        <Link to="/dashboard" className="text-[#4285F4] hover:underline">Dashboard</Link>
                        <i className="ri-arrow-right-s-line text-gray-400"></i>
                        <span className="text-gray-600">Become a Mentor</span>
                    </nav>
                </div>
            </section>

            <section className="py-12">
                {/* <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> */}
                {/* <div className="bg-white rounded-2xl shadow-lg p-8"> */}

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Become a Mentor</h1>
                    <p className="text-gray-600">
                        Share your knowledge and experience with the next generation of developers.
                        Help others grow while building meaningful connections in the tech community.
                    </p>
                </div>

                {/* Benefits Section */}
                <div className="bg-gradient-to-br from-[#4285F4]/5 to-[#34A853]/5 rounded-2xl p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Why Become a Mentor?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-[#4285F4]/10 rounded-lg flex items-center justify-center">
                                <i className="ri-heart-line text-[#4285F4]"></i>
                            </div>
                            <span className="text-gray-700">Give back to the community</span>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-[#34A853]/10 rounded-lg flex items-center justify-center">
                                <i className="ri-team-line text-[#34A853]"></i>
                            </div>
                            <span className="text-gray-700">Build your network</span>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-[#FBBC05]/10 rounded-lg flex items-center justify-center">
                                <i className="ri-lightbulb-line text-[#FBBC05]"></i>
                            </div>
                            <span className="text-gray-700">Improve your leadership skills</span>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-[#EA4335]/10 rounded-lg flex items-center justify-center">
                                <i className="ri-award-line text-[#EA4335]"></i>
                            </div>
                            <span className="text-gray-700">Get mentor certification</span>
                        </div>
                    </div>
                </div>

                {/* </div> */}
                {/* </div> */}
            </section>
        </>
    )
}
