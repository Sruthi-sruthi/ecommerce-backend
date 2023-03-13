const UserModel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const SellerProductModel = require("../models/selleraddproductmodel");
const BuyNowModel = require("../models/buynowmodel");
const CartModel = require("../models/cartmodel");

const sendHi = (req, res) => {
  res.send("hy");
};

const signup = async (req, res) => {
  // res.send("signup page")

  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    req.body.password = hash;
    await UserModel.create(req.body);
    res.json({
      success: true,
      message: "successfully created new user",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "failed to signup ",
    })
  }
}



const login = async function (req, res) {
  console.log(req.body);
  let user = await UserModel.findOne({ email: req.body.email });
  console.log(user);
  if (user != null) {
    let validPassword = await bcrypt.compare(req.body.password, user.password);
    console.log(validPassword);
    if (validPassword) {
      // req.session.user = user;
      res.json({
        success: true,
        message: "successfully login",
        user
      });
    } else {
      res.json({
        success: false,
        message: "invalid password",
      });
      // req.session.errormsg = "invalid password";
    }
    // res.send("login failed");

  } else {
    res.json({
      success: false,
      message: "login faild",
    });
  }
};


// getproductbycategory
const getProductByCategory = async (req, res) => {
  try {
    let getcategory = await SellerProductModel.find({ category: req.params.category })
    res.json({
      success: true,
      message: "get category products",
      getcategory
    });

  } catch (error) {
    res.json({
      success: false,
      message: "cannot get category products",
      getcategory
    });
  }
}

const buyproduct = async (req, res) => {
  try {
    await BuyNowModel.create(req.body)
    res.json({
      success: true,
      message: "successfully placed product",
    });

  } catch (error) {
    res.json({
      success: false,
      message: "cannot added product",
    });
    console.log(error);
  }

}



const getUserOrder = async (req, res) => {
  try {
    let orders = await BuyNowModel.find({ userid: req.params.id })
    if (orders.length == 0) {
      res.json({
        success: true,
        message: "you have no orders",
      });
    } else {
      res.json({
        success: true,
        message: "get order product",
        orders
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "you have no orders",
    });
    console.log(error);
  }
}


const addCart = async (req, res) => {
  try {
    let cartExist = await CartModel.findOne({ userid: req.params.userid })
    if (cartExist) {
      let products = cartExist.products
      products.push(req.params.productid)
      await CartModel.findOneAndUpdate({ userid: req.params.userid }, { $set: { products } })
      res.json({
        success: true,
        message: "successfully added to cart",
      });
    }
    else {
      let cartobj = {
        userid: req.params.userid,
        products: [req.params.productid]
      }
      let cart = await CartModel.create(cartobj)
      res.json({
        success: true,
        message: "successfully added to cart",
        cart
      });
    }


  } catch (error) {
    res.json({
      success: false,
      message: "could not added to cart",
    });
    console.log(error);
  }
}


const viewCart = async (req, res) => {
  try {
    let cart = await CartModel.aggregate([
      {
        $match: { userid: req.params.userid }
      },
      {
        $lookup: {
          from: "products",

          localField: "products",
          foreignField: "_id",
          as: "all_products",
        },
      }
      ,
      { "$unwind": "$all_products" },
      {
        "$group": {
          "_id": "$_id",
          "userid": { "$first": "$userid" },
          "products": { "$push": "$all_products" }
        }
      },
      { $project: {  "products.__v": 0 }, },
    ])
    res.json({
      success: true,
      message: "viewed product",
      cart:cart[0]
    })
  } catch (error) {
    res.json({
      success: false,
      message: "could not viewed product",
    });
    console.log(error);
  }
}





module.exports = {
  sendHi, signup, login, getProductByCategory, buyproduct, getUserOrder, addCart, viewCart
}
