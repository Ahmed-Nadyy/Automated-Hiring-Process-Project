import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../Header";
import spinner from "../../../../Assets/Images/gear-spinner.svg";
import Swal from "sweetalert2";
import SessionDetails from "../Sessions/SessionDetails";
import SessionInputCard from "../Sessions/SessionInputCard";
import GroupInof from "./GroupInof";
import StudentsRequists from "../Students/StudentsRequists";
import StudentsEnrolled from "../Students/StudentsEnrolled";

const apiUrl = process.env.REACT_APP_API_BASE_URL;

export default function GroupDetails() {
    const { id } = useParams();
    const [sessions, setSessions] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [groupDetails, setGroupDetails] = useState(null);
    const [state, setState] = useState("Pause");
    const [isInputSessionOpen, setIsInputSessionOpen] = useState(false);
    const pauseInputs = [
        { label: "Start Date", type: "date", value: "", name: "startDate" },
        { label: "End Date", type: "date", value: "", name: "endDate" },
    ];
    const [pauseInputsValues, setPauseInputsValues] = useState({
        startDate: "",
        endDate: "",
    });

    const [PointOfView, setPointOfView] = useState("Sessions");
    const [goTo, setGoTo] = useState("Sessions");

    const handlePointOfViewChange = (option) => {
        setGoTo(option);
    };
    const [studentsRequists,setStudentsRequists]= useState([]);
    const [studentsEnrolled,setStudentsEnrolled]= useState([]);

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const response = await fetch(
                    `${apiUrl}/trainingGroup/getGroup/${id}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch group details");
                }
                const data = await response.json();
                console.log(data);
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

    const handlePause = async () => {
        // console.log(groupId, pauseInputsValues);
        const groupId = id;
        try {
            console.log("Making API call to pause group:", groupId);
            console.log("Payload being sent:", JSON.stringify(pauseInputsValues));
            const response = await fetch(
                `${apiUrl}/trainingGroup/pauseGroup/${groupId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(pauseInputsValues), // Fix: Pass the object directly
                }
            );

            if (!response.ok) {
                throw new Error("Failed to pause group");
            }

            Swal.fire({
                title: "Paused!",
                text: "Group has been paused successfully.",
                icon: "success",
                confirmButtonText: "OK",
            });

            state === "Pause" ? setState("Resume") : setState("Pause");
            setPauseInputsValues({ startDate: "", endDate: "" });
            toggleDropdown();
        } catch (error) {
            console.error("Error pausing group:", error);
            Swal.fire({
                title: "Error!",
                text: "Failed to Pause. Please try again.",
                icon: "error",
                confirmButtonText: "OK",
            });

        }
    };



    const handleSubmitFeedback = async (groupId, sessionId, feedback, customFeedback) => {
        // console.log(groupId, sessionId, feedback, customFeedback);
        try {
            const response = await fetch(
                `${apiUrl}/trainingGroup/submitFeedback`,
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

    // const handlePuase = async (groupId) => {
    //     // console.log(groupId, sessionId, feedback, customFeedback);
    //     try {
    //         const response = await fetch(
    //             `${apiUrl}/trainingGroup/pauseGroup/${groupId}`,
    //             {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 // body: JSON.stringify({ groupId, sessionId, feedback, customFeedback }),
    //             }
    //         );

    //         if (!response.ok) {
    //             throw new Error("Failed to pause group");
    //         }

    //         // const updatedSessions = sessions.map((session) =>
    //         //     session.id === sessionId
    //         //         ? { ...session, feedback, customFeedback }
    //         //         : session
    //         // );

    //         // setSessions(updatedSessions);
    //         // Swal.fire({
    //         //     title: "Success!",
    //         //     text: "Feedback submitted successfully!",
    //         //     icon: "success",
    //         //     confirmButtonText: "OK",
    //         // });
    //     } catch (error) {
    //         // Swal.fire({
    //         //     title: "Error!",
    //         //     text: error.message || "An error occurred while submitting feedback.",
    //         //     icon: "error",
    //         //     confirmButtonText: "OK",
    //         // });
    //     }
    // };


    const handleResume = async (groupId) => {
        // console.log(groupId, sessionId, feedback, customFeedback);
        try {
            const response = await fetch(
                `${apiUrl}/trainingGroup/resumeGroup/${groupId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    // body: JSON.stringify({ groupId, sessionId, feedback, customFeedback }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to pause group");
            }

            // const updatedSessions = sessions.map((session) =>
            //     session.id === sessionId
            //         ? { ...session, feedback, customFeedback }
            //         : session
            // );

            // setSessions(updatedSessions);
            // Swal.fire({
            //     title: "Success!",
            //     text: "Feedback submitted successfully!",
            //     icon: "success",
            //     confirmButtonText: "OK",
            // });
        } catch (error) {
            // Swal.fire({
            //     title: "Error!",
            //     text: error.message || "An error occurred while submitting feedback.",
            //     icon: "error",
            //     confirmButtonText: "OK",
            // });
        }
    };

    const toggleDropdown = () => setIsInputSessionOpen(!isInputSessionOpen);


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

            <div>
                <Header />
                <GroupInof
                    setPointOfView={setPointOfView}
                    PointOfView={PointOfView}
                    groupDetails={groupDetails}
                    handlePointOfViewChange={handlePointOfViewChange}
                />

                {goTo === "Sessions" && <SessionDetails
                    groupDetails={groupDetails}
                    toggleInoutCard={setIsInputSessionOpen}
                    handleResume={handleResume}
                    sessions={sessions}
                    id={id}
                    state={state}
                    handleSubmitFeedback={handleSubmitFeedback}
                />}

                {goTo === "Students enrolled" && <StudentsEnrolled
                    studentsEnrolled={studentsEnrolled}
                    setStudentsEnrolled={setStudentsEnrolled}
                />}

                {goTo === "Students requists" && <StudentsRequists
                    studentsRequists={studentsRequists}
                    setStudentsRequists={setStudentsRequists}
                />}



                {isInputSessionOpen &&
                    <SessionInputCard
                        handleAction={handlePause}
                        Inputs={pauseInputs}
                        title={"Pause Group"}
                        toggleInoutCard={setIsInputSessionOpen}
                        InputsValues={pauseInputsValues}
                        setInputsValues={setPauseInputsValues}
                        groupId={id}
                    />}

            </div>
        </>
    );
}
