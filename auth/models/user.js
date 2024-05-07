const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    isAuthor: {
        type: Boolean,
        default: false
    },
    photoUrl: {
        type: String,
        default: ''
    },
    biography: {
        type: String,
        default: ''
    },
    penName: {
        type: String,
        default: ''
    },
    genres: {
        type: [String],
        default: []
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)
module.exports = User