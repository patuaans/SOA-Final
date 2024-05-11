const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const { userValidator } = require('../middleware/userValidator')
const jwtAuth = require('../middleware/jwtAuth');

router.get('/', jwtAuth(['admin']), usersController.getAllUsers)
router.get('/:id', userValidator.getUserById, usersController.getUserById)
router.post('/login', usersController.loginUser)
router.post('/logout', usersController.logoutUser)
router.post('/register', userValidator.createUser, usersController.createUser)
router.put('/:id', userValidator.updateUser, usersController.updateUser)
router.delete('/:id', jwtAuth(['admin']), usersController.deleteUser); 
router.get('/verify/:username/:uniqueString', usersController.verifyEmail)

module.exports = router