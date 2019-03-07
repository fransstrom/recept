var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let recipeSchema = new Schema({
  label: { type: String, required: true },
  description: String,
  ingredients: Array,
  instructions: Array,
  imgUrl: String,
  categories: Array,
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = exports = mongoose.model("recipe", recipeSchema);
