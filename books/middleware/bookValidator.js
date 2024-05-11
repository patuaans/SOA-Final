const { param, check } = require('express-validator')
const mongoose = require('mongoose')

// Middleware to validate ObjectID
const objectIdValidator = (idName) => [
    param(idName)
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage('Invalid ObjectID')
]

const bookValidator = {
    getBookById: [...objectIdValidator('id')],
    createBook: [
        check('title', 'Title is required').not().isEmpty(),
        check('authors', 'Authors is required').isArray().not().isEmpty(),
        check('authors.*', 'Valid author ID is required').isMongoId(),
        check('publicationDate', 'Publication date is required').not().isEmpty().isISO8601().toDate(),
        check('publisher', 'Publisher is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
        check('pageCount', 'Page count is required').not().isEmpty().isNumeric(),
        check('genres', 'Genres is required').isArray().not().isEmpty(),
        check('genres.*', 'Valid genre ID is required').isMongoId(),
        check('imageUrl', 'Image URL is required').not().isEmpty(),
        check('purchaseUrl', 'Purchase URLs are required').isArray().not().isEmpty(),
        check('purchaseUrl.*.url', 'Purchase URL is required').not().isEmpty().isURL(),
        check('purchaseUrl.*.retailer', 'Retailer is required').not().isEmpty()
    ],
    updateBook: [
        ...objectIdValidator('id'),
        check('title', 'Title is required').optional().not().isEmpty(),
        check('authors', 'Authors is required').optional().isArray().not().isEmpty(),
        check('authors.*', 'Valid author ID is required').isMongoId(),
        check('publicationDate', 'Publication date is required').optional().not().isEmpty().isISO8601().toDate(),
        check('publisher', 'Publisher is required').optional().not().isEmpty(),
        check('description', 'Description is required').optional().not().isEmpty(),
        check('pageCount', 'Page count is required').optional().not().isEmpty().isNumeric(),
        check('genres', 'Genres is required').optional().isArray().not().isEmpty(),
        check('genres.*', 'Valid genre ID is required').isMongoId(),
        check('imageUrl', 'Image URL is required').optional().not().isEmpty(),
        check('purchaseUrl', 'Purchase URLs are required').optional().isArray().not().isEmpty(),
        check('purchaseUrl.*.url', 'Purchase URL is required').optional().not().isEmpty().isURL(),
        check('purchaseUrl.*.retailer', 'Retailer is required').optional().not().isEmpty()
    ],
    deleteBook: [...objectIdValidator('id')]
}

module.exports = { bookValidator }
