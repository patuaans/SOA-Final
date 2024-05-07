const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    authors: [{
        author: {
            type: Schema.Types.ObjectId,
            ref: 'Author',
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }],
    averageRating: {
        type: Number,
        default: 0
    },
    ratingsCount: {
        type: Number,
        default: 0
    },
    textReviewsCount: {
        type: Number,
        default: 0
    },
    publicationDate: {
        type: Date,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    genres: [{
        type: Schema.Types.ObjectId,
        ref: 'Genre',
        required: true
    }],
    imageUrl: {
        type: String,
        required: true
    },
    purchaseUrl: [{
        url: {
            type: String,
            required: true
        },
        retailer: {
            type: String,
            required: true
        }
    }],
    approvalStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    reportCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
