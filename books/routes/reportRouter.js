const express = require('express')
const router = express.Router()
const reportsController = require('../controllers/reportsController')

router.get('/', reportsController.getAllReports)
router.get('/:id', reportsController.getReportById)
router.post('/', reportsController.createReport)
router.put('/:id', reportsController.updateReport)
router.delete('/:id', reportsController.deleteReport)

module.exports = router