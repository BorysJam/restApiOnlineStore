const Cart = require('../models/Cart')
const Product = require('../models/Product')
const { vertifyTkn, vertifyTknAuth, vertifyTknAdmin } = require('./vertifyToken')
const router = require('express').Router()

//create

router.post('/', vertifyTkn, async(req,res)=>{
    const userD = req.cookies.userId
    const productId = req.body.productId
    const newCart = new Cart({userId: userD, productId: productId, quantity:1})
    try{
        const savedCart = await newCart.save()
        res.status(200).render("cart.hbs",{savedCart: savedCart, added:'Chosen item has been added to cart'})
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

router.get('/mycart', vertifyTkn, async(req,res)=>{
    const userD = (req.cookies.userId).trim()
    try{ 
        const myCart = await Cart.find({userId: userD})
        let products = []
       for(const el of myCart){
           let product = await Product.findById(el.productId)
           let title = product.title
           let img = product.img
           let price = product.price
           let desc = product.desc
           products.push({title: title,desc:desc, img:img, price:price})
           
       }
        res.render('cart.hbs', {savedCart: products})
    }catch(err){
        res.render('cart.hbs',{savedCart: 'cart is empty'})
    }
})

module.exports = router