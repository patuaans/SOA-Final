const express = require('express');
const { jwtAuth } = require('../middleware/jwtAuth');
const verificationController = require('../controllers/verificationController');
const verificationValidator = require('../middleware/verificationValidator');
const router = express.Router();

router.post('/', jwtAuth(['user']), verificationValidator.createApplication, verificationController.createApplication);
router.get('/status/:status', jwtAuth(['admin']), verificationController.getApplicationsByStatus);
router.get('/:id', jwtAuth(['admin']), verificationController.getApplication);
router.put('/:id', jwtAuth(['admin']), verificationController.updateApplication);

module.exports = router;