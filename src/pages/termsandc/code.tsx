
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/base/Button';
import Card from '../../components/base/cards';

export default function Code() {
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
                            Code of Conduct
                        </h1>
                        <p className="text-gray-600">
                            Last updated: November 2025
                        </p>
                    </div>
                </div>

                <Card padding="md">
                    <div className="prose prose-lg max-w-none">

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. About GDG Coventry</h2>
                        <p className="text-gray-700 mb-6">
                            GDG Coventry is an independent, community-organised group for developers and tech enthusiasts in Coventry.
                            While supported by the Google Developer Groups program, this is <strong>not an official Google page</strong>
                            and does not represent Google, Google Cloud, or any Google product teams.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Purpose of This Code of Conduct</h2>
                        <p className="text-gray-700 mb-6">
                            This Code of Conduct ensures that GDG Coventry remains a welcoming, safe, respectful, and inclusive community.
                            It applies to all meetups, online spaces, workshops, hackathons, social media interactions, and private community channels.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Expected Behaviour</h2>
                        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                            <li>Be respectful, kind, and considerate to all members.</li>
                            <li>Use inclusive language and welcome people of all backgrounds.</li>
                            <li>Support a positive learning environment for beginners and experts.</li>
                            <li>Give constructive, helpful feedback when engaging with others.</li>
                            <li>Respect differing opinions, skill levels, and experiences.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Unacceptable Behaviour</h2>
                        <p className="text-gray-700 mb-4">
                            The following actions are strictly prohibited at all GDG Coventry activities:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                            <li>Harassment, bullying, intimidation, or discriminatory behaviour.</li>
                            <li>Sexual language, unwanted attention, or inappropriate imagery.</li>
                            <li>Hate speech targeting race, gender, religion, orientation, or identity.</li>
                            <li>Deliberately disrupting workshops, talks, or community activities.</li>
                            <li>Spamming, soliciting, or promoting products without permission.</li>
                            <li>Misrepresenting GDG Coventry as an official Google organisation.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Our Relationship With Google</h2>
                        <p className="text-gray-700 mb-6">
                            GDG Coventry is part of the global Google Developer Groups program,
                            but it is <strong>organised by local volunteers</strong>.
                            Events, content, and opinions shared here do not represent Google.
                            Please do not portray this community as an official Google channel.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Event & Community Guidelines</h2>
                        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                            <li>Ask permission before photographing or recording individuals.</li>
                            <li>Follow instructions from event organisers and volunteers.</li>
                            <li>Use event resources responsibly (WiFi, equipment, materials).</li>
                            <li>Report any issues or unsafe behaviour immediately.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Reporting Problems</h2>
                        <p className="text-gray-700 mb-6">
                            If you experience or witness a violation of this Code of Conduct, please tell an organiser immediately.
                            You can also report confidentially via email at:
                            <strong>gdgcoventry@gmail.com</strong>
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Consequences of Violations</h2>
                        <p className="text-gray-700 mb-6">
                            Anyone violating this Code of Conduct may be warned, removed from events,
                            or permanently banned from GDG Coventry activities at the organisers’ discretion.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Updates to This Code</h2>
                        <p className="text-gray-700 mb-6">
                            GDG Coventry may update this Code of Conduct when needed.
                            Any updates will be posted on this page with a revised date.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
                        <p className="text-gray-700 mb-6">
                            For concerns, questions, or suggestions, reach us at:<br />
                            <strong>gdgcoventry@gmail.com</strong>
                        </p>

                    </div>
                </Card>

            </div>
        </div>
    );
}
