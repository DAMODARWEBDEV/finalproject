const mongoose = require("mongoose");

// const mongooseUniquevalidator = require("mongoose-unique-validator");

const randomSchema = new mongoose.Schema({
  Firstname:String,
  Lname: String,
 emails: {type:String},//, unique:true
 passwords:String,
 genders:String,//
 bithdayall:String
 // messages:[{type: mongoose.Schema.Types.ObjectId,ref:"Picture"}]



});

// mongoose.schema.plugin(mongooseUniquevalidator);//using the function
const Detail = mongoose.model("Detail", randomSchema);

module.exports = Detail;
