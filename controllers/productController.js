const assert = require("assert");
const Definer = require("../lib/mistake");
const Product = require("../models/Product");

let productController = module.exports;

productController.getAllProducts = async (req, res) => {
  try {
    console.log(`GET: cont/getAllProducts `);
  } catch (err) {
    console.log(`ERROR, cont/getAllProducts,    ${err.message}`);
    res.jso({ state: "fail", message: err.message });
  }
};

productController.addNewProduct = async (req, res) => {
  try {
    console.log(`POST: cont/addNewProduct `);
    assert(req.files, Definer.general_err3);

    const product = new Product();
    let data = req.body;
    data.product_images = req.files.map((ele) => {
      return ele.path;
    });
    const result = product.addNewProductData(data, req.member);
    assert.ok(result, Definer.product_err1);

    res.send("ok");
  } catch (err) {
    console.log(`ERROR, cont/addNewProduct,    ${err.message}`);
  }
};

productController.updateChosenProduct = async (req, res) => {
  try {
    console.log(`POST: cont/updateChoseProduct `);
  } catch (err) {
    console.log(`ERROR, cont/updateChoseProduct,    ${err.message}`);
  }
};
