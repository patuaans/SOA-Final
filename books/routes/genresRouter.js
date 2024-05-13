const express = require('express');
const router = express.Router();
const genresController = require('../controllers/gentresController');
const { genreValidator } = require('../middleware/genreValidator');

router.get('/', genresController.getAllGenres);
router.get('/:id', genreValidator.getGenreById, genresController.getGenreById);
router.post('/', genreValidator.createGenre, genresController.createGenre);
router.put('/:id', genreValidator.updateGenre, genresController.updateGenre);
router.delete('/:id', genreValidator.deleteGenre, genresController.deleteGenre);

module.exports = router;