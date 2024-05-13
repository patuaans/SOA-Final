const VerificationApplication = require('../models/verificationApplication');
const { validationResult } = require('express-validator');
const Author = require('../models/author');

module.exports.createApplication = async (req, res) => {
    const { authorId, description, linkToPublications, imageProofUrl } = req.body;

    try {
        const application = await VerificationApplication.create({
            authorId,
            description,
            linkToPublications,
            imageProofUrl
        });
        res.status(201).json({ message: 'Application submitted', data: application });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getApplication = async (req, res) => {
    try {
        const application = await VerificationApplication.findById(req.params.id).populate('authorId');
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json({ message: 'Application retrieved', data: application });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getApplicationsByStatus = async (req, res) => {
    try {
        const applications = await VerificationApplication.find({ status: req.params.status }).populate('authorId');
        res.status(200).json({ message: 'Applications retrieved', data: applications });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.updateApplication = async (req, res) => {
    const { status } = req.body;

    try {
        const application = await VerificationApplication.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        if (status === 'approved') {
            await Author.findByIdAndUpdate(application.authorId, { verified: true });
        }
        res.status(200).json({ message: 'Application updated', data: application });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};