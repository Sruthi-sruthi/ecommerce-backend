const express = require("express");
const router = express.Router();

const userController = require("../controllers/user-controller");

router.get("/", userController.sendHi);
// router.get("/user", userController.sendHi);
router.post("/signup",userController.signup)
router.post("/login",userController.login)
router.get("/getproductcategory/:category",userController.getProductByCategory)
router.post("/buynow",userController.buyproduct)
router.get("/userorder/:id",userController.getUserOrder)
router.get("/addtocart/:userid/:productid",userController.addCart)
router.get("/viewcart/:userid",userController.viewCart)


module.exports = router;