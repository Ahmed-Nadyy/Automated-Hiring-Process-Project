import React, { useState } from 'react';
import DropDownList from '../DropDownList';

export default function NewGroupInputCard({
    newGroup,
    setNewGroup,
    toggleDropdown,
    onCategoryChange,
    cat,
    handleCreateGroup,
    triggerRefresh,
}) {

    const [step, setStep] = useState(1);
    const handleNext = () => {
        setStep(2);  // Move to the session input step
    };
    const handleBack = () => {
        setStep(1);
    };
    return (
        <>
            {step === 1 && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 ">
                    <div className="bg-white p-6 rounded-lg shadow-lg md:w-[400px] w-[300px]">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-bold mb-4">Create a New Group</h2>
                            <DropDownList cat={cat} onCategoryChange={onCategoryChange} />
                        </div>
                        <label>Class Number: </label>
                        <input
                            type="number"
                            placeholder="Class Number"
                            value={newGroup.classNumber}
                            onChange={(e) => setNewGroup({ ...newGroup, classNumber: e.target.value })}
                            className="w-full mt-2 mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <label>Group Level: </label>
                        <input
                            type="number"
                            placeholder="Group Level"
                            value={newGroup.level}
                            onChange={(e) =>
                                setNewGroup({ ...newGroup, level: e.target.value })
                            }
                            className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <label>Number of Sessions: </label>
                        <input
                            type="number"
                            placeholder="number Of Weeks"
                            value={newGroup.numberOfWeeks}
                            onChange={(e) =>
                                setNewGroup({ ...newGroup, numberOfWeeks: e.target.value })
                            }
                            className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <label>Number of Seats: </label>
                        <input
                            type="number"
                            placeholder="number of seats"
                            value={newGroup.numberOfSeats}
                            onChange={(e) =>
                                setNewGroup({ ...newGroup, numberOfSeats: e.target.value })
                            }
                            className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <label>Start Date: </label>
                        <input
                            type="date"
                            placeholder="Start Date"

                            value={newGroup.startDate}
                            onChange={(e) =>
                                setNewGroup({ ...newGroup, startDate: e.target.value })
                            }
                            className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={() => toggleDropdown()}
                                className="text-gray-700 px-4 py-2 mr-2 rounded-lg hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleNext()}
                                className="text-white bg-gradient-to-r from-black to-blue-500 hover:from-gray-800 hover:to-blue-600 px-4 py-2 rounded-lg"
                            >
                                Next
                            </button>

                        </div>
                    </div>
                </div>
            )}
            {step === 2 && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 ">
                    <div className="bg-white p-6 rounded-lg shadow-lg md:w-[400px] w-[300px]">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-bold mb-4">Select Session Times</h2>
                        </div>
                        {/* Session Time Input Form */}
                        {['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day) => (
                            <div key={day} className="flex items-center mb-4 gap-2">
                                <input
                                    type="checkbox"
                                    checked={newGroup.sessions.some((session) => session.day === day)} // Check if the day is selected
                                    onChange={(e) => {
                                        const updatedSessions = e.target.checked
                                            ? [...newGroup.sessions, { day, time: '' }] // Add the day if checked
                                            : newGroup.sessions.filter((session) => session.day !== day); // Remove the day if unchecked

                                        setNewGroup({ ...newGroup, sessions: updatedSessions });
                                    }}
                                />
                                {day}

                                {/* Show time input if the day is selected */}
                                {newGroup.sessions.some((session) => session.day === day) && (
                                    <input
                                        type="time"
                                        className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                        value={newGroup.sessions.find((session) => session.day === day)?.time || ''} // Set value to current time if selected
                                        onChange={(e) => {
                                            const updatedSessions = newGroup.sessions.map((session) =>
                                                session.day === day ? { ...session, time: e.target.value } : session
                                            );
                                            setNewGroup({ ...newGroup, sessions: updatedSessions });
                                        }}
                                    />
                                )}
                            </div>
                        ))}

                        <button
                            onClick={() => handleBack()}
                            className="text-gray-700 px-4 py-2 mr-2 rounded-lg hover:bg-gray-200"
                        >
                            Back
                        </button>
                        <button
                            onClick={() => {
                                handleCreateGroup();
                                triggerRefresh();
                            }}
                            className="text-white bg-gradient-to-r from-black to-blue-500 hover:from-gray-800 hover:to-blue-600 px-4 py-2 rounded-lg"
                        >
                            Create
                        </button>
                    </div>

                </div>

            )}

        </>
    )
}
