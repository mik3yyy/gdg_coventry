
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/base/Button';
import Card from '../../components/base/cards';

export default function Terms() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <Button
                        variant="outline"
                        onClick={() => navigate(-1)}
                        className="mb-4"
                    >
                        <i className="ri-arrow-left-line mr-2"></i>
                        Back
                    </Button>

                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="ri-file-text-line text-2xl text-white"></i>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Terms of Service
                        </h1>
                        <p className="text-gray-600">
                            Last updated: November 2025
                        </p>
                    </div>
                </div>

                <Card padding="md">
                    <div className="prose prose-lg max-w-none">

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                        <p className="text-gray-700 mb-6">
                            By accessing and using the GDG Coventry website (“Service”), you agree to comply with
                            and be bound by these Terms of Service. If you do not agree with these terms,
                            please discontinue use of the website.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. About GDG Coventry</h2>
                        <p className="text-gray-700 mb-6">
                            GDG Coventry is an independent, volunteer-led community group supported by the
                            Google Developer Groups program. This website, its content, and its activities do
                            <strong>not</strong> represent Google or any Google product teams.
                            Participation in GDG Coventry does not create any official relationship with Google.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Description of Service</h2>
                        <p className="text-gray-700 mb-6">
                            The Service provides event information, community resources, learning materials,
                            and online features such as registration, membership management, and communication.
                            The Service is provided free of charge and is intended for educational and community purposes.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Accounts</h2>
                        <p className="text-gray-700 mb-4">
                            Some features require sign-in using Google Sign-In. By creating an account, you agree to:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                            <li>Provide accurate and truthful information</li>
                            <li>Use your own Google account for authentication</li>
                            <li>Not impersonate any other individual or organisation</li>
                            <li>Be responsible for all activity under your account</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Event Participation</h2>
                        <p className="text-gray-700 mb-6">
                            By registering for GDG Coventry events, you agree to follow all event rules,
                            respect organisers and participants, and comply with our Code of Conduct.
                            Event venues or partners may have additional rules you must follow.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Acceptable Use</h2>
                        <p className="text-gray-700 mb-4">
                            You agree not to use the Service to:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                            <li>Break any applicable laws or regulations</li>
                            <li>Harass, threaten, or harm other members</li>
                            <li>Upload harmful, misleading, or malicious content</li>
                            <li>Attempt unauthorized access to systems or data</li>
                            <li>Misrepresent GDG Coventry as an official Google entity</li>
                            <li>Commercially advertise without express permission from organisers</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Privacy and Data</h2>
                        <p className="text-gray-700 mb-6">
                            We collect minimal personal data and only through Google Sign-In.
                            For details about what we collect and how we use it, please read our
                            <strong>Privacy Policy</strong>, which forms part of these Terms.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Intellectual Property</h2>
                        <p className="text-gray-700 mb-6">
                            Content, branding, logos, and materials created by GDG Coventry organisers
                            belong to the community or their respective creators.
                            Google trademarks, including the GDG logo, are owned by Google LLC and used under program guidelines.
                            You may not copy or redistribute content without permission.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">9. No Commercial Use</h2>
                        <p className="text-gray-700 mb-6">
                            GDG Coventry is a free community group.
                            You may not use the Service or community spaces for paid promotion,
                            recruitment, or business marketing unless explicitly approved by the organisers.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Termination</h2>
                        <p className="text-gray-700 mb-6">
                            We reserve the right to suspend or remove access to the Service or community channels
                            for violations of these Terms, our Code of Conduct, or disruptive behaviour at events.
                            Decisions are made at the discretion of the organisers.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Disclaimer</h2>
                        <p className="text-gray-700 mb-6">
                            The Service is provided on an “as is” basis.
                            GDG Coventry makes no guarantees about accuracy, availability, or reliability of the website, events, or materials.
                            Participation in events is voluntary and at your own risk.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Limitation of Liability</h2>
                        <p className="text-gray-700 mb-6">
                            GDG Coventry, its organisers, volunteers, and partners shall not be held liable
                            for any indirect, incidental, or consequential damages arising from participation in events
                            or use of the Service.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Amendments to Terms</h2>
                        <p className="text-gray-700 mb-6">
                            We may update or modify these Terms at any time.
                            Updates will be reflected on this page with a revised “Last updated” date.
                            Continued use of the Service signifies your acceptance of the updated Terms.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Information</h2>
                        <p className="text-gray-700 mb-6">
                            For questions or concerns about these Terms, please contact:<br />
                            <strong>gdgcoventry@gmail.com</strong>
                        </p>

                    </div>
                </Card>

            </div>
        </div>
    );
}
