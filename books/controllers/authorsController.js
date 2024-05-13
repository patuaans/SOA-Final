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

module.exports.getVerifiedAuthors = async (req, res) => {
    const { verified } = req.query; 

    try {
        // Convert query parameter to boolean
        const isVerified = verified === 'true';
        const authors = await Author.find({ verified: isVerified });

        if (authors.length === 0) {
            return res.status(404).json({ message: 'No authors found matching the verification status' });
        }
        res.status(200).json({ message: `Authors fetched successfully`, data: authors });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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

    const { id } = req.params;
    try {
        // First, find the author to check if the user is allowed to update it
        const author = await Author.findById(id);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }

        // Check if the author's userId matches the logged-in user's id
        if (author.userId) {
            if (author.userId !== req.user.id) {
                return res.status(403).json({ message: 'Unauthorized to update this author' });
            }
        } 

        // Perform the update since the user is authorized or there is no userId restriction
        const updatedAuthor = await Author.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: 'Author updated successfully', data: updatedAuthor });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


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