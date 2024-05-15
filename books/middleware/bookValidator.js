const { check } = require('express-validator');
const mongoose = require('mongoose');

// Middleware to validate ObjectID
const objectIdValidator = (idName) => [
    check(idName)
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage('Invalid ObjectID')
];

const seriesValidator = {
    getSeriesById: [...objectIdValidator('id')],
    createSeries: [
        check('title', 'Title is required').notEmpty(),
        check('description', 'Description is required').notEmpty(),
    ],
    updateSeries: [
        ...objectIdValidator('id'),
        check('title', 'Title is required').optional().notEmpty(),
        check('description', 'Description is required').optional().notEmpty(),
    ],
    deleteSeries: [...objectIdValidator('id')]
};

const bookValidator = {
    getBookById: [...objectIdValidator('id')],
    createBook: [
        check('title', 'Title is required').notEmpty(),
        check('authors', 'Authors is required').isArray({ min: 1 }).notEmpty(),
        check('authors.*', 'Valid author ID is required').isMongoId(),
        check('series', 'Series ID is required').optional().isMongoId(),
        check('workId', 'Work ID is required').notEmpty(),
        check('description', 'Description is required').notEmpty(),
        check('averageRating', 'Average rating must be a number').optional().isNumeric(),
        check('totalRatings', 'Total ratings must be a number').optional().isNumeric(),
        check('totalReviews', 'Total reviews must be a number').optional().isNumeric(),
        check('publishedYear', 'Published year is required').notEmpty().isISO8601().toDate(),
        check('genres', 'Genres is required').isArray({ min: 1 }).notEmpty(),
        check('genres.*', 'Valid genre ID is required').isMongoId(),
    ],
    updateBook: [
        ...objectIdValidator('id'),
        check('title', 'Title is required').optional().notEmpty(),
        check('authors', 'Authors is required').optional().isArray({ min: 1 }).notEmpty(),
        check('authors.*', 'Valid author ID is required').optional().isMongoId(),
        check('series', 'Series ID is required').optional().isMongoId(),
        check('workId', 'Work ID is required').optional().notEmpty(),
        check('description', 'Description is required').optional().notEmpty(),
        check('averageRating', 'Average rating must be a number').optional().isNumeric(),
        check('totalRatings', 'Total ratings must be a number').optional().isNumeric(),
        check('totalReviews', 'Total reviews must be a number').optional().isNumeric(),
        check('publishedYear', 'Published year is required').optional().notEmpty().isISO8601().toDate(),
        check('genres', 'Genres is required').optional().isArray({ min: 1 }).notEmpty(),
        check('genres.*', 'Valid genre ID is required').isMongoId(),
    ],
    deleteBook: [...objectIdValidator('id')]
};

const editionValidator = {
    getEditionById: [...objectIdValidator('id')],
    createEdition: [
        check('book', 'Book ID is required').isMongoId(),
        check('title', 'Title is required').notEmpty(),
        check('format', 'Format is required').notEmpty(),
        check('pageCount', 'Page count is required').notEmpty().isNumeric(),
        check('publisher', 'Publisher is required').notEmpty(),
        check('publicationDate', 'Publication date is required').notEmpty().isISO8601().toDate(),
        check('coverImage', 'Cover image URL is required').notEmpty(),
        check('language', 'Language is required').notEmpty(),
        check('purchaseUrl', 'Purchase URLs are required').isArray({ min: 1 }).notEmpty(),
        check('purchaseUrl.*.url', 'Purchase URL is required').notEmpty().isURL(),
        check('purchaseUrl.*.retailer', 'Retailer is required').notEmpty(),
    ],
    updateEdition: [
        ...objectIdValidator('id'),
        check('book', 'Book ID is required').optional().isMongoId(),
        check('title', 'Title is required').optional().notEmpty(),
        check('format', 'Format is required').optional().notEmpty(),
        check('pageCount', 'Page count is required').optional().notEmpty().isNumeric(),
        check('publisher', 'Publisher is required').optional().notEmpty(),
        check('publicationDate', 'Publication date is required').optional().notEmpty().isISO8601().toDate(),
        check('coverImage', 'Cover image URL is required').optional().notEmpty(),
        check('language', 'Language is required').optional().notEmpty(),
        check('purchaseUrl', 'Purchase URLs are required').optional().isArray({ min: 1 }).notEmpty(),
        check('purchaseUrl.*.url', 'Purchase URL is required').optional().notEmpty().isURL(),
        check('purchaseUrl.*.retailer', 'Retailer is required').optional().notEmpty(),
    ],
    deleteEdition: [...objectIdValidator('id')]
};

module.exports = { seriesValidator, bookValidator, editionValidator };
