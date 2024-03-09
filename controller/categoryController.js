import slugify from "slugify"
import categoryModel from "../models/categoryModel.js"

export const createCategoryController=async(req,res)=>{
    try {
        const {name}=req.body
        if(!name){
            return res.status(401).send({message:"Name is required"})
        }
         const existingCategory=await categoryModel.findOne({name})
         if(existingCategory){
            return res.status(200).send({
                success:true,
                message:"Category Already Exixts"
            })
         }
         const category=await new categoryModel({name,slug:slugify(name)}).save()
         res.status(201).send({
            success:true,
            message:"New Category Created",
            category
         })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in Category"
        })
    }
}

//update category
export const updateCategoryController=async(req,res)=>{
    try {
         const {name}=req.body
          const {id}=req.params
         const category =await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
         res.status(200).send({
            success:true,
            message:"Category Updated Successfully",
            category
         })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error while updating category"
        })
    }
}

//get all category
export const categoryController=async(req,res)=>{
    try {
        const category=await categoryModel.find({})
        res.status(200).send({
            success:true,
            message:"All Categories List",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error while getting all categories"
        })
    }
}

//single category
export const singleCategoryController=async(req,res)=>{
    try {
        const category=await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:"Get Single Category Successfully",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error while getting single category"
        })
    }
}

//delete category
export const deleteCategoryController=async(req,res)=>{
    try {
        await categoryModel.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success:true,
            message:"Category Deleted"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while deleting category'
        })
    }
}