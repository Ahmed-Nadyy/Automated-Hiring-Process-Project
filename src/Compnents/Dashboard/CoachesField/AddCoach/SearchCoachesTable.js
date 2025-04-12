import React from "react";
import "../style/style.css";

const SearchCoachesTable = ({ searchResults = [], handleClicked }) => {
    // Calculate totals
    const totalPaidCost = searchResults.reduce((sum, coach) => {
        const paidCost = (coach.totalPaid || 0);
        return sum + paidCost;
    }, 0);

    const totalUnpaidCost = searchResults.reduce((sum, coach) => {
        return sum + (coach.cost || 0);
    }, 0);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {/* Total costs summary */}
            <div className="bg-gray-100 p-4 mb-4 grid grid-cols-2 gap-4">
                <div className="text-gray-700">
                    <span className="font-bold">Total Paid Cost: </span>
                    {totalPaidCost.toFixed(2)}
                </div>
                <div className="text-gray-700">
                    <span className="font-bold">Total Unpaid Cost: </span>
                    {totalUnpaidCost.toFixed(2)}
                </div>
            </div>

            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th className="px-6 py-3">Coach name</th>
                        <th className="px-6 py-3">Coach email</th>
                        <th className="px-6 py-3">Total paid hours</th>
                        <th className="px-6 py-3">Paid cost</th>
                        <th className="px-6 py-3">Total unpaid hours</th>
                        <th className="px-6 py-3">Unpaid cost</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResults.length > 0 ? (
                        searchResults.map((coach, index) => {
                            const paidCost = (coach.totalPaid || 0);
                            return (
                                <tr
                                    key={coach._id || index}
                                    onClick={() => handleClicked(coach)}
                                    className={`{
                                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                    } border-b cursor-pointer hover:bg-gray-100`}
                                >
                                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {coach.coachname || coach.name}
                                    </th>
                                    <td className="px-6 py-4">{coach.email}</td>
                                    <td className="px-6 py-4">{coach.totalPaidHours ?? "-"}</td>
                                    <td className="px-6 py-4">{paidCost.toFixed(2) || "-"}</td>
                                    <td className="px-6 py-4">{coach.totalUnpaidHours ?? "-"}</td>
                                    <td className="px-6 py-4">{coach.cost?.toFixed(2) ?? "-"}</td>
                                </tr>
                            );
                        })
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