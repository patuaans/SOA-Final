const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genreSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

const Genre = mongoose.model('Genre', genreSchema);
module.exports = Genre;
