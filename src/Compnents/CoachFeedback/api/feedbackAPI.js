const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const checkEmail = async (email) => {
    const response = await fetch(`${API_BASE_URL}/coach/check/${email}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.json();
};

export const addFeedbackAnalysis = async (coachId, feedbackData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/coach/feedback/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                coachId: coachId,
                feedbackData: feedbackData
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP error! status: ${response.status} - ${errorData.message || 'Unknown error'}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error adding feedback analysis:", error);
        throw error;
    }
};