const { validationResult } = require('express-validator');
const UserSubmission = require('../models/userSubmission');

const userSubmissionController = {
    // Controller function to get all user submissions
    getAllUserSubmissions: async (req, res) => {
        try {
            const userSubmissions = await UserSubmission.find();
            res.json(userSubmissions);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Controller function to create a new user submission
    createUserSubmission: async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, authors, publisher, publishedYear, description, genres } = req.body;
        const newUserSubmission = new UserSubmission({
            title,
            authors,
            publisher,
            publishedYear,
            description,
            genres
        });
        try {
            const savedUserSubmission = await newUserSubmission.save();
            res.status(201).json(savedUserSubmission);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Controller function to get a user submission by ID
    getUserSubmissionById: async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = req.params.id;
        try {
            const userSubmission = await UserSubmission.findById(id);
            if (userSubmission) {
                res.json(userSubmission);
            } else {
                res.status(404).json({ message: "User submission not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Controller function to update a user submission by ID
    updateUserSubmission: async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = req.params.id;
        const { status } = req.body;
        try {
            const updatedUserSubmission = await UserSubmission.findByIdAndUpdate(
                id,
                { status },
                { new: true }
            );
            if (updatedUserSubmission) {
                res.json(updatedUserSubmission);
            } else {
                res.status(404).json({ message: "User submission not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Controller function to delete a user submission by ID
    deleteUserSubmission: async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = req.params.id;
        try {
            const deletedUserSubmission = await UserSubmission.findByIdAndDelete(id);
            if (deletedUserSubmission) {
                res.json({ message: "User submission deleted successfully" });
            } else {
                res.status(404).json({ message: "User submission not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = userSubmissionController;
