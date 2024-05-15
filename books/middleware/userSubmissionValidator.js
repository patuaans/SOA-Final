const { body, param } = require('express-validator');
const mongoose = require('mongoose');

const objectIdValidator = (idName) => [
    param(idName)
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage('Invalid ObjectID')
];

const userSubmissionValidator = {
    validateCreateUserSubmission: [
        body('title').notEmpty().withMessage('Title is required'),
        body('authors').isArray({ min: 1 }).withMessage('Authors must be provided as an array with at least one author'),
        body('publisher').notEmpty().withMessage('Publisher is required'),
        body('publishedYear').isISO8601().toDate().withMessage('Invalid published year'),
        body('description').notEmpty().withMessage('Description is required'),
        body('genres').isArray({ min: 1 }).withMessage('Genres must be provided as an array with at least one genre').notEmpty().withMessage('Genres are required')
    ],

    validateGetUserSubmissionById: [
        ...objectIdValidator('id')
    ],

    validateUpdateUserSubmission: [
        ...objectIdValidator('id'),
        body('status').isIn(['pending', 'approved', 'rejected']).withMessage('Invalid status')
    ],

    validateDeleteUserSubmission: [
        ...objectIdValidator('id')
    ]
};

module.exports = userSubmissionValidator;
