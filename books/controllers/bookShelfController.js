const BookShelf = require('../models/bookShelf');

exports.getUserBookShelves = async (req, res) => {
    try {
        const shelves = await BookShelf.find({ user: req.params.userId }).populate('books');
        res.json({ success: true, data: shelves });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createBookShelf = async (req, res) => {
    try {
        const newShelf = await BookShelf.create(req.body);
        res.status(201).json({ success: true, data: newShelf });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateBookShelf = async (req, res) => {
    try {
        const updatedShelf = await BookShelf.findByIdAndUpdate(req.params.shelfId, req.body, { new: true });
        res.json({ success: true, data: updatedShelf });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteBookShelf = async (req, res) => {
    try {
        await BookShelf.findByIdAndDelete(req.params.shelfId);
        res.json({ success: true, message: 'Bookshelf deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.addBookToShelf = async (req, res) => {
    try {
        const shelf = await BookShelf.findById(req.params.shelfId);
        if (!shelf.books.includes(req.params.bookId)) {
            shelf.books.push(req.params.bookId);
            await shelf.save();
            res.json({ success: true, data: shelf });
        } else {
            res.status(400).json({ success: false, message: 'Book already on shelf' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.removeBookFromShelf = async (req, res) => {
    try {
        const shelf = await BookShelf.findById(req.params.shelfId);
        shelf.books = shelf.books.filter(book => book.toString() !== req.params.bookId);
        await shelf.save();
        res.json({ success: true, data: shelf });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
