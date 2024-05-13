const express = require('express')
const router = express.Router()
const booksController = require('../controllers/booksController')
const { bookValidator } = require('../middleware/bookValidator')
const { jwtAuth } = require('../middleware/jwtAuth')

router.get('/', booksController.getAllBooks)
router.get('/approved', jwtAuth(['admin']), booksController.getApprovedBooks)
router.get('/pending', jwtAuth(['admin']), booksController.getPendingBooks)
router.get('/rejected', jwtAuth(['admin']), booksController.getRejectedBooks)
router.get('/newest', booksController.getNewestBooks)
router.get('/popular', booksController.getPopularBooks)
router.get('/similar', booksController.findSimilarBooks);
router.get('/genre', booksController.getBooksByGenre);
router.put('/:id/approval-status', jwtAuth(['admin']), booksController.updateBookApprovalStatus);
router.get('/:id', bookValidator.getBookById, booksController.getBookById)
router.post('/', jwtAuth(['user', 'admin', 'author']), bookValidator.createBook, booksController.createBook);
router.put('/:id', jwtAuth(['user', 'admin', 'author']), bookValidator.updateBook, booksController.updateBook);
router.delete('/:id', jwtAuth(['admin']), bookValidator.deleteBook, booksController.deleteBook);

module.exports = router