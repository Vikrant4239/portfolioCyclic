

const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')
const requiredTokenCheck = require('../middlewares/authMiddleware')


router.post('/create-category',requiredTokenCheck.requiredTokenCheck,requiredTokenCheck.isAdmin,categoryController.createCategoryController)
router.put('/update-category/:id',requiredTokenCheck.requiredTokenCheck,requiredTokenCheck.isAdmin,categoryController.updateCategoryController)
router.get('/get-category',categoryController.getCategoryController)
router.get('/single-category/:slug',categoryController.singleCategoryController)
router.delete('/delete/:id',requiredTokenCheck.requiredTokenCheck,requiredTokenCheck.isAdmin,categoryController.deleteCategoryController)



module.exports = router