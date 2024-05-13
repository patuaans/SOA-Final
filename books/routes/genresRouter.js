const express = require('express');
const router = express.Router();
const genresController = require('../controllers/gentresController');
const { genreValidator } = require('../middleware/genreValidator');
const { jwtAuth } = require('../middleware/jwtAuth');

router.get('/', genresController.getAllGenres);
router.get('/:id', genreValidator.getGenreById, genresController.getGenreById);
router.post('/', jwtAuth(['admin']), genreValidator.createGenre, genresController.createGenre);
router.put('/:id', jwtAuth(['admin']), genreValidator.updateGenre, genresController.updateGenre);
router.delete('/:id', jwtAuth(['admin']), genreValidator.deleteGenre, genresController.deleteGenre);

module.exports = router;