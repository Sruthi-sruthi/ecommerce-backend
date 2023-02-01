const SellerModel = require("../models/sellermodel");
const bcrypt = require("bcrypt");
const BuyNowModel = require("../models/buynowmodel");

const signup = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    req.body.password = hash;
    await SellerModel.create(req.body);
    res.json({
      success: true,
      message: "successfully created seller",
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
  let seller = await SellerModel.findOne({ email: req.body.email });
  console.log(seller);
  if (seller != null) {
    let validPassword = await bcrypt.compare(req.body.password, seller.password);
    console.log(validPassword);
    if (validPassword) {
      res.json({
        success: true,
        message: "successfully login",
        seller
      });
    } else {
      res.json({
        success: false,
        message: "invalid password",
      });

    }


  } else {
    res.json({
      success: false,
      message: "login faild",
    });
  }
};


const getSellerOrder = async (req, res) => {
  try {
    let orders = await BuyNowModel.find({ Seller_id: req.params.id })
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
      message: "server error !!!",
    });
    console.log(error);
  }
}


const orderStatus = async (req, res) => {
  try {
    await BuyNowModel.findOneAndUpdate({ _id: req.params.id }, { orderstatus: "shipped" })
    res.json({
      success: true,
      message: "shipped product",
    });

  } catch (error) {
    res.json({
      success: false,
      message: "not shipped product",
    });
    console.log(error);
  }
}



module.exports = {
  signup, login, getSellerOrder, orderStatus
}