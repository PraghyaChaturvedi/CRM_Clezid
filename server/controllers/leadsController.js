const LeadsModel = require("../models/leadsModel");
const ProjectsModel = require("../models/projectsModel");


// Create a new lead

exports.createLead = async ( req, res ) => {
    try {
        
        //  Save the client data into the Leads collection first
        //  No matter what status is given, we will first store this data in the leads collection
        const leadData = await LeadsModel.create(req.body);     // Creates and saves a new lead document in the leads collection


        //  Check if the status coming from the form is "Converted"
        //  If it is "Converted", that means the lead became a project, so we also save it in the project collection

        if ( req.body.status === "Converted" ) {

            const convertedLead = {
                clientName: req.body.clientName || "",
                companyName: req.body.companyName || "",
                contactNo: req.body.contactNo || "",
                email: req.body.email || "",
                source: req.body.source || "",
                priority: req.body.priority || "Medium",
                assignedTo: req.body.assignedTo || "",
                salesRep: req.body.salesRep || "",
                serviceRequirements: req.body.serviceRequirements || "",
                budgetEstimate: req.body.budgetEstimate || 0,
                estimatedCost: req.body.estimatedCost || 0,
                deadline: req.body.deadline || null,
                paymentStages: req.body.paymentStages || [],
                paymentStatus: req.body.paymentStatus || "Pending",
                projectStartDate: new Date(),
                projectEndDate: null,
                status: "New",
                invoiceGenerated: false,
                projectDocuments: req.body.projectDocuments || [],
                createdAt: new Date(),
                projectType: req.body.projectType || "Not specified",
                assignedTeamMembers: req.body.assignedTeamMembers || [],
                leadID: leadData.leadID
            };

            await ProjectsModel.create(convertedLead);
        }

        res.status(201).json({
            message: "Lead created successfully"
        });

    } catch (err) {
        console.error("Error creating lead:", err);
        res.status(500).json({ error: "Internal Server Error. Failed to add lead", details: err.message });
    }
}


// Fetch all leads

exports.fetchAllLeads = async ( req, res ) => {
    try {
        
        // Fetch all the leads from the leads collection
        const leads = await LeadsModel.find({});
        res.status(200).json(leads);
        
    } catch (err) {
        console.error("Error fetching leads:", err);
        res.status(500).json({ error: "Internal Server Error. Failed to fetch leads", details: err.message });
    }
}


// Fetch a specific lead by id

exports.fetchLeadById = async ( req, res ) => {
    try {
        
        const lead = await LeadsModel.findById(req.params.id);      // This ID here is refering to MongoDB ID

        if ( !lead ) {
            return res.status(404).json({ error: "Error fetching lead. Lead not found" });
        }

        res.json(lead);

    } catch (err) {
        console.error("Error fetching lead", err);
        res.status(500).json({ error: "Internal Server Error. Failed to fetch the lead", details: err.message });
    }
}


// Update a specific lead by id

exports.updateLeadById = async ( req, res ) => {
    try {
        
        const lead = await LeadsModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // The { new: true } option means it will return the updated document after update

        // if lead is not found, send a 404 error
        if ( !lead ) return res.status(404).json({ error: "Lead not found" });

        // if the new updated status is converted, then it becomes a project
        // so sending the lead data to the projects collection
        if ( lead.status === "Converted" ) {

            const convertedLead = {
                clientName: lead.clientName || "",
                companyName: lead.companyName || "",
                contactNo: lead.contactNo || "",
                email: lead.email || "",
                source: lead.source || "",
                priority: lead.priority || "Medium",
                assignedTo: lead.assignedTo || "",
                salesRep: lead.salesRep || "",
                serviceRequirements: lead.serviceRequirements || "",
                budgetEstimate: lead.budgetEstimate || 0,
                estimatedCost: lead.estimatedCost || 0,
                deadline: lead.deadline || null,
                paymentStages: lead.paymentStages || [],
                paymentStatus: lead.paymentStatus || "Pending",
                projectStartDate: new Date(),
                projectEndDate: null,
                status: "New",
                invoiceGenerated: false,
                projectDocuments: lead.projectDocuments || [],
                createdAt: new Date(),
                projectType: lead.projectType || "Not specified",
                assignedTeamMembers: lead.assignedTeamMembers || [],
                leadID: lead.leadID
            };

            await ProjectsModel.create(convertedLead);
        }

        res.json({ message: "Lead Updated Successfully" });

    } catch (err) {
        console.error("Error updating lead", err);
        res.status(500).json({ error: "Internal Server Error. Error updating the lead", details: err.message });
    }
}


// Delete a lead by id

exports.deleteLeadById = async ( req, res ) => {
    try {
        
        const lead = await LeadsModel.findByIdAndDelete( req.params.id );

        if ( !lead ) return res.status(404).json({ error: "Lead not found" });

        res.json({ message: "Lead deleted successfully" });
        
    } catch (err) {
        console.error("Error deleting lead", err);
        res.status(500).json({ error: "Internal Server Error. Lead not deleted", details: err.message });
    }
}





