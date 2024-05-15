const { validationResult } = require('express-validator');
const { Edition } = require('../models/book');

const editionController = {
    // Controller function to get all editions
    getAllEditions: async (req, res) => {
        try {
            const allEditions = await Edition.find();
            res.json(allEditions);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Controller function to get an edition by ID
    getEditionById: async (req, res) => {
        const id = req.params.id;
        try {
            const edition = await Edition.findById(id);
            if (edition) {
                res.json(edition);
            } else {
                res.status(404).json({ message: "Edition not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Controller function to create a new edition
    createEdition: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { book, title, format, pageCount, publisher, publicationDate, coverImage, language, purchaseUrl } = req.body;
        const newEdition = new Edition({
            book,
            title,
            format,
            pageCount,
            publisher,
            publicationDate,
            coverImage,
            language,
            purchaseUrl
        });
        try {
            const savedEdition = await newEdition.save();
            res.status(201).json(savedEdition);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Controller function to update an edition by ID
    updateEdition: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = req.params.id;
        const { title, format, pageCount, publisher, publicationDate, coverImage, language, purchaseUrl } = req.body;
        try {
            const updatedEdition = await Edition.findByIdAndUpdate(
                id,
                { title, format, pageCount, publisher, publicationDate, coverImage, language, purchaseUrl },
                { new: true }
            );
            if (updatedEdition) {
                res.json(updatedEdition);
            } else {
                res.status(404).json({ message: "Edition not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Controller function to delete an edition by ID
    deleteEdition: async (req, res) => {
        const id = req.params.id;
        try {
            const deletedEdition = await Edition.findByIdAndDelete(id);
            if (deletedEdition) {
                res.json({ message: "Edition deleted successfully" });
            } else {
                res.status(404).json({ message: "Edition not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = editionController;
