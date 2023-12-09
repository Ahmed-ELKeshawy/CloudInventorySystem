const mongoose = require('mongoose')
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true,"Please add a name"]
    },
    email: {
        type: String,
        required: [true,"Please add an email"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please Enter a valid email"
        ]
    },
    password: {
        type: String,
        required: [true,"Please add a Password"],
        minLength: [6,"Password must be minimum 6 characters"],
        
    },

}, {
    timestamps: true,
});

//encrypt password
userSchema.pre('save', async function(next){

    if(!this.isModified('password')){
        return next()
    }
    //hash password
      //we encrypt the password

   const hashedPassword = await bcrypt.hash(this.password, 12);
   this.password = hashedPassword
   next();
})

const User = mongoose.model("User", userSchema)
module.exports = User