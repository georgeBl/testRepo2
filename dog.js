//requesting mongooose and Schema so the class can be defined
const mongoose = require('mongoose')
const {Schema} = mongoose;
//setting up the Rules for our class using schema 
const dogSchema = new Schema({
  
    age : Number, // Decimal128 // String
    name: String,
    breed: String,
    isNeutred: Boolean
  })
//defining the name of the constructor for our class
const Dog = mongoose.model('Dog', dogSchema);
//export the class, also called a model or a document, to use in different files
module.exports = Dog
