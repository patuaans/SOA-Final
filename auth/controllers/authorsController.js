const Author = require('../models/author');
const { validationResult } = require('express-validator');

module.exports.getAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json({ message: 'All authors', data: authors });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getAuthor = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation error', errors: errors.array() });
    }

    try {
        const author = await Author.findById(req.params.id);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.status(200).json({ message: 'Author found', data: author });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.createAuthor = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation error', errors: errors.array() });
    }

    try {
        const author = await Author.create(req.body);
        res.status(201).json({ message: 'Author created', data: author });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.updateAuthor = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation error', errors: errors.array() });
    }

    try {
        const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.status(200).json({ message: 'Author updated', data: author });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.deleteAuthor = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation error', errors: errors.array() });
    }

    try {
        const author = await Author.findByIdAndDelete(req.params.id);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.status(200).json({ message: 'Author deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}