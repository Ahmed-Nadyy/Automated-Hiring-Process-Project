import React, { useState } from 'react';
import FeedbackTypeHeader from './FeedbackAnalysisComponents/FeedbackTypeHeader';
import CpuFeedbackTable from './FeedbackAnalysisComponents/CpuFeedbackTable';
import InterviewsTable from './FeedbackAnalysisComponents/InterviewsTable';
import OtherFeedbackTable from './FeedbackAnalysisComponents/OtherFeedbackTable';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function FeedbackAnalysis({ feedbackAnalysis }) {
    // Group feedback by training type
    const groupedByType = {};
    feedbackAnalysis.forEach(item => {
        const { trainingType } = item.data;
        if (!groupedByType[trainingType]) {
            groupedByType[trainingType] = [];
        }
        groupedByType[trainingType].push(item);
    });

    // Prepare data for display
    const preparedData = {};
    Object.entries(groupedByType).forEach(([type, items]) => {
        preparedData[type] = {};

        if (type === 'CPU - {PST University}') {
            // Group CPU feedback by wave, plan, level
            items.forEach(item => {
                const { wave, plan, level } = item.data;
                const key = `${wave} ${plan} ${level}`;
                if (!preparedData[type][key]) {
                    preparedData[type][key] = {
                        totalHours: 0,
                        sessions: []
                    };
                }
                preparedData[type][key].totalHours += parseFloat(item.data.duration) || 0;
                preparedData[type][key].sessions.push(item);
            });
        } else if (type === 'Interviews') {
            preparedData[type] = items;
        } else {
            preparedData[type] = {
                totalHours: items.reduce((sum, item) => sum + (parseFloat(item.data.duration) || 0), 0),
                sessions: items
            };
        }
    });

    // Calculate overall total
    const overallTotal = Object.values(preparedData).reduce((sum, group) => {
        if (typeof group === 'object' && group !== null && 'totalHours' in group) {
            return sum + group.totalHours;
        }
        if (typeof group === 'object' && group !== null) {
            return sum + Object.values(group).reduce((subSum, subGroup) => subSum + subGroup.totalHours, 0);
        }
        return sum;
    }, 0);

    // State to track expanded sessions and editing state
    const [expandedSessions, setExpandedSessions] = useState(new Set());
    const [editingSession, setEditingSession] = useState(null);
    const [editData, setEditData] = useState(null);

    const toggleExpand = (sessionId) => {
        const newExpanded = new Set(expandedSessions);
        if (newExpanded.has(sessionId)) {
            newExpanded.delete(sessionId);
        } else {
            newExpanded.add(sessionId);
        }
        setExpandedSessions(newExpanded);
    };

    const handleEditSubmit = async (e, coachId, sessionId) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/coach/feedback/update/${coachId}/${sessionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ feedbackData: editData }),
            });
    
            if (response.ok) {
                const updatedData = await response.json();
                // Update the feedbackAnalysis data with the new feedback
                const updatedFeedbackAnalysis = feedbackAnalysis.map(item => 
                    item._id === sessionId ? { ...item, data: editData } : item
                );
                
                // Re-run the data preparation logic
                const newGroupedByType = {};
                updatedFeedbackAnalysis.forEach(item => {
                    const { trainingType } = item.data;
                    if (!newGroupedByType[trainingType]) {
                        newGroupedByType[trainingType] = [];
                    }
                    newGroupedByType[trainingType].push(item);
                });

                // Update the prepared data
                Object.entries(newGroupedByType).forEach(([type, items]) => {
                    preparedData[type] = {};

                    if (type === 'CPU - {PST University}') {
                        items.forEach(item => {
                            const { wave, plan, level } = item.data;
                            const key = `${wave} ${plan} ${level}`;
                            if (!preparedData[type][key]) {
                                preparedData[type][key] = {
                                    totalHours: 0,
                                    sessions: []
                                };
                            }
                            preparedData[type][key].totalHours += parseFloat(item.data.duration) || 0;
                            preparedData[type][key].sessions.push(item);
                        });
                    } else if (type === 'Interviews') {
                        preparedData[type] = items;
                    } else {
                        preparedData[type] = {
                            totalHours: items.reduce((sum, item) => sum + (parseFloat(item.data.duration) || 0), 0),
                            sessions: items
                        };
                    }
                });

                setEditingSession(null);
                setEditData(null);
                // Force a re-render
                setExpandedSessions(new Set(expandedSessions));
                alert('Feedback updated successfully!');
            } else {
                alert('Failed to update feedback');
            }
        } catch (error) {
            console.error('Error updating feedback:', error);
            alert('Error updating feedback');
        }
    };

    const cancelEdit = () => {
        setEditingSession(null);
        setEditData(null);
    };

    return (
        <div className="overflow-x-auto overflow-y-auto sm:h-[460px] mt-4">
            {Object.keys(preparedData).length > 0 ? (
                <>
                    {Object.entries(preparedData).map(([type, data]) => (
                        <div key={type}>
                            <FeedbackTypeHeader type={type} />
                            
                            {type === 'CPU - {PST University}' ? (
                                Object.entries(data).map(([key, value]) => (
                                    <CpuFeedbackTable
                                        key={key}
                                        keyProp={key}
                                        value={value}
                                        toggleExpand={toggleExpand}
                                        expandedSessions={expandedSessions}
                                        editingSession={editingSession}
                                        editData={editData}
                                        setEditData={setEditData}
                                        handleEditSubmit={handleEditSubmit}
                                        cancelEdit={cancelEdit}
                                        setEditingSession={setEditingSession}
                                    />
                                ))
                            ) : type === 'Interviews' ? (
                                <InterviewsTable data={data} />
                            ) : (
                                <OtherFeedbackTable
                                    data={data}
                                    toggleExpand={toggleExpand}
                                    expandedSessions={expandedSessions}
                                    editingSession={editingSession}
                                    editData={editData}
                                    setEditData={setEditData}
                                    handleEditSubmit={handleEditSubmit}
                                    cancelEdit={cancelEdit}
                                    setEditingSession={setEditingSession}
                                />
                            )}
                        </div>
                    ))}
                    
                    {/* Overall total */}
                    <div className="bg-gray-200 p-2 font-bold text-lg mt-4">
                        <table className="min-w-full">
                            <tbody>
                                <tr>
                                    <td className="py-2 px-4" colSpan={2}>Total</td>
                                    <td className="py-2 px-4">{overallTotal} h</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <p className="text-gray-500 p-4">No feedback analysis found</p>
            )}
        </div>
    );
}