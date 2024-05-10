const Book = require('../models/book')
const { validationResult } = require('express-validator')

module.exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find()
            .populate('authors', 'name')
            .populate('authors', 'author');
        res.status(200).json({ message: 'All books ', data: books})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.getNewestBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(10)
        res.status(200).json({ message: 'Newest books', data: books})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.getPopularBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ rating: -1 }).limit(10)
        res.status(200).json({ message: 'Popular books', data: books})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.getBooksByGenre = async (req, res) => {
    try {
        const books = await Book.find({ genre: req.params.genre })
        if (!books) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        res.status(200).json({ message: 'Books by genre', data: books})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.findSimilarBooks = async (req, res) => {
    const { search } = req.query;

    if (!search) {
        return res.status(400).json({ message: 'Please provide a search term.' });
    }

    const searchRegex = new RegExp(search, 'i'); 

    try {
        const books = await Book.find({
            $or: [
                { title: searchRegex },
                { 'authors.name': searchRegex }
            ]
        })
        .populate('authors', 'name')
        .populate('authors', 'author');

        res.status(200).json({ message: 'Similar books found', data: books });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports.getBookById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation error', errors: errors.array() });
    }

    try {
        const book = await Book.findById(req.params.id)
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book found', data: book})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.createBook = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation error', errors: errors.array() })
    }

    const { author, genre } = req.body;

    // Verify if author exists
    const authorExists = await Author.exists({ _id: author });
    if (!authorExists) {
        return res.status(400).json({ message: 'Author does not exist' });
    }

    // Verify if genre is correct
    const validGenres = ['fiction', 'non-fiction', 'fantasy', 'mystery', 'romance'];
    if (!validGenres.includes(genre)) {
        return res.status(400).json({ message: 'Invalid genre' });
    }

    try {
        const book = await Book.create(req.body)
        res.status(201).json({ message: 'Book created', data: book})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.updateBook = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation error', errors: errors.array() });
    }
    
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book updated', data: book})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.deleteBook = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation error', errors: errors.array() });
    }
    
    try {
        const book = await Book.findByIdAndDelete(req.params.id)
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}