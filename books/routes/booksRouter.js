const express = require('express')
const router = express.Router()
const booksController = require('../controllers/booksController')
const { bookValidator } = require('../middleware/bookValidator')

router.get('/approved', booksController.getApprovedBooks)
router.get('/pending', booksController.getPendingBooks)
router.get('/rejected', booksController.getRejectedBooks)
router.get('/newest', booksController.getNewestBooks)
router.get('/popular', booksController.getPopularBooks)
router.get('/similar', booksController.findSimilarBooks);
router.get('/genre', booksController.getBooksByGenre);
router.get('/:id', bookValidator.getBookById, booksController.getBookById)
router.post('/', bookValidator.createBook, booksController.createBook)
router.put('/:id', bookValidator.updateBook, booksController.updateBook)
router.delete('/:id', bookValidator.deleteBook, booksController.deleteBook)

module.exports = router