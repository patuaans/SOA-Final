// validation/verificationValidator.js
const { body, param } = require('express-validator');

const createApplication = [
    body('authorId')
        .isMongoId()
        .withMessage('Author ID must be a valid MongoDB ObjectId'),
    body('description')
        .trim()
        .isLength({ min: 10 })
        .withMessage('Description must be at least 10 characters long'),
    body('linkToPublications')
        .optional()
        .isURL()
        .withMessage('Link to publications must be a valid URL'),
    body('imageProofUrl')
        .optional()
        .isURL()
        .withMessage('Image proof URL must be a valid URL')
];

const updateApplicationStatus = [
    param('id')
        .isMongoId()
        .withMessage('Application ID must be a valid MongoDB ObjectId'),
    body('status')
        .isIn(['pending', 'approved', 'rejected'])
        .withMessage('Invalid status value. Must be either pending, approved, or rejected')
];

const getApplicationById = [
    param('id')
        .isMongoId()
        .withMessage('Application ID must be a valid MongoDB ObjectId')
];

const getApplicationsByStatus = [
    param('status')
        .isIn(['pending', 'approved', 'rejected'])
        .withMessage('Invalid status. Must be either pending, approved, or rejected')
];

module.exports = {
    createApplication,
    updateApplicationStatus,
    getApplicationById,
    getApplicationsByStatus
};
