const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientsSchema = new Schema(
  {
    //not much validations
    ClientName: { type: String, required: true },
    ContactNumber: { type: String, required: true },
    Email: { type: String, required: true },
    Location: { type: String, required: true },
    Category: { type: [String], required: true }, //check number of categories
    Photographer: { type: String }, //check id
    Budget: { type: Number, required: true },
    Expertise: { type: String, required: true },
    Event_Description: { type: String, required: true },
    Approved: { type: Boolean, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true, //creation and modification timestamps
  }
);

const Clients = mongoose.model("Clients", ClientsSchema);
module.exports = Clients;
