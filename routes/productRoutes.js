const express = require('express');
const router = express.Router();
const requiredTokenCheck = require('../middlewares/authMiddleware');
const formidable = require('express-formidable');
const productController = require('../controllers/productController');

router.post('/create-product', requiredTokenCheck.requiredTokenCheck, requiredTokenCheck.isAdmin, formidable(), productController.createProductController);
router.get('/get-product', productController.getProductController)
router.get('/single-product/:slug',productController.singleProductController)
router.get('/product-photo/:pid',productController.photoController)
router.delete('/product/:pid',productController.deleteProductController)
router.put('/update-product/:pid', requiredTokenCheck.requiredTokenCheck, requiredTokenCheck.isAdmin, formidable(), productController.updateProductController);

module.exports = router;
