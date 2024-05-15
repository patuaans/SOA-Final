const express = require('express')
const router = express.Router()
const editionController = require('../controllers/editionController');
const { editionValidator } = require('../middleware/bookValidator')
const { checkToken, checkRole } = require('../middleware/jwtAuth')

router.get('/', editionController.getAllEditions);
router.get('/:id', editionValidator.getEditionById, editionController.getEditionById);
router.post('/', checkToken, checkRole(['admin']), editionValidator.createEdition, editionController.createEdition);
router.put('/:id', checkToken, checkRole(['admin']), editionValidator.updateEdition, editionController.updateEdition);
router.delete('/:id', checkToken, checkRole(['admin']), editionValidator.deleteEdition, editionController.deleteEdition);

module.exports = router;