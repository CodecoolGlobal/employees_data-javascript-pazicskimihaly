// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  startingDate: String,
  currentSalary: Number,
  desiredSalary: Number,
  favouriteColor: String,
  kittens : [{
    name : String,
    weight : Number,
  }],
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
