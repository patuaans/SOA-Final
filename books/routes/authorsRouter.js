const express = require('express')
const router = express.Router()
const authorsController = require('../controllers/authorsController')
const { authorValidator } = require('../middleware/authorsValidator')
const jwtAuth = require('../../auth/middleware/jwtAuth');

router.get('/', jwtAuth(['admin']), authorsController.getAuthors)
router.get('/verified', jwtAuth(['admin', 'user', 'author']), authorsController.getVerifiedAuthors);
router.get('/:id', authorsController.getAuthor)
router.post('/', jwtAuth(['user', 'admin']),authorValidator.createAuthor, authorsController.createAuthor)
router.put('/:id', authorValidator.updateAuthor, authorsController.updateAuthor)
router.delete('/:id', jwtAuth(['admin']), authorsController.deleteAuthor)

module.exports = router