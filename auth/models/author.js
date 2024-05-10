const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authorSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
        required: true
    },
    biography: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    deathDate: {
        type: Date,
        default: null
    },
    photoUrl: {
        type: String,
        required: true
    },
    penName: {
        type: String,
        required: true
    },
    genres: {
        type: [String],
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Author = mongoose.model('Author', authorSchema)
module.exports = Author