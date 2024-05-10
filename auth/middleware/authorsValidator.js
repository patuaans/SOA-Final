const { param, check, body } = require('express-validator');
const mongoose = require('mongoose');

// Middleware to validate ObjectID
const objectIdValidator = (idName) => [
    param(idName)
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage('Invalid ObjectID')
];

const authorValidator = {
    getAuthorById: [...objectIdValidator('id')],
    createAuthor: [
        body('userId')
            .optional()
            .custom((value) => mongoose.Types.ObjectId.isValid(value))
            .withMessage('Invalid User ID'),
        check('name', 'Name is required').notEmpty(),
        check('biography', 'Biography is required').notEmpty(),
        check('birthDate', 'Birth Date is required').notEmpty().isDate().withMessage('Birth Date must be a valid date'),
        body('deathDate').optional().isDate().withMessage('Death Date must be a valid date'),
        check('penName', 'Pen Name is required').notEmpty(),
        check('genres', 'Genres are required').isArray({ min: 1 }),
        check('genres.*', 'Each genre must be a string').isString(),
        check('photoUrl', 'Photo URL must be a valid URL').optional().isURL()
    ],
    updateAuthor: [
        ...objectIdValidator('id'),
        body('userId')
            .optional()
            .custom((value) => mongoose.Types.ObjectId.isValid(value))
            .withMessage('Invalid User ID'),
        check('name', 'Name is required').notEmpty(),
        check('biography', 'Biography is required').notEmpty(),
        check('birthDate', 'Birth Date is required').notEmpty().isDate().withMessage('Birth Date must be a valid date'),
        body('deathDate').optional().isDate().withMessage('Death Date must be a valid date'),
        check('penName', 'Pen Name is required').notEmpty(),
        check('genres', 'Genres are required').isArray({ min: 1 }),
        check('genres.*', 'Each genre must be a string').isString(),
        check('photoUrl', 'Photo URL is required').notEmpty().isURL().withMessage('Photo URL must be a valid URL')
    ],
    deleteAuthor: [...objectIdValidator('id')]
};

module.exports = { authorValidator };
