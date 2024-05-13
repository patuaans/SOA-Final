const BookShelf = require('../models/bookShelf');
const { validationResult } = require('express-validator');

const handleError = (error, res) => {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
};

const handleResponse = (res, status, data, message = '') => {
    res.status(status).json({ success: true, data, message });
};

const userAuthorized = async (shelfId, userId) => {
    const shelf = await BookShelf.findById(shelfId);
    return shelf && shelf.user.toString() === userId.toString();
};

exports.getUserBookShelves = async (req, res) => {
    try {
        const shelves = await BookShelf.find({ user: req.user.id }).populate('books');
        handleResponse(res, 200, shelves);
    } catch (error) {
        handleError(error, res);
    }
};

exports.createBookShelf = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const newShelf = await BookShelf.create({ ...req.body, user: req.user.id });
        handleResponse(res, 201, newShelf);
    } catch (error) {
        handleError(error, res);
    }
};

exports.updateBookShelf = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    if (!(await userAuthorized(req.params.shelfId, req.user.id))) {
        return res.status(403).json({ success: false, message: "Unauthorized access" });
    }

    try {
        const updatedShelf = await BookShelf.findByIdAndUpdate(req.params.shelfId, req.body, { new: true });
        handleResponse(res, 200, updatedShelf);
    } catch (error) {
        handleError(error, res);
    }
};

exports.deleteBookShelf = async (req, res) => {
    if (!(await userAuthorized(req.params.shelfId, req.user.id))) {
        return res.status(403).json({ success: false, message: "Unauthorized access" });
    }

    try {
        await BookShelf.findByIdAndDelete(req.params.shelfId);
        handleResponse(res, 200, null, 'Bookshelf deleted');
    } catch (error) {
        handleError(error, res);
    }
};

exports.addBookToShelf = async (req, res) => {
    if (!(await userAuthorized(req.params.shelfId, req.user.id))) {
        return res.status(403).json({ success: false, message: "Unauthorized access" });
    }

    try {
        const update = await BookShelf.findByIdAndUpdate(
            req.params.shelfId,
            { $addToSet: { books: req.params.bookId } },
            { new: true }
        );
        handleResponse(res, 200, update);
    } catch (error) {
        handleError(error, res);
    }
};

exports.removeBookFromShelf = async (req, res) => {
    if (!(await userAuthorized(req.params.shelfId, req.user.id))) {
        return res.status(403).json({ success: false, message: "Unauthorized access" });
    }

    try {
        const update = await BookShelf.findByIdAndUpdate(
            req.params.shelfId,
            { $pull: { books: req.params.bookId } },
            { new: true }
        );
        handleResponse(res, 200, update);
    } catch (error) {
        handleError(error, res);
    }
};

exports.moveBookToShelf = async (req, res) => {
    const { sourceShelfId, destShelfId, bookId } = req.params;
    if (!(await userAuthorized(sourceShelfId, req.user.id)) || !(await userAuthorized(destShelfId, req.user.id))) {
        return res.status(403).json({ success: false, message: "Unauthorized access to source or destination shelf" });
    }

    try {
        // Remove book from source shelf
        const sourceUpdate = await BookShelf.findByIdAndUpdate(
            sourceShelfId,
            { $pull: { books: bookId } },
            { new: true }
        );

        // Add book to destination shelf
        const destUpdate = await BookShelf.findByIdAndUpdate(
            destShelfId,
            { $addToSet: { books: bookId } },
            { new: true }
        );

        handleResponse(res, 200, { sourceUpdate, destUpdate }, 'Book moved successfully');
    } catch (error) {
        handleError(error, res);
    }
};
