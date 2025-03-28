import React, { useState, useEffect } from "react";
import "../style/style.css";
import { createPortal } from "react-dom";

const PaymentModal = ({ coach, totalUnpaidHours, onClose, onConfirm }) => {
    const [salaryDeduction, setSalaryDeduction] = useState(0);
    const [bonus, setBonus] = useState(0);
    const [notes, setNotes] = useState("");
    const [totalSalary, setTotalSalary] = useState(0);

    useEffect(() => {
        // Calculate total salary when either salary deduction or bonus changes
        const calculatedTotal = totalUnpaidHours - parseFloat(salaryDeduction) + parseFloat(bonus);
        setTotalSalary(calculatedTotal);
    }, [salaryDeduction, bonus, totalUnpaidHours]);

    const handleSubmit = () => {
        onConfirm(coach, {
            salaryDeduction: parseFloat(salaryDeduction) || 0,
            bonus: parseFloat(bonus) || 0,
            notes: notes
        });
        onClose();
    };

    return createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl mb-4">Payment Details for Coach</h3>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salaryDeduction">
                        Salary Deduction (EGP)
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="salaryDeduction"
                        type="number"
                        min="0"
                        step="0.01"
                        value={salaryDeduction}
                        onChange={(e) => setSalaryDeduction(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bonus">
                        Bonus (EGP)
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="bonus"
                        type="number"
                        min="0"
                        step="0.01"
                        value={bonus}
                        onChange={(e) => setBonus(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Total Salary (EGP)
                    </label>
                    <div className="bg-gray-50 px-4 py-2 rounded">
                        {totalSalary}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notes">
                        Notes
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="notes"
                        rows="3"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    ></textarea>
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleSubmit}
                    >
                        Confirm Payment
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default PaymentModal;