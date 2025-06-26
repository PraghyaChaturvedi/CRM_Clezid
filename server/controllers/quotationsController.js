const LeadsModel = require('../models/leadsModel');


// uploading a quotation pdf file on the leads landing page

exports.handleQuotationUpload = async ( req, res ) => {
    try {
        
        const { id } = req.params;
        
        if ( !req.file ) return res.status(404).json({ message: "No file uploaded" });
        
        const fileInfo = {
            fileName: req.file.filename,
            fileUrl: req.file.path,
            uploadedAt: new Date()
        };
        
        const lead = await LeadsModel.findByIdAndUpdate(
            id,
            { $push: { pdfFiles: fileInfo } },
            { new: true }
        );
        
        if ( !lead ) return res.status(404).json({ message: "Lead not found" });
        
        res.status(200).json({ message: "File uploaded successfully!", file: fileInfo, lead: lead });

    } catch (err) {
        console.error("Error uploading quotation:", err);
        res.status(500).json({ error: "Internal server error. Unable to upload quotation.", details: err.message });
    }
}


// fetch all quotations for a specific lead

exports.getQuotationsByLeadId = async ( req, res ) => {
    try {
        
        const { id } = req.params;

        const lead = await LeadsModel.findById(id);

        if ( !lead ) return res.status(404).json({ error: "Lead not found" });

        res.status(200).json(lead.pdfFiles);

    } catch (err) {
        console.error("Error fetching quotations:", err);
        res.status(500).json({ error: "Internal server error. Failed to fetch quotations.", details: err.message });
    }
}


// get all quotations for all leads

exports.getAllQuotations = async ( req, res ) => {
    try {
        
        const quotations = await LeadsModel.find({}, { pdfFiles: 1, _id: 0 });      // Fetch only pdfFiles field from all leads

        // Flatten the array since pdfFiles is nested in multiple leads
        const extractedQuotations = quotations.flatMap(lead => lead.pdfFiles);

        res.status(200).json(extractedQuotations);

    } catch (err) {
        console.error("Error fetching all quotations:", err);
        res.status(500).json({ error: "Internal server error. Failed to fetch all quotations.", details: err.message });
    }
}







