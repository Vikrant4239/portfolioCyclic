const JWT = require('jsonwebtoken')
const User = require('../models/userModel')
exports.requiredTokenCheck = async (req,res,next)=>{
    try {

        const decode = JWT.verify(req.headers.authorization,process.env.JWT_SECRET)
        req.user = decode
        next();
       
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:'Not Protected JWT'
        })
    }
}
exports.isAdmin = async(req,res,next)=>{
    try {

        const user  = await User.findById(req.user._id)
        if(user.role!==1){
            return res.status(401).send({
                success:false,
                message:'unauthorized Access'
            })
        }
        else{
            next();
        }
        
    } catch (error) {
      console.log(error)  
    }
}