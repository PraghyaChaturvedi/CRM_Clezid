const ProjectModel = require('../models/projectsModel');


// uploading invoice on a every payment stage

exports.handleInvoiceUpload = async (req, res) => {
    try {
        const { id } = req.params;
    
        // updating the payment stage if it is creating at this particular time and at this very time, uploading the invoice simultaneously

        if ( !req.file ) return res.status(400).json({ error: "No file uploaded" });
    
        const fileName = req.file.filename;
        const { stageId, stageName, paymentAmount } = req.body;
        const filePath = req.file.path;
    
        if ( stageId ) {
            
            await ProjectModel.updateOne (
                { _id: id, 'paymentStages._id': stageId },
                {
                    $set: {
                        'paymentStages.$.fileName': fileName,
                        'paymentStages.$.fileUrl': filePath,
                        'paymentStages.$.uploadedAt': new Date()
                    }
                }
            );
    
            return res.status(200).json({ message: "Invoice uploaded and linked to existing stage" });
        }
    
        
        // updating and uploading the existing payment stage by uploading the invoice file

        const invoiceData = {
            fileName: fileName,
            fileUrl: filePath,
            uploadedAt: new Date(),
            stageName,
            paymentAmount: Number(paymentAmount)
        };
    
        const updatedProject = await ProjectModel.findByIdAndUpdate (
            id,
            { $push: { paymentStages: invoiceData } },
            { new: true }
        );
    
        if ( !updatedProject ) return res.status(404).json({ error: "Project not found" });
    
        res.status(200).json({
            message: "New stage created and invoice uploaded!",
            invoice: invoiceData,
            project: updatedProject,
        });
    
    } catch (err) {
        console.error("Error uploading invoice:", err);
        res.status(500).json({ error: "Server error while uploading invoice" });
    }
}


// get invoive of a specific project

exports.getInvoicesByProjectId = async (req, res) => {
    try {

        const project = await ProjectModel.findById(req.params.id);

        if ( !project ) return res.status(404).json({ message: "Project not found" });

        const invoices = project.paymentStages
            .filter(stage => stage.fileUrl)  // Only get stages with files
            .map(stage => ({
                fileName: stage.fileName,
                fileUrl: stage.fileUrl,
                uploadedAt: stage.uploadedAt
            }));

        res.json(invoices);

    } catch (err) {
        console.error("Error fetching invoices:", err);
        res.status(500).json({ message: "Server error" });
    }
}

