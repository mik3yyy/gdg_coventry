import type { Opportunity } from "../../../../contexts/OppurtunityContext"

interface Props {
    opportunity: Opportunity
    onClose: () => void
    statusColorClass: (s: string) => string
    typeColorClass: (s: string) => string
    onApprove?: () => void
    onReject?: () => void
}

export function OpportunityDetailsModal({
    opportunity,
    onClose,
    statusColorClass,
    typeColorClass,
    onApprove,
    onReject
}: Props) {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {opportunity.type === "job" ? "Job Details" : "Collaboration Details"}
                        </h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <i className="ri-close-line text-xl"></i>
                        </button>
                    </div>

                    <div className="space-y-6">

                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{opportunity.title}</h3>
                            <div className="flex items-center space-x-3 text-sm">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColorClass(opportunity.status)}`}>
                                    {opportunity.status.charAt(0).toUpperCase() + opportunity.status.slice(1)}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColorClass(opportunity.type)}`}>
                                    {opportunity.type}
                                </span>
                                <span className="text-gray-500">
                                    {new Date(opportunity.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {opportunity.companyName && (
                                <Field label="Company" value={opportunity.companyName} />
                            )}
                            {opportunity.location && (
                                <Field label="Location" value={opportunity.location} />
                            )}
                            {opportunity.projectType && (
                                <Field label="Project Type" value={opportunity.projectType} />
                            )}
                            {opportunity.duration && (
                                <Field label="Duration" value={opportunity.duration} />
                            )}
                            {opportunity.commitment && (
                                <Field label="Commitment" value={opportunity.commitment} />
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <p className="text-gray-700 leading-relaxed">{opportunity.description}</p>
                        </div>

                        {opportunity.skills && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Required Skills</label>
                                <p className="text-gray-700">{opportunity.skills}</p>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Posted By</label>
                            <p className="text-gray-900">{opportunity.email}</p>
                        </div>

                        {opportunity.external_url && (
                            <div className="pt-2">
                                <a
                                    href={opportunity.external_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                                >
                                    Apply / External Link
                                </a>
                            </div>
                        )}

                        {opportunity.status === "pending" && (
                            <div className="flex space-x-3 pt-6 border-t">
                                {onApprove && (
                                    <button
                                        onClick={onApprove}
                                        className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-medium"
                                    >
                                        Approve
                                    </button>
                                )}
                                {onReject && (
                                    <button
                                        onClick={onReject}
                                        className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-medium"
                                    >
                                        Reject
                                    </button>
                                )}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}


// small helper tiny sub component
function Field({ label, value }: { label: string, value: string }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <p className="text-gray-900">{value}</p>
        </div>
    )
}
