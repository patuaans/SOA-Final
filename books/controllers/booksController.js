const Book = require('../models/book')

module.exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find()
        res.status(200).json({ message: 'All books ', data: books})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        res.status(200).json({ message: 'Book found', data: book})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.createBook = async (req, res) => {
    try {
        const book = await Book.create(req.body)
        res.status(201).json({ message: 'Book created', data: book})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({ message: 'Book updated', data: book})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'Book deleted', data: book})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}