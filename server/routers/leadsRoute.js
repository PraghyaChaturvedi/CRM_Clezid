const express = require('express');
const router = express.Router();

const leadsController = require('../controllers/leadsController');


// Routes
router.post('/', leadsController.createLead);
router.get('/', leadsController.fetchAllLeads);
router.get('/:id', leadsController.fetchLeadById);
router.put('/:id', leadsController.updateLeadById);
router.delete('/:id', leadsController.deleteLeadById);


module.exports = router;




