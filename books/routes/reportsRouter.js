const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reportsController');
const { reportValidator } = require('../middleware/reportValidator');
const { jwtAuth } = require('../middleware/jwtAuth');

router.get('/', jwtAuth(['admin']), reportsController.getAllReports);
router.get('/status/:status', jwtAuth(['admin']), reportValidator.validateReportStatus, reportsController.getReportsByStatus);
router.get('/:id', jwtAuth(['admin']), reportValidator.getReportById, reportsController.getReportById);
router.post('/', jwtAuth(['user', 'admin', 'author']), reportValidator.createReport, reportsController.createReport);
router.put('/:id', jwtAuth(['admin']), reportValidator.updateReport, reportsController.updateReportStatus);
router.delete('/:id', jwtAuth(['admin']), reportsController.deleteReport);

module.exports = router;
