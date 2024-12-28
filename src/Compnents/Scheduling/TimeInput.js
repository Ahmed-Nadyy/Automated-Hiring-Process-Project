import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function TimeInput({ day, index, time, handleTimeChange, handleDeleteTime }) {
    const [isInvalid, setIsInvalid] = useState(false); // Track invalid state

    const validateTime = (startTime, endTime) => {
        // Ensure "To" time is after "From" time
        return !startTime || !endTime || startTime < endTime;
    };

    const handleStartTimeChange = (event) => {
        const newStartTime = event.target.value;
        if (!validateTime(newStartTime, time.endTime)) {
            setIsInvalid(true);
            handleTimeChange(day, index, newStartTime, '');
        } else {
            setIsInvalid(false);
            handleTimeChange(day, index, newStartTime, time.endTime);
        }
    };

    const handleEndTimeChange = (event) => {
        const newEndTime = event.target.value;
        if (validateTime(time.startTime, newEndTime)) {
            setIsInvalid(false);
            handleTimeChange(day, index, time.startTime, newEndTime);
        } else {
            setIsInvalid(true);
        }
    };

    return (
        <div className="flex flex-col gap-2 my-2">
            <div className="flex items-center gap-2">
                <label
                    htmlFor={`${day}-start-time-${index}`}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                    From:
                </label>
                <input
                    type="time"
                    lang="en-GB"
                    min="00:00"
                    max="23:59"
                    id={`${day}-start-time-${index}`}
                    className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    value={time.startTime || ''}
                    onChange={handleStartTimeChange}
                    required
                />
                <label
                    htmlFor={`${day}-end-time-${index}`}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                    To:
                </label>
                <input
                    type="time"
                    lang="en-GB"
                    min={time.startTime || '00:00'}
                    max="23:59"
                    id={`${day}-end-time-${index}`}
                    className={`bg-gray-50 border ${
                        isInvalid ? 'border-red-500' : 'border-gray-300'
                    } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                    value={time.endTime || ''}
                    onChange={handleEndTimeChange}
                    required
                />
                <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => handleDeleteTime(day, index)}
                    className="text-white hover:text-red-600 font-medium text-sm px-2 py-1"
                />
            </div>
            {isInvalid && (
                <p className="text-red-500 text-sm mt-1">
                    You should choose a time that comes after the start time.
                </p>
            )}
        </div>
    );
}
