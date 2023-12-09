const mongoose = require("mongoose");
const Product = require("../models/Product");

const checkInventoryAndGenerateAlerts = async () => {
  try {
    const products = await Product.find();

    products.forEach((product) => {
      if (product.quantity < product.reorderLimit) {
        // Generate alert for the product
        console.log(`Alert: Reorder ${product.name} - Quantity is below reorder point`);
        // You can send notifications, emails, or take any desired action here
      }
    });
  } catch (error) {
    console.error('Error checking inventory:', error);
  }
};

module.exports = checkInventoryAndGenerateAlerts;
