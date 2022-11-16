/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positionsNEW = require("./positions.json");
const PositionModel = require("../db/position.model")
const EmployeeModel = require("../db/employee.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positionsNEW),
  }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const populatePositions = async () => {
  await PositionModel.deleteMany({});

  const positions = positionsNEW.map(() => ({
    name : pick(positionsNEW),
    salary : (Math.floor(Math.random()*4000) + 4000),
  }));

  await PositionModel.create(...positions);
  console.log("Positions created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEmployees();

  await populatePositions()

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
