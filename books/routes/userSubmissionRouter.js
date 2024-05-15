const express = require('express');
const userSubmissionController = require('../controllers/userSubmissionController');
const { checkToken, checkRole } = require('../middleware/jwtAuth');
const userSubmissionValidator = require('../middleware/userSubmissionValidator');

const router = express.Router();

router.get('/', checkToken, checkRole(['admin']), userSubmissionController.getAllUserSubmissions);
router.post('/', checkToken, userSubmissionValidator.validateCreateUserSubmission, userSubmissionController.createUserSubmission);
router.get('/:id', checkToken, checkRole(['admin']), userSubmissionValidator.validateGetUserSubmissionById, userSubmissionController.getUserSubmissionById);
router.put('/:id', checkToken, checkRole(['admin']), userSubmissionValidator.validateUpdateUserSubmission, userSubmissionController.updateUserSubmission);
router.delete('/:id', checkToken, checkRole(['admin']), userSubmissionValidator.validateDeleteUserSubmission, userSubmissionController.deleteUserSubmission);

module.exports = router;
