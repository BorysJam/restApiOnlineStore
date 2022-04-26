const Product = require('../models/Product')
const { vertifyTkn, vertifyTknAuth, vertifyTknAdmin } = require('./vertifyToken')
const router = require('express').Router()

//create

router.post('/', vertifyTknAdmin, async(req,res)=>{
    const newProduct = new Product(req.body)
    try{
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)
    }catch(err){
        res.status(500).json(err)
    }
})

router.put("/:id", vertifyTknAdmin, async(req,res)=>{
    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set:req.body
        },{new:true})
        res.status(200).json(updatedProduct)
    }catch(err){
        res.status(500).json('Error')
    }
})

router.delete(":/id", vertifyTknAdmin, async(req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json('Product has been deleted')
    }
    catch{
        res.status(500).json('error')
    }
})

router.get("/find/:id", async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id)
        res.status(200).render('showItem.hbs', {product:product})
    }
    catch(err){
        res.status(500).json(err)
    }
})

//get all products

router.get("/", async(req,res)=>{
    const queryNew = req.query.new;
    const queryCategory = req.query.category;
    try{
        let products;
        if(queryNew){
            products = await Product.find().sort({createdAt: -1}).limit(1)
        }else if(queryCategory){
            products = await Product.find({categories:{
                $in:[queryCategory],
            },})
        }else{
            products = await Product.find()
        }
        res.status(200).json(products)
    }
    catch(err){
        res.status(500).json(err)
    }
})


module.exports = router