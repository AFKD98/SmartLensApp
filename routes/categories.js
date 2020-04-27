const router = require("express").Router();
let category = require("../models/category.model"); //moongoose model we created

router.route("/").get((req, res) => {
  //this is /user url home
  category
    .find() //mongoose database all the categories
    .then((category) => res.json(category)) //results are returned in json format
    .catch((err) => res.status(400).json("Error " + err)); //error message
});

router.route("/add").post((req, res) => {
  const categoryname = req.body.categoryname; //it is getting the categoryname from the post request
  const photographers = req.body.photographers;

  const newcategory = new category({
    categoryname,
    photographers,
  });
  newcategory
    .save() //save the usker
    .then(() => res.json("category added!"))
    .catch((err) => res.status(400).json("Error " + err)); //else error message
});

router.route("/:id").get((req, res) => {
  //category return by id
  category
    .findById(req.params.id)
    .then((category) => res.json(category))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/:id").delete((req, res) => {
  //delete category by id
  category
    .findByIdAndDelete(req.params.id)
    .then((category) => res.json("category deleted."))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/update/:id").post((req, res) => {
  category
    .findById(req.params.id)
    .then((category) => {
      category.categoryname = req.body.categoryname; //it is getting the categoryname from the post request
      category.photographers = req.body.photographers;

      category
        .save()
        .then(() => res.json("category updated!"))
        .catch((err) => res.status(400).json("Error" + err));
    })
    .catch((err) => res.status(400).json("Error " + err));
});

module.exports = router;
