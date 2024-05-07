const Book = require('../models/book')
const { validationResult } = require('express-validator')

module.exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find()
        res.status(200).json({ message: 'All books ', data: books})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

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