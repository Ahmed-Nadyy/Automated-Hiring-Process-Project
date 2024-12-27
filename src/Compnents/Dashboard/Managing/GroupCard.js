// import { spinner } from '@material-tailwind/react'
import React from 'react'
import spinner from '../../../Assets/Images/gear-spinner.svg'
import err from '../../../Assets/Images/error_file_load-01.png'

export default function GroupCard({ groupInfo,handleFinishGroup }) {
    return (
        <>
            {groupInfo === null ? (
                <div className="flex justify-center items-center">
                    <img src={spinner} className='w-[200px]' alt="Loading..." />
                </div>
            ) : groupInfo.length > 0 ? (
                <div className="mt-6 mx-10 flex flex-wrap justify-center gap-4">
                    {groupInfo.map((group, index) => (

                        <div className="flex flex-col justify-center rounded-lg border-2 border-slate-200 px-4 py-4 w-[310px] h-[175px] hover:bg-slate-50">
                            <button 
                            className='bg-green-500 px-2 py-1 font-bold rounded-lg my-2 hover:bg-green-600'
                            onClick={() => {
                                const confirmDelete = window.confirm('Are you sure you want to finish this group?');
                                if (confirmDelete) {
                                    handleFinishGroup(group.id);
                                }
                            }}
                            >
                                finish
                            </button>
                            <a href={`/managing/group/${group.id}`} key={index}>
                                <div className="flex justify-between mb-2">
                                    <p className="text-lg font-bold">{group.name}</p>
                                    <div className="bg-slate-200 px-2 py-1 rounded-lg">
                                        <p className="text-sm">{group.category}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex items-center gap-1">
                                        <label className="font-semibold">Type:</label>
                                        <p className="text-sm">{group.type}</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <label className="font-semibold">Level:</label>
                                        <p className="text-sm">{group.level}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex items-center gap-1">
                                        <label className="font-semibold">Number of Seats:</label>
                                        <p className="text-sm">{group.numberOfSeats} seats</p>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex items-center gap-1">
                                        <label className="font-semibold">Start Date:</label>
                                        <p className="text-sm">{group.startDate}</p>
                                    </div>
                                </div>

                            </a>
                        </div>
                    ))}

                </div>
            ) : (
                <div className="flex flex-col justify-center items-center mt-6">
                    <p className="text-2xl font-bold">No Groups Found</p>
                    <img src={err} className='w-[400px]' alt="Loading..." />
                </div>
            )}
        </>
    )
}