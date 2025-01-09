import React from 'react'

import NoSessionsFounded from "../../../../Assets/Images/NoSessionsFounded.png";


export default function StudentsRequists({
    studentsRequists,
}) {
    return (
        <>
            <div className="container mx-auto px-6 py-8">
                <div className='flex gap-2 justify-between'>
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold ">Students Requists</h1>
                    </div>

                </div>
                {studentsRequists.length > 0 ? (
                    <div className="relative flex flex-col rounded-lg bg-white shadow-sm border border-slate-200">
                        <nav className="flex flex-col gap-4 p-4" role="list">
                            {studentsRequists.map((student, index) => (
                                <p>Hello</p>
                            ))}
                        </nav>
                    </div>
                ) : (
                    <div className="text-center text-gray-500 flex flex-col justify-center items-center">
                        No Student Requists available for this group.
                        {/* <img src={NoSessionsFounded} alt="No sessions available" className="w-[450px]" /> */}
                    </div>
                )}
            </div>
        </>
    )
}
