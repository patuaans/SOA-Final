const express = require('express');
const { checkToken, checkRole } = require('../middleware/jwtAuth');
const verificationController = require('../controllers/verificationController');
const verificationValidator = require('../middleware/verificationValidator');
const router = express.Router();

router.post('/', checkToken, checkRole(['user', 'admin']), verificationValidator.createApplication, verificationController.createApplication);
router.get('/status/:status', checkToken, checkRole(['admin']), verificationController.getApplicationsByStatus);
router.get('/:id', checkToken, checkRole(['admin']), verificationController.getApplication);
router.put('/:id', checkToken, checkRole(['admin']), verificationController.updateApplication);

module.exports = router;
