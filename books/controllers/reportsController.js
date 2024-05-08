const Report = require('../models/report');
const { validationResult } = require('express-validator');

module.exports.getAllReports = async (req, res) => {
    try {
        const reports = await Report.find()
        res.status(200).json({ message: 'All reports', data: reports });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getReportById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation error', errors: errors.array() });
    }

    try {
        const report = await Report.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json({ message: 'Report found', data: report });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.createReport = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation error', errors: errors.array() });
    }

    try {
        const newReport = await Report.create(req.body);
        res.status(201).json({ message: 'Report created', data: newReport });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.updateReportStatus = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation error', errors: errors.array() });
    }

    try {
        const { status } = req.body;
        const updatedReport = await Report.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!updatedReport) {
            return res.status(404).json({ message: 'Report not found' });
        }

        res.status(200).json({ message: 'Report status updated', data: updatedReport });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.deleteReport = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation error', errors: errors.array() });
    }

    try {
        const deletedReport = await Report.findByIdAndDelete(req.params.id);

        if (!deletedReport) {
            return res.status(404).json({ message: 'Report not found' });
        }

        res.status(200).json({ message: 'Report deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
