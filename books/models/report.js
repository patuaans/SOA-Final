const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    book_id: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true 
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',  
        required: true
    },
    reason: {
        type: [String], 
        enum: ['Copyright Violation', 'Inappropriate Content', 'Other'],
        required: true
    },
    description: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'resolved'],
        default: 'pending'
    }
});

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;
