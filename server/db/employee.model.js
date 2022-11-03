// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  favouriteColor: String,
  startingDate: String,
  startingSalary: Number,
  desiredSalary : Number,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
