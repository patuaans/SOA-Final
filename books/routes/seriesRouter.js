const express = require('express')
const router = express.Router()
const seriesController = require('../controllers/seriesController');
const { seriesValidator } = require('../middleware/bookValidator')
const { checkToken, checkRole } = require('../middleware/jwtAuth')

// Series routes
router.get('/', seriesController.getAllSeries);
router.get('/:id', seriesValidator.getSeriesById, seriesController.getSeriesById);
router.post('/', checkToken, checkRole(['admin']), seriesValidator.createSeries, seriesController.createSeries);
router.put('/:id', checkToken, checkRole(['admin']), seriesValidator.updateSeries, seriesController.updateSeries);
router.delete('/:id', checkToken, checkRole(['admin']), seriesValidator.deleteSeries, seriesController.deleteSeries);

module.exports = router;