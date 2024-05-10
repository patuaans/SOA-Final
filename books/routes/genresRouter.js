const express = require('express')
const router = express.Router()
const genresController = require('../controllers/gentresController')
const { genreValidator } = require('../middleware/genreValidator')

router.get('/', genresController.getAllGenres)
router.get('/:id', genresController.getGenreById)
router.post('/', genreValidator.createGenre, genresController.createGenre)
router.put('/:id', genresController.deleteGenre, genresController.updateGenre)
router.delete('/:id', genresController.deleteGenre, genresController.deleteGenre)

module.exports = router