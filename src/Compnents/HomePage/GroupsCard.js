import React from 'react';

export default function GroupsCard({ fetchedGroups }) {
    const isValidDate = (dateString) => !isNaN(new Date(dateString).getTime());

    return (
        <>
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-8 mt-12 max-sm:max-w-sm max-sm:mx-auto">
                {fetchedGroups.map((group, index) => (
                    group.isFinished === false && (
                        <div key={index} className="border rounded-md p-6">
                            <h3 className="text-2xl font-semibold mb-1">{group.name}</h3>
                            <p className="text-sm text-gray-500">{group.category}</p>

                            <div className="flex justify-between mt-4">
                                <h3 className="text-2xl font-semibold">
                                    {group.level} <sub className="text-gray-400 text-xs">Level</sub>
                                </h3>
                                <h3 className="text-2xl font-semibold">
                                    {group.numberOfSeats} <sub className="text-gray-400 text-xs">Seats</sub>
                                </h3>
                                <h3 className="text-2xl font-semibold">
                                    {group.numberOfWeeks} <sub className="text-gray-400 text-xs">Sessions</sub>
                                </h3>
                            </div>

                            <div className="mt-6">
                                <h3 className="text-2xl font-semibold">
                                    Start Date
                                    <sub className="text-gray-400 text-xs ml-2">
                                        {isValidDate(group.startDate)
                                            ? new Date(group.startDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })
                                            : 'Invalid date'}
                                    </sub>
                                </h3>

                                <button
                                    type="button"
                                    className="w-full mt-6 px-2 py-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                                >
                                    Enroll now
                                </button>
                            </div>
                        </div>
                    )
                ))}
            </div>
        </>
    );
}
