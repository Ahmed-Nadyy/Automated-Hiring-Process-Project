import React from 'react';

export default function SessionInputCard({
    toggleInoutCard,
    handleAction,
    InputsValues,
    setInputsValues,
    // sessionInfo,
    // setSessionInfo,
    // handleSaveSession,
    Inputs,
    title,
    groupId,
}) {
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg md:w-[400px] w-[300px]">
                    <h2 className="text-lg font-bold mb-4">{title}</h2>
                    {/* Add session inputs here */}
                    {Inputs.map((input, index) => (
                        <div key={index} className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                {input.label}
                            </label>
                            <input
                                type={input.type}
                                value={InputsValues[input.name]}
                                onChange={(e) =>
                                    setInputsValues({
                                        ...InputsValues,
                                        [input.name]: e.target.value,
                                    })
                                    // handleAction(index, e.target.value)
                                }
                                className="mt-1 p-2 border rounded-md w-full"
                            />
                        </div>
                    ))}
                    {/* Add other session-related inputs */}
                    <div className="flex justify-end">
                        <button
                            onClick={() => toggleInoutCard()}
                            className="text-gray-700 px-4 py-2 mr-2 rounded-lg hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => handleAction()}
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
