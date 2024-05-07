const Genre = require('../models/genre');
// const { validationResult } = require('express-validator');

module.exports.getAllGenres = async (req, res) => {
    try {
        const genres = await Genre.find();
        res.status(200).json({ message: 'All genres', data: genres });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getGenreById = async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        res.status(200).json({ message: 'Genre found', data: genre });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.createGenre = async (req, res) => {
    try {
        const genre = await Genre.create(req.body);
        res.status(201).json({ message: 'Genre created', data: genre });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.updateGenre = async (req, res) => {
    try {
        const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!genre) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        res.status(200).json({ message: 'Genre updated', data: genre });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.deleteGenre = async (req, res) => {
    try {
        const genre = await Genre.findByIdAndDelete(req.params.id);
        if (!genre) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        res.status(200).json({ message: 'Genre deleted', data: genre });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}