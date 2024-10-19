import React, { useState } from 'react';


export default function SubmitForm() {
    const [formData, setFormData] = useState({ name: '', email: '', cv: null, dateConfirmed: false });
    const [formValid, setFormValid] = useState(true);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.cv) {
            setFormValid(false);
            return;
        }

        setFormValid(true);

        const formSubmissionData = new FormData();
        formSubmissionData.append('name', formData.name);
        formSubmissionData.append('email', formData.email);
        formSubmissionData.append('cv', formData.cv);

        try {
            const response = await fetch('https://daffodil-wary-straw.glitch.me/api/applicant', {
                method: 'POST',
                body: formSubmissionData,
            });

            if (response.ok) {
                console.log('Form submitted successfully');
                window.location.href = 'https://fontawesome.com/';
            } else if (response.status === 400) {
                console.error('CV file is required');
                setFormValid(false);
            } else {
                console.error('Form submission failed: ', response.statusText);
            }
        } catch (error) {
            console.log('Error submitting form:', error);
        }
    };

    return (
        <>
            <div className="my-6">
                <div className="grid sm:grid-cols-2 items-center gap-16 p-8 mx-auto max-w-4xl bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md text-[#333] font-[sans-serif]">
                    <div>
                        <h1 className="text-3xl font-extrabold">Hiring Form</h1>
                        <p className="text-sm text-gray-400 mt-3">some details here.</p>
                        <div className="mt-12">
                            <h2 className="text-lg font-extrabold">Choose the meeting date</h2>
                            <p className="text-sm text-red-500 mt-2">Make sure you select the date that is available for you for the interview. The system will redirect you automatically after you submit the form.</p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="ml-auto space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
                            onChange={handleInputChange}
                            value={formData.name}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
                            onChange={handleInputChange}
                            value={formData.email}
                        />
                        <input
                            type="file"
                            name="cv"
                            className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
                            onChange={handleInputChange}
                        />
                        {!formValid && (
                            <p className="text-red-500 text-sm">
                                Please make sure all fields are filled and you've selected an available date.
                            </p>
                        )}
                        <button
                            type="submit"
                            className="text-white bg-[#007bff] hover:bg-blue-600 font-semibold rounded-md text-sm px-4 py-2.5 w-full"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
