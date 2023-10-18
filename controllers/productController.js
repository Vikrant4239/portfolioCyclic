const { default: slugify } = require('slugify')
const productModel=require('../models/productModel')
const fs = require('fs')
const { pid } = require('process')

exports.createProductController = async(req,res)=>{
    try {

        const {name,slug,description,price,category,quantity,shipping} = req.fields
        const {photo} = req.files
        if(!name){
            return res.status(400).send({
                message:'name is required'
            })
        }
       
        if(!description){
            return res.status(400).send({
                message:'description is required'
            })
        }
        if(!price){
            return res.status(400).send({
                message:'price is required'
            })
        }
        if(!category){
            return res.status(400).send({
                message:'category is required'
            })
        }
        if(!quantity){
            return res.status(400).send({
                message:'quantity is required'
            })
        }
     
        if(photo && photo.size>1000000){
            return res.status(400).send({
                message:'photo is required & should be less than 1mb'
            })
        }
        const product = new productModel({...req.fields,slug:slugify(name)})
        if(photo){
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }
        await product.save()
        res.status(201).send({
            success:true,
            message:'Successfully created products',
            product
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in creating product'
        })
    }
}
exports.getProductController = async(req,res)=>{
    try {

        const product  = await productModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1})        
        res.status(201).send({
            success:true,
            message:'getting products successfully',
            product

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in getting products'
        })
    }
}
exports.singleProductController=async(req,res)=>{
    try {
        const product = await productModel.findOne({slug:req.params.slug}).select("-photo").populate('category')
        res.status(201).send({
            success:true,
            message:'single product fetched',
            product
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:true
        })
    }
}
exports.photoController = async(req,res)=>{
  try {
    const product = await productModel.findById(req.params.pid).select("photo")
    if(product.photo.data){
        res.set("Content-type",product.photo.contentType)
        res.status(201).send(product.photo.data)
    }
    
  } catch (error) {
     console.log(error)
     res.status(500).send({
        success:false,
        message:'Fetching photo error'
     })
  }
}
exports.deleteProductController = async(req,res)=>{
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(201).send({
            success:true,
            message:'product photo deleted successfully '
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while deleting product photo'
        })
    }
}
exports.updateProductController = async(req,res)=>{
    try {

        const {name,slug,description,price,category,quantity,shipping} = req.fields
        const {photo} = req.files
        if(!name){
            return res.status(400).send({
                message:'name is required'
            })
        }
       
        if(!description){
            return res.status(400).send({
                message:'description is required'
            })
        }
        if(!price){
            return res.status(400).send({
                message:'price is required'
            })
        }
        if(!category){
            return res.status(400).send({
                message:'category is required'
            })
        }
        if(!quantity){
            return res.status(400).send({
                message:'quantity is required'
            })
        }
     
        if(photo && photo.size>1000000){
            return res.status(400).send({
                message:'photo is required & should be less than 1mb'
            })
        }
        const product = await productModel.findByIdAndUpdate(req.params.pid,{...req.fields,slug:slugify(name)},{new:true})
        if(photo){
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }
        await product.save()
        res.status(201).send({
            success:true,
            message:'Successfully updated products',
            product
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in updating product'
        })
    }
}