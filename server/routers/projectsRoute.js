const express = require('express');
const router = express.Router();

const projectsController = require('../controllers/projectsController');


// Routes
router.get('/', projectsController.getAllProjects);
router.put('/:id', projectsController.updateProjectById);
router.delete('/:id', projectsController.deleteProjectById);
router.get('/:id', projectsController.getProjectById);


module.exports = router;





