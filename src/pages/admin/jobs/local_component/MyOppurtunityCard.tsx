import type { Opportunity } from "../../../../contexts/OppurtunityContext"

interface MyOpportunityCardProps {
    opportunity: Opportunity
    statusColorClass: (status: string) => string
    typeColorClass: (type: string) => string
    onView?: () => void
    onEdit?: () => void
}

export function MyOpportunityCard({
    opportunity,
    statusColorClass,
    typeColorClass,
    onView,
    onEdit
}: MyOpportunityCardProps) {

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">{opportunity.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColorClass(opportunity.status)}`}>
                            {opportunity.status.charAt(0).toUpperCase() + opportunity.status.slice(1)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColorClass(opportunity.type)}`}>
                            {opportunity.type}
                        </span>
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                        {opportunity.companyName && (
                            <div className="flex items-center">
                                <i className="ri-building-line mr-1"></i>
                                {opportunity.companyName}
                            </div>
                        )}

                        {opportunity.location && (
                            <div className="flex items-center">
                                <i className="ri-map-pin-line mr-1"></i>
                                {opportunity.location}
                            </div>
                        )}

                        <div className="flex items-center">
                            <i className="ri-calendar-line mr-1"></i>
                            {new Date(opportunity.created_at).toLocaleDateString()}
                        </div>
                    </div>

                    <p className="text-gray-700 mb-3 line-clamp-2">{opportunity.description}</p>

                    {opportunity.skills && (
                        <p className="text-xs text-gray-600 italic mb-2">
                            Required skills: {opportunity.skills}
                        </p>
                    )}

                    {opportunity.status === "rejected" && opportunity.rejected_reason && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-xs mb-3">
                            <strong>Reason:</strong> {opportunity.rejected_reason}
                        </div>
                    )}

                    <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">{opportunity.email}</div>

                        <div className="flex items-center space-x-3">

                            {opportunity.external_url && (
                                <a
                                    href={opportunity.external_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 font-medium text-sm underline whitespace-nowrap"
                                >
                                    Open Link
                                </a>
                            )}

                            {/* {onView && (
                                <button
                                    onClick={onView}
                                    className="text-blue-600 hover:text-blue-800 font-medium text-sm whitespace-nowrap"
                                >
                                    <i className="ri-eye-line mr-1"></i>
                                    View
                                </button>
                            )} */}

                            {onEdit && (
                                <button
                                    onClick={onEdit}
                                    className="bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium whitespace-nowrap"
                                >
                                    <i className="ri-edit-line mr-1"></i>
                                    Edit
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
