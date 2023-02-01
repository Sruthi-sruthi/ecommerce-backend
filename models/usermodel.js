const mongoose = require("mongoose");
let userSchema = mongoose.Schema({
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
const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
