const mongoose = require('mongoose')
const { Schema } = mongoose

const userSubmissionSchema = new  Schema({
    title: {
        type: String,
        required: true
    },
    authors: [{
        type: String,
        required: true
    }],
    publisher: {
        type: String,
        required: true
    },
    publishedYear: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    genres: [{
        type: String,
        required: true
    }],
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
}, { timestamps: true })

const UserSubmission = mongoose.model('UserSubmisstion', userSubmissionSchema)
module.exports = UserSubmission
