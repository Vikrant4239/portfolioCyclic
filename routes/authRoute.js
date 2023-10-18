const express = require('express');
const router = express.Router();
const registeredController = require('../controllers/authController'); 

const loginController = require('../controllers/authController');
const  requiredTokenCheck  = require('../middlewares/authMiddleware');
const forgotPassword = require('../controllers/authController')


router.post('/register', registeredController.registerController)
router.post('/login',loginController.loginController)
router.post('/forgot-password',forgotPassword.forgotPassword)
router.get('/user-auth',requiredTokenCheck.requiredTokenCheck,(req,res)=>{
    res.status(200).send({
        ok:true
    })
})
router.get('/admin-auth',requiredTokenCheck.requiredTokenCheck,requiredTokenCheck.isAdmin,(req,res)=>{
    res.status(200).send({
        ok:true
    })
})


module.exports = router;