const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');



const registerUser = asyncHandler(async(req,res) =>{
   const{name, email, password} = req.body


   //valid
   if (!name) {
    res.status(400);
    throw new Error("Name is required.");
}

if (!email) {
    res.status(400);
    throw new Error("Email is required.");
}

if (!password) {
    res.status(400);
    throw new Error("Password is required.");
}

if (password.length < 6) {
    res.status(400);
    throw new Error("Password should be at least 6 characters.");
}

   //check credintials
   const userExists = await User.findOne({email})
   if(userExists){
        res.status(400)
        throw new Error("Email already been registered")
   }

 

   //create new user

   const user = await User.create({
    name,
    email,
    password,
   })
   
   
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
    })
   

});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    // Validate Request
    if (!email || !password) {
      res.status(400);
      throw new Error("Please add email and password");
    }
  
    // Check if user exists
    const user = await User.findOne({ email });
  
    if (!user) {
      res.status(400);
      throw new Error("User not found, please signup");
    }
  
    // User exists, check if password is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    
    
    if (user && passwordIsCorrect) {
    

      const { _id, name, email} = user;
      res.status(200).json({
        _id,
        name,
        email,
        token: generateToken(user._id)
      });
    } else {
      res.status(400);
      throw new Error("Invalid email or password");
    }
  });
  
// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

  //generate token

  const generateToken = (id) =>{
    return jwt.sign({ id }, process.env.JWT_Key, { expiresIn: '5h' })
  }


module.exports = {
    registerUser,
    loginUser,
    getMe
    
}