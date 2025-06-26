const express = require('express');
const router = express.Router();
const quotationsController = require('../controllers/quotationsController');
const uploadQuotation = require('../middlewares/quotationStorage');


// Routes

router.post('/:id', uploadQuotation.single('file'), quotationsController.handleQuotationUpload);
router.get('/:id', quotationsController.getQuotationsByLeadId);
router.get('/', quotationsController.getAllQuotations);

module.exports = router;

