const mongoose = require("mongoose");
let sellerSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
      },
      password:{
        type: String,
        required: true,
      },
      email:{
        type: String,
        required: true,
      },
      phone:{
        type: String,
        required: true,
      }
});
const SellerModel = mongoose.model("seller", sellerSchema);
module.exports = SellerModel;
