const { Router } = require("express");
const EmployeeModel = require("../db/employee.model");

const topRouter = new Router();

topRouter.get("/", async (req, res) => {
  const employees = await EmployeeModel.find().sort({ salary: "desc" });
  return res.json(employees.slice(0,3));
});

module.exports = topRouter;