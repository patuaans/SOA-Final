const express = require('express');
const router = express.Router();
const genresController = require('../controllers/genresController');
const { genreValidator } = require('../middleware/genreValidator');
const jwtAuth = require('../middleware/jwtAuth'); // Import the jwtAuth middleware

router.get('/', genresController.getAllGenres);
router.get('/:id', genreValidator.getGenreById, genresController.getGenreById);
router.post('/', jwtAuth.checkToken, jwtAuth.checkRole(['admin']), genreValidator.createGenre, genresController.createGenre);
router.put('/:id', jwtAuth.checkToken, jwtAuth.checkRole(['admin']), genreValidator.updateGenre, genresController.updateGenre);
router.delete('/:id', jwtAuth.checkToken, jwtAuth.checkRole(['admin']), genreValidator.deleteGenre, genresController.deleteGenre);

module.exports = router;
