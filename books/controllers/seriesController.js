const { validationResult } = require('express-validator');
const { Series } = require('../models/book');

const seriesController = {
    // Controller function to get all series
    getAllSeries: async (req, res) => {
        try {
            const allSeries = await Series.find();
            res.json(allSeries);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Controller function to get a series by ID
    getSeriesById: async (req, res) => {
        const id = req.params.id;
        try {
            const series = await Series.findById(id);
            if (series) {
                res.json(series);
            } else {
                res.status(404).json({ message: "Series not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Controller function to create a new series
    createSeries: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description } = req.body;
        const newSeries = new Series({
            title,
            description
        });
        try {
            const savedSeries = await newSeries.save();
            res.status(201).json(savedSeries);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Controller function to update a series by ID
    updateSeries: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = req.params.id;
        const { title, description } = req.body;
        try {
            const updatedSeries = await Series.findByIdAndUpdate(
                id,
                { title, description },
                { new: true }
            );
            if (updatedSeries) {
                res.json(updatedSeries);
            } else {
                res.status(404).json({ message: "Series not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Controller function to delete a series by ID
    deleteSeries: async (req, res) => {
        const id = req.params.id;
        try {
            const deletedSeries = await Series.findByIdAndDelete(id);
            if (deletedSeries) {
                res.json({ message: "Series deleted successfully" });
            } else {
                res.status(404).json({ message: "Series not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = seriesController;
