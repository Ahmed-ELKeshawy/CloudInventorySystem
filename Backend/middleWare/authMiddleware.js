const jwt = require('jsonwebtoken');
const User = require("../models/user")
const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async (req,res,next)=>{
    let token 


    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
        token = req.header('Authorization').split(' ')[1];

        //verify token
        const decoded = jwt.verify(token,process.env.JWT_Key)

        //get uder from token
        req.user = await User.findById(decoded.id).select('-password')
        next()
    } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error('Not authorized')
      }
    }
  
    if (!token) {
      res.status(401)
      throw new Error('Not authorized, no token')
    }
})







module.exports = { protect };