const Report = require('../models/report');

exports.getAllReports = async (req, res) => {
    try {
        const reports = await Report.find();
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getReportById = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        res.json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createReport = async (req, res) => {
    try {
        const newReport = new Report({
            ...req.body,
            book_id: req.body.bookId, 
            user_id: 'userIdFromExternalService', 
        });

        const savedReport = await newReport.save();
        res.status(201).json(savedReport); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateReport = async (req, res) => {
    try {
        const updatedReport = await Report.findByIdAndUpdate(
            req.params.id, // Find the report by its ID
            req.body, // Use the request body for updates
            { new: true } // Return the updated document
        );

        if (!updatedReport) {
            return res.status(404).json({ message: 'Report not found' });
        }

        res.json(updatedReport);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteReport = async (req, res) => {
    try {
        const deletedReport = await Report.findByIdAndDelete(req.params.id);

        if (!deletedReport) {
            return res.status(404).json({ message: 'Report not found' });
        }

        res.json(deletedReport);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}