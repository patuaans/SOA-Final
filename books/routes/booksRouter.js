const express = require('express')
const router = express.Router()
const booksController = require('../controllers/booksController')
const { bookValidator } = require('../middleware/bookValidator')

router.get('/', booksController.getAllBooks)
router.get('/:id', bookValidator.getBookById, booksController.getBookById)
router.post('/', bookValidator.createBook, booksController.createBook)
router.put('/:id', bookValidator.updateBook, booksController.updateBook)
router.delete('/:id', bookValidator.deleteBook, booksController.deleteBook)

module.exports = router