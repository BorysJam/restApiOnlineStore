const router = require('express').Router()
const { vertifyTkn, vertifyTknAuth, vertifyTknAdmin } = require('./vertifyToken')
router.get('/', vertifyTknAdmin, async(req,res)=>{
    res.render('admin.hbs')
})

module.exports = router