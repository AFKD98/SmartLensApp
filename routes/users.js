const router = require("express").Router();
let User = require("../models/user.model"); //moongoose model we created

router.route("/").get((req, res) => {
  //this is /user url home
  User.find() //mongoose database all the users
    .then((users) => res.json(users)) //results are returned in json format
    .catch((err) => res.status(400).json("Error " + err)); //error message
});

router.route("/add").post((req, res) => {
  const username = req.body.username; //it is getting the username from the post request

  const newUser = new User({ username }); //using the username, new instance of user is created.
  //user model used here
  newUser
    .save() //save the user
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error " + err)); //else error message
});

module.exports = router;
