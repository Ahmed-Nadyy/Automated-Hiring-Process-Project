import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFeedbackLogs } from './api/coachApi';
import img1 from "../../../Assets/Images/bg-1-01.png";
import img3 from "../../../Assets/Images/bg-4_Artboard 1_Artboard 1.png";
import img2 from "../../../Assets/Images/bg-5_Artboard 1.png";
import bgImg from "../../../Assets/Images/qt=q_95.webp";

export default function CoachLogsHistory() {
    const { coachId } = useParams();
    const [logsHistory, setLogsHistory] = useState([]);
    const [coachData, setCoachData] = useState(null);
    const [showName, setShowName] = useState(false);
    const [moveToTop, setMoveToTop] = useState(false);
    const [displayedText, setDisplayedText] = useState("");
    const [paymentDetails, setPaymentDetails] = useState(null);

    useEffect(() => {
        const fetchCoachData = async () => {
            try {
                if (!coachId) return;
                
                const response = await getFeedbackLogs(coachId);
                if (response.success) {
                    const logs = response.data.logs_history || [];
                    // Extract payment details from the first log (assuming all logs have the same payment details)
                    const firstLog = logs[0];
                    const details = firstLog && firstLog.data ? {
                        salaryDeduction: firstLog.data.salaryDeduction || 0,
                        bonus: firstLog.data.bonus || 0,
                        notes: firstLog.data.notes || ''
                    } : null;

                    setLogsHistory(logs);
                    setPaymentDetails(details);
                    setCoachData({
                        coachname: response.coachname,
                        email: response.email
                    });
                    setShowName(true);
                    setDisplayedText("");

                    setTimeout(() => setMoveToTop(true), 2000);
                }
            } catch (error) {
                console.error('Error fetching logs history:', error);
            }
        };

        fetchCoachData();
    }, [coachId]);

    useEffect(() => {
        if (showName && coachData?.coachname) {
            const fullText = `Welcome, ${coachData.coachname}`;
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
    }, [showName, coachData]);

    return (
        <div className="w-full mx-auto flex flex-col items-center bg-gray-50 min-h-screen">
            {!coachData ? (
                <div className="w-full mx-auto flex flex-col items-center justify-center">
                    <img src={img1} alt="" className="w-[750px] absolute -z-10 md:block hidden" />
                    <div className="sm:w-[450px] w-[350px] ml-4 mt-4 h-[450px] bg-[#007cff] absolute -z-10 opacity-70"></div>
                    <div className="sm:w-[450px] w-[350px] h-[450px] bg-white absolute opacity-100 -z-0 border-2 border-[#111827]">
                        <img src={img2} alt="" className="absolute w-[150px] h-[250px] md:block hidden z-10 -right-20 -bottom-10" />
                        <img src={img3} alt="" className="absolute w-[130px] md:block hidden z-10 -left-16 -bottom-6" />
                    </div>

                    <div className="md:w-full w-[250px] z-10 flex flex-col items-center gap-4 justify-center h-screen">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">Loading Coach Data...</h1>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div
                        className={`transition-all pb-6 flex-col gap-4 duration-1000 text-2xl font-bold text-white bg-[#111827] md:w-[670px] sm:w-[350px] w-full items-center justify-center flex  px-8 rounded-t-lg ${moveToTop ? "text-lg pt-8" : "py-8 mt-40"
                            }`}
                    >
                        {displayedText}
                        <img src={bgImg} alt="" />
                    </div>

                    {moveToTop && (
                        <div className="w-full mx-auto flex flex-col items-center">
                            <div className="overflow-x-auto overflow-y-auto sm:h-[540px] w-full max-w-2xl">
                                {logsHistory.length > 0 ? (
                                    <>
                                        {/* Payment Details Summary */}
                                        {paymentDetails && (
                                            <div className="w-full bg-gray-100 p-4 ">
                                                <h3 className="text-lg font-bold mb-2">Payment Summary</h3>
                                                <div className="flex justify-between">
                                                    <span>Salary Deduction:</span>
                                                    <span className="font-bold text-red-500">{paymentDetails.salaryDeduction} EGP</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Bonus:</span>
                                                    <span className="font-bold text-green-500">{paymentDetails.bonus} EGP</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Notes:</span>
                                                    <span className="font-bold">{paymentDetails.notes}</span>
                                                </div>
                                            </div>
                                        )}

                                        <table className="min-w-full bg-white border-2 ">
                                            <thead>
                                                <tr>
                                                    <th className="py-2 px-4 border-b">Date</th>
                                                    <th className="py-2 px-4 border-b">Details</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {logsHistory.map((log, index) => (
                                                    <tr key={index}>
                                                        <td className="py-2 px-4 border-b align-middle">
                                                            {new Date(log.date).toLocaleDateString()}
                                                        </td>
                                                        <td className="py-2 px-4 border-b">
                                                            <table className="w-full divide-y divide-gray-200 border-2">
                                                                <tbody>
                                                                    {Object.entries(log.data).filter(([key]) => 
                                                                        key !== 'coachId' && 
                                                                        key !== 'salaryDeduction' &&
                                                                        key !== 'bonus' &&
                                                                        key !== 'notes'
                                                                    ).map(([key, value]) => (
                                                                        <tr key={key}>
                                                                            <td className="px-2 py-1 font-medium text-gray-700 w-1/3 border-2">
                                                                                {key.split(/(?=[A-Z])/).join(' ').replace(/^\w/, c => c.toUpperCase())}
                                                                            </td>
                                                                            <td className="px-2 py-1 text-gray-600 border-2 whitespace-pre-line">
                                                                                {value}
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </>
                                ) : (
                                    <p className="text-gray-500">No logs history found</p>
                                )}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}