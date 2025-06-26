const mongoose = require('mongoose');

const LeadsSchema = new mongoose.Schema({
    leadID: { type: String, unique: true, trim: true }, // Custom unique ID for the lead
    clientName: { type: String, trim: true },
    companyName: { type: String, trim: true },
    contactNo: { type: String, trim: true },
    email: { type: String, trim: true },
    source: { type: String, trim: true },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    status: { 
        type: String, 
        enum: ['New', 'Interested', 'Not Interested', 'Converted', 'Rejected'], 
        default: 'New' 
    },
    assignedTo: { type: String, trim: true },
    salesRep: { type: String, trim: true },
    createdBy: { type: String, trim: true },
    mode: { type: String, trim: true },
    followUpDate: { type: Date },
    notes: { type: String, trim: true },
    dealSize: { type: Number },
    expectedClosureDate: { type: Date },
    createdAt: { type: Date, default: Date.now },
    pdfFiles: [
        {
            fileName: { type: String, trim: true },
            title: { type: String, trim: true },
            fileUrl: { type: String, trim: true },
            uploadedAt: { type: Date, default: Date.now }
        }
    ]
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields


const LeadsModel = mongoose.model('Leads', LeadsSchema);
module.exports = LeadsModel;


