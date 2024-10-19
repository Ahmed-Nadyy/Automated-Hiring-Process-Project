// Interviews.jsx
import React, { useEffect, useState } from 'react';
import InterviewItem from './InterviewItem';
import spinner from '../../../Assets/Images/gear-spinner.svg'

export default function Interviews() {

  const [interviews, setInterviews] = useState([]);
  const [selectedInterviewer, setSelectedInterviewer] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedInterviews, setSelectedInterviews] = useState([]);
  const [filteredInterviews, setFilteredInterviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const interviewersList = ['John Doe', 'Jane Smith', 'Michael Johnson', 'Emily Davis'];
  const [toggleStatus, setToggleStatus] = useState(false);


  const fetchInterviews = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://daffodil-wary-straw.glitch.me/api/applicant', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const { status } = data;
        setToggleStatus(status);
        setInterviews(data);
        setFilteredInterviews(data);
      } else {
        console.error('Failed to fetch interviews:', response.statusText);
        showToastMessage('Failed to fetch interviews.', 'error');
      }
    } catch (error) {
      console.error('Error fetching interviews:', error);
      showToastMessage('Failed to fetch interviews. Showing simulated data.', 'error');
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);


  const handleToggleChange = async () => {
    const newStatus = !toggleStatus;
    setToggleStatus(newStatus);

    try {
      // Send the new status to the API
      const response = await fetch('/api/toggle-status', { // Adjust to your API endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }), // Send the new status
      });
      if (!response.ok) {
        throw new Error('Failed to update toggle status');
      }
      showToastMessage(`Toggle status updated to ${newStatus ? 'ON' : 'OFF'}`, 'success');
    } catch (error) {
      // setToggleStatus(false);
      console.error('Error updating toggle status:', error);
      // Optionally revert the UI state if the update fails
      setToggleStatus(!newStatus);
      showToastMessage('Failed to update toggle status.', 'error');
    }
  };

  const handleSelectAll = () => {
    const allInterviewIDs = filteredInterviews.map((interview) => interview.ID);
    if (selectAll) {
      setSelectedInterviews([]);
    } else {
      setSelectedInterviews(allInterviewIDs);
    }
    setSelectAll(!selectAll);
  };

  const handleAccept = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://daffodil-wary-straw.glitch.me/api/applicant/update-status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status: 'Accepted',
          applicantIds: [id]
        }),
      });

      if (!response.ok) {
        console.log('Failed to accept interview');
        showToastMessage('Failed to accept interview.', 'error');
        return;
      }

      const updatedInterviews = interviews.map((interview) =>
        interview.ID === id ? { ...interview, status: 'Accepted' } : interview
      );

      setInterviews(updatedInterviews);
      setFilteredInterviews(updatedInterviews.filter(filterLogic(searchQuery)));
      await fetchInterviews();
      showToastMessage('Interview accepted successfully!', 'success');
    } catch (error) {
      console.log('Error accepting interview:', error);
      showToastMessage('Failed to accept interview.', 'error');
    }
  };


  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://daffodil-wary-straw.glitch.me/api/applicant/update-status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: 'Rejected',
          applicantIds: [id],
        }),
      });

      if (!response.ok) {
        console.log('Failed to reject interview');
        showToastMessage('Failed to reject interview.', 'error');
        return;
      }


      const updatedInterviews = interviews.map((interview) =>
        interview.ID === id ? { ...interview, status: 'Rejected' } : interview
      );

      setInterviews(updatedInterviews);
      setFilteredInterviews(updatedInterviews.filter(filterLogic(searchQuery)));
      await fetchInterviews();
      showToastMessage('Interview rejected successfully!', 'success');
    } catch (error) {
      console.log('Error rejecting interview:', error);
      showToastMessage('Failed to reject interview.', 'error');
    }
  };


  const handleFeedbackChange = (ID, value) => {
    const updatedInterviews = interviews.map((interview) =>
      interview.ID === ID ? { ...interview, feedback: value } : interview
    );
    setInterviews(updatedInterviews);
    setFilteredInterviews(updatedInterviews.filter(filterLogic));
  };

  const handleAssignInterviewer = async (ID, interviewer) => {
    if (!interviewer) {
      showToastMessage('Please select an interviewer before assigning.', 'error');
      return;
    }

    try {
      const response = await fetch(`/api/interviews/${ID}/assign-interviewer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interviewer }),
      });
      if (!response.ok) {
        throw new Error('Failed to assign interviewer');
      }

      const updatedInterviews = interviews.map((interview) =>
        interview.ID === ID ? { ...interview, interviewer } : interview
      );
      setInterviews(updatedInterviews);
      setFilteredInterviews(updatedInterviews.filter(filterLogic));
      showToastMessage('Interviewer assigned successfully!', 'success');
    } catch (error) {
      console.error('Error assigning interviewer:', error);
      showToastMessage('Failed to assign interviewer.', 'error');
    }
  };

  const showToastMessage = (message, type = 'success') => {
    setToastMessage(message);
    setShowToast(true);
    // Change background color based on type
    const toast = document.getElementById('toast');
    if (toast) {
      toast.className = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    }
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // Toast disappears after 3 seconds
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredInterviews(interviews.filter(filterLogic(query)));
  };

  const filterLogic = (query = searchQuery) => (interview) =>
    interview.name.toLowerCase().includes(query) ||
    interview.status.toLowerCase().includes(query);

  const handleBulkAction = async (action) => {
    if (selectedInterviews.length === 0) {
      showToastMessage('No interviews selected for bulk action.', 'error');
      return;
    }

    try {
      const promises = selectedInterviews.map((ID) =>
        fetch(`/api/interviews/${ID}/${action}`, { method: 'POST' })
      );
      const responses = await Promise.all(promises);

      // Check for any failed requests
      const hasError = responses.some((response) => !response.ok);
      if (hasError) {
        throw new Error('One or more bulk actions failed.');
      }

      const updatedInterviews = interviews.map((interview) =>
        selectedInterviews.includes(interview.ID)
          ? { ...interview, status: action === 'accept' ? 'Accepted' : 'Rejected' }
          : interview
      );
      setInterviews(updatedInterviews);
      setFilteredInterviews(updatedInterviews.filter(filterLogic));
      setSelectedInterviews([]); // Clear selections after action
      showToastMessage(`Interviews ${action === 'accept' ? 'accepted' : 'rejected'} successfully!`, 'success');
    } catch (error) {
      console.error(`Error in bulk ${action}:`, error);
      showToastMessage(`Failed to ${action} some interviews.`, 'error');
    }
  };

  const getColor = (date) => {
    const interviewDate = new Date(date);
    const today = new Date();

    if (interviewDate.toDateString() === today.toDateString()) {
      return 'green'; // Same day
    } else if (interviewDate > today) {
      return 'blue'; // Not started
    } else {
      return 'red'; // Started
    }
  };

  const handleInterviewerChange = (ID, value) => {
    setSelectedInterviewer({ ...selectedInterviewer, [ID]: value });
  };

  const handleSelectInterview = (ID) => {
    setSelectedInterviews((prevSelected) =>
      prevSelected.includes(ID)
        ? prevSelected.filter((selectedID) => selectedID !== ID)
        : [...prevSelected, ID]
    );
  };

  return (
    <>
      <main className="p-6 sm:p-10 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-4xl font-semibold mb-4 md:mb-0">Interviews</h1>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by name or status"
            className="border border-gray-300 rounded p-2 w-full md:w-1/3"
            aria-label="Search interviews by name or status"
          />
        </div>

        {/* Color Legend */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 mr-2"></div>
            <span>Upcoming Interviews</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 mr-2"></div>
            <span>Today's Interviews</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 mr-2"></div>
            <span>Past Interviews</span>
          </div>
        </div>


        {/* select all option  */}

        <label>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
            aria-label="Select all interviews"
            className="mr-2"
          />
          Select All
        </label>


        {/* Bulk Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => handleBulkAction('accept')}
            className="p-2 bg-green-700 text-white rounded-md disabled:bg-green-300"
            disabled={selectedInterviews.length === 0}
            aria-label="Accept selected interviews"
          >
            Accept Selected
          </button>

          {/* Toggle Button */}
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={toggleStatus}
              onChange={handleToggleChange}
              className="peer sr-only"
            />
            <div className="peer flex h-9 items-center gap-5 rounded-full bg-orange-600 px-3 after:absolute after:left-1 after:h-6 after:w-10 after:rounded-full after:bg-white/40 after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-focus:outline-none dark:border-red-600 dark:bg-red-700 text-sm text-white">
              <span>{toggleStatus ? 'ON' : 'OFF'}</span>
            </div>
          </label>

          <button
            onClick={() => handleBulkAction('reject')}
            className="p-2 bg-red-700 text-white rounded-md disabled:bg-red-300"
            disabled={selectedInterviews.length === 0}
            aria-label="Reject selected interviews"
          >
            Reject Selected
          </button>
        </div>


        {/* Interviews List */}
        {interviews.length > 0 ? (
          <div className="relative flex flex-col rounded-lg bg-white shadow-sm border border-slate-200">
            <nav className="flex flex-col gap-1 p-4" role="list">
              {(filteredInterviews.length > 0 ? filteredInterviews : interviews).map((interview) => (
                <InterviewItem
                  key={interview.id}
                  interview={interview}
                  onAccept={handleAccept}
                  onReject={handleReject}
                  onFeedbackChange={handleFeedbackChange}
                  onAssignInterviewer={handleAssignInterviewer}
                  selectedInterviewer={selectedInterviewer}
                  handleSelectInterview={handleSelectInterview}
                  isSelected={selectedInterviews.includes(interview.id)}
                  interviewersList={interviewersList}
                />
              ))}

              {/* No Interviews Found */}
              {filteredInterviews.length === 0 && interviews.length > 0 && (
                <div className="text-center text-gray-500">No interviews match your search.</div>
              )}
            </nav>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <img src={spinner} className='w-[200px]'></img>

          </div>
        )}

      </main>

      {/* Toast Notification */}
      {showToast && (
        <div
          id="toast"
          className={`fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded shadow-lg transition-opacity ${showToast ? 'opacity-100' : 'opacity-0'
            }`}
          role="alert"
          aria-live="assertive"
        >
          {toastMessage}
        </div>
      )}
    </>
  );
}
