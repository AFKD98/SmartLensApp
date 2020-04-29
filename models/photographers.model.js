const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const bcrypt = require("bcrypt-nodejs");

const photographersSchema = new Schema(
  {
    //not much validations
    Name: { type: String, required: true },
    Username: { type: String, required: true },
    Password: { type: String, required: true },
    ContactNumber: { type: String, required: true },
    Email: { type: String, required: true },
    Calendar: { type: String, required: true }, //calendar link
    Level: { type: String, required: true },
    Range: { type: Number, required: true },
    Address: { type: String, required: true },
    Equipment: { type: String, required: true },
    Bio: { type: String, required: true },
    Category: { type: String, required: true }, //check number of categories
    ProfilePic: { type: String, required: true }, //profile picture link
    CoverPic: { type: String, required: true },
    photos: [{ category: String, Link: String }],
    date: { type: Date, required: true },
  },
  {
    timestamps: true, //creation and modification timestamps
  }
);

//hashing the password
// photographers.methods.generateHash = function (Password) {
//   return bcrypt.hashSync(Password, bcrypt.genSaltSync(8), null);
// };

// // checking if password is valid
// photographers.methods.validPassword = function (Password) {
//   return bcrypt.compareSync(Password, this.Password);
// };
const photographers = mongoose.model("photographers", photographersSchema);
module.exports = photographers;
