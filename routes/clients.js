const router = require("express").Router();
let clients = require("../models/clients.model"); //moongoose model we created

router.route("/").get((req, res) => {
  //this is /user url home
  clients
    .find() //mongoose database all the users
    .then((clients) => res.json(clients)) //results are returned in json format
    .catch((err) => res.status(400).json("Error " + err)); //error message
});

router.route("/add").post((req, res) => {
  const ClientName = req.body.ClientName; //it is getting the ClientName from the post request
  const ContactNumber = req.body.ContactNumber;
  const Email = req.body.Email;
  const Location = req.body.Location;
  const Category = req.body.Category;
  const Photographer = req.body.Photographer; //photographer id?
  const Budget = req.body.Budget;
  const Expertise = req.body.Expertise;
  const Event_Description = req.body.Event_Description;
  const Approved = req.body.Approved;
  const date = Date.parse(req.body.date);

  const newclients = new clients({
    ClientName,
    ContactNumber,
    Email,
    Location,
    Category,
    Photographer,
    Budget,
    Expertise,
    Event_Description,
    Approved,
    date,
  });
  newclients
    .save() //save the usker
    .then(() => res.json("clients added!"))
    .catch((err) => res.status(400).json("Error " + err)); //else error message
});

router.route("/:id").get((req, res) => {
  //clients return by id
  clients
    .findById(req.params.id)
    .then((clients) => res.json(clients))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/:id").delete((req, res) => {
  //delete clients by id
  clients
    .findByIdAndDelete(req.params.id)
    .then((clients) => res.json("clients deleted."))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/update/:id").post((req, res) => {
  clients
    .findById(req.params.id)
    .then((clients) => {
      clients.ClientName = req.body.ClientName; //it is getting the ClientName from the post request
      clients.ContactNumber = req.body.ContactNumber;
      clients.Email = req.body.Email;
      clients.Location = req.body.Location;

      clients.Category = req.body.Category;
      clients.Photographer = req.body.Photographer; //photographer id?
      clients.Budget = Number(req.body.Budget);
      clients.Expertise = req.body.Expertise;
      clients.Event_Description = req.body.Event_Description;
      clients.Approved = req.body.Approved;

      clients.date = Date.parse(req.body.date);

      clients
        .save()
        .then(() => res.json("clients updated!"))
        .catch((err) => res.status(400).json("Error" + err));
    })
    .catch((err) => res.status(400).json("Error " + err));
});

module.exports = router;
