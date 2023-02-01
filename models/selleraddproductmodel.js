const mongoose = require("mongoose");
let addproductSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
      },
      tagline:{
        type: String,
        required: true,
      },
      mrp:{
        type: String,
        required: true,
      },
      description:{
        type: String,
        required: true,
      },
      url:{
        type: String,
        required: true,
      },
      offer:{
        type: String,
        required: true,
      },
      category:{
        type: String,
        required:true,
      },
      Seller_id:{
        type: String,

      },
      Seller_name:{
        type: String,

      },
      
});
const SellerProductModel = mongoose.model("product",addproductSchema );
module.exports =SellerProductModel ;
