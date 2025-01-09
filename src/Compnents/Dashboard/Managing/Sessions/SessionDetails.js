import React from 'react'

import NoSessionsFounded from "../../../../Assets/Images/NoSessionsFounded.png"; 


export default function SessionDetails({
    sessions,
    id,
    state,
    toggleInoutCard,
    handleSubmitFeedback,
}) {
    return (
        <>
            <div className="container mx-auto px-6 py-8">
                <div className='flex gap-2 justify-between'>
                <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold ">Sessions Details</h1> 
                <span className='text-md font-semibold text-green-500'>(Resumed)</span>
                </div>
                <button
                    className="mb-4 px-4 py-2 h-[40px] bg-gradient-to-r from-black via-blue-800 to-blue-500 rounded-md text-white transition duration-500 hover:scale-95 hover:bg-slate-800"
                    onClick={toggleInoutCard}
                >
                    {state}
                </button>
                </div>
                {sessions.length > 0 ? (
                    <div className="relative flex flex-col rounded-lg bg-white shadow-sm border border-slate-200">
                        <nav className="flex flex-col gap-4 p-4" role="list">
                            {sessions.map((session, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col p-4 rounded-md border-b border-slate-300 shadow-sm hover:bg-gray-50"
                                >
                                    <div className="mb-2 flex gap-3">
                                        <span className="font-bold">Day:</span> {session.sessionDay}
                                        <span className="font-bold">Time:</span> {session.time}
                                    </div>
                                    <div className="mb-2 flex gap-3">
                                        <span className="font-bold">Session Number:</span> {session.sessionNumber}
                                    </div>
                                    <div className="mb-2 flex gap-3">
                                        <span className="font-bold">Date:</span> {session.sessionDate}
                                    </div>
                                    <div className="mb-2 flex sm:flex-row flex-col items-center justify-start gap-2">
                                        <span className="font-bold">Feedback: </span>
                                        <input
                                            type="text"
                                            placeholder={session.feedback || "Enter feedback"}
                                            defaultValue={session.feedback}
                                            onChange={(e) =>
                                                (session.feedback = e.target.value)
                                            }
                                            className="mt-1 border border-slate-300 rounded-md p-1 w-auto"
                                        />
                                        <span className="font-bold">Custom Feedback: </span>
                                        <input
                                            type="text"
                                            placeholder={
                                                session.customFeedback || "Enter custom feedback"
                                            }
                                            defaultValue={session.customFeedback}
                                            onChange={(e) =>
                                                (session.customFeedback = e.target.value)
                                            }
                                            className="mt-1 border border-slate-300 rounded-md p-1 w-auto"
                                        />
                                    </div>
                                    <div className="mb-2">

                                    </div>
                                    <button
                                        onClick={() =>
                                            handleSubmitFeedback(
                                                id,
                                                session.id,
                                                session.feedback,
                                                session.customFeedback
                                            )
                                        }
                                        className="mt-2 p-2 bg-gradient-to-tr from-black via-blue-800 to-blue-500 rounded-md text-white transition duration-500 hover:scale-x-95"
                                    >
                                        Submit Feedback
                                    </button>
                                </div>
                            ))}
                        </nav>
                    </div>
                ) : (
                    <div className="text-center text-gray-500 flex flex-col justify-center items-center">
                        No sessions available for this group.
                        <img src={NoSessionsFounded} alt="No sessions available" className="w-[450px]" />
                    </div>
                )}
            </div>
        </>
    )
}
