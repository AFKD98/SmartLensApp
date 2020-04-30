const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config(); //environment variables in the .env file

const app = express(); //express server
const port = 5000; //port for server

app.use(cors()); //middleware Cross origin resource sharing
app.use(express.json()); //middleware to parse json

//DB
const uri = process.env.ATLAS_URI; //ATLAS_URI is the env variable. set it
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }); //uri is where DB is stored
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

//routes
const clientsRouter = require("./routes/clients");
const categoriesRouter = require("./routes/categories");
const photographersRouter = require("./routes/photographers");
const registration_photographerRouter = require("./routes/registration_photographer");

app.use("/clients", clientsRouter); //it will load everything in the user
app.use("/categories", categoriesRouter); //it will load everything in the categories
app.use("/photographers", photographersRouter); //it will load everything in the photographers
app.use("/registration_photographer", registration_photographerRouter); //it will load everything in the registration_photographer

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
//Listen
app.listen(port, () => {
  //server is listening on the port
  console.log(`Server is running on port: ${port}`);
});
