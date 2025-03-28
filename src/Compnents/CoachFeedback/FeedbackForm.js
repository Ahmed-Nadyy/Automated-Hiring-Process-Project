import React, { useState } from 'react';
import bgImg from '../../Assets/Images/qt=q_95.webp';
import './style/style.css';

const FeedbackForm = ({ userData, onSubmit }) => {
    const [trainingType, setTrainingType] = useState('');
    const [cpuStep, setCpuStep] = useState(0);
    const [formData, setFormData] = useState({
        // Common fields
        trainingType: '',

        // CPU specific
        wave: 'Winter 1 2024',
        plan: 'Basic',
        level: 'Level 1',
        group: 'Lecture',
        weekNumber: 'Week 1',
        sessionDate: '',
        startTime: '',
        duration: 0,

        // CPT/CPG/CST/CSA/CFK/Partnership
        groupName: '',
        sessionNumber: '',

        // Interviews
        studentName: '',
        studentEmail: '',
        interviewDate: '',
        startTime: '',
        finishTime: '',
        notes: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const trainingOptions = [
        'CPU - {PST University}',
        'CPT - {PST School}',
        'CPG - {PST Grads}',
        'CST - {School Diploma}',
        'CSA - {Computer Science For Adults}',
        'CFK - Coding For Kids',
        'Partnership',
        'Interviews'
    ];

    const handleCpuNext = () => {
        setCpuStep(prev => prev + 1);
    };

    const handleCpuPrevious = () => {
        setCpuStep(prev => prev - 1);
    };

    // Define relevant fields for each training type
    const pathwayFields = {
        'CPU - {PST University}': ['trainingType', 'wave', 'plan', 'level', 'group', 'weekNumber', 'sessionDate', 'startTime', 'duration'],
        'CPT - {PST School}': ['trainingType', 'groupName', 'sessionNumber', 'sessionDate', 'startTime', 'duration'],
        'CPG - {PST Grads}': ['trainingType', 'groupName', 'sessionNumber', 'sessionDate', 'startTime', 'duration'],
        'CST - {School Diploma}': ['trainingType', 'groupName', 'sessionNumber', 'sessionDate', 'startTime', 'duration'],
        'CSA - {Computer Science For Adults}': ['trainingType', 'groupName', 'sessionNumber', 'sessionDate', 'startTime', 'duration'],
        'CFK - Coding For Kids': ['trainingType', 'groupName', 'sessionNumber', 'sessionDate', 'startTime', 'duration'],
        'Partnership': ['trainingType', 'groupName', 'sessionNumber', 'sessionDate', 'startTime', 'duration'],
        'Interviews': ['trainingType', 'studentName', 'studentEmail', 'interviewDate', 'startTime', 'finishTime', 'notes']
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Step 1: Get the list of relevant fields for the selected pathway
        const relevantFields = pathwayFields[trainingType] || [];

        // Step 2: Filter formData to only include relevant fields
        const filteredFormData = relevantFields.reduce((acc, field) => {
            if (formData[field] !== undefined) {
                acc[field] = formData[field];
            }
            return acc;
        }, {});

        // Step 3: Add coachId to the final data object
        const feedbackData = {
            ...filteredFormData,
            coachId: userData._id,
        };

        // Step 4: Send the data to the backend
        onSubmit(feedbackData)
            .then(() => {
                // Reset form
                resetForm();
                setIsSubmitting(false);
            })
            .catch((error) => {
                console.error("Error submitting feedback:", error);
                setIsSubmitting(false);
            });
    };

    // Helper function to reset form
    const resetForm = () => {
        setTrainingType('');
        setCpuStep(0);
        setFormData({
            trainingType: '',
            wave: 'Winter 1 2024',
            plan: 'Basic',
            level: 'Level 1',
            group: 'Lecture',
            weekNumber: 'Week 1',
            sessionDate: '',
            startTime: '',
            duration: 0,
            groupName: '',
            sessionNumber: '',
            studentName: '',
            studentEmail: '',
            interviewDate: '',
            finishTime: '',
            notes: ''
        });
    };


    const renderCpuForm = () => {
        switch (cpuStep) {
            case 0:
                return (
                    <div className="flex flex-col w-full gap-4">
                        <label className="flex flex-col mb-2 text-sm font-medium text-gray-900">Wave:
                            <select className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={formData.wave} onChange={e => setFormData({ ...formData, wave: e.target.value })}>
                                {['Winter 1 2024', 'Fall 1 2024', 'Fall 2 2024', 'Summer 2 2024'].map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </label>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" type="button" onClick={handleCpuNext}>Next</button>
                    </div>
                );
            case 1:
                return (
                    <div className="flex flex-col w-full gap-4">
                        <label className="flex flex-col mb-2 text-sm font-medium text-gray-900">Plan:
                            <select className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={formData.plan} onChange={e => setFormData({ ...formData, plan: e.target.value })}>
                                {['Basic', 'Standard', 'Premium'].map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </label>
                        <div className="flex justify-between">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" type="button" onClick={handleCpuPrevious}>Previous</button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" type="button" onClick={handleCpuNext}>Next</button>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="flex flex-col w-full gap-4">
                        <label className="flex flex-col mb-2 text-sm font-medium text-gray-900">Level:
                            <select className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={formData.level} onChange={e => setFormData({ ...formData, level: e.target.value })}>
                                {['Level 1', 'Level 2', 'Level 3'].map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </label>
                        <div className="flex justify-between">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" type="button" onClick={handleCpuPrevious}>Previous</button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" type="button" onClick={handleCpuNext}>Next</button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="flex flex-col w-full gap-4">
                        <p className="text-sm font-medium text-gray-900 p-2 rounded-lg"> <span className="font-bold text-blue-600"> Selected:</span> {formData.wave} - {formData.plan} - {formData.level}</p>
                        <div className="flex justify-between">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" type="button" onClick={handleCpuPrevious}>Previous</button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" type="button" onClick={handleCpuNext}>Next</button>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="flex flex-col w-full gap-4">
                        <label className="flex flex-col mb-2 text-sm font-medium text-gray-900">Group:
                            <select className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={formData.group} onChange={e => setFormData({ ...formData, group: e.target.value })}>
                                {['Lecture', 'Practice G1', 'Practice G2', 'Practice G3', 'Practice G4'].map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </label>
                        <div className="flex justify-between">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" type="button" onClick={handleCpuPrevious}>Previous</button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" type="button" onClick={handleCpuNext}>Next</button>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="flex flex-col w-full gap-4">
                        <label className="flex flex-col mb-2 text-sm font-medium text-gray-900">Week Number:
                            <select className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={formData.weekNumber} onChange={e => setFormData({ ...formData, weekNumber: e.target.value })}>
                                {Array.from({ length: 16 }, (_, i) => `Week ${i + 1}`).map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </label>
                        <label>Session Date:
                            <input className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="date" value={formData.sessionDate} onChange={e => setFormData({ ...formData, sessionDate: e.target.value })} />
                        </label>
                        <label>Start Time:
                            <input className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="time" value={formData.startTime} onChange={e => setFormData({ ...formData, startTime: e.target.value })} />
                        </label>
                        <label>Duration:
                            <select className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })}>
                                {[1, 2, 3, 4, 5].map(opt => (
                                    <option key={opt} value={opt}>{opt} hours</option>
                                ))}
                            </select>
                        </label>

                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <span className="flex items-center">
                                    <span className="animate-spin inline-block w-4 h-4 border-2 border-solid border-blue-200 rounded-full"></span>
                                    Submitting...
                                </span>
                            ) : (
                                "Submit"
                            )}
                        </button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" type="button" onClick={handleCpuPrevious} disabled={isSubmitting}>
                            Previous
                        </button>

                    </div>
                );
            default:
                return null;
        }
    };

    const renderOtherTrainingForm = () => (
        <div className="flex flex-col w-full gap-4">
            <label className="flex flex-col mb-2 text-sm font-medium text-gray-900">Group Name:
                <input className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text" value={formData.groupName} onChange={e => setFormData({ ...formData, groupName: e.target.value })} />
            </label>
            <label className="flex flex-col mb-2 text-sm font-medium text-gray-900">Session Number:
                <input className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="number" value={formData.sessionNumber} onChange={e => setFormData({ ...formData, sessionNumber: e.target.value })} />
            </label>
            <label>Session Date:
                <input className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="date" value={formData.sessionDate} onChange={e => setFormData({ ...formData, sessionDate: e.target.value })} />
            </label>
            <label>Session Time:
                <input className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="time" value={formData.startTime} onChange={e => setFormData({ ...formData, startTime: e.target.value })} />
            </label>
            <label>Duration:
                <select className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })}>
                    {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map(opt => (
                        <option key={opt} value={opt}>{opt} hours</option>
                    ))}
                </select>
            </label>

            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                    <span className="flex items-center">
                        <span className="animate-spin inline-block w-4 h-4 border-2 border-solid border-blue-200 rounded-full"></span>
                        Submitting...
                    </span>
                ) : (
                    "Submit"
                )}
            </button>
        </div>
    );

    const renderInterviewForm = () => (
        <div className="flex flex-col w-full gap-4">
            <label>Student Name:
                <input className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text" value={formData.studentName} onChange={e => setFormData({ ...formData, studentName: e.target.value })} />
            </label>
            <label>Student Email:
                <input className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="email" value={formData.studentEmail} onChange={e => setFormData({ ...formData, studentEmail: e.target.value })} />
            </label>
            <label>Interview Date:
                <input className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="date" value={formData.interviewDate} onChange={e => setFormData({ ...formData, interviewDate: e.target.value })} />
            </label>
            <label>Start Time:
                <input className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="time" value={formData.startTime} onChange={e => setFormData({ ...formData, startTime: e.target.value })} />
            </label>
            <label>Finish Time:
                <input className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="time" value={formData.finishTime} onChange={e => setFormData({ ...formData, finishTime: e.target.value })} />
            </label>
            <label>Coach Notes:
                <textarea className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} />
            </label>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                    <span className="flex items-center">
                        <span className="animate-spin inline-block w-4 h-4 border-2 border-solid border-blue-200 rounded-full"></span>
                        Submitting...
                    </span>
                ) : (
                    "Submit"
                )}
            </button>
        </div>
    );

    return (
        <>
            <div className='transition-all duration-1000 bg-[#111827] md:w-[500px] sm:w-[350px] w-full items-center justify-center flex p-8 rounded-b-lg mb-4'>
                <img src={bgImg} alt="" />
            </div>
            <div className="bg-white flex items-center justify-center md:w-[500px] sm:w-[350px] w-full sm:border-x-2 sm:border-b-2 sm:border-[#111827] py-4 sm:rounded-b-lg">
                <form onSubmit={handleSubmit} className='md:w-[270px] flex flex-col items-start gap-4'>
                    <label className="flex flex-col mb-1 text-sm font-medium text-gray-900">Training Type:
                        <select
                            className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            value={trainingType}
                            onChange={e => {
                                setTrainingType(e.target.value);
                                setFormData({ ...formData, trainingType: e.target.value });
                            }}
                        >
                            <option value="">Select Training Type</option>
                            {trainingOptions.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </label>

                    {trainingType === 'CPU - {PST University}' && renderCpuForm()}
                    {['CPT - {PST School}', 'CPG - {PST Grads}', 'CST - {School Diploma}',
                        'CSA - {Computer Science For Adults}', 'CFK - Coding For Kids',
                        'Partnership'].includes(trainingType) && renderOtherTrainingForm()}
                    {trainingType === 'Interviews' && renderInterviewForm()}
                </form>
            </div>
        </>
    );
};

export default FeedbackForm;