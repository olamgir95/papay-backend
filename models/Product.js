const assert = require("assert");
const Definer = require("../lib/mistake");
const ProductModel = require("../schema/product.model");
const { shapeIntoMongooseObjectId } = require("../lib/config");

class Product {
  constructor() {
    this.ProductModel = ProductModel;
  }
  async addNewProductData(data, member) {
    try {
      data.restaurant_mb_id = shapeIntoMongooseObjectId(member._id);
      console.log(data);
      return true;
    } catch (err) {
      throw err;
    }
  }

  async loginData(input) {
    try {
      const member = this.ProductModel.findOne(
        { mb_nick: input.mb_nick },
        { mb_nick: 1, mb_password: 1 }
      ).exec();
      assert.ok(member, Definer.auth_err2);

      const isMatch = bcrypt.compare(input.mb_password, member.mb_password);
      assert.ok(isMatch, Definer.auth_err3);
      return this.ProductModel.findOne({ mb_nick: input.mb_nick }).exec();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Product;
