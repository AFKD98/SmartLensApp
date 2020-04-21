const router = require("express").Router();
let Category = require("../models/category.model"); //moongoose model we created

router.route("/").get((req, res) => {
  //this is /user url home
  Category.find() //mongoose database all the users
    .then((Category) => res.json(Category)) //results are returned in json format
    .catch((err) => res.status(400).json("Error " + err)); //error message
});

module.exports = router;
