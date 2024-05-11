const express = require('express');
const router = express.Router();
const bookShelfController = require('../controllers/bookShelfController');

router.get('/:userId', bookShelfController.getUserBookShelves);
router.post('/', bookShelfController.createBookShelf);
router.put('/:shelfId', bookShelfController.updateBookShelf);
router.delete('/:shelfId', bookShelfController.deleteBookShelf);
router.post('/:shelfId/books/:bookId', bookShelfController.addBookToShelf);
router.delete('/:shelfId/books/:bookId', bookShelfController.removeBookFromShelf);

module.exports = router;
