const { param, check } = require('express-validator');
const mongoose = require('mongoose');

// Middleware to validate ObjectID
const objectIdValidator = (idName) => [
    param(idName)
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage('Invalid ObjectID')
];

const userValidator = {
    getUserById: [...objectIdValidator('id')],
    createUser: [
        check('fullName', 'Full name is required').not().isEmpty(),
        check('username', 'Username is required').not().isEmpty(),
        check('username', 'Username must be alphanumeric').isAlphanumeric(),
        check('password', 'Password is required').not().isEmpty(),
        check('password', 'Password must be at least 8 characters long').isLength({ min: 8 }),
        check('email', 'Valid email is required').isEmail(),
        check('birthDate', 'Birth date is required').not().isEmpty(),
        check('birthDate', 'Birth date must be a valid date').isISO8601(),
        check('isAuthor', 'Author status must be a boolean').optional().isBoolean(),
        check('photoUrl', 'Photo URL must be a valid URL').optional().isURL(),
        check('biography', 'Biography must be a string').optional().isString(),
        check('penName', 'Pen name must be a string').optional().isString(),
        check('genres.*', 'Genre must be a string').optional().isString()
    ],
    updateUser: [
        ...objectIdValidator('id'),
        check('fullName', 'Full name is required').not().isEmpty(),
        check('username', 'Username is required').not().isEmpty(),
        check('username', 'Username must be alphanumeric').isAlphanumeric(),
        check('password', 'Password must be at least 8 characters long').optional().isLength({ min: 8 }),
        check('email', 'Valid email is required').isEmail(),
        check('birthDate', 'Birth date is required').not().isEmpty(),
        check('birthDate', 'Birth date must be a valid date').isISO8601(),
        check('isAuthor', 'Author status must be a boolean').optional().isBoolean(),
        check('photoUrl', 'Photo URL must be a valid URL').optional().isURL(),
        check('biography', 'Biography must be a string').optional().isString(),
        check('penName', 'Pen name must be a string').optional().isString(),
        check('genres.*', 'Genre must be a string').optional().isString()
    ],
    deleteUser: [...objectIdValidator('id')],
    loginUser: [
        check('username', 'Username or email is required').exists(),
        check('password', 'Password is required').exists()
    ],
};

module.exports = { userValidator };
