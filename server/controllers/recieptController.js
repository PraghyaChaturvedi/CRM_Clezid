const ProjectModel = require('../models/projectsModel');
const mongoose = require('mongoose');

// uploading receipt on every payment stage
exports.handleReceiptUpload = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid project ID format" });
        }

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const { stageId, stageName, paymentAmount } = req.body;
        const fileName = req.file.filename;
        const filePath = req.file.path;

        // Case 1: Update existing payment stage with receipt
        if (stageId) {
            await ProjectModel.updateOne(
                { _id: id, 'paymentStages._id': stageId },
                {
                    $set: {
                        'paymentStages.$.receiptName':  fileName,
                        'paymentStages.$.receiptUrl': filePath,
                        'paymentStages.$.receiptUploadedAt': new Date()
                    }
                }
            );

            return res.status(200).json({
                message: "Receipt uploaded and linked to existing stage"
            });
        }

        // Case 2: Add new payment stage with receipt (fallback)
        const receiptData = {
            stageName,
            paymentAmount: Number(paymentAmount),
            receiptName:  fileName,
            receiptUrl: filePath,
            receiptUploadedAt: new Date()
        };

        const updatedProject = await ProjectModel.findByIdAndUpdate(
            id,
            { $push: { paymentStages: receiptData } },
            { new: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ error: "Project not found" });
        }

        res.status(200).json({
            message: "New stage created and receipt uploaded!",
            receipt: receiptData,
            project: updatedProject,
        });

    } catch (err) {
        console.error("Error uploading receipt:", err);
        res.status(500).json({ error: "Server error while uploading receipt" });
    }
};

// get all receipts of a specific project
exports.getReceiptsByProjectId = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid project ID format" });
        }

        const project = await ProjectModel.findById(id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const receipts = project.paymentStages
            .filter(stage => stage.receiptUrl)
            .map(stage => ({
                receiptName: stage.receiptName,
                receiptUrl: stage.receiptUrl,
                receiptUploadedAt: stage.receiptUploadedAt
            }));

        res.json(receipts);

    } catch (err) {
        console.error("Error fetching receipts:", err);
        res.status(500).json({ message: "Server error while fetching receipts" });
    }
};
