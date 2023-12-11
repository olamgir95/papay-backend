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

  async getMemberArticlesData(member, mb_id, query) {
    try {
      const auth_mb_id = shapeIntoMongooseObjectId(member?._id);
      mb_id = shapeIntoMongooseObjectId(mb_id);
      const page = query.page ? Number(query.page) : 1;
      const limit = query.limit ? Number(query.limit) : 5;

      const result = await this.boArticleModelModel
        .aggregate([
          { $match: { mb_id: mb_id, art_status: "active" } },
          {
            $sort: { createdAt: -1 },
          },
          { $skip: (page - 1) * limit },
          { $limit: limit },
          {
            $lookup: {
              from: "members",
              localField: "mb_id",
              foreignField: "_id",
              as: "member_data",
            },
          },
          { $unwind: "$member_data" },
        ])
        .exec();

      assert.ok(result, Definer.article_err2);

      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Community;
