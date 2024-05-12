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
        check('name')
            .not().isEmpty().withMessage('Name is required')
            .matches(/^[a-z0-9 ]+$/i).withMessage('Name must contain only alphanumeric characters and spaces')
    ],
    updateGenre: [
        ...objectIdValidator('id'),
        check('name')
            .not().isEmpty().withMessage('Name is required')
            .matches(/^[a-z0-9 ]+$/i).withMessage('Name must contain only alphanumeric characters and spaces')
    ],
    deleteGenre: [...objectIdValidator('id')]
}

exports.genreValidator = genreValidator