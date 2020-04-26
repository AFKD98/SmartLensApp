const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("config"); //environment variables in the config folder

const app = express(); //express server
const port = process.env.PORT || 5000; //port for server

app.use(cors()); //middleware Cross origin resource sharing
app.use(express.json()); //middleware to parse json

// DB config
const db = config.get("mongoURI"); //mongoURI is the config folder. set it
//uri is where DB is stored
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

//routes
const ordersRouter = require("./routes/orders");
const categoriesRouter = require("./routes/categories");
const photographersRouter = require("./routes/photographers");
const registration_photographerRouter = require("./routes/registration_photographer");

app.use("/orders", ordersRouter); //it will load everything in the user
app.use("/categories", categoriesRouter); //it will load everything in the categories
app.use("/photographers", photographersRouter); //it will load everything in the photographers
app.use("/registration_photographer", registration_photographerRouter); //it will load everything in the registration_photographer

//Listen
app.listen(port, () => {
  //server is listening on the port
  console.log(`Server is running on port: ${port}`);
});
