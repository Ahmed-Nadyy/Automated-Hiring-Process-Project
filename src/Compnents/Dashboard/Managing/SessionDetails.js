import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import spinner from "../../../Assets/Images/gear-spinner.svg"; 
import NoSessionsFounded from "../../../Assets/Images/NoSessionsFounded.png"; 
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackwardStep } from "@fortawesome/free-solid-svg-icons";

export default function SessionDetails() {
    const { id } = useParams();
    const [sessions, setSessions] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [groupDetails, setGroupDetails] = useState(null);

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const response = await fetch(
                    `https://daffodil-wary-straw.glitch.me/api/trainingGroup/getGroup/${id}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch group details");
                }
                const data = await response.json();
                setGroupDetails(data);
                setSessions(data.sessions || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGroup();
    }, [id]);

    const handleSubmitFeedback = async (groupId, sessionId, feedback, customFeedback) => {
        try {
            const response = await fetch(
                "https://daffodil-wary-straw.glitch.me/api/trainingGroup/submitFeedback",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ groupId, sessionId, feedback, customFeedback }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to submit feedback");
            }

            const updatedSessions = sessions.map((session) =>
                session.id === sessionId
                    ? { ...session, feedback, customFeedback }
                    : session
            );

            setSessions(updatedSessions);
            Swal.fire({
                title: "Success!",
                text: "Feedback submitted successfully!",
                icon: "success",
                confirmButtonText: "OK",
            });
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: error.message || "An error occurred while submitting feedback.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <img src={spinner} className="w-[200px]" alt="Loading..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500 text-lg font-semibold">{error}</p>
            </div>
        );
    }

    const handleCreateSession = () => {
    };

    return (
        <>
            <Header />
            <div className="container mx-auto px-6 py-8">

                <div className="flex flex-col items-start mb-1">
                    <div className="flex items-center gap-2">
                        <button
                            className="px-4 py-2 bg-gradient-to-r from-black via-blue-800 to-blue-500 rounded-full text-white transition duration-500 ease-in-out hover:scale-105 hover:bg-slate-800"
                            onClick={() => window.history.back()}
                        >
                            <FontAwesomeIcon icon={faBackwardStep} />
                        </button>
                        <h1 className="text-2xl font-bold ">Sessions Details</h1>
                    </div>
                    <div className="flex sm:justify-between sm:flex-row flex-col w-full sm:items-center items-start">
                        <div>
                            <p className="text-lg">
                                <span className="font-bold">Category: </span>
                                {groupDetails.category} <span> &gt; </span>
                                <span className="font-bold">Group: </span>
                                {groupDetails.name}
                                <span> &gt; </span>
                                <span className="font-bold">level: </span>
                                {groupDetails.level}
                            </p>
                        </div>
                        {/* <button
                            className="mb-4 px-4 py-2 h-[40px] bg-gradient-to-r from-black via-blue-800 to-blue-500 rounded-md text-white transition duration-500 hover:scale-95 hover:bg-slate-800"
                            onClick={handleCreateSession}
                        >
                            Create Session
                        </button> */}
                    </div>
                </div>
                {sessions.length > 0 ? (
                    <div className="relative flex flex-col rounded-lg bg-white shadow-sm border border-slate-200">
                        <nav className="flex flex-col gap-4 p-4" role="list">
                            {sessions.map((session, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col p-4 rounded-md border-b border-slate-300 shadow-sm hover:bg-gray-50"
                                >
                                    <div className="mb-2">
                                        <span className="font-bold">Day:</span> {session.day}
                                        <span className="font-bold">Time:</span> {session.time}
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
                        <img src={NoSessionsFounded} alt="No sessions available" className="w-[450px]"/>
                    </div>
                )}
            </div>
        </>
    );
}
