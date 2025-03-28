import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackwardStep, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

export default function GroupInof({
    groupDetails,
    PointOfView,
    setPointOfView,
    handlePointOfViewChange,
    state,
}) {
    const navigate = useNavigate();
    return (
        <>
        <div className='container flex sm:flex-row flex-col justify-between mx-auto px-6 py-8'>
            <div className="flex flex-col items-start mb-1">
                <div className="flex items-center gap-2">
                    <button
                        className="px-4 py-2 bg-gradient-to-r from-black via-blue-800 to-blue-500 rounded-full text-white transition duration-500 ease-in-out hover:scale-105 hover:bg-slate-800"
                        onClick={() => navigate('/dashboard-managing')}
                    >
                        <FontAwesomeIcon icon={faBackwardStep} />
                    </button>
                    <h1 className="text-2xl font-bold ">Group Details</h1>
                </div>
                <div className="flex sm:justify-between sm:flex-row flex-col w-full sm:items-center items-start">
                    <div>
                        <p className="sm:text-lg text-xs">
                            <span className="font-bold">Category: </span>
                            {groupDetails.category} <span> &gt; </span>
                            <span className="font-bold">Group: </span>
                            {groupDetails.name}
                            <span> &gt; </span>
                            <span className="font-bold">level: </span>
                            {groupDetails.level}
                        </p>
                    </div>
                </div>
            </div>
            <div className='flex'>
                    <select
                        value={PointOfView}
                        onChange={(e) => setPointOfView(e.target.value)}
                        className="cursor-pointer sm:ml-4 ml-0 px-2 py-0 font-bold text-black border-l-2 border-t-2 border-b-2  border-blue-500  rounded-l-lg rounded-r-none my-3"
                    >
                        <option>Sessions</option>
                        <option>Students enrolled</option>
                        <option>Students requists</option>
                    </select>
                    <button
                        onClick={() => handlePointOfViewChange(PointOfView)}
                        className="ml-0 text-center px-4 py-0 font-bold text-black border-r-2 border-t-2 border-b-2  border-blue-500 rounded-r-lg my-3"
                    >
                        <FontAwesomeIcon icon={faRightToBracket} />
                    </button>
                    </div>
            </div>
        </>
    )
}
