const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    fullname: {
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
        default: null
    },
    photoUrl: {
        type: String,
        default: './public/images/users/user.jpg'
    },
    role: {
        type: String,
        default: 'user'
    },
    active: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

const User = mongoose.model('User', userSchema)
module.exports = User