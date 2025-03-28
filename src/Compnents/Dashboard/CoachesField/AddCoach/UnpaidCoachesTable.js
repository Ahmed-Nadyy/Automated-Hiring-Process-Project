import React, { useState } from "react";
import "../style/style.css";
import PaymentModal from "./PaymentModal";

const UnpaidCoachesTable = ({ unpaidCoaches, handleDelete, handleClicked, handlePay, isPaying, isDeleting }) => {
    const [showModal, setShowModal] = useState(false);
    const [currentCoach, setCurrentCoach] = useState(null);
    const [currentCost, setCurrentCost] = useState(0);

    const openModal = (coach, cost) => { 
        setCurrentCoach(coach);
        setCurrentCost(cost);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setCurrentCoach(null);
        setCurrentCost(0);
    };

    const confirmPayment = (coach, paymentDetails) => {
        handlePay(coach, paymentDetails);
        closeModal();
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th className="px-6 py-3">Coach name</th>
                        <th className="px-6 py-3">Coach email</th>
                        <th className="px-6 py-3">Total Hours</th>
                        <th className="px-6 py-3">Cost</th>
                        <th className="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {unpaidCoaches.length > 0 ? (
                        unpaidCoaches.map((coach, index) => (
                            <tr
                                key={coach.id}
                                onClick={() => handleClicked(coach)}
                                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                    } border-b cursor-pointer hover:bg-gray-100`}>
                                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {coach.name}
                                </th>
                                <td className="px-6 py-4">{coach.email}</td>
                                <td className="px-6 py-4">{coach.totalUnpaidHours}</td>
                                <td className="px-6 py-4">{coach.cost}</td>
                                <td className="px-6 py-4 flex gap-4">
                                    {/* <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(coach.id);
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
                                    </button> */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openModal(coach, coach.cost);
                                        }}
                                        className="font-medium text-white bg-green-600 hover:underline px-3 py-1 rounded-xl"
                                        disabled={isPaying}
                                    >
                                        {isPaying ? (
                                            <span className="flex items-center">
                                                <span className="animate-spin inline-block w-4 h-4 border-2 border-solid border-green-600 rounded-full"></span>
                                                Paying...
                                            </span>
                                        ) : (
                                            "Pay"
                                        )}
                                    </button>
                                </td>
                            </tr>
                        )))
                    : (
                        <tr>
                            <td colSpan="5" className="px-6 py-4 text-center">
                                No unpaid coaches found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {showModal && currentCoach && (
                <PaymentModal
                    coach={currentCoach}
                    totalUnpaidHours={currentCost}
                    onClose={closeModal}
                    onConfirm={confirmPayment}
                />
            )}
        </div>
    );
};

export default UnpaidCoachesTable;