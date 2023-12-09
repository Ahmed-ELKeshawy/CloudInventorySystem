const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");


const createProduct = asyncHandler(async(req,res) => {
    const { name, category, quantity,reorderLimit, price, description, image} = req.body;

     //   Validation
    if (!name || !category || !quantity ||!reorderLimit || !price || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
    }

    // Check if a product with the same name already exists
  const existingProduct = await Product.findOne({ name, user: req.user.id });

    if (existingProduct) {
      res.status(400);
      throw new Error("Item is already in stock. Update it instead.");
    }

   
 // Create Product
    const product = await Product.create({
        name,
        category,
        quantity,
        reorderLimit,
        price,
        description,
        image,
        user: req.user.id,
    });

    res.status(201).json(product);
});


// Get all Products
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({user: req.user.id});
    res.status(200).json(products);
  });
  
  
//delete a product
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findOne({name: req.body.name});
    // if product doesnt exist
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    // Match product to its user
    if (product.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    await Product.deleteOne(product);
    res.status(200).json({ message: "Product deleted." });
  });

//update a product info

const updateProduct = asyncHandler(async(req,res)=>{
  const { name, category, quantity, reorderLimit, price, description, image } = req.body;
  const newName = req.body.newName;

  // Validation
  if (!name) {
    res.status(400);
    throw new Error("Product name is required");
  }

  // Find the product by name and user
  const product = await Product.findOne({ name, user: req.user.id });

  // Check if the product exists
  if (!product) {
    res.status(404);
    throw new Error("Product not found. Create it instead.");
  }

  // Check if the user is authorized to update the product
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized to update this product");
  }

  // Update the product information
  product.name = newName || product.name;
  product.category = category || product.category;
  product.quantity = quantity || product.quantity;
  product.reorderLimit = reorderLimit || product.reorderLimit;
  product.price = price || product.price;
  product.description = description || product.description;
  product.image = image || product.image;

  // Save the updated product
  await product.save();

  res.status(200).json({ message: "Product updated successfully", product: product });



});


module.exports = {
    createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
    
}
    
