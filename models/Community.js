const assert = require("assert");
const Definer = require("../lib/mistake");
const BoArticleModel = require("../schema/bo_article.model");
const { shapeIntoMongooseObjectId } = require("../lib/config");

class Community {
  constructor() {
    this.boArticleModelModel = BoArticleModel;
  }

  async createArticleData(member, data) {
    try {
      data.mb_id = shapeIntoMongooseObjectId(member._id);

      const new_article = await this.saveArticleData(data);
      return new_article;
    } catch (err) {
      throw err;
    }
  }

  async saveArticleData(data) {
    try {
      const article = new this.boArticleModelModel(data);

      return await article.save();
    } catch (mongo_err) {
      console.log(mongo_err);
      throw new Error(Definer.auth_err1);
    }
  }
}

module.exports = Community;
