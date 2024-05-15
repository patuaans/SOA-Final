const express = require('express')
const router = express.Router()
const booksController = require('../controllers/booksController');
const seriesController = require('../controllers/seriesController');
const editionController = require('../controllers/editionController');
const { bookValidator, editionValidator, seriesValidator } = require('../middleware/bookValidator')
const { checkToken, checkRole } = require('../middleware/jwtAuth')

// Books routes
router.get('/', booksController.getAllBooks);
router.get('/approved', checkToken, checkRole(['admin']), booksController.getApprovedBooks);
router.get('/pending', checkToken, checkRole(['admin']), booksController.getPendingBooks);
router.get('/rejected', checkToken, checkRole(['admin']), booksController.getRejectedBooks);
router.get('/newest', booksController.getNewestBooks);
router.get('/popular', booksController.getPopularBooks);
router.get('/similar', booksController.findSimilarBooks);
router.get('/genre', booksController.getBooksByGenre);
router.put('/:id/approval-status', checkToken, checkRole(['admin']), booksController.updateBookApprovalStatus);
router.get('/:id', bookValidator.getBookById, booksController.getBookById);
router.post('/', checkToken, bookValidator.createBook, booksController.createBook);
router.put('/:id', checkToken, bookValidator.updateBook, booksController.updateBook);
router.delete('/:id', checkToken, checkRole(['admin']), bookValidator.deleteBook, booksController.deleteBook);

// Series routes
router.get('/series', seriesController.getAllSeries);
router.get('/series/:id', seriesValidator.getSeriesById, seriesController.getSeriesById);
router.post('/series', checkToken, checkRole(['admin']), seriesValidator.createSeries, seriesController.createSeries);
router.put('/series/:id', checkToken, checkRole(['admin']), seriesValidator.updateSeries, seriesController.updateSeries);
router.delete('/series/:id', checkToken, checkRole(['admin']), seriesValidator.deleteSeries, seriesController.deleteSeries);

// Edition routes
router.get('/editions', editionController.getAllEditions);
router.get('/editions/:id', editionValidator.getEditionById, editionController.getEditionById);
router.post('/editions', checkToken, checkRole(['admin']), editionValidator.createEdition, editionController.createEdition);
router.put('/editions/:id', checkToken, checkRole(['admin']), editionValidator.updateEdition, editionController.updateEdition);
router.delete('/editions/:id', checkToken, checkRole(['admin']), editionValidator.deleteEdition, editionController.deleteEdition);

module.exports = router;