const assert = require("assert");
const Order = require("../models/Order");
const Definer = require("../lib/mistake");

let orderController = module.exports;

orderController.createOrder = async (req, res) => {
  try {
    console.log(`POST: cont/createOrder`);
    assert.ok(req.member, Definer.auth_err5);

    const { member, body } = req;
    const order = new Order();
    const result = await order.createOrderData(member, body);

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/createOrder, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

orderController.getMyOrders = async (req, res) => {
  try {
    console.log(`GET: cont/getMyOrders`);
    assert.ok(req.member, Definer.auth_err5);

    const { member, query } = req;
    const order = new Order();
    const result = await order.getMyOrdersData(member, query);

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/getMyOrders, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
