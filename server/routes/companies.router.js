const { Router } = require("express");
const CompanyModel = require("../db/company.model");

const companyRouter = new Router();

companyRouter.get("/", async (req, res) => {
    const company = await CompanyModel.find().sort({ name : "desc" });
    return res.json(company);
  });

companyRouter.post("/", async (req, res, next) => {
    const company = req.body;
    try {
      const saved = await CompanyModel.create(company);
      return res.json(saved);
    } catch (err) {
      return next(err);
    }
  });

module.exports = companyRouter