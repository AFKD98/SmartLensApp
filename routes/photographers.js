const router = require("express").Router();
let photographers = require("../models/photographers.model"); //moongoose model we created

router.route("/").get((req, res) => {
  //this is /user url home
  photographers
    .find() //mongoose database all the users
    .then((photographers) => res.json(photographers)) //results are returned in json format
    .catch((err) => res.status(400).json("Error " + err)); //error message
});

router.route("/add").post((req, res) => {
  const Name = req.body.Name;
  const Username = req.body.Username;
  const Password = req.body.Password;
  const ContactNumber = req.body.ContactNumber;
  const Email = req.body.Email;
  const Calendar = req.body.Calendar; //calendar link
  const Level = req.body.Level;
  const Range = req.body.Range;
  const Address = req.body.Address;
  const Equipment = req.body.Equipment;
  const Bio = req.body.Bio;
  const Category = req.body.Category; //check number of categories
  const ProfilePic = req.body.ProfilePic; //profile picture link
  const CoverPic = req.body.CoverPic;
  const photos = req.body.photos;
  const date = Date.parse(req.body.date);

  const newphotographers = new photographers({
    Name,
    Username,
    Password,
    ContactNumber,
    Email,
    Calendar, //calendar link
    Level,
    Range,
    Address,
    Equipment,
    Bio,
    Category, //check number of categories
    ProfilePic, //profile picture link
    CoverPic,
    photos,
    date,
  });
  newphotographers
    .save() //save the usker
    .then(() => res.json("Photographer added!"))
    .catch((err) => res.status(400).json("Error " + err)); //else error message
});

router.route("/:id").get((req, res) => {
  //photographer return by id
  photographers
    .findById(req.params.id)
    .then((photographers) => res.json(photographers))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/:id").delete((req, res) => {
  //delete photographer by id
  photographers
    .findByIdAndDelete(req.params.id)
    .then((photographers) => res.json("Photographer deleted."))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/update/:id").post((req, res) => {
  photographers
    .findById(req.params.id)
    .then((photographers) => {
      photographers.Name = req.body.Name;
      photographers.Username = req.body.Username;
      photographers.Password = req.body.Password;
      photographers.ContactNumber = req.body.ContactNumber;
      photographers.Email = req.body.Email;
      photographers.Calendar = req.body.Calendar; //calendar link
      photographers.Level = req.body.Level;
      photographers.Range = req.body.Range;
      photographers.Address = req.body.Address;
      photographers.Equipment = req.body.Equipment;
      photographers.Bio = req.body.Bio;
      photographers.Category = req.body.Category; //check number of categories
      photographers.ProfilePic = req.body.ProfilePic; //profile picture link
      photographers.CoverPic = req.body.CoverPic;
      photographers.photos = req.body.photos;
      photographers.date = Date.parse(req.body.date);

      photographers
        .save()
        .then(() => res.json("Photographer updated!"))
        .catch((err) => res.status(400).json("Error" + err));
    })
    .catch((err) => res.status(400).json("Error " + err));
});

module.exports = router;