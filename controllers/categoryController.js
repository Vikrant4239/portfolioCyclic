const express = require('express')

const categoryModel = require('../models/categoryModel');
const slugify = require('slugify');
const { findOneAndUpdate, findByIdAndUpdate } = require('../models/userModel');
exports.createCategoryController=async(req,res)=>{
  try {

    const {name} = req.body
    if(!name){
       return  res.status(501).send({message:'name is required'})
    }
    const existingName =  await categoryModel.findOne({name})
    console.log(existingName)
    if(existingName){
       return  res.status(200).send({
            success:true,
            message:'category already exists'
        })
    }
    const category = await new categoryModel({name,slug:slugify(name)}).save()
    res.status(201).send({
        success:true,
        message:'category has been added',
        category
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error in category',
        
    })
  }
}
exports.updateCategoryController = async(req,res)=>{
    try {

        const {name} = req.body
        const {id}=req.params

        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:'category successfully updated',
            category
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:'error while updating'
        })
    }
}
exports.getCategoryController=async(req,res)=>{
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success:true,
            message:'categories displayed',
            category
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({

            success:false,
            message:'failed to fetch the categories'
        })
    }
}

exports.singleCategoryController = async(req,res)=>{
    try {

        const category = await categoryModel.findOne({slug:req.params.slug})
        console.log(category)
        res.status(201).send({
            success:true,
            message:'successfully fetched single category',
            category
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while getting single category'
        })
    }
}
exports.deleteCategoryController = async(req,res)=>{
    try {
        const {id} = req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(201).send({
            success:true,
            message:'successfully deleted'
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while deleting'
        })
    }
}