const assert = require("assert");
const Member = require("../models/Member");
const Definer = require("../lib/mistake");
jwt = require("jsonwebtoken");

let memberController = module.exports;

memberController.signup = async (req, res) => {
  try {
    console.log(`POST: cont/signup`);
    const data = req.body;
    member = new Member();
    new_member = await member.signupData(data);

    const token = memberController.craeteToken(new_member);
    res.cookie("access_token", token, {
      maxAge: 6 * 3600 * 1000,
      httpOnly: true,
    });

    res.json({ state: "successed", data: new_member });
  } catch (err) {
    console.log(`ERROR, cont/signup, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

memberController.login = async (req, res) => {
  try {
    console.log(`POST: cont/login`);
    const data = req.body;
    member = new Member();
    result = await member.loginData(data);

    const token = memberController.craeteToken(result);

    res.cookie("access_token", token, {
      maxAge: 6 * 3600 * 1000,
      httpOnly: true,
    });

    res.json({ state: "successed", data: result });
  } catch (err) {
    console.log(`ERROR, cont/login, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

memberController.logout = (req, res) => {
  console.log("GET cont.logout");

  res.send("Log out sahifadasiz");
};

memberController.craeteToken = (result) => {
  try {
    const upload_data = {
      _id: result._id,
      mb_nick: result.mb_nick,
      mb_type: result.mb_type,
    };
    const token = jwt.sign(upload_data, process.env.SECRET_TOKEN, {
      expiresIn: "6h",
    });
    return token;
    console.log(token, "tok");
    assert.ok(token, Definer.auth_err4);
  } catch (err) {
    throw err;
  }
};
