const jwt = require('jsonwebtoken')

const vertifyTkn = (req,res,next) => {
    //const authHeader = req.headers.token
    // cookie token is working in client, headers is used on postman
    const authHeader = req.cookies.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.PASS_SECRET_KEY, (err,user)=>{
            if(err){
                res.status(403).json('Token is expired or wrong')
            }
            req.user = user
            next()
        })
    }else{
        return res.status(401).json('Youre not authenticated')
    }
}

const vertifyTknAuth = (req,res,next) => {
    vertifyTkn(req,res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(403).json('You are not allowed to do that!')
        }
    })
}

const vertifyTknAdmin = (req,res,next) => {
    vertifyTkn(req,res, ()=>{
        if(req.user.isAdmin){
            next()
        }else{
            res.status(403).json('You are not allowed to do that!')
        }
    })
}

module.exports = {vertifyTkn, vertifyTknAuth, vertifyTknAdmin}