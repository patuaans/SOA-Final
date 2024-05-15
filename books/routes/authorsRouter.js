const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authorsController');
const { authorValidator } = require('../middleware/authorsValidator');
const { checkToken, checkRole } = require('../middleware/jwtAuth');

router.get('/', checkToken, checkRole(['admin']), authorsController.getAuthors);
router.get('/verified', checkToken, checkRole(['admin', 'user', 'author']), authorsController.getVerifiedAuthors);
router.get('/:id', authorsController.getAuthor);
router.post('/', checkToken, checkRole(['user', 'admin']), authorValidator.createAuthor, authorsController.createAuthor);
router.put('/:id', checkToken, checkRole(['user', 'admin', 'author']), authorValidator.updateAuthor, authorsController.updateAuthor);
router.delete('/:id', checkToken, checkRole(['admin']), authorsController.deleteAuthor);

module.exports = router;
