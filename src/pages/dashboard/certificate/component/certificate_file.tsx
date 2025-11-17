import React from 'react';

interface CertificateProps {
    user: {
        name: string;
    };
}

const logoPath = '/logo.png';  // The path starts from the root of the public folder

const logoCertificatePath = '/main_logo.png';  // The path starts from the root of the public folder

const signaturePath = '/signature.png';  // The path starts from the root of the public folder
// DecorativeBackground Component
const DecorativeBackground: React.FC = () => (

    <>
        {/* Shape 1 - Blue Circle */}
        <div className="absolute bottom-10 right-10 w-5 h-5 bg-[#4285F4] rounded-full opacity-30"></div>

        {/* Shape 2 - Red Circle */}
        {/* <div className="absolute bottom-24 right-24 w-5 h-5 bg-[#EA4335] rounded-full opacity-30"></div> */}


        {/* Shape 4 - Green Circle */}
        <div className="absolute bottom-20 right-0 w-5 h-5 bg-[#34A853] rounded-full opacity-30"></div>

        {/* Shape 5 - Blue Square */}
        <div className="absolute bottom-10 right-15 w-5 h-5 bg-[#4285F4] opacity-30"></div>

        {/* Shape 6 - Red Square */}
        <div className="absolute bottom-24 right-20 w-5 h-5 bg-[#EA4335] opacity-30"></div>

        {/* Shape 7 - Yellow Square */}
        <div className="absolute bottom-38 right-10 w-5 h-5 bg-[#FBBC05] opacity-20"></div>

        {/* Shape 8 - Green Square */}
        <div className="absolute bottom-52 right-10 w-5 h-5 bg-[#34A853] opacity-20"></div>


        <div className="absolute top-140 left-0 w-90 h-90 transform rotate-180 opacity-20">
            <img src={logoPath} alt="Logo" className="w-full h-full object-contain" />
        </div>

        {/* Logo at right-middle, rotated */}
        <div className="absolute top-1/2 right-0 w-200 h-200 transform rotate-45 opacity-20">
            <img src={logoPath} alt="Logo" className="w-full h-full object-contain" />
        </div>


        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-dashed border-[#4285F4] opacity-30"></div>
        {/* <div className="absolute top-10 right-10 w-8 h-8 bg-[#EA4335] rotate-45 opacity-40"></div> */}
        <div className="absolute bottom-20 left-20 w-6 h-6 bg-[#FBBC05] rounded-full opacity-50"></div>
        <div className="absolute bottom-10 right-20 w-10 h-10 bg-[#4285F4] opacity-30"></div>
        <div className="absolute top-1/2 left-10 w-12 h-12 border-2 border-[#EA4335] rounded-full opacity-20"></div>
        <div className="absolute top-1/3 right-5 w-4 h-4 bg-[#FBBC05] opacity-60"></div>
        <div className="absolute bottom-1/3 left-5 w-6 h-6 bg-[#4285F4] rotate-12 opacity-40"></div>

        {/* Additional decorative elements */}
        <div className="absolute top-20 left-1/4 w-3 h-3 bg-[#EA4335] rounded-full opacity-50"></div>
        <div className="absolute bottom-40 right-1/4 w-5 h-5 border-2 border-[#4285F4] opacity-30"></div>
        <div className="absolute top-40 right-1/3 w-4 h-4 bg-[#FBBC05] rotate-45 opacity-40"></div>
    </>
);


// CertificateHeader Component
const CertificateHeader: React.FC = () => (
    <div className="mb-8">
        <div className="flex justify-center items-center mb-6">
            <div className="text-center">
                {/* Google Developer Groups logo area */}
                {/* <div className="flex justify-center items-center space-x-3 mb-4">
                    <img src={logoCertificatePath} alt="Logo" className="w-full h-10 object-contain" />

                </div> */}
                <div className="flex items-center justify-center space-x-1 mb-4">
                    {/* Logo Image */}
                    <img src={logoCertificatePath} alt="Logo" className="w-7 h-7 object-contain" />

                    {/* Text */}
                    <span className="text-2xl font-bold text-gray-700">Google Developer Group Coventry</span>
                </div>

                {/* <p className="text-sm text-gray-600 font-medium">Coventry</p> */}
            </div>
        </div>
    </div>
);

// CertificateTitle Component
const CertificateTitle: React.FC = () => (
    <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">CERTIFICATE OF</h2>
        <h1 className="text-7xl font-bold text-[#4285F4] mb-6">MEMBERSHIP</h1>
    </div>
);

// CertificateContent Component
const CertificateContent: React.FC<{ userName: string }> = ({ userName }) => (
    <div className="mb-8">
        <p className="text-xl text-gray-700 mb-8">This certificate is awarded to</p>
        {/* <div className="bg-gradient-to-r from-[#4285F4]/5 via-[#EA4335]/5 to-[#FBBC05]/5 rounded-2xl p-6 mb-8 inline-block border border-gray-100">
            <h4 className="text-3xl font-bold bg-gradient-to-r from-[#4285F4] to-[#EA4335] bg-clip-text text-transparent">{userName}</h4>
        </div>
         */}
        <div className="flex items-center justify-center space-x-3 mb-8">
            {/* Name Display with Underline */}
            <div className="text-center">
                <h4 className="text-4xl font-regular text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {userName}
                </h4>
                <div className="w-full h-1 bg-black mt-2"></div>

                {/* <div className="w-full h-1 bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05] mt-2"></div> */}
            </div>
        </div>

        {/* <p className="text-xl text-gray-700 mb-3">is a member of Google Developer Groups Coventry</p> */}
        {/* <p className="text-xl text-gray-700 mb-3">is a member of Google Developer Groups Coventry</p> */}
        <p className="text-xl text-gray-700 mb-3">is a member of Google Developer Groups Coventry</p>
        <p className="text-gray-600 mb-8 text-lg">and is passionate about growth, collaboration, and learning within the tech community.</p>

    </div>
);

// SignatureSection Component
const SignatureSection: React.FC = () => (
    <div className="flex justify-center">
        <div className="text-center">
            <div className="mb-4">
                <img src={signaturePath} alt="Signature" className="w-100 h-20 object-contain mx-auto" />

                {/* Signature line */}
                <div className="w-64 border-b-2 border-gray-900 mb-2"></div>
            </div>
            <p className="font-bold text-gray-900 text-lg">Community Lead</p>
            <p className="text-gray-700">GDG Coventry, 2024/25.</p>
        </div>
    </div>
);

// BottomDecorativeLine Component
const BottomDecorativeLine: React.FC = () => (
    <div className="mt-8">
        <div className="flex w-full h-5">
            {/* Blue block */}
            <div className="w-1/4 h-full bg-[#4285F4]"></div>
            {/* Red block */}
            <div className="w-1/4 h-full bg-[#EA4335]"></div>
            {/* Yellow block */}
            <div className="w-1/4 h-full bg-[#F9AB00]"></div>
            {/* Green block */}
            <div className="w-1/4 h-full bg-[#34A853]"></div>
        </div>
    </div>
);


const CertificatePreview: React.FC<CertificateProps> = ({ user }) => {
    return (
        <div className="mb-16">
            <div className="bg-white  shadow-2xl  relative overflow-hidden">
                {/* Decorative Background */}
                <DecorativeBackground />

                <div className="relative rounded-2xl  md:p-12 ">
                    <div className="text-center">
                        {/* Header */}
                        <CertificateHeader />
                        {/* Title */}
                        <CertificateTitle />
                        {/* Content */}
                        <CertificateContent userName={user.name} />
                        {/* Signature */}
                        <SignatureSection />
                        {/* Bottom Decorative Line */}
                    </div>

                </div>
                <BottomDecorativeLine />

            </div>

        </div>
    );
};

export default CertificatePreview;
