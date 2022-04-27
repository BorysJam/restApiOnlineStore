const router = require('express').Router()
const User = require("../models/User")
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

router.get('/register', (req,res)=>{
    res.render('register.hbs')
})

//register
router.post('/register', async(req,res)=>{
    console.log(req.body)
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: cryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET_KEY).toString()
    });
    try{
        const savedUser = await newUser.save()
        res.status(201).render('successRegister.hbs',{savedUser:savedUser})
    }catch(err){
        res.status(500).json(err)
    }
    
})


router.get('/login', (req,res)=>{
    res.render('login.hbs')
})
//login

router.post('/login', async(req,res)=>{
    try{
        const user = await User.findOne({
            username: req.body.username
        })
       !user && res.status(401).json('Wrong credentials')
     
        const hashedPw = cryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET_KEY)
        const password = hashedPw.toString(cryptoJS.enc.Utf8)
        password !== req.body.password && 
            res.status(401).json('Wrong credentials')

            const token = jwt.sign({
                id:user.id,
                isAdmin:user.isAdmin
            }, process.env.PASS_SECRET_KEY, {
                expiresIn:"24h"
            })
            const { passwordFinal, ...others } = user._doc;
            res.cookie('userId', user.id)
            res.cookie('token', `bearer ${token}`)
            res.cookie('userName', user.username)
        //res.status(200).render("login.hbs",{others:{...others, token}})
        res.status(200).render('success.hbs')
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router