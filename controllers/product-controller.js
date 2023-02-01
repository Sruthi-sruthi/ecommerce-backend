const SellerProductModel = require("../models/selleraddproductmodel");

const addproduct = async (req, res) => {
  await SellerProductModel.create(req.body)
  res.json({
    success: true,
    message: "successfully added product"
  });
}

const getsellerproduct = async (req, res) => {
  let sellerproduct = await SellerProductModel.find({ Seller_id: req.params.id })
  res.json({
    success: true,
    sellerproduct
  })
}

const deletesellerproduct = async (req, res) => {
  console.log("deleet request");
  await SellerProductModel.findOneAndDelete({ _id: req.params.id })
  res.json({
    success: true,
    message: "successfully deleted product"
  })
}

const updatesellerproduct = async (req, res) => {
  try {
    await SellerProductModel.findOneAndUpdate({ _id: req.params.id },req.body)
  res.json({
    success: true,
    message: "successfully updated product",
  })
  } catch (error) {
    res.json({
      success: false,
      message: "Couldn't update product",
    })
    console.log(error);
  }
}

const getsingleproduct=async(req,res)=>{
  try {
    console.log(req.params.id);
    let singleproduct= await SellerProductModel.findOne({ _id: req.params.id })

  res.json({
    success: true,
    message: "successfully collected product",
    singleproduct
  })
  } catch (error) {
    res.json({
      success: false,
      message: "cannot collected product",
      
    })
  }
 
}


module.exports = { addproduct, getsellerproduct, deletesellerproduct, updatesellerproduct ,getsingleproduct};