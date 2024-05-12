const express = require('express');
const router = express.Router();
const bookShelfController = require('../controllers/bookShelfController');
const { bookShekfValidator } = require('../middleware/bookShelfValidator');
const jwtAuth = require('../../auth/middleware/jwtAuth');

router.get('/:userId', jwtAuth(['user', 'author', 'admin']), bookShelfController.getUserBookShelves);
router.post('/', jwtAuth(['user', 'author', 'admin']), bookShekfValidator, bookShelfController.createBookShelf);
router.put('/:shelfId', jwtAuth(['user', 'author', 'admin']), bookShekfValidator, bookShelfController.updateBookShelf);
router.delete('/:shelfId', jwtAuth(['user', 'author', 'admin']), bookShelfController.deleteBookShelf);
router.post('/:shelfId/books/:bookId', jwtAuth(['user', 'author', 'admin']), bookShelfController.addBookToShelf);
router.delete('/:shelfId/books/:bookId', jwtAuth(['user', 'author', 'admin']), bookShelfController.removeBookFromShelf);

module.exports = router;
