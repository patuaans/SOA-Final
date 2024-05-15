const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reportsController');
const { reportValidator } = require('../middleware/reportValidator');
const { checkToken, checkRole } = require('../middleware/jwtAuth');

router.get('/', checkToken, checkRole(['admin']), reportsController.getAllReports);
router.get('/status/:status', checkToken, checkRole(['admin']), reportValidator.validateReportStatus, reportsController.getReportsByStatus);
router.get('/:id', checkToken, checkRole(['admin']), reportValidator.getReportById, reportsController.getReportById);
router.post('/', checkToken, checkRole(['user', 'admin', 'author']), reportValidator.createReport, reportsController.createReport);
router.put('/:id', checkToken, checkRole(['admin']), reportValidator.updateReport, reportsController.updateReportStatus);
router.delete('/:id', checkToken, checkRole(['admin']), reportsController.deleteReport);

module.exports = router;
