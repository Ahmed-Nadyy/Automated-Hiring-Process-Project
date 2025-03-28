import React from "react";
import "../style/style.css";

const SearchCoachesTable = ({ searchResults = [], handleDelete, handleClicked, isDeleting }) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th className="px-6 py-3">Coach name</th>
                        <th className="px-6 py-3">Coach email</th>
                        <th className="px-6 py-3">Total paid hours</th>
                        <th className="px-6 py-3">Total unpaid hours</th>
                        <th className="px-6 py-3">Cost</th>
                        <th className="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResults.length > 0 ? (
                        searchResults.map((coach, index) => (
                            <tr
                                key={coach._id || index}
                                onClick={() => handleClicked(coach)}
                                className={`${
                                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                    } border-b cursor-pointer hover:bg-gray-100`}
                            >
                                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {coach.coachname || coach.name}
                                </th>
                                <td className="px-6 py-4">{coach.email}</td>
                                <td className="px-6 py-4">{coach.totalPaidHours ?? "-"}</td>
                                <td className="px-6 py-4">{coach.totalUnpaidHours ?? "-"}</td>
                                <td className="px-6 py-4">{coach.cost ?? "-"}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(coach._id);
                                        }}
                                        className="font-medium text-red-600 hover:underline"
                                        disabled={isDeleting}
                                    >
                                        {isDeleting ? (
                                            <span className="flex items-center">
                                                <span className="animate-spin inline-block w-4 h-4 border-2 border-solid border-red-600 rounded-full"></span>
                                                Deleting...
                                            </span>
                                        ) : (
                                            "Delete"
                                        )}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                No search results found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default SearchCoachesTable;