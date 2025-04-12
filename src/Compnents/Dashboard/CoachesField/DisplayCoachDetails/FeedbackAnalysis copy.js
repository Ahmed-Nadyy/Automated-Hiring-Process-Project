import React, { useState } from 'react';

export default function FeedbackAnalysisC({ feedbackAnalysis }) {
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
            // For interviews, keep all details
            preparedData[type] = items;
        } else {
            // For other types, just sum total hours
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

    // State to track expanded sessions
    const [expandedSessions, setExpandedSessions] = useState(new Set());

    const toggleExpand = (sessionId) => {
        const newExpanded = new Set(expandedSessions);
        if (newExpanded.has(sessionId)) {
            newExpanded.delete(sessionId);
        } else {
            newExpanded.add(sessionId);
        }
        setExpandedSessions(newExpanded);
    };

    return (
        <div className="overflow-x-auto overflow-y-auto sm:h-[460px] mt-4">
            {Object.keys(preparedData).length > 0 ? (
                <>
                    {Object.entries(preparedData).map(([type, data]) => (
                        <div key={type}>
                            {/* Type header */}
                            <div className="bg-gray-100 p-2 font-bold text-lg mb-2">
                                {type}
                            </div>

                            {type === 'CPU - {PST University}' ? (
                                // CPU specific display
                                Object.entries(data).map(([key, value]) => (
                                    <div key={key} className='bg-gray-200 mx-8'>
                                        <div className="bg-gray-200 p-2 font-medium text-gray-700 mb-2">
                                            {key} - Total: {value.totalHours} h
                                        </div>
                                        <table className="min-w-full bg-white border-2 my-2">
                                            <thead className="bg-gray-50 border-b border-2">
                                                <tr>
                                                    <th className="py-2 px-4 border-b">Date</th>
                                                    <th className="py-2 px-4 border-b">Details</th>
                                                    <th className="py-2 px-4 border-b">Hours</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {value.sessions.map((session, index) => (
                                                    <React.Fragment key={index}>
                                                        <tr 
                                                            key={index} 
                                                            className='border-b-2 cursor-pointer '
                                                            onClick={() => toggleExpand(session._id)}
                                                        >
                                                            <td className="py-2 px-4 border-b">
                                                                {new Date(session.date).toLocaleDateString()}
                                                            </td>
                                                            <td className="py-2 px-4 border-b">
                                                                {/* Show summary when collapsed */}
                                                                {!expandedSessions.has(session._id) && (
                                                                    <div className="flex flex-col items-center">
                                                                        <span>Click to expand</span>
                                                                        {/* <span> {session.data.wave} - {session.data.plan} - {session.data.level} </span> */}
                                                                    </div>
                                                                )}
                                                            </td>
                                                            <td className="py-2 px-4 border-b">
                                                                {session.data.duration} hours
                                                            </td>
                                                        </tr>
                                                        
                                                        {expandedSessions.has(session._id) && (
                                                            <tr key={`${index}-details`}>
                                                                <td colSpan={3} className="p-4 border-b">
                                                                    <table className="w-full divide-y divide-gray-200 border-2">
                                                                        <tbody>
                                                                            {Object.entries(session.data).map(([key, value]) => (
                                                                                key !== 'trainingType' && (
                                                                                    <tr key={key} className="border-b-2">
                                                                                        <td className="px-2 py-1 font-medium text-gray-700 w-1/3 border-b-2">
                                                                                            {key.split(/(?=[A-Z])/).join(' ').replace(/^\w/, c => c.toUpperCase())}
                                                                                        </td>
                                                                                        <td className="px-2 py-1 text-gray-600 border-b-2">
                                                                                            {value}
                                                                                        </td>
                                                                                    </tr>
                                                                                )
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ))
                            ) : type === 'Interviews' ? (
                                // Interviews display
                                <div className='bg-gray-200  mx-8'>
                                <table className="min-w-full bg-white border-2 my-2">
                                    <thead className="bg-gray-50 border-b border-2">
                                        <tr>
                                            <th className="py-2 px-4 border-b">Date</th>
                                            <th className="py-2 px-4 border-b">Student</th>
                                            <th className="py-2 px-4 border-b">Email</th>
                                            <th className="py-2 px-4 border-b">Hours</th>
                                            <th className="py-2 px-4 border-b">Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((session, index) => (
                                            <tr key={index} className='border-b-2'>
                                                <td className="py-2 px-4 border-b">
                                                    {new Date(session.date).toLocaleDateString()}
                                                </td>
                                                <td className="py-2 px-4 border-b">
                                                    {session.data.studentName}
                                                </td>
                                                <td className="py-2 px-4 border-b">
                                                    {session.data.studentEmail}
                                                </td>
                                                <td className="py-2 px-4 border-b">
                                                    {session.data.duration} hours
                                                </td>
                                                <td className="py-2 px-4 border-b">
                                                    {session.data.notes}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                </div>
                            ) : (
                                // Other types display
                                <div className='bg-gray-200  mx-8'>
                                <div className="bg-gray-200 p-2 font-medium text-gray-700 mb-2">
                                    Total: {data.totalHours} h
                                </div>
                                <table className="min-w-full bg-white border-2 my-2">
                                    <thead className="bg-gray-50 border-b border-2">
                                        <tr>
                                            <th className="py-2 px-4 border-b">Date</th>
                                            <th className="py-2 px-4 border-b">Details</th>
                                            <th className="py-2 px-4 border-b">Hours</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.sessions.map((session, index) => (
                                            <React.Fragment key={index}>
                                                <tr 
                                                    key={index} 
                                                    className='border-b-2 cursor-pointer'
                                                    onClick={() => toggleExpand(session._id)}
                                                >
                                                    <td className="py-2 px-4 border-b">
                                                        {new Date(session.date).toLocaleDateString()}
                                                    </td>
                                                    <td className="py-2 px-4 border-b">
                                                        {/* Show summary when collapsed */}
                                                        {!expandedSessions.has(session._id) && (
                                                            <div className="flex flex-col items-center">
                                                                <span>Click to expand</span>
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="py-2 px-4 border-b">
                                                        {session.data.duration} hours
                                                    </td>
                                                </tr>
                                                
                                                {expandedSessions.has(session._id) && (
                                                    <tr key={`${index}-details`}>
                                                        <td colSpan={3} className="p-4 border-b">
                                                            <table className="w-full divide-y divide-gray-200 border-2">
                                                                <tbody>
                                                                    {Object.entries(session.data).map(([key, value]) => (
                                                                        key !== 'trainingType' && (
                                                                            <tr key={key} className="border-b-2">
                                                                                <td className="px-2 py-1 font-medium text-gray-700 w-1/3 border-b-2">
                                                                                    {key.split(/(?=[A-Z])/).join(' ').replace(/^\w/, c => c.toUpperCase())}
                                                                                </td>
                                                                                <td className="px-2 py-1 text-gray-600 border-b-2">
                                                                                    {value}
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            
                                </div>
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