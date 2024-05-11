const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookShelfSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }]
}, { timestamps: true });

const UserTag = mongoose.model('BookShelf', bookShelfSchema);
module.exports = UserTag;
