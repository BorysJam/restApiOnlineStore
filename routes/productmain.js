const Product = require('../models/Product')
const { vertifyTkn, vertifyTknAuth, vertifyTknAdmin } = require('./vertifyToken')
const router = require('express').Router()

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
        res.status(200).render('index.hbs', {products:products})
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports = router