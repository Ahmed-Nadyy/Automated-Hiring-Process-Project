import { useState } from 'react';
import TimeInput from './TimeInput';

const apiUrl = process.env.REACT_APP_API_BASE_URL;


export default function SchedulePicker() {
    const [email, setEmail] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [timeFetched, setTimeFetched] = useState([]);
    const [timeSchedule, setTimeSchedule] = useState({
        saturday: { selected: false, intervals: [] },
        sunday: { selected: false, intervals: [] },
        monday: { selected: false, intervals: [] },
        tuesday: { selected: false, intervals: [] },
        wednesday: { selected: false, intervals: [] },
        thursday: { selected: false, intervals: [] },
        friday: { selected: false, intervals: [] },
    });

    const toggleDrawer = async () => {
        if (!email) {
            alert('Please enter your email before setting a schedule.');
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/schedule/getSchedule?email=${encodeURIComponent(email)}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data.data.schedule); // Debugging: Check structure of the fetched schedule

                // Merge fetched schedule with the initial state structure
                const updatedSchedule = { ...timeSchedule, ...data.data.schedule };

                // Ensure each day exists and has a proper structure
                Object.keys(timeSchedule).forEach(day => {
                    if (!updatedSchedule[day]) {
                        updatedSchedule[day] = { selected: false, intervals: [] };
                    }
                });

                setTimeSchedule(updatedSchedule);
                setIsDrawerOpen(true);
            } else {
                setIsDrawerOpen(true);
            }
        } catch (error) {
            console.error('Error fetching schedule:', error);
            alert('An error occurred while fetching the schedule.');
        }
    };


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleDaySelect = (day) => {
        setTimeSchedule((prevState) => ({
            ...prevState,
            [day]: { selected: !prevState[day].selected, intervals: [] },
        }));
    };

    const handleAddTime = (day) => {
        setTimeSchedule((prevState) => ({
            ...prevState,
            [day]: { selected: true, intervals: [...prevState[day].intervals, { startTime: null, endTime: null }] },
        }));
    };

    const handleTimeChange = (day, index, startTime, endTime) => {
        setTimeSchedule((prevState) => ({
            ...prevState,
            [day]: {
                selected: true,
                intervals: prevState[day].intervals.map((time, i) =>
                    i === index ? { startTime, endTime } : time
                ),
            },
        }));
    };

    const handleDeleteTime = (day, index) => {
        setTimeSchedule((prevState) => ({
            ...prevState,
            [day]: {
                selected: true,
                intervals: prevState[day].intervals.filter((time, i) => i !== index),
            },
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestData = {
            email: email,
            timeSchedule: timeSchedule,
        };
        console.log(requestData);

        try {
            const response = await fetch(`${apiUrl}/schedule`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                const responseData = await response.json();
                alert('Schedule submitted successfully!');
            } else {
                alert('Failed to submit schedule.');
            }
        } catch (error) {
            console.error('Error saving schedule:', error);
            alert('An error occurred while submitting the schedule.');
        }
    };

    return (
        <>
            <div className='flex flex-row items-center justify-center h-[100vh]'>
                <div className="mb-6 flex flex-col items-center justify-center">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                        Please Enter your email and choose your available time
                    </label>
                    <div className='flex flex-row items-center justify-center'>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleEmailChange}
                            className="sm:w-[250px] w-[230px] bg-white border border-blue-500 text-black text-sm rounded-l-lg block p-2.5"
                            placeholder="Enter your email"
                            required
                        />
                        <button
                            className="text-white border border-blue-500 bg-blue-600 hover:bg-blue-600 focus:ring-1 font-medium rounded-r-lg sm:text-sm text-xs sm:px-5 px-2 py-2.5"
                            type="button"
                            onClick={toggleDrawer}
                        >
                            Set time schedule
                        </button>
                    </div>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="text-white w-[150px] mt-3 inline-flex items-center justify-center bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Submit
                    </button>
                </div>

                {/* Drawer Component */}
                <div id="drawer-timepicker" className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${isDrawerOpen ? '-translate-x-0' : '-translate-x-full'} bg-white w-96 dark:bg-gray-800`} tabIndex={-1}>
                    <h5 className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Time schedule</h5>
                    <button
                        type="button"
                        onClick={() => setIsDrawerOpen(false)}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close menu</span>
                    </button>

                    <form>
                        {Object.entries(timeSchedule).map(([day, { selected, intervals }]) => (
                            <div key={day} className="mb-6">
                                <div className="flex items-center justify-between">
                                    <label htmlFor={`${day}-selected`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        {day.charAt(0).toUpperCase() + day.slice(1)}:
                                    </label>
                                    <div className="flex gap-2 items-center content-center">
                                        <input
                                            type="checkbox"
                                            id={`${day}-selected`}
                                            checked={selected}
                                            onChange={() => handleDaySelect(day)}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300"
                                        />
                                        {selected && (
                                            <button
                                                type="button"
                                                onClick={() => handleAddTime(day)}
                                                className="text-white w-auto inline-flex items-center justify-center bg-blue-600 hover:bg-blue-800 font-medium rounded-md text-sm px-2 py-1 text-center"
                                            >
                                                Add Time
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {selected && intervals.map((time, index) => (
                                    <TimeInput
                                        key={index}
                                        day={day}
                                        index={index}
                                        time={time}
                                        handleTimeChange={handleTimeChange}
                                        handleDeleteTime={handleDeleteTime}
                                    />
                                ))}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => setIsDrawerOpen(false)}
                            className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
                        >
                            Close
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}