// InterviewItem.jsx
import React from 'react';

const InterviewItem = ({
  interview,
  onAccept,
  onReject,
  onFeedbackChange,
  onAssignInterviewer,
  selectedInterviewer,
  handleSelectInterview,
  isSelected,
  interviewersList,
}) => {
  const getColor = (date) => {
    const interviewDate = new Date(date);
    const today = new Date();

    if (interviewDate.toDateString() === today.toDateString()) {
      return 'orange'; // Same day
    } else if (interviewDate > today) {
      return 'blue'; // Not started
    } else {
      return 'red'; // Started
    }
  };

  const isInterviewDateStarted = (date) => {
    const interviewDate = new Date(date);
    const today = new Date();
    return interviewDate <= today;
  };

  return (
    <div
      className="text-slate-800 flex w-full items-center rounded-md p-2 pl-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 border-b-4"
      role="listitem"
    >
      {/* Selection Checkbox */}
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => handleSelectInterview(interview.id)}
        aria-label={`Select interview with ${interview.name}`}
        className="mr-4"
      />

      <div className="flex flex-col flex-1">
        <div className='flex'>
          <div className="bg-gray-200 rounded py-1 px-2 w-[240px] mr-3">{interview.name}</div>

        </div>
        <div className="bg-gray-200 rounded mt-2 py-1 px-2 w-[240px] mr-3">{interview.email}</div>
        <div className="flex items-center mt-2">
          <div className='flex'>
            <label className="mr-3 font-bold">Date:</label>
            <div style={{ color: getColor(interview.date) }}>
              {new Date(interview.date).toLocaleDateString()}
            </div>
          </div>
          {
            isInterviewDateStarted(interview.date) ? (
              <div className='flex mx-4' >
                <label>Meeting Link : <span className='text-red-700 font-bold'>the meet is died</span></label>
              </div>
            ) : (


              <div className='flex mx-4' >
                <label>Meeting Link : <a href='#' target='blank' className='text-blue-500 font-bold'>click here</a></label>
              </div>
            )
          }
          <div className='flex mx-1' >
            <label>CV : <a href={interview.cv} target='blank' className='text-blue-500 font-bold'>click here</a></label>
          </div>
        </div>

        <div className="flex items-center mt-2">
          <label className="mr-3 font-bold">Feedback:</label>
          <input
            type="text"
            value={interview.feedback}
            placeholder="Enter feedback..."
            onChange={(e) => onFeedbackChange(interview.id, e.target.value)}
            className="w-[400px] mt-1 border border-slate-300 rounded-md p-1"
            aria-label={`Feedback for ${interview.name}`}
          />
        </div>

        {isInterviewDateStarted(interview.date) ? (
          <div className="mt-2">
            <span className="font-bold">Interviewer:</span>{' '}
            {interview.interviewer || 'No interviewer assigned'}
          </div>
        ) : (
          <>
            <select
              value={selectedInterviewer[interview.id] || ''}
              onChange={(e) => onAssignInterviewer(interview.id, e.target.value)}
              className="mt-2 border border-slate-300 rounded-md p-1 w-[200px]"
              aria-label={`Select interviewer for ${interview.name}`}
            >
              <option value="">Select Interviewer</option>
              {interviewersList.map((interviewer, index) => (
                <option key={index} value={interviewer}>
                  {interviewer}
                </option>
              ))}
            </select>
            {selectedInterviewer[interview.id] && (
              <button
                onClick={() => onAssignInterviewer(interview.id)}
                className="mt-2 p-2 bg-[#1f2937] text-white rounded-md w-[200px]"
                aria-label={`Assign interviewer to ${interview.name}`}
              >
                OK
              </button>
            )}
          </>
        )}
      </div>

      <div className="ml-auto grid place-items-center justify-self-end">
        <button
          className="rounded-md border border-transparent p-2.5 text-center text-sm transition-all bg-green-700 w-[100px] my-1 text-white hover:bg-slate-200 hover:text-black focus:bg-slate-200 focus:text-black active:bg-slate-200 active:text-black"
          type="button"
          onClick={() => onAccept(interview.id)}
          aria-label={`Accept interview with ${interview.name}`}
        >
          Accept
        </button>
        <button
          className="rounded-md border border-transparent p-2.5 text-center text-sm transition-all bg-red-700 w-[100px] my-1 text-white hover:bg-slate-200 hover:text-black focus:bg-slate-200 focus:text-black active:bg-slate-200 active:text-black"
          type="button"
          onClick={() => onReject(interview.id)}
          aria-label={`Reject interview with ${interview.name}`}
        >
          Reject
        </button>
        <button
          className="rounded-md border border-transparent p-2.5 text-center text-sm transition-all text-white bg-[#1f2937] w-[100px] cursor-default"
          type="button"
          aria-label={`Status of interview with ${interview.name}`}
        >
          {interview.status}
        </button>
      </div>
    </div>

  );
};

export default InterviewItem;
