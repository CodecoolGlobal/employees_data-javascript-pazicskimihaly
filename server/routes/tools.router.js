const { Router } = require("express");
const ToolModel = require("../db/tool.model")

const toolRouter = new Router();

toolRouter.get("/", async (req, res) => {
    const tools = await ToolModel.find().sort({ weight: "desc" });
    return res.json(tools);
  });

module.exports = toolRouter