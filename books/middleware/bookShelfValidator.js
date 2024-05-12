const { body, validationResult } = require('express-validator');

// Middleware to validate bookshelf data
exports.bookShekfValidator = [
    body('name').trim().isLength({ min: 1 }).withMessage('Name is required'),
    body('user').isMongoId().withMessage('Valid user ID is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
    }
];
