import React from 'react';
import FeedbackSessionRow from './FeedbackSessionRow';

export default function OtherFeedbackTable({
    data,
    toggleExpand,
    expandedSessions,
    editingSession,
    editData,
    setEditData,
    handleEditSubmit,
    cancelEdit,
    setEditingSession,
}) {
    return (
        <div className='bg-gray-200  mx-8'>
            <div className="bg-gray-200 p-2 font-medium text-gray-700 mb-2">
                Total: {data.totalHours} h
            </div>
            <table className="min-w-full bg-white border-2 my-2">
                <thead className="bg-gray-50 border-b border-2">
                    <tr>
                        <th className="py-2 px-4 border-b">Date</th>
                        <th className="py-2 px-4 border-b">Details</th>
                        <th className="py-2 px-4 border-b">Hours</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.sessions.map((session, index) => (
                        <FeedbackSessionRow
                            key={index}
                            session={session}
                            toggleExpand={toggleExpand}
                            expandedSessions={expandedSessions}
                            editingSession={editingSession}
                            editData={editData}
                            setEditData={setEditData}
                            handleEditSubmit={handleEditSubmit}
                            cancelEdit={cancelEdit}
                            setEditingSession={setEditingSession}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}