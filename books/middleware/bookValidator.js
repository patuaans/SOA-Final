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
        check('authors.*.name', 'Author name is required').not().isEmpty(),
        check('authors.*.author', 'Valid author ID is required').isMongoId(),
        check('publicationDate', 'Publication date is required').not().isEmpty(),
        check('publisher', 'Publisher is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
        check('pageCount', 'Page count is required').not().isEmpty().isNumeric(),
        check('genres.*', 'Genre is required').not().isEmpty(),
        check('imageUrl', 'Image URL is required').not().isEmpty(),
        check('purchaseUrl.*.url', 'Purchase URL is required').not().isEmpty().isURL(),
        check('purchaseUrl.*.retailer', 'Retailer is required').not().isEmpty()
    ],
    updateBook: [
        ...objectIdValidator('id'),
        check('title', 'Title is required').not().isEmpty(),
        check('authors.*.name', 'Author name is required').not().isEmpty(),
        check('authors.*.author', 'Valid author ID is required').isMongoId(),
        check('publicationDate', 'Publication date is required').not().isEmpty(),
        check('publisher', 'Publisher is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
        check('pageCount', 'Page count is required').not().isEmpty().isNumeric(),
        check('genres.*', 'Genre is required').not().isEmpty(),
        check('imageUrl', 'Image URL is required').not().isEmpty(),
        check('purchaseUrl.*.url', 'Purchase URL is required').not().isEmpty().isURL(),
        check('purchaseUrl.*.retailer', 'Retailer is required').not().isEmpty()
    ],
    deleteBook: [...objectIdValidator('id')]
}

module.exports = { bookValidator }
