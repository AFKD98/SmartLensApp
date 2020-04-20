const router = require("express").Router();
let registration_photographer = require("../models/registration_photographer.model"); //moongoose model we created

router.route("/").get((req, res) => {
  //this is /user url home
  registration_photographer
    .find() //mongoose database all the users
    .then((registration_photographer) => res.json(registration_photographer)) //results are returned in json format
    .catch((err) => res.status(400).json("Error " + err)); //error message
});

router.route("/add").post((req, res) => {
  const Name = req.body.Name;
  const Username = req.body.Username;
  const ContactNumber = req.body.ContactNumber;
  const Email = req.body.Email;
  const Occupation = req.body.Occupation;
  const Equipment = req.body.Equipment;
  const Self_rating = req.body.Self_rating;
  const Category = req.body.Category; //check number of categories
  const Description = req.body.Description;
  const Sample_work = req.body.Sample_work;

  const newregistration_photographer = new registration_photographer({
    Name,
    Username,
    ContactNumber,
    Email,
    Occupation,
    Equipment,
    Self_rating,
    Category, //check number of categories
    Description, //profile picture link
    Sample_work,
  });
  newregistration_photographer
    .save() //save the usker
    .then(() => res.json("Photographer registration added!"))
    .catch((err) => res.status(400).json("Error " + err)); //else error message
});

router.route("/:id").get((req, res) => {
  //photographer return by id
  registration_photographer
    .findById(req.params.id)
    .then((registration_photographer) => res.json(registration_photographer))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/:id").delete((req, res) => {
  //delete photographer by id
  registration_photographer
    .findByIdAndDelete(req.params.id)
    .then((registration_photographer) =>
      res.json("Photographer registration deleted.")
    )
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/update/:id").post((req, res) => {
  registration_photographer
    .findById(req.params.id)
    .then((registration_photographer) => {
      registration_photographer.Name = req.body.Name;
      registration_photographer.Username = req.body.Username;
      registration_photographer.ContactNumber = req.body.ContactNumber;
      registration_photographer.Email = req.body.Email;
      registration_photographer.Occupation = req.body.Occupation;
      registration_photographer.Equipment = req.body.Equipment;
      registration_photographer.Self_rating = req.body.Self_rating;
      registration_photographer.Category = req.body.Category; //check number of categories
      registration_photographer.Description = req.body.Description; //profile picture link
      registration_photographer.Sample_work = req.body.Sample_work;

      registration_photographer
        .save()
        .then(() => res.json("Photographer registration updated!"))
        .catch((err) => res.status(400).json("Error" + err));
    })
    .catch((err) => res.status(400).json("Error " + err));
});

module.exports = router;
