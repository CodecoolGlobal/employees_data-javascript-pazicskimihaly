// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const ToolSchema = new Schema({
  name: String,
  weight : String,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Tool", ToolSchema);