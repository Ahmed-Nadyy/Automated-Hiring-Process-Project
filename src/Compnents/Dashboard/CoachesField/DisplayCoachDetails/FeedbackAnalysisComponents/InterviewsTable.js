import React, { useState } from 'react';
import FeedbackEditModal from './FeedbackEditModal';

export default function InterviewsTable({ data }) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingSession, setEditingSession] = useState(null);
    const [editData, setEditData] = useState(null);

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        // Implement your edit submit logic here
        setShowEditModal(false);
        setEditingSession(null);
        setEditData(null);
    };

    return (
        <div className='bg-gray-200 mx-8'>
            <table className="min-w-full bg-white border-2 my-2">
                <thead className="bg-gray-50 border-b border-2">
                    <tr>
                        <th className="py-2 px-4 border-b">Date</th>
                        <th className="py-2 px-4 border-b">Student</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Hours</th>
                        <th className="py-2 px-4 border-b">Notes</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((session, index) => (
                        <tr key={index} className='border-b-2'>
                            <td className="py-2 px-4 border-b">
                                {new Date(session.date).toLocaleDateString()}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {session.data.studentName}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {session.data.studentEmail}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {session.data.duration} hours
                            </td>
                            <td className="py-2 px-4 border-b">
                                {session.data.notes}
                            </td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => {
                                        setEditData(session.data);
                                        setEditingSession(session._id);
                                        setShowEditModal(true);
                                    }}
                                    className="px-4 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <FeedbackEditModal
                isOpen={showEditModal}
                onClose={() => {
                    setShowEditModal(false);
                    setEditingSession(null);
                    setEditData(null);
                }}
                data={editingSession ? data.find(s => s._id === editingSession).data : {}}
                editData={editData}
                setEditData={setEditData}
                onSubmit={handleEditSubmit}
            />
        </div>
    );
}