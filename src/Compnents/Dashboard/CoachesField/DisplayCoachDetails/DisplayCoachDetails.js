import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCoachById, getFeedbackHistory, getFeedbackAnalysis } from '../api/coachApi'; 
import Header from '../../Header';
// import Dashboard from '../../Dashboard';
import FeedbackHistory from './FeedbackHistory';
import FeedbackAnalysis from './FeedbackAnalysis';

export default function DisplayCoachDetails() {
    const { coachname, id } = useParams();
    // const [activeLink] = useState('Coaches');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [coachData, setCoachData] = useState(null);
    const [feedbackHistory, setFeedbackHistory] = useState([]);
    const [feedbackAnalysis, setFeedbackAnalysis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [btnClicked, setBtnClicked] = useState('Feedback Analysis');

    // const handleBtnClick = (btnName) => {
    //     setBtnClicked(btnName);
    // };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch coach main data
                const coachResponse = await getCoachById(id);
                setCoachData(coachResponse);
                
                // Fetch feedback data
                const [historyResponse, analysisResponse] = await Promise.all([
                    getFeedbackHistory(id),
                    getFeedbackAnalysis(id)
                ]);
                
                setFeedbackHistory(historyResponse);
                setFeedbackAnalysis(analysisResponse);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

    return (
        <div className='h-[100vh]'>
            <div className='flex h-full'>
                {/* <Dashboard activeLink={activeLink} /> */}
                <div className="flex-grow text-gray-800">
                    <Header isDrawerOpen={isDrawerOpen} handleDrawer={handleDrawer} />
                    
                    {/* Coach Info Section */}
                    <div className="w-full mx-auto flex sm:flex-row flex-col items-center justify-center gap-4 p-4">
                        <div className="mb-5 sm:w-1/4">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Coach Name</label>
                            <p className="font-bold">{coachname}</p>
                        </div>
                        <div className="mb-5 sm:w-1/4">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Coach Email</label>
                            <p className="font-bold">{coachData?.email}</p>
                        </div>
                    </div>
                    
                    <hr />
                    {/* <div className='flex w-full items-center justify-between gap-4 px-4 pt-2'>
                        <button
                            onClick={() => handleBtnClick('Feedback Analysis')}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                            Feedback Analysis
                        </button>
                        <p className='font-bold'>{btnClicked}</p>
                        <button
                            onClick={() => handleBtnClick('Feedback History')}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                            Feedback History
                        </button>
                    </div> */}

                    {/* Feedback Sections */}
                    <div className="px-4">
                        {btnClicked === 'Feedback History' && (
                            <FeedbackHistory feedbackHistory={feedbackHistory} />
                        )}
                        {btnClicked === 'Feedback Analysis' && (
                            <FeedbackAnalysis feedbackAnalysis={feedbackAnalysis} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}