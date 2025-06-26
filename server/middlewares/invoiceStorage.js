const multer = require('multer');
const path = require('path');

const invoiceStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'uploads', 'invoices'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
});


const uploadInvoice = multer({ storage: invoiceStorage });


module.exports = uploadInvoice;

