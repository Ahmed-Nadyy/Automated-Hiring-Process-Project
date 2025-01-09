import React from 'react'

import NoSessionsFounded from "../../../../Assets/Images/NoSessionsFounded.png";


export default function StudentsEnrolled({
    studentsEnrolled,
}) {
    return (
        <>
            <div className="container mx-auto px-6 py-8">
                <div className='flex gap-2 justify-between'>
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold ">Students Enrolled</h1>
                    </div>

                </div>
                {studentsEnrolled.length > 0 ? (
                    <div className="relative flex flex-col rounded-lg bg-white shadow-sm border border-slate-200">
                        <nav className="flex flex-col gap-4 p-4" role="list">
                            {studentsEnrolled.map((student, index) => (
                                <p>Hello</p>
                            ))}
                        </nav>
                    </div>
                ) : (
                    <div className="text-center text-gray-500 flex flex-col justify-center items-center">
                        No Students available for this group yet.
                        {/* <img src={NoSessionsFounded} alt="No sessions available" className="w-[450px]" /> */}
                    </div>
                )}
            </div>
        </>
    )
}
