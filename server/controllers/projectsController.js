const projectsModel = require('../models/projectsModel');


// Fetch all projects

exports.getAllProjects = async ( req, res ) => {
    try {
        
        const projects = await projectsModel.find();
        res.status(200).json(projects);

    } catch (err) {
        console.error("Error fetching projexts:", err);
        res.status(500).json({ error: "Internal server error. Failed to fetch projetcs", details: err.message });
    }
}


// Update a specific project by id

exports.updateProjectById = async ( req, res ) => {
    try {
        
        const project = await projectsModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log("Updated project:", project);

        if ( !project ) return res.status(404).json({ error: "Project not found" });

        res.status(200).json(project);

    } catch (err) {
        console.error("Error updating project:", err);
        res.status(500).json({ error: "Internal server error. Could not update the project.", details: err.message });
    }
}


// Delete a specific project by id

exports.deleteProjectById = async ( req, res ) => {
    try {
        
        const project = await projectsModel.findByIdAndDelete(req.params.id);

        if ( !project ) return res.status(404).json({ error: "Project not found" });

        res.status(200).json({ messgae: "Project deleted successfully" });

    } catch (err) {
        console.erro("Error deleting project:", err);
        res.status(500).json({ error: "Internal server error. Error Deleting the project", details: err.message });
    }
}


// get a specific project by id

exports.getProjectById = async ( req, res ) => {
    try {
        
        const project = await projectsModel.findById(req.params.id);

        if ( !project ) return res.status(404).json({ error: "Project not found" });

        res.status(200).json(project);

    } catch (err) {
        console.error("Error fetching the project:", err);
        res.status(500).json({ error: "Internal server error. Cannot Fetch this project.", details: err.message });
    }
}




