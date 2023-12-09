const express = require("express");
const router = express.Router();
const {
    createProduct,
    deleteProduct,
    getProducts,
    updateProduct,

  } = require("../controllers/productCont");

const {protect} = require('../middleWare/authMiddleware')



router.post("/createprod",protect,createProduct);
router.get("/myProducts",protect ,getProducts);
router.post("/removeprod",protect,deleteProduct);
router.post("/updateprod",protect,updateProduct);
module.exports = router;

