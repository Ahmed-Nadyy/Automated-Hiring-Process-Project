import React from 'react';

export default function SessionInputCard({
    toggleSessionCard,
    sessionInfo,
    setSessionInfo,
    handleSaveSession,
}) {
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg md:w-[400px] w-[300px]">
                    <h2 className="text-lg font-bold mb-4">Add Sessions</h2>
                    <input
                        type="text"
                        placeholder="Session Name"
                        value={sessionInfo.name}
                        onChange={(e) =>
                            setSessionInfo({ ...sessionInfo, name: e.target.value })
                        }
                        className="w-full mt-2 mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    {/* Add other session-related inputs */}
                    <div className="flex justify-end">
                        <button
                            onClick={() => toggleSessionCard()}
                            className="text-gray-700 px-4 py-2 mr-2 rounded-lg hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => handleSaveSession()}
                            className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
                        >
                            Save Session
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
