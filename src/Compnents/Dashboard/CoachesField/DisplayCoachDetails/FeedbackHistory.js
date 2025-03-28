import React from 'react';

export default function FeedbackHistory({ feedbackHistory }) {
    return (
        <>
            <div>
                <div className="overflow-x-auto overflow-y-auto sm:h-[470px]">
                    {feedbackHistory.length > 0 ? (
                        <table className="min-w-full bg-white border-2">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">Action</th>
                                    <th className="py-2 px-4 border-b">Date</th>
                                    <th className="py-2 px-4 border-b">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feedbackHistory.map((history, index) => (
                                    <tr key={index}>
                                        <td className="py-2 px-4 border-b align-middle">
                                            {history.action}
                                        </td>
                                        <td className="py-2 px-4 border-b align-middle">
                                            {new Date(history.timestamp).toLocaleDateString()}
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <table className="w-full divide-y divide-gray-200 border-2">
                                                <tbody>
                                                    {Object.entries(history.feedbackData.data).map(([key, value]) => (
                                                        <tr key={key}>
                                                            <td className="px-2 py-1 font-medium text-gray-700 w-1/3 border-2">
                                                                {key.split(/(?=[A-Z])/).join(' ').replace(/^\w/, c => c.toUpperCase())}
                                                            </td>
                                                            <td className="px-2 py-1 text-gray-600 border-2">
                                                                {value}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    {history.deletionType && (
                                                        <tr>
                                                            <td className="px-2 py-1 font-medium text-gray-700">Deletion Type</td>
                                                            <td className="px-2 py-1 text-gray-600">{history.deletionType}</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500">No feedback history found</p>
                    )}
                </div>
            </div>
        </>
    )
}