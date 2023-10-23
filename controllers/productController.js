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
    //Todo:product creation develop
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
