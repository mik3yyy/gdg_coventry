import { Button } from "../../../components/base/Button"
import type { Mentor } from "../../../contexts/MentorContext"


interface PublicMentorCardProps {
    mentor: Mentor
    onRequest: (mentor: Mentor) => void
}

export function PublicMentorCard({ mentor, onRequest }: PublicMentorCardProps) {

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">

                <h3 className="text-lg font-bold text-gray-900">{mentor.name}</h3>
                <p className="text-sm text-gray-600">{mentor.title}</p>
                <p className="text-sm text-[#4285F4] font-medium mb-3">{mentor.company}</p>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {mentor.description}
                </p>

                <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Experience:</span>
                        <span className="font-medium text-gray-900">{mentor.experience}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    {mentor.expertise.slice(0, 3).map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            {skill}
                        </span>
                    ))}
                    {mentor.expertise.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            +{mentor.expertise.length - 3} more
                        </span>
                    )}
                </div>

                <div className="flex space-x-3">
                    <Button
                        onClick={() => onRequest(mentor)}
                        className="flex-1 bg-[#4285F4] text-white hover:bg-[#3367D6] text-sm whitespace-nowrap"
                    >
                        <i className="ri-user-add-line mr-2"></i>
                        Request Mentorship
                    </Button>
                    <a
                        href={mentor.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                        <i className="ri-linkedin-line text-gray-600"></i>
                    </a>
                </div>

            </div>
        </div>
    )
}
