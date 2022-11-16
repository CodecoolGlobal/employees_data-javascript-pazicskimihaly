// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const PositionSchema = new Schema({
  name: String,
  salary: Number,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Position", PositionSchema);
