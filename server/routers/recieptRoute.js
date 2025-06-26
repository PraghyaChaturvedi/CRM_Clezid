const express = require('express');
const router = express.Router();
const receiptController = require('../controllers/recieptController.js');
const receiptQuotation = require('../middlewares/recieptStorage.js');


// Routes

router.post('/:id', receiptQuotation.single('receipt'), receiptController.handleReceiptUpload);
router.get('/:id', receiptController.getReceiptsByProjectId);


module.exports = router;

