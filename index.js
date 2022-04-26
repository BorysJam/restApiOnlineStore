const express = require('express');
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const path = require('path')
dotenv.config()
const { engine } = require('express-handlebars');
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))
app.use(cookieParser())
const hbs = require('hbs');

app.set('view engine', 'hbs')    

const viewsPath = path.join(__dirname + '/views')
const partialsPath = path.join(__dirname + '/partials')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
const mongoose = require('mongoose')
const userRouter = require('./routes/user')
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')
const productMain = require('./routes/productmain')

mongoose.connect(`mongodb+srv://bj9898:${process.env.MONGO_URI}@cluster0.jz4ra.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`).then(()=>{
    console.log("Database conntected success")
}).catch((err)=>console.log(err))
app.use('/api/users', userRouter)

app.use('/api/auth', authRoute)
app.use('/api/products', productRoute)
app.use('/api/carts', cartRoute)
app.use('/api/orders', orderRoute)
app.use('/', productMain)

// app.get('/',async(req,res)=>{
//     console.log(await productMain)
//     res.render('index.hbs')
// })

app.listen(process.env.PORT || 3000, ()=>{
    console.log('listening to port 3000')
})