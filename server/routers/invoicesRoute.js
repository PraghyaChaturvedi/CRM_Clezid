const express = require('express');
const router = express.Router();
const invoicesController = require('../controllers/invoicesController');
const uploadInvoice = require('../middlewares/invoiceStorage');


// Routes
router.post('/:id', uploadInvoice.single('invoice'), invoicesController.handleInvoiceUpload);
router.get('/:id', invoicesController.getInvoicesByProjectId);

module.exports = router;



