const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const verificationApplicationSchema = new Schema({
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: { type: String, required: true },
    linkToPublications: { type: String, required: false },
    imageProofUrl: { type: String, required: false },
    status: { 
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true });

const VerificationApplication = mongoose.model('VerificationApplication', verificationApplicationSchema);
module.exports = VerificationApplication;
