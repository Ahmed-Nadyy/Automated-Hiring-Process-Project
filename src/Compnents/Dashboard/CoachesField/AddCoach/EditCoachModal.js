import React, { useState } from 'react';

const EditCoachModal = ({ isOpen, onClose, coach, onSubmit }) => {
    const [editData, setEditData] = useState({
        coachname: coach.coachname || '',
        email: coach.email || '',
        hourRate: coach.hourRate || ''
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-[80%] max-w-md">
                <h2 className="text-xl font-bold mb-4">Edit Coach</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(coach._id, editData);
                }}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Coach Name
                        </label>
                        <input
                            type="text"
                            value={editData.coachname}
                            onChange={(e) => setEditData({...editData, coachname: e.target.value})}
                            placeholder={coach.coachname}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={editData.email}
                            onChange={(e) => setEditData({...editData, email: e.target.value})}
                            placeholder={coach.email}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Hour Rate
                        </label>
                        <input
                            type="number"
                            value={editData.hourRate}
                            onChange={(e) => setEditData({...editData, hourRate: e.target.value})}
                            placeholder={coach.hourRate}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex justify-end gap-2">
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
};

export default EditCoachModal;