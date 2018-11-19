let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ingredSchema = new Schema({
    Namn: String
});

module.exports = exports = mongoose.model('ingredient', ingredSchema);