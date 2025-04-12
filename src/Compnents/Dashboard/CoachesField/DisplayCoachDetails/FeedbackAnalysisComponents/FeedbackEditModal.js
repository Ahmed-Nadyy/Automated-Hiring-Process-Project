import React from 'react';

export default function FeedbackEditModal({ isOpen, onClose, data, editData, setEditData, onSubmit }) {
    if (!isOpen) return null;

    // List of fields that should not be editable or displayed
    const excludedFields = ['coachId', 'trainingType', '_id'];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-[80%] max-w-2xl">
                <h2 className="text-xl font-bold mb-4">Edit Feedback</h2>
                <form onSubmit={onSubmit}>
                    <table className="w-full divide-y divide-gray-200">
                        <tbody>
                            {Object.entries(data).map(([key, value]) => (
                                !excludedFields.includes(key) && (
                                    <tr key={key} className="border-b">
                                        <td className="px-4 py-2 font-medium text-gray-700 w-1/3">
                                            {key.split(/(?=[A-Z])/).join(' ').replace(/^\w/, c => c.toUpperCase())}
                                        </td>
                                        <td className="px-4 py-2">
                                            <input
                                                type="text"
                                                value={editData[key] || ''}
                                                onChange={(e) => setEditData(prev => ({
                                                    ...prev,
                                                    [key]: e.target.value,
                                                    trainingType: data.trainingType, // Preserve trainingType
                                                    coachId: data.coachId // Preserve coachId
                                                }))}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                placeholder={value}
                                            />
                                        </td>
                                    </tr>
                                )
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-end mt-4 space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm text-white bg-gray-500 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}