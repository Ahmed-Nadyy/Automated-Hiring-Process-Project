import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default function TimeInput({ day, index, time, handleTimeChange, handleDeleteTime }) {
    return (
        <>
            <div className="flex gap-2 my-2 items-center">
                <label htmlFor={`${day}-start-time-${index}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    From:
                </label>
                <input
                    type="time"
                    lang="en-GB" // Ensures 24-hour format for locales using it
                    min="00:00" // Earliest time
                    max="23:59" // Latest valid time in 24-hour format
                    id={`${day}-start-time-${index}`}
                    className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    value={time.startTime || ''}
                    onChange={(event) => handleTimeChange(day, index, event.target.value, time.endTime)}
                    required
                />
                <label htmlFor={`${day}-end-time-${index}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    To:
                </label>
                <input
                    type="time"
                    lang="en-GB" // Ensures 24-hour format for locales using it
                    min="00:00" // Earliest time
                    max="23:59" // Latest valid time in 24-hour format
                    id={`${day}-end-time-${index}`}
                    className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    value={time.endTime || ''}
                    onChange={(event) => handleTimeChange(day, index, time.startTime, event.target.value)}
                    required
                />
                <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => handleDeleteTime(day, index)}
                    className='text-white hover:text-red-600 font-medium text-sm px-2 py-1'
                />
            </div>
            
        </>
    )
}
