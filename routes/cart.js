const Cart = require('../models/Cart')
const { vertifyTkn, vertifyTknAuth, vertifyTknAdmin } = require('./vertifyToken')
const router = require('express').Router()

//create

router.post('/', vertifyTkn, async(req,res)=>{
    const userD = req.cookies.userId
    const productId = req.body.productId
    const newCart = new Cart(userD,productId)
    try{
        const savedCart = await newCart.save()
        res.status(200).render("cart.hbs",{savedCart: savedCart})
    }catch(err){
        res.status(500).json(err)
    }
})

router.put("/:id", vertifyTknAuth, async(req,res)=>{
    try{
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set:req.body
        },{new:true})
        res.status(200).json(updatedCart)
    }catch(err){
        res.status(500).json('Error')
    }
})

router.delete(":/id", vertifyTknAuth, async(req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json('Cart has been emptied')
    }
    catch{
        res.status(500).json('error')
    }
})

router.get("/find/:userId", vertifyTknAuth, async(req,res)=>{
    try{
        const cart = await Cart.findOne({userId: req.params.userId})
        res.status(200).json(cart)
    }
    catch(err){
        res.status(500).json(err)
    }
})

router.get('/', vertifyTknAdmin, async(req,res)=>{
    try{
        const carts = await Cart.find()
        res.status(200).json(carts)
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports = router