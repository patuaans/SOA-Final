const { param, check } = require('express-validator')
const mongoose = require('mongoose')

// Middleware to validate ObjectID
const objectIdValidator = (idName) => [
    param(idName)
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage('Invalid ObjectID')
]

const genreValidator = {
    getGenreById: [...objectIdValidator('id')],
    createGenre: [
        check('name', 'Name is required').not().isEmpty()
    ],
    updateGenre: [
        ...objectIdValidator('id'),
        check('name', 'Name is required').not().isEmpty()
    ],
    deleteGenre: [...objectIdValidator('id')]
}

exports.genreValidator = genreValidator