import type { Opportunity } from "../../../../contexts/OppurtunityContext"

interface Props {
    opportunity: Opportunity
    formatDate: (date: string) => string
    getJobTypeColor: (type: string) => string
    getExperienceColor: (exp: string) => string
    getProjectTypeColor: (t: string) => string
    getDurationColor: (d: string) => string
}

export function PublicOpportunityCard({
    opportunity,
    formatDate,
    getJobTypeColor,
    getExperienceColor,
    getProjectTypeColor,
    getDurationColor
}: Props) {

    const isJob = opportunity.type === "job"
    const isCollaboration = opportunity.type === "collaboration"

    const skillsList = opportunity.skills?.split(",").map(s => s.trim()) ?? []

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">

                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        {isJob ? (
                            <>
                                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">Job</span>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getJobTypeColor(opportunity.jobType!)}`}>
                                    {opportunity.jobType!.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getExperienceColor(opportunity.experience!)}`}>
                                    {opportunity.experience!.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </span>
                            </>
                        ) : (
                            <>
                                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">Collaboration</span>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getProjectTypeColor(opportunity.projectType!)}`}>
                                    {opportunity.projectType!.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDurationColor(opportunity.duration!)}`}>
                                    {opportunity.duration!.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </span>
                            </>
                        )}

                        <span className="text-sm text-gray-500">Posted {formatDate(opportunity.created_at)}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">{opportunity.title}</h3>

                    {isJob ? (
                        <div className="flex items-center text-gray-600 mb-3">
                            <i className="ri-building-line mr-2"></i>
                            <span className="font-medium">{opportunity.companyName}</span>
                            {opportunity.location && (
                                <>
                                    <i className="ri-map-pin-line ml-4 mr-2"></i>
                                    <span>{opportunity.location}</span>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center text-gray-600 mb-3">
                            <i className="ri-time-line mr-2"></i>
                            <span className="font-medium">{opportunity.commitment?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                        </div>
                    )}

                    <p className="text-gray-600 mb-4 line-clamp-2">{opportunity.description}</p>

                    {skillsList.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {skillsList.slice(0, 5).map((skill, idx) => (
                                <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                                    {skill}
                                </span>
                            ))}
                            {skillsList.length > 5 && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded">
                                    +{skillsList.length - 5} more
                                </span>
                            )}
                        </div>
                    )}

                </div>

                {/* actions */}
                <div className="lg:ml-6 lg:flex-shrink-0 mt-4 lg:mt-0">

                    {isJob ? (
                        opportunity.external_url ? (
                            <a
                                href={opportunity.external_url.startsWith("http") ? opportunity.external_url : `https://${opportunity.external_url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
                            >
                                Apply Now
                            </a>
                        ) : (
                            <a
                                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${opportunity.email}&su=${encodeURIComponent(`Job Application Interest: ${opportunity.title}`)}&body=${encodeURIComponent(`Hi,\n\nI’m interested in applying for "${opportunity.title}".\nCan we discuss further details?\n\nRegards,\n`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium whitespace-nowrap"
                            >
                                Contact Recruiter
                            </a>
                        )
                    ) : (
                        <a
                            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${opportunity.email}&su=${encodeURIComponent(`Collaboration Interest: ${opportunity.title}`)}&body=${encodeURIComponent(`Hi,\n\nI’m interested in collaborating on "${opportunity.title}".\nLet’s discuss further details.\n\nRegards,\n`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium whitespace-nowrap"
                        >
                            Get in Touch
                        </a>
                    )}

                </div>



            </div>
        </div>
    )
}
