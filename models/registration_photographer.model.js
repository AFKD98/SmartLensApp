const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const bcrypt = require("bcrypt-nodejs");

const registration_photographerSchema = new Schema(
  {
    //not much validations
    Name: { type: String, required: true },
    Username: { type: String, required: true }, //unique
    ContactNumber: { type: String, required: true },
    Email: { type: String, required: true },
    Occupation: { type: String, required: true },
    Equipment: { type: String, required: true }, //list
    Category: { type: [String], required: true }, //list
    Self_rating: { type: Number, required: true },
    Description: { type: String, required: true },
    Sample_work: { type: String, required: true }, //Link
  },
  {
    timestamps: true, //creation and modification timestamps
  }
);

//hashing the password
// registration_photographer.methods.generateHash = function (Password) {
//   return bcrypt.hashSync(Password, bcrypt.genSaltSync(8), null);
// };

// // checking if password is valid
// registration_photographer.methods.validPassword = function (Password) {
//   return bcrypt.compareSync(Password, this.Password);
// };
const registration_photographer = mongoose.model(
  "registration_photographer",
  registration_photographerSchema
);
module.exports = registration_photographer;
