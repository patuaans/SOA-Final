const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

const seriesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }]
}, { timestamps: true });

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    authors: [{
        type: Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    }],
    series: {
        type: seriesSchema,
        ref: 'Series',
    },
    workId: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4

    },
    description: {
        type: String,
        required: true
    },
    averageRating: {
        type: Number,
        default: 0
    },
    totalRatings: {
        type: Number,
        default: 0
    },
    totalReviews: {
        type: Number,
        default: 0
    },
    publishedYear: {
        type: Date,
        required: true
    },
    genres: [{
        type: Schema.Types.ObjectId,
        ref: 'Genre',
        required: true
    }]
}, { timestamps: true });


const editionSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    format: {
        type: String,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    publicationDate: {
        type: Date,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    language: {
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
    reportCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Series = mongoose.model('Series', seriesSchema);
const Edition = mongoose.model('Edition', editionSchema);
const Book = mongoose.model('Book', bookSchema);
module.exports = { Series, Book, Edition };
