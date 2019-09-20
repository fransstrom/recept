var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let userSchema = new Schema({
  id: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  verified_email: Boolean,
  name: String,
  given_name: String,
  family_name: String,
  picture: String,
  locale: String,
  accessToken: String,
  refreshToken: String,
  tokenExpiryDate: Number
});

module.exports = exports = mongoose.model("user", userSchema);
