const mongoose = require("mongoose");
let buynowSchema = mongoose.Schema({
    userid:{
        type: String,
        required: true,
      },
    username:{
        type: String,
        required: true,
      },
    address:{
        type: String,
        required: true,
      },
      phone:{
        type: String,
        required: true,
      },
      pincode:{
        type: String,
        required: true,
      },
      landmark:{
        type: String,
        required: true,
      },
      productid:{
        type: String,
        required: true,
      },
     mrp:{
        type: String,
        required: true,
      },
      orderstatus:{
        type: String,
        required: true,
        default:"pending"
      },
      paymentmethod:{
        type: String,
        required: true,
      },
      orderdate:{
        type: String,
        required: true,
      },
      expecteddate:{
        type: String,
        required: true,
      },
      Seller_id:{
        type: String,
        required: true,
      },
      title:{
        type: String,
        required: true,
      },
      url:{
        type: String,
        required: true,
      }
});
const BuyNowModel = mongoose.model("order", buynowSchema);
module.exports = BuyNowModel;
