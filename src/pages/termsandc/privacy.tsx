
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/base/Button';
import Card from '../../components/base/cards';

export default function Privacy() {
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
                            <i className="ri-shield-check-line text-2xl text-white"></i>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Privacy Policy
                        </h1>
                        <p className="text-gray-600">
                            Last updated: November 2025
                        </p>
                    </div>
                </div>

                <Card padding="md">
                    <div className="prose prose-lg max-w-none">

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. About This Privacy Policy</h2>
                        <p className="text-gray-700 mb-6">
                            This Privacy Policy explains how GDG Coventry (“we”, “our”, “community”) collects, uses,
                            and protects your information. GDG Coventry is an independent community group supported
                            by the Google Developer Groups program but is <strong>not an official Google organisation</strong>.
                            This website and its content do not represent Google or its affiliates.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
                        <p className="text-gray-700 mb-4">
                            GDG Coventry collects minimal personal information and only for community-related purposes.
                            We collect information in the following ways:
                        </p>

                        <h3 className="text-xl font-semibold text-gray-900 mb-3">a) Google Sign-In Data</h3>
                        <p className="text-gray-700 mb-6">
                            When you sign in using Google, we receive limited profile information from Google, such as:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                            <li>Your name</li>
                            <li>Your Google email address</li>
                            <li>Your Google profile picture (optional)</li>
                            <li>Your Google user ID</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-900 mb-3">b) Usage Information</h3>
                        <p className="text-gray-700 mb-6">
                            We may collect basic analytics from our website such as page views, clicks,
                            and navigation patterns. This information helps us improve the experience
                            and understand what resources members use.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
                        <p className="text-gray-700 mb-4">We use your information only to:</p>

                        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                            <li>Authenticate you using Google Sign-In</li>
                            <li>Manage your GDG Coventry member profile</li>
                            <li>Allow event registration and attendance tracking</li>
                            <li>Share community updates and announcements</li>
                            <li>Improve website performance and member experience</li>
                        </ul>

                        <p className="text-gray-700 mb-6">
                            We <strong>do not</strong> sell, trade, rent, or monetise your data in any way.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing</h2>
                        <p className="text-gray-700 mb-4">
                            We may share limited information only in the following circumstances:
                        </p>

                        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                            <li>With Google Developer Groups program administrators, if required for GDG compliance</li>
                            <li>With trusted service providers who host our website or tools</li>
                            <li>To comply with legal obligations or protect community safety</li>
                        </ul>

                        <p className="text-gray-700 mb-6">
                            We <strong>do not</strong> share your information with advertisers, marketers, or unrelated third parties.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
                        <p className="text-gray-700 mb-6">
                            We use industry-standard security measures and Google authentication
                            to protect your information. While no system is completely secure,
                            we take reasonable steps to safeguard your data against unauthorized access or misuse.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Retention</h2>
                        <p className="text-gray-700 mb-6">
                            We retain your information for as long as you remain a member of the GDG Coventry community.
                            If you stop participating or request deletion, we will remove your data from our systems
                            within a reasonable timeframe.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights</h2>
                        <p className="text-gray-700 mb-4">Under GDPR and UK data protection laws, you have the right to:</p>

                        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                            <li>Access the personal data we hold about you</li>
                            <li>Request corrections to inaccurate information</li>
                            <li>Request deletion of your data</li>
                            <li>Withdraw consent for communications</li>
                            <li>Request a copy of your stored information</li>
                        </ul>

                        <p className="text-gray-700 mb-6">
                            To exercise these rights, email us at <strong>gdgcoventry@gmail.com</strong>.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Cookies and Tracking</h2>
                        <p className="text-gray-700 mb-6">
                            Our website may use cookies to improve usability, store preferences,
                            and enable sign-in functionality. You can disable cookies through your browser settings,
                            but some features may stop working.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Third-Party Services</h2>
                        <p className="text-gray-700 mb-6">
                            Our platform may contain links to Google services, YouTube, Meetup, or other community tools.
                            We are not responsible for the privacy practices of these external websites.
                            We encourage you to review their policies.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Children’s Privacy</h2>
                        <p className="text-gray-700 mb-6">
                            GDG Coventry is open to individuals aged 16 and above.
                            We do not knowingly collect personal information from children under 16.
                            If such data is discovered, we will delete it promptly.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Updates to This Policy</h2>
                        <p className="text-gray-700 mb-6">
                            We may update this Privacy Policy when necessary.
                            New versions will be posted on this page with a revised “Last updated” date.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
                        <p className="text-gray-700 mb-6">
                            For questions, data requests, or privacy concerns, please contact us at:<br />
                            <strong>gdgcoventry@gmail.com</strong>
                        </p>

                    </div>
                </Card>

            </div>
        </div>
    );
}
