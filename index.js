const express = require('express');
const dotenv = require('dotenv')
dotenv.config()
const app = express()
const mongoose = require('mongoose')
const userRouter = require('./routes/user')
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')

mongoose.connect(`mongodb+srv://bj9898:${process.env.MONGO_URI}@cluster0.jz4ra.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`).then(()=>{
    console.log("Database conntected success")
}).catch((err)=>console.log(err))
app.use(express.json())
app.use('/api/users', userRouter)
app.use('/api/auth', authRoute)
app.use('/api/products', productRoute)

app.listen(process.env.PORT || 3000, ()=>{
    console.log('listening to port 3000')
})