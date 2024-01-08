const assert = require("assert");
const Definer = require("../lib/mistake");
const Community = require("../models/Community");

let communityController = module.exports;

communityController.imageInsertion = async (req, res) => {
  try {
    console.log(`POST: cont/imageInsertion`);
    console.log(req.file);
    assert.ok(req.file, Definer.general_err3);
    const image_url = req.file.path.replace(/\\/g, "/");

    res.json({ state: "success", data: image_url });
  } catch (err) {
    console.log(`ERROR, cont/imageInsertion, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

communityController.createArticle = async (req, res) => {
  try {
    console.log(`GET: cont/createArticle`);
    assert.ok(req.member, Definer.auth_err5);

    const { member, body } = req;
    const community = new Community();
    const result = await community.createArticleData(member, body);

    assert.ok(result, Definer.general_err1);

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/createArticle, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

communityController.getMemberArticles = async (req, res) => {
  try {
    console.log(`GET: cont/getMemberArticles`);
    // assert.ok(req.member, Definer.auth_err5);

    const { member, query } = req;
    const community = new Community();
    const mb_id = query.mb_id !== "none" ? query.mb_id : member?._id;

    assert.ok(mb_id, Definer.article_err1);

    const result = await community.getMemberArticlesData(member, mb_id, query);

    assert.ok(result, Definer.general_err1);

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/getMemberArticles, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

communityController.getArticles = async (req, res) => {
  try {
    console.log(`GET: cont/getArticles`);
    // assert.ok(req.member, Definer.auth_err5);

    const { member, query } = req;
    const community = new Community();

    const result = await community.getArticlesData(member, query);

    assert.ok(result, Definer.general_err1);

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/Articles, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

communityController.getChosenArticle = async (req, res) => {
  try {
    console.log("cont/getChosenArticle");
    const art_id = req.params.art_id,
      community = new Community(),
      result = await community.getChosenArticleData(req.member, art_id);
    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/getChosenArticle, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
