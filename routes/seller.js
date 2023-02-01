const express = require("express");
const productController = require("../controllers/product-controller");
const router = express.Router();
const sellerController = require("../controllers/seller-controller");



router.post("/signup",sellerController.signup)
router.post("/login",sellerController.login)
router.post("/addproduct",productController.addproduct)
router.get("/getsellerproducts/:id",productController.getsellerproduct)
router.delete("/deletesellerproducts/:id",productController.deletesellerproduct)
router.patch("/updatesellerproducts/:id",productController.updatesellerproduct)
router.get("/getsingleproduct/:id",productController.getsingleproduct)
router.get("/vieworders/:id",sellerController.getSellerOrder)
router.patch("/statusorder/:id",sellerController.orderStatus)


module.exports = router;
