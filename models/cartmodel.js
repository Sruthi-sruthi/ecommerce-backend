const mongoose = require("mongoose");
let cartSchema = mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  products: [
    {
      type: mongoose.ObjectId,
    }
  ]
});
const CartModel = mongoose.model("cart", cartSchema);
module.exports = CartModel;