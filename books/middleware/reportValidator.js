// reportValidator.js
const { param, check } = require('express-validator');
const mongoose = require('mongoose');

// Middleware to validate ObjectID
const objectIdValidator = (idName) => [
    param(idName)
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage('Invalid ObjectID')
];

const reportValidator = {
    getReportById: [...objectIdValidator('id')],
    createReport: [
        check('book_id', 'Book ID is required and must be a valid ObjectID')
            .isMongoId()
            .withMessage('Invalid Book ID'),
        check('user_id', 'User ID is required and must be a valid ObjectID')
            .isMongoId()
            .withMessage('Invalid User ID'),
        check('reason')
            .isArray({ min: 1 })
            .withMessage('At least one reason must be specified')
            .custom((reasons) => {
                const allowedReasons = ['Copyright Violation', 'Inappropriate Content', 'Other'];
                return reasons.every((reason) => allowedReasons.includes(reason));
            })
            .withMessage('Invalid reason(s)'),
        check('description', 'Description must be a string').optional().isString(),
        check('status')
            .optional()
            .isIn(['pending', 'reviewed', 'resolved'])
            .withMessage('Invalid status value')
    ],
    updateReport: [
        ...objectIdValidator('id'),
        check('status', 'Status is required and must be one of pending, reviewed, or resolved')
            .exists()
            .isIn(['pending', 'reviewed', 'resolved'])
            .withMessage('Invalid status value')
    ],
    deleteReport: [...objectIdValidator('id')],
    validateReportStatus: [
        param('status')
            .isIn(['pending', 'reviewed', 'resolved'])
            .withMessage('Invalid status value')
    ]
};

module.exports = { reportValidator };
