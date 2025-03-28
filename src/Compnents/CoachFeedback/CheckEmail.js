import React, { useState, useEffect } from "react";
import { checkEmail, addFeedbackAnalysis } from "./api/feedbackAPI";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FeedbackForm from "./FeedbackForm";
import img1 from "../../Assets/Images/bg-1-01.png";
import img3 from "../../Assets/Images/bg-4_Artboard 1_Artboard 1.png";
import img2 from "../../Assets/Images/bg-5_Artboard 1.png";

export default function CheckEmail() {
    const [email, setEmail] = useState("");
    const [userData, setUserData] = useState(null);
    const [showName, setShowName] = useState(false);
    const [moveToTop, setMoveToTop] = useState(false);
    const [displayedText, setDisplayedText] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.warning("All fields are required!");
            return;
        }

        try {
            const response = await checkEmail(email);
            if (response && response.coachname) {
                setUserData(response);
                setShowName(true);
                setDisplayedText(""); // Reset typing effect

                setTimeout(() => setMoveToTop(true), 2000);
            } else {
                toast.error("Coach not found.");
            }
            setEmail("");
        } catch (error) {
            console.error("Error checking coach:", error);
            toast.error("Failed to check coach.");
        }
    };

    // New function to handle feedback submission
    const handleFeedbackSubmit = async (feedbackData) => {
        try {
            const response = await addFeedbackAnalysis(userData._id, feedbackData);
            toast.success("Feedback analysis added successfully");
            // You might want to refresh the feedback list or update the state accordingly
        } catch (error) {
            console.error("Error adding feedback analysis:", error);
            toast.error("Failed to add feedback analysis");
        }
    };

    useEffect(() => {
        if (showName && userData?.coachname) {
            const fullText = `Welcome, ${userData.coachname}`;
            let index = 0;

            const interval = setInterval(() => {
                setDisplayedText((prev) => fullText.slice(0, index + 1));
                index++;

                if (index === fullText.length) {
                    clearInterval(interval);
                }
            }, 100);

            return () => clearInterval(interval);
        }
    }, [showName, userData]);

    return (
        <div className="w-full mx-auto flex flex-col items-center bg-gray-50 min-h-screen">
            {!userData ? (
                <div className="w-full mx-auto flex flex-col items-center justify-center">
                    <img src={img1} alt="" className="w-[750px] absolute -z-10 md:block hidden" />
                    <div className="sm:w-[450px] w-[350px] ml-4 mt-4 h-[450px] bg-[#007cff] absolute -z-10 opacity-70"></div>
                    <div className="sm:w-[450px] w-[350px] h-[450px] bg-white absolute opacity-100 -z-0 border-2 border-[#111827]">
                        <img src={img2} alt="" className="absolute w-[150px] h-[250px] md:block hidden z-10 -right-20 -bottom-10" />
                        <img src={img3} alt="" className="absolute w-[130px] md:block hidden z-10 -left-16 -bottom-6" />

                    </div>

                    <form onSubmit={handleSubmit} className="md:w-full w-[250px] z-10 flex flex-col items-center gap-4 justify-center h-screen ">
                        <div className="mb-5 sm:w-1/5">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">
                                Coach Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="dev.ahmed.nady@gmail.com"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="text-white bg-[#007cff] hover:bg-[#007cff]focus:ring-4 focus:outline-none focus:ring-[#007cff] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                            Next
                        </button>
                    </form>


                </div>
            ) : (
                <>
                    <div
                        className={`transition-all duration-1000 text-2xl font-bold text-white bg-[#111827] md:w-[500px] sm:w-[350px] w-full items-center justify-center flex  px-8 rounded-t-lg ${moveToTop ? "text-lg pt-8" : "py-8 mt-40"
                            }`}
                    >
                        {displayedText}
                    </div>

                    {moveToTop && <FeedbackForm
                        userData={userData}
                        onSubmit={handleFeedbackSubmit}
                    />}
                </>
            )}
        </div>
    );
}