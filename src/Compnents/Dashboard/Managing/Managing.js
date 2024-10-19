import React from 'react'

export default function Managing() {
    return (
        <div>
            <main className="p-6 sm:p-10 space-y-6">
                <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                    <div className="mr-6">
                        <h1 className="text-4xl font-semibold mb-2">Managing</h1>
                    </div>
                    <div className="flex flex-wrap items-start justify-end -mb-3">
                        <button className="inline-flex px-5 py-3 text-white bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 rounded-md ml-6 mb-3">
                            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Create new wave
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}
