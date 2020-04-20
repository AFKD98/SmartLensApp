const router = require("express").Router();
let Photographers = require("../models/Photographers.model"); //moongoose model we created

router.route("/").get((req, res) => {
  //this is /user url home
  Photographers.find() //mongoose database all the users
    .then((Photographers) => res.json(Photographers)) //results are returned in json format
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

  const Photographers = new Photographers({
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
  Photographers.save() //save the usker
    .then(() => res.json("Photographer added!"))
    .catch((err) => res.status(400).json("Error " + err)); //else error message
});

router.route("/:id").get((req, res) => {
  //photographer return by id
  Photographers.findById(req.params.id)
    .then((Photographers) => res.json(Photographers))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/:id").delete((req, res) => {
  //delete photographer by id
  Photographers.findByIdAndDelete(req.params.id)
    .then((Photographers) => res.json("Photographer deleted."))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/update/:id").post((req, res) => {
  Photographers.findById(req.params.id)
    .then((Photographers) => {
      Photographers.Name = req.body.Name;
      Photographers.Username = req.body.Username;
      Photographers.Password = req.body.Password;
      Photographers.ContactNumber = req.body.ContactNumber;
      Photographers.Email = req.body.Email;
      Photographers.Calendar = req.body.Calendar; //calendar link
      Photographers.Level = req.body.Level;
      Photographers.Range = req.body.Range;
      Photographers.Address = req.body.Address;
      Photographers.Equipment = req.body.Equipment;
      Photographers.Bio = req.body.Bio;
      Photographers.Category = req.body.Category; //check number of categories
      Photographers.ProfilePic = req.body.ProfilePic; //profile picture link
      Photographers.CoverPic = req.body.CoverPic;
      Photographers.photos = req.body.photos;
      Photographers.date = Date.parse(req.body.date);

      Photographers.save()
        .then(() => res.json("Photographer updated!"))
        .catch((err) => res.status(400).json("Error" + err));
    })
    .catch((err) => res.status(400).json("Error " + err));
});

module.exports = router;
