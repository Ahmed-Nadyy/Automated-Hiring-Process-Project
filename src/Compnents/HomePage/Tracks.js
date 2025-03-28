import React, { useState, useEffect } from 'react';
import GroupsCard from './GroupsCard';

const apiUrl = process.env.REACT_APP_API_BASE_URL;
const API_URL_FOR_GET_GROUPS = `${apiUrl}/trainingGroup/groupsDetailsForStudents`;

export default function Tracks() {
    const [fetchedGroups, setFetchedGroups] = useState([]);
    const [toast, setToast] = useState({ message: '', type: 'success', visible: false });

    const showToastMessage = (message, type = 'success') => {
        setToast({ message, type, visible: true });
        setTimeout(() => {
            setToast((prevToast) => ({ ...prevToast, visible: false }));
        }, 3000);
    };

    const fetchGroupsData = async () => {
        try {
            const response = await fetch(API_URL_FOR_GET_GROUPS, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const data = await response.json();
                setFetchedGroups(data.data || []);
            } else {
                console.log('Failed to fetch Groups:', response.statusText);
                showToastMessage('Failed to fetch groups.', 'error');
            }
        } catch (error) {
            console.log('Error fetching groups:', error);
            showToastMessage('Failed to fetch groups.', 'error');
        }
    };

    useEffect(() => {
        fetchGroupsData();
    }, []);

    return (
        <>
            <div className="min-h-screen pt-32">
                <div className="font-[sans-serif] text-[#333]">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center">
                            <h2 className="text-4xl font-bold mb-4">Our Groups</h2>
                            <p className="text-sm text-gray-500">
                                Select the group that suits you best and get started on your journey!
                            </p>
                        </div>
                        {fetchedGroups.length > 0 ? (
                            <GroupsCard fetchedGroups={fetchedGroups} />
                        ) : (
                            <p className="text-center text-gray-500 mt-4">No groups available at the moment.</p>
                        )}
                    </div>
                </div>
            </div>
            {toast.visible && (
                <div
                    className={`fixed bottom-4 right-4 p-4 rounded text-white ${
                        toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                >
                    {toast.message}
                </div>
            )}
        </>
    );
}
