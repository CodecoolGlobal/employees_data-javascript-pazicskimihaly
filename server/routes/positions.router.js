const { Router } = require("express");
const PositionModel = require("../db/position.model");

const positionsRouter = new Router();

positionsRouter.get("/", async (req, res) => {
    const positions = await PositionModel.find().sort({ salary: "desc" });
    return res.json(positions);
  });

module.exports = positionsRouter