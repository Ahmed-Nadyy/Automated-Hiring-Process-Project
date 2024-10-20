const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    cv: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    interviewDate: {
        type: Date,
    },
    feedback: {
        type: String,
    },
    meetingLink: {
        type: String,
    },
    interviewer: {
        type: String,
        enum: ['Rady', 'Mnesy', 'Mohamed Ibrahim'],
    },
});

module.exports = mongoose.model('Applicant', applicantSchema);