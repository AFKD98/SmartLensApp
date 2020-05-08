const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const bcrypt = require("bcrypt-nodejs");

const photographersSchema = new Schema(
  {
    //not much validations
    _id: mongoose.Schema.Types.ObjectId,
    Name: { type: String },
    Username: { type: String },
    Password: { type: String, required: true },
    ContactNumber: { type: String },
    Email: { type: String, unique: true, required: true },
    Calendar: { type: String }, //calendar link
    Level: { type: String },
    Range: { type: Number },
    Address: { type: String },
    Equipment: { type: String },
    Bio: { type: String },
    Category: { type: String }, //check number of categories
    ProfilePic: { type: String }, //profile picture link
    CoverPic: { type: String },
    photos: [{ type: String }],
    videos: [{ type: String }],
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
