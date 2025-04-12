import React from 'react';

export default function FeedbackTypeHeader({ type }) {
    return (
        <div className="bg-gray-100 p-2 font-bold text-lg mb-2">
            {type}
        </div>
    );
}