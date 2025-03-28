import React, { useState } from 'react';
import { addCoach } from "../api/coachApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddCoach({ refreshCoaches }) {
    const [coachname, setCoachName] = useState("");
    const [email, setEmail] = useState("");
    const [hourRate, setHourRate] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!coachname || !email || !hourRate) {
            toast.warning("All fields are required!");
            return;
        }

        try {
            await addCoach({ coachname, email, hourRate });
            setCoachName("");
            setEmail("");
            setHourRate("");
            refreshCoaches(); // Refresh coach list after adding
            toast.success("Coach added successfully!");
        } catch (error) {
            console.error("Error adding coach:", error);
            toast.error("Failed to add coach.");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="w-full mx-auto flex sm:flex-row flex-col items-center justify-center gap-4">
                <div className="mb-5 sm:w-1/4">
                    <label htmlFor="coachname" className="block mb-2 text-sm font-medium text-gray-900">Coach Name</label>
                    <input 
                        type="text" 
                        id="coachname" 
                        value={coachname} 
                        onChange={e => setCoachName(e.target.value)} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                        required 
                    />
                </div>
                <div className="mb-5 sm:w-1/4">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Coach Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                        placeholder="dev.ahmed.nady@gmail.com" 
                        required 
                    />
                </div>
                <div className="mb-5 sm:w-1/4">
                    <label htmlFor="hourRate" className="block mb-2 text-sm font-medium text-gray-900">Hour Rate</label>
                    <input 
                        type="number" 
                        id="hourRate" 
                        value={hourRate} 
                        onChange={e => setHourRate(e.target.value)} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                        placeholder="100" 
                        required 
                    />
                </div>
                <button 
                    type="submit" 
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Add
                </button>
            </form>
        </>
    );
}
