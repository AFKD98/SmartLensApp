const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    categoryname: { type: String, required: true },
    photographers: [{ photographerID: String }], //multiple photographers
  },
  {
    timestamps: true, //creation and modification timestamps
  }
);

const Category = mongoose.model("category", categorySchema);
module.exports = Category;
