import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import DropDownList from './DropDownList';
import NewGroupInputCard from './NewGroupInputCard';
import GroupCard from './GroupCard';

const API_URL = 'https://daffodil-wary-straw.glitch.me/api/trainingGroup/createGroup';
const API_URL_ForGetGroups = 'https://daffodil-wary-straw.glitch.me/api/trainingGroup/groupsDetails';
const API_URL_runningSessions = 'https://daffodil-wary-straw.glitch.me/api/trainingGroup/sessionsToday'

export default function Managing() {
    const [cat, setCat] = useState('All Categories');
    const [isOpen, setIsOpen] = useState(false);
    const [groupInfo, setGroupInfo] = useState(null);
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [runningSessions, setRunningSessions] = useState([]);
    const [refreshGroups, setRefreshGroups] = useState(false);
    const [isFinishedGroups, setIsFinishedGroups] = useState([]);

    const [newGroup, setNewGroup] = useState({
        name: '',
        numberOfWeeks: 0,
        level: 0,
        category: '',
        numberOfSeats: 0,
        startDate: '',
        sessions: [],
    });

    const [toast, setToast] = useState({ message: '', type: 'success', visible: false });

    const showToastMessage = (message, type = 'success') => {
        setToast({ message, type, visible: true });
        setTimeout(() => setToast({ ...toast, visible: false }), 3000);
    };


    const fetchGroups = async () => {
        try {
            //   const token = localStorage.getItem('token');
            const response = await fetch(API_URL_ForGetGroups, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                const unfinished = data.data.filter(group => !group.isFinished);
                const finished = data.data.filter(group => group.isFinished);
                setGroupInfo(data.data); // Original data (optional if needed for other logic)
                setFilteredGroups(unfinished); // Unfinished groups for first card
                setIsFinishedGroups(finished); // Finished groups for second card
                console.log(data.data);
            } else {
                console.error('Failed to fetch Groups:', response.statusText);
                showToastMessage('Failed to fetch Groups.', 'error');
            }
        } catch (error) {
            console.log('Error fetching Groups:', error);
            showToastMessage('Failed to fetch Groups.', 'error');
        }
    };

    const fetchRunningSessions = async () => {
        try {
            //   const token = localStorage.getItem('token');
            const response = await fetch(API_URL_runningSessions, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                setRunningSessions(data.data);
            } else {
                console.error('Failed to fetch Groups:', response.statusText);
                showToastMessage('Failed to fetch Groups.', 'error');
            }
        } catch (error) {
            console.log('Error fetching Groups:', error);
            showToastMessage('Failed to fetch Groups.', 'error');
        }
    };

    const handleFetchRunningSessions = () => {
        setFilteredGroups(runningSessions);
    }



    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleCatChange = (newCategory) => {
        setCat(newCategory);

        // Filter groups based on the selected category
        if (newCategory === 'All Categories') {
            setFilteredGroups(groupInfo);
        } else {
            setFilteredGroups(groupInfo.filter(group => group.category === newCategory));
        }
    };

    const handleCatChangeForGroup = (newCategory) =>
        setNewGroup({ ...newGroup, category: newCategory });

    const handleCreateGroup = async () => {
        if (!newGroup.name || !newGroup.level || !newGroup.startDate || !newGroup.numberOfWeeks || !newGroup.category || !newGroup.numberOfSeats) {
            Swal.fire({
                icon: 'error',
                title: 'Missing Information',
                text: 'Please fill in all fields before creating the group.',
            });
            return;
        }

        console.log("Data to be sent to the API:", {
            name: newGroup.name,
            level: newGroup.level,
            startDate: newGroup.startDate,
            numberOfWeeks: newGroup.numberOfWeeks,
            category: newGroup.category,
            seats: newGroup.numberOfSeats,
            initialSessions: newGroup.sessions,
        });

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newGroup.name,
                    level: newGroup.level,
                    startDate: newGroup.startDate,
                    numberOfWeeks: newGroup.numberOfWeeks,
                    category: newGroup.category,
                    seats: newGroup.numberOfSeats,
                    initialSessions: newGroup.sessions,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    text: error.message || 'Failed to create group. Please try again.',
                });
                console.log('Failed to create group:', error);
                return;
            }

            const result = await response.json();
            setGroupInfo([...groupInfo, result.data]);
            fetchGroups();
            fetchRunningSessions();
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Group created successfully!',
            });

            setNewGroup({
                name: '',
                numberOfWeeks: 0,
                level: 0,
                category: '',
                numberOfSeats: 0,
                startDate: '',
                sessions: [],
            });
            toggleDropdown();
        } catch (error) {
            console.error('Error creating group:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while creating the group.',
            });
        }
    };


    const handleFinishGroup = async (groupId) => {
        try {
            const response = await fetch(`https://daffodil-wary-straw.glitch.me/api/trainingGroup/finishGroup/${groupId}`, {
                method: 'PUT',
            });

            if (!response.ok) {
                const error = await response.json();
                console.error('Failed to delete group:', error);
                showToastMessage('Failed to Update the State.', 'error');
                return;
            }

            const updatedGroups = groupInfo.filter(group => group.id !== groupId);
            setGroupInfo(updatedGroups);
            setFilteredGroups(updatedGroups);
            showToastMessage('State Updated successfully.', 'success');
        } catch (error) {
            console.error('Error deleting group:', error);
            showToastMessage('Failed to delete group.', 'error');
        }
    };

    useEffect(() => {
        fetchGroups();
        fetchRunningSessions();
    }, []);

    useEffect(() => {
        if (refreshGroups) {
            fetchGroups();
            fetchRunningSessions();
            setRefreshGroups(false);
        }
    }, [refreshGroups]);


    const triggerRefresh = () => setRefreshGroups(true);

    return (
        <main className="p-6 sm:h-[85vh] h-[100vh]">
            <header className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between border-b-2 rounded-lg">
                <div className='flex flex-row items-center justify-between sm:flex-row w-full sm:w-auto'>
                    <div className="my-2 bg-gradient-to-tr items-center justify-center h-[40px] from-black via-blue-800 to-blue-500 px-4 py-1 rounded-lg  shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h1 className="text-lg font-semibold text-white">{cat}</h1>
                    </div>
                    <button
                        onClick={handleFetchRunningSessions}
                        className="sm:ml-4 ml-0 text-center px-5 py-2 font-bold text-white bg-green-500 hover:bg-green-600 focus:bg-green-500 rounded-lg my-2"
                    >
                        Sessions For Today
                    </button>



                </div>
                <div className="flex sm:flex-row flex-col sm:items-center items-end justify-end mb-3">
                    <DropDownList
                        cat={cat}
                        onCategoryChange={handleCatChange}
                        includeAll
                    />
                    <button
                        onClick={toggleDropdown}
                        className="ml-4 inline-flex px-5 font-medium py-2 bg-gradient-to-r from-black via-blue-800 to-blue-500 rounded-md text-white transition duration-500 ease-in-out hover:scale-105 hover:from-gray-900 hover:via-blue-700 hover:to-blue-400"
                    >
                        <svg
                            aria-hidden="true"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                        Create new group
                    </button>

                </div>
            </header>

            {isOpen && (
                <NewGroupInputCard
                    newGroup={newGroup}
                    setNewGroup={setNewGroup}
                    toggleDropdown={toggleDropdown}
                    cat={newGroup.category}
                    onCategoryChange={handleCatChangeForGroup}
                    handleCreateGroup={handleCreateGroup}
                    triggerRefresh={triggerRefresh}
                />
            )}

            <GroupCard groupInfo={filteredGroups} handleFinishGroup={handleFinishGroup} triggerRefresh={triggerRefresh} />
            {isFinishedGroups.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4 text-center">Finished Groups</h2>
                    <GroupCard groupInfo={isFinishedGroups} handleFinishGroup={handleFinishGroup} isFinished triggerRefresh={triggerRefresh} />
                </div>
            )}
            {toast.visible && (
                <div id="toast" className={`fixed top-4 right-4 p-4 rounded ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {toast.message}
                </div>
            )}

        </main>

    );
}
