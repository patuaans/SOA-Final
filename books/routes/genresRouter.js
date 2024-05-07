const express = require('express')
const router = express.Router()
const genresController = require('../controllers/gentresController')

router.get('/', genresController.getAllGenres)
router.get('/:id', genresController.getGenreById)
router.post('/', genresController.createGenre)
router.put('/:id', genresController.updateGenre)
router.delete('/:id', genresController.deleteGenre)

module.exports = router