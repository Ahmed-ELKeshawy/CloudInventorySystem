const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
        type: String,
        required: [true, "Please add a name"],
        trim: true,
    },
    
    category: {
        type: String,
        required: [true, "Please add a category"],
        trim: true,
    },
    quantity: {
        type: Number,
        required: [true, "Please add a quantity"],
        trim: true,
    },
    reorderLimit: {
        type: Number,
        required: [true, "Please add a re Order Limit"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Please add a price"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please add a description"],
        trim: true,
    },
    image: {
        type: String,
        default: {},
    },
    user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'UserID',
         required: true 
},
    },
    {
    timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;