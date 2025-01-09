import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../Assets/Images/logo.jpg';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

export default function SubmitForm() {
    const [formData, setFormData] = useState({ name: '', email: '', cv: null, dateConfirmed: false });
    const [formValid, setFormValid] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        setIsSubmitting(true);

        const formSubmissionData = new FormData();
        formSubmissionData.append('name', formData.name);
        formSubmissionData.append('email', formData.email);
        formSubmissionData.append('cv', formData.cv);

        try {
            const response = await fetch(`${apiUrl}/applicant`, {
                method: 'POST',
                body: formSubmissionData,
            });

            if (response.ok) {
                console.log('Form submitted successfully');
                toast.success('Form submitted successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setFormData({ name: '', email: '', cv: null, dateConfirmed: false });
            } else if (response.status === 400) {
                console.error('CV file is required');
                setFormValid(false);
                toast.error('CV file is required', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                console.error('Form submission failed: ', response.statusText);
                toast.error('Form submission failed', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            console.log('Error submitting form:', error);
            toast.error('Error submitting form', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="my-6 flex px-20">
                        <img src={logo} alt="logo" className='w-[120px] h-[120px]' />

                <div className="grid w-96 sm:grid-cols-1 items-center gap-16 p-8 mx-auto max-w-4xl bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md text-[#333] font-[sans-serif]">
                    <div className='flex items-center justify-center'>
                        <h1 className="text-3xl font-extrabold">Hiring Form</h1>
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
                                Please make sure all fields are filled.
                            </p>
                        )}
                        <button
                            type="submit"
                            className="text-white bg-[#007bff] hover:bg-blue-600 font-semibold rounded-md text-sm px-4 py-2.5 w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Send'}
                        </button>
                    </form>
                </div>
                <img src={logo} alt="logo" className='w-[120px] h-[120px]' />
            </div>
            <ToastContainer />
        </>
    );
}
