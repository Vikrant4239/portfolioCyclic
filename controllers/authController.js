const { hashPassword, comparePassword } = require('../helpers/authHelper');
const User = require('../models/userModel')


const JWT = require('jsonwebtoken')
exports.registerController = async(req, res) => {
    try {
        const {name,email,password,phone,address,question} = req.body
        if(!name){
            return res.send({
                message:'Name is required'
            })
        }
        if(!email){
            return res.send({
                message:'Email is required'
            })
        }
        if(!phone){
            return res.send({
                message:'phNumber is required'
            })
        }
        if(!password){
            return res.send({
                message:'password is required'
            })
        }
        if(!address){
            return res.send({
                message:'address is required'
            })
        }
        if(!question){
            return res.send({
                message:'Answer to the question is required'
            })
        }

        const existingUser =await User.findOne({email})
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:'Existing user'
            })
        }
        const hashedPassword = await hashPassword(password)
        const user = await new User({name,email,phone,address,password:hashedPassword,question}).save()
        res.status(201).send({
            success:true,
            message:'User registered successfully',
            user
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:'ERROR in registeration',
            error:error.message
        })
    }
  };
  exports.loginController =async(req,res)=>{
    try {
        const {email,password} =req.body
        if(!email||!password){
            return res.send({
                message:'Email or Password not found'
            })
        }

        const user = await User.findOne({email})
        if(!user){

            return res.status(404).send({
                success:false,
                message:'email is not registered'
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            res.status(200).send({
                success:false,
                message:'Invalid password'
            })
        }
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})
        console.log(token)
        res.status(200).send({
            success:true,
            message:'login Succesfully',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                question:user.question,
                role:user.role
 
            },token
        })
        
    } catch (error) {
        console.log('error in login')
        res.status(500).send({
            success:false,
            message:'Error in Login'
        })
    }
  }
  exports.forgotPassword = async(req,res)=>{
    try {
        const {email,question,newPassword} = req.body
        if(!email){
            res.status(500).send({
                success:false,
                message:'Mail is required'
            })
        }
        if(!question){
            res.status(500).send({
                success:false,
                message:'Question is required'
            })
        }
        if(!newPassword){
            res.status(500).send({
                success:false,
                message:'New password is required'
            })
        }
        const user  = await User.findOne({email,question})
        if(!user){
            res.status(500).send({
                success:false,
                message:'Wrong email Id'
            })
        }
        const hashed = await hashPassword(newPassword)
        await User.findByIdAndUpdate(user._id,{password : hashed})
        res.status(200).send({
            success:true,
            message:'password changed Successfully'
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'forgot password error'
        })
    }

  }

  
