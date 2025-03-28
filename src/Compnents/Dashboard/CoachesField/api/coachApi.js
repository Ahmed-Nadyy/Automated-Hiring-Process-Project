const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const addCoach = async (coachData) => {
    const response = await fetch(`${API_BASE_URL}/coach/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(coachData),
    });
    return response.json();
};

export const getCoaches = async () => {
    const response = await fetch(`${API_BASE_URL}/coach/list`);
    return response.json();
};

export const deleteCoach = async (id) => {
    const response = await fetch(`${API_BASE_URL}/coach/delete/${id}`, {
        method: "DELETE",
    });
    return response.json();
};

// new api fun

export const getCoachById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/coach/getCoach/${id}`);
    return response.json();
};

export const getFeedbackHistory = async (coachId) => {
    const response = await fetch(`${API_BASE_URL}/coach/feedback/history/${coachId}`);
    return response.json();
};

export const getFeedbackAnalysis = async (coachId) => {
    const response = await fetch(`${API_BASE_URL}/coach/feedback/analysis/${coachId}`);
    return response.json();
};

export const getUnpaidCoaches = async () => {
    const response = await fetch(`${API_BASE_URL}/coach/feedback/unpaidCoaches`);
    return response.json();
};

export const searchCoachesByMonth = async (month, year) => {
    const response = await fetch(`${API_BASE_URL}/coach/feedback/search-by-month?month=${month}&year=${year}`);
    return response.json();
};

// export const markFeedbackAsPaid = async (coachId) => {
//     const response = await fetch(`${API_BASE_URL}/coach/feedback/pay/${coachId}`, {
//         method: 'POST',
//     });

//     return response.json();
// };

export const markFeedbackAsPaid = async (coachId, paymentDetails) => {
    const response = await fetch(`${API_BASE_URL}/coach/feedback/pay/${coachId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentDetails),
    });
    return response.json();
};

export const getFeedbackLogs = async (coachId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/coach/feedback/logs/${coachId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error in getFeedbackHistory:', error);
        return { success: false, error: error.message };
    }
};