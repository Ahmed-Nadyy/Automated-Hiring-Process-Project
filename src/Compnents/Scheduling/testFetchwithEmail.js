import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export default function SchedulePicker() {


    const [email, setEmail] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [timeSchedule, setTimeSchedule] = useState({
        saturday: { selected: false, intervals: [] },
        sunday: { selected: false, intervals: [] },
        monday: { selected: false, intervals: [] },
        tuesday: { selected: false, intervals: [] },
        wednesday: { selected: false, intervals: [] },
        thursday: { selected: false, intervals: [] },
        friday: { selected: false, intervals: [] },
    });

    const toggleDrawer = () => {
        if (!email) {
            alert('Please enter your email before setting a schedule.');
            return;
        }
        else setIsDrawerOpen(!isDrawerOpen);
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

        try {
            const response = await fetch('https://daffodil-wary-straw.glitch.me/api/schedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Schedule saved successfully:', responseData);
                alert('Schedule submitted successfully!');


            } else {
                console.error('Failed to save schedule:', response.statusText);
                alert('Failed to submit schedule.');
            }
        } catch (error) {
            console.error('Error saving schedule:', error);
            alert('An error occurred while submitting the schedule.');
        }
    };


    return (
        <>

            {/* drawer init and show */}

            <div className='flex flex-row items-center justify-center h-[100vh]'>
                <div className="mb-6 flex flex-col items-center justify-center">
                    <label htmlFor="email" className=" block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                        Please Enter your email and choose your available time
                    </label>
                    <div className='flex flex-row items-center justify-center'>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleEmailChange}
                            className="w-[250px] bg-white border border-blue-500 text-black text-sm rounded-l-lg  block p-2.5 "
                            placeholder="Enter your email"
                            required
                        />
                        <div className="text-center">
                            <button
                                className="text-white border border-blue-500 bg-blue-600 hover:bg-blue-600 focus:ring-1 font-medium rounded-r-lg text-sm px-5 py-2.5"
                                type="button"
                                onClick={toggleDrawer}
                            >
                                Set time schedule
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="text-white w-[150px] mt-3 inline-flex items-center justify-center bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Submit
                    </button>
                </div>



                {/* drawer component */}
                <div id="drawer-timepicker" className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${isDrawerOpen ? '-translate-x-0' : '-translate-x-full'} bg-white w-96 dark:bg-gray-800`} tabIndex={-1} aria-labelledby="drawer-timepicker-label">
                    <h5 id="drawer-label" className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Time schedule</h5>
                    <button
                        type="button"
                        onClick={toggleDrawer}
                        aria-controls="drawer-timepicker"
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
                                <div className="flex items-center justify-between ">
                                    <label htmlFor={`${day}-selected`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        {day.charAt(0).toUpperCase() + day.slice(1)}:
                                    </label>
                                    <div className="flex gap-2 items-center content-center">
                                        <input
                                            type="checkbox"
                                            id={`${day}-selected`}
                                            name={`${day}-selected`}
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
                                    <div key={index} className="flex gap-2 my-2 items-center">
                                        <label htmlFor={`${day}-start-time-${index}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            From:
                                        </label>
                                        <input
                                            type="time"
                                            id={`${day}-start-time-${index}`}
                                            name={`${day}-start-time-${index}`}
                                            className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            min="00:00"
                                            max="23:59"
                                            value={time.startTime ? time.startTime : ''}
                                            onChange={(event) => handleTimeChange(day, index, event.target.value, time.endTime)}
                                            required
                                        />
                                        <label htmlFor={`${day}-end-time-${index}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            To:
                                        </label>
                                        <input
                                            type="time"
                                            id={`${day}-end-time-${index}`}
                                            name={`${day}-end-time-${index}`}
                                            lang="en-GB" // Ensures 24-hour format for locales using it
                                            className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            min="00:00" // Earliest time
                                            max="23:59" // Latest valid time in 24-hour format
                                            value={time.endTime ? time.endTime : ''}
                                            onChange={(event) => handleTimeChange(day, index, time.startTime, event.target.value)}
                                            required
                                        />

                                        <FontAwesomeIcon icon={faTrash}
                                            onClick={() => handleDeleteTime(day, index)}
                                            className='text-white hover:text-red-600 font-medium text-sm px-2 py-1'
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                        <div className="grid grid-cols-2 gap-4 bottom-4 left-0 w-full md:px-4 md:absolute">
                            <button
                                type="button"
                                onClick={toggleDrawer} // Call toggleDrawer to close the drawer
                                className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                                Close
                            </button>

                        </div>
                    </form>
                </div>
            </div>

        </>
    );
}
