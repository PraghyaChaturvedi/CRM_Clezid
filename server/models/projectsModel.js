const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    leadID: String,
    clientName: String,
    companyName: String,
    contactNo: String,
    email: String,
    serviceRequirements: String,
    budgetEstimate: Number,
    source: String,
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    assignedTo: String,
    salesRep: String,
    paymentStatus: { type: String, enum: ['Pending', 'Received'], default: 'Pending' },
    paymentStages: [
        {
            stageName: String,
            expectedDueDate: Date,
            paymentAmount: Number,
            paymentStatus: { type: String, enum: ['Pending', 'Received'], default: 'Pending' },
            fileName: { type: String, trim: true }, // Invoice name
            fileUrl: { type: String, trim: true },  // Invoice URL
            uploadedAt: { type: Date, default: Date.now },
    
            // New Receipt Fields
            receiptName: { type: String, trim: true },
            receiptUrl: { type: String, trim: true },
            receiptUploadedAt: { type: Date }
        }
    ],
    projectType: { type: String, default: "Not specified" },
    assignedTeamMembers: { type: [String], default: [] },
    estimatedCost: { type: Number, default: 0 },
    deadline: { type: Date, default: null },
    paymentStatus: { type: String, enum: ['Pending', 'Partially Received', 'Completed'], default: 'Pending' },
    projectStartDate: { type: Date, default: Date.now },
    projectEndDate: { type: Date, default: null },
    status: { type: String, enum: ['New', 'Ongoing', 'Completed'], default: 'New' },
    invoiceGenerated: { type: Boolean, default: false },
    projectDocuments: { type: [Object], default: [] },
    createdAt: { type: Date, default: Date.now }
}, { strict: true });

const ProjectModel = mongoose.model('Projects', ProjectSchema);
module.exports = ProjectModel;



