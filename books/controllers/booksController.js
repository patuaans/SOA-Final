const Book = require('../models/book')
const Author = require('../models/author')
const Genre = require('../models/genre')

const { validationResult } = require('express-validator')

module.exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({
            approvalStatus: 'approved',
            reportCount: { $lt: 5 }  
        });

        if (books.length === 0) {
            return res.status(404).json({ message: 'No approved books with less than 5 reports found' });
        }

        res.status(200).json({ message: 'All approved books with less than 5 reports', data: books });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getApprovedBooks = async (req, res) => {
    try {
      const books = await Book.find({ approvalStatus: 'approved' });
      res.status(200).json({ message: 'Approved books', data: books });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

module.exports.getPendingBooks = async (req, res) => {
    try {
        const books = await Book.find({ approvalStatus: 'pending' });
        res.status(200).json({ message: 'Pending books', data: books });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getRejectedBooks = async (req, res) => {
    try {
        const books = await Book.find({ approvalStatus: 'rejected' });
        res.status(200).json({ message: 'Rejected books', data: books });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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
        const genreNames = req.query.genres ? req.query.genres.split(',') : [];

        if (!genreNames.length) {
            return res.status(400).json({ message: 'Genre parameter is required' });
        }

        const genres = await Genre.find({ name: { $in: genreNames } });

        if (!genres.length) {
            return res.status(404).json({ message: 'Genres not found' });
        }

        const genreIds = genres.map(genre => genre._id);

        let query = Book.find({ genres: { $in: genreIds } });

        const sortOption = req.query.sort;
        if (sortOption === 'popular') {
            query = query.sort({ rating: -1 });
        } else if (sortOption === 'newest') {
            query = query.sort({ createdAt: -1 });
        }

        const books = await query;

        if (!books.length) {
            return res.status(404).json({ message: 'No books found for these genres' });
        }

        res.status(200).json({ message: 'Books fetched successfully', data: books });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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

    const { authors, genres } = req.body;

    // Verify if each author exists
    if (authors && authors.length > 0) {
        const authorsExist = await Promise.all(authors.map(authorId => Author.exists({ _id: authorId })));
        if (authorsExist.includes(false)) {
            return res.status(400).json({ message: 'One or more authors do not exist' });
        }
    }

    // Verify if each genre exists (assuming you have a Genre model)
    const genresExist = await Promise.all(genres.map(genreId => Genre.exists({ _id: genreId })));
    if (genresExist.includes(false)) {
        return res.status(400).json({ message: 'One or more genres are invalid' });
    }

    try {
        const book = await Book.create(req.body);
        res.status(201).json({ message: 'Book created', data: book });
    } catch (error) {
        res.status(500).json({ message: error.message });
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

module.exports.updateBookApprovalStatus = async (req, res) => {
    const { approvalStatus } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(approvalStatus)) {
        return res.status(400).json({ message: 'Invalid approval status' });
    }

    try {
        const book = await Book.findByIdAndUpdate(req.params.id, { approvalStatus }, { new: true });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book approval status updated', data: book });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
