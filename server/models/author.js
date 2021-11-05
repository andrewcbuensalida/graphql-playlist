const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
	name: String,
	age: Number,
});

//collection will be called authors
module.exports = mongoose.model("Author", authorSchema);
