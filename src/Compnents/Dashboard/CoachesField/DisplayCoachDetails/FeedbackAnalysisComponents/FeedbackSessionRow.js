import React, { useState } from 'react';
import FeedbackEditModal from './FeedbackEditModal';

export default function FeedbackSessionRow({ 
    session, 
    toggleExpand, 
    expandedSessions,
    setEditingSession,
    setEditData,
    handleEditSubmit,
    cancelEdit,
    editData,
    editingSession
}) {
    const [showEditModal, setShowEditModal] = useState(false);

    const openEditModal = (e) => {
        e.stopPropagation();
        setEditData(session.data);
        setEditingSession(session._id);
        setShowEditModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleEditSubmit(e, session.data.coachId, session._id);
        setShowEditModal(false);
    };

    return (
        <React.Fragment key={session._id}>
            <tr 
                className='border-b-2 cursor-pointer'
                onClick={() => toggleExpand(session._id)}
            >
                <td className="py-2 px-4 border-b">
                    {new Date(session.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">
                    {!expandedSessions.has(session._id) && (
                        <div className="flex flex-col items-center">
                            <span>Click to expand</span>
                        </div>
                    )}
                </td>
                <td className="py-2 px-4 border-b">
                    {session.data.duration} hours
                </td>
                <td className="py-2 px-4 border-b">
                    <button
                        onClick={openEditModal}
                        className="px-4 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                        Edit
                    </button>
                </td>
            </tr>

            <FeedbackEditModal
                isOpen={showEditModal}
                onClose={() => {
                    setShowEditModal(false);
                    setEditingSession(null);
                    setEditData(null);
                }}
                data={session.data}
                editData={editData}
                setEditData={setEditData}
                onSubmit={handleSubmit}
            />

            {expandedSessions.has(session._id) && editingSession !== session._id && (
                <tr key={`${session._id}-details`}>
                    <td colSpan={4} className="p-4 border-b">
                        <table className="w-full divide-y divide-gray-200 border-2">
                            <tbody>
                                {Object.entries(session.data).map(([key, value]) => (
                                    key !== 'trainingType' && (
                                        <tr key={key} className="border-b-2">
                                            <td className="px-2 py-1 font-medium text-gray-700 w-1/3 border-b-2">
                                                {key.split(/(?=[A-Z])/).join(' ').replace(/^\w/, c => c.toUpperCase())}
                                            </td>
                                            <td className="px-2 py-1 text-gray-600 border-b-2">
                                                {value}
                                            </td>
                                        </tr>
                                    )
                                ))}
                            </tbody>
                        </table>
                    </td>
                </tr>
            )}
        </React.Fragment>
    );
}