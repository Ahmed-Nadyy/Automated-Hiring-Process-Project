import React, { useEffect, useState } from "react";
import { updateCoach, getCoaches, deleteCoach, getUnpaidCoaches, searchCoachesByMonth, markFeedbackAsPaid } from "../api/coachApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "../style/style.css";

// Sub-components
import UnpaidCoachesTable from "./UnpaidCoachesTable";
import TotalCoachesTable from "./TotalCoachesTable";
import SearchCoachesTable from "./SearchCoachesTable";

const DisplayCoaches = ({ refreshKey }) => {
    const [coaches, setCoaches] = useState([]);
    const [unpaidCoaches, setUnpaidCoaches] = useState([]);
    const [view, setView] = useState("total"); // unpaid | total | search
    const [searchResults, setSearchResults] = useState([]);
    const [searchMonth, setSearchMonth] = useState(null);
    const [searchYear, setSearchYear] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaying, setIsPaying] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState({
        salaryDeduction: 0,
        bonus: 0,
        notes: ''
    });
    const navigate = useNavigate();

    const fetchUnpaidCoaches = async () => {
        try {
            const data = await getUnpaidCoaches();
            setUnpaidCoaches(data.data);
        } catch (error) {
            console.error("Error fetching unpaid coaches:", error);
            toast.error("Failed to fetch unpaid coaches.");
        }
    };

    useEffect(() => {
        const fetchCoaches = async () => {
            try {
                const data = await getCoaches();
                setCoaches(data);
            } catch (error) {
                console.error("Error fetching coaches:", error);
                toast.error("Failed to fetch coaches.");
            }
        };

        fetchCoaches();
        fetchUnpaidCoaches();
    }, [refreshKey]);

    const handleEdit = async (id, coachData) => {
        setIsEditing(true);
        try {
            await updateCoach(id, coachData);
            // Refresh coaches list
            const data = await getCoaches();
            setCoaches(data);
            toast.success("Coach updated successfully!");
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating coach:", error);
            toast.error("Failed to update coach.");
        } finally {
            setIsEditing(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this coach?")) return;
        setIsDeleting(true);
        try {
            await deleteCoach(id);
            setCoaches(coaches.filter((coach) => coach._id !== id));
            toast.success("Coach deleted successfully!");
            navigate(`/dashboard-coaches`);
        } catch (error) {
            console.error("Error deleting coach:", error);
            toast.error("Failed to delete coach.");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleClicked = (coach) => {
        navigate(`/dashboard-coaches/coach-analysis/${coach.coachname}/${coach._id}`);
    };

    const handleSearchClicked = (coach) => {
        navigate(`/dashboard-coaches/coach-analysis/${coach.coachname}/${coach.coachId}`);
    };

    const handleClickedUnpaid = (coach) => {
        navigate(`/dashboard-coaches/coach-analysis/${coach.name}/${coach.id}`);
    };

    const handleSearch = async () => {
        if (!searchMonth || !searchYear) {
            toast.error("Please fill in both month and year.");
            return;
        }

        try {
            const response = await searchCoachesByMonth(searchMonth, searchYear);
            setSearchResults(response);
            setView("search");
        } catch (error) {
            console.error("Search failed:", error);
            toast.error("Failed to fetch search results.");
        }
    };

    const handlePay = async (coach) => {
        const confirmPay = window.confirm(`Confirm payment for ${coach.name}?`);
        if (!confirmPay) return;

        // Collect payment details
        const salaryDeduction = parseFloat(document.getElementById('salaryDeduction').value) || 0;
        const bonus = parseFloat(document.getElementById('bonus').value) || 0;
        const notes = document.getElementById('notes').value || '';

        setIsPaying(true);
        try {
            const response = await markFeedbackAsPaid(coach.id, {
                salaryDeduction,
                bonus,
                notes
            });
            toast.success("Payment processed successfully!");

            // Optionally refresh the data after payment
            await fetchUnpaidCoaches();
        } catch (error) {
            console.error("Payment failed:", error);
            toast.error("Failed to process payment.");
        } finally {
            setIsPaying(false);
        }
    };

    return (
        <div className="sm:mx-10 sm:mt-4">
            {/* Top Buttons & Search */}
            <div className="flex flex-wrap justify-between items-center mb-4">
                <div className="flex gap-4">
                    <button
                        onClick={() => setView("total")}
                        className={`px-4 py-2 rounded ${view === "total" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
                    >
                        Total Coaches
                    </button>

                    <button
                        onClick={() => setView("unpaid")}
                        className={`px-4 py-2 rounded ${view === "unpaid" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
                    >
                        Unpaid Coaches
                    </button>
                </div>

                {/* Search Inputs */}
                <div className="flex gap-2 items-center">
                    <input
                        type="number"
                        placeholder="Month"
                        value={searchMonth}
                        onChange={(e) => setSearchMonth(e.target.value)}
                        className="border px-2 py-1 rounded"
                        min="1"
                        max="12"
                    />
                    <input
                        type="number"
                        placeholder="Year"
                        value={searchYear}
                        onChange={(e) => setSearchYear(e.target.value)}
                        className="border px-2 py-1 rounded"
                    />
                    <button
                        onClick={handleSearch}
                        className="px-4 py-2 bg-green-600 text-white rounded"
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Render Based on View */}
            {view === "unpaid" && (
                <UnpaidCoachesTable
                    unpaidCoaches={unpaidCoaches}
                    handleDelete={handleDelete}
                    handleClicked={handleClickedUnpaid}
                    handlePay={handlePay}
                    isDeleting={isDeleting}
                    isPaying={isPaying}
                />
            )}

            {view === "total" && (
                <TotalCoachesTable
                    coaches={coaches}
                    handleEdit={handleEdit}
                    isEditing={isEditing}
                    handleDelete={handleDelete}
                    handleClicked={handleClicked}
                    isDeleting={isDeleting}
                />
            )}

            {view === "search" && (
                <SearchCoachesTable
                    searchResults={searchResults}
                    handleClicked={handleSearchClicked}
                />
            )}
        </div>
    );
};

export default DisplayCoaches;