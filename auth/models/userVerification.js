const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userVerificationSchema = new Schema({
    username: String,
    uniqueString: String,
    createAt: Date,
    expiresAt: Date
})

const UserVerification = mongoose.model('UserVerification', userVerificationSchema)

module.exports = UserVerification