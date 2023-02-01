const cors = require("cors");
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("./public"));
app.use(cors())
const connectDB = require("./config/config");


const userRouter = require("./routes/user");
app.use("/user",userRouter);

const sellerRouter=require("./routes/seller")
app.use("/seller",sellerRouter)

const port = 5000;
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    connectDB();
    console.log("server listening to port", port);
  }
});
