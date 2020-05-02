const router = require("express").Router();
const auth = require("../middleware/auth");
const Order = require("../models/order.model"); //moongoose model we created

// @route   GET /clients
// @desc    Get All clients
// @access  Private
router.route("/").get(auth, (req, res) => {
  Order.find() //mongoose database all the users
    .then((orders) => res.json(orders)) //results are returned in json format
    .catch((err) => res.status(400).json("orders.js Error " + err)); //error message
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

  const newOrder = new Order({
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
  newOrder
    .save() //save the usker
    .then(() => res.json(newOrder))
    .catch((err) => {
      res.status(400).json(err), console.log("err", err);
    }); //else error message
});

router.route("/:id").get(auth, (req, res) => {
  //clients return by id
  Order.findById(req.params.id)
    .then((orders) => res.json(orders))
    .catch((err) => res.status(400).json("orders.js Error " + err));
});

router.route("/:id").delete(auth, (req, res) => {
  //delete clients by id
  Order.findByIdAndDelete(req.params.id)
    .then(() => res.json("orders deleted."))
    .catch((err) => res.status(400).json("orders.js Error " + err));
});

router.route("/update/:id").post(auth, (req, res) => {
  Order.findById(req.params.id)
    .then((Order) => {
      Order.ClientName = req.body.ClientName; //it is getting the ClientName from the post request
      Order.ContactNumber = req.body.ContactNumber;
      Order.Email = req.body.Email;
      Order.Location = req.body.Location;

      Order.Category = req.body.Category;
      Order.Photographer = req.body.Photographer; //photographer id?
      Order.Budget = Number(req.body.Budget);
      Order.Expertise = req.body.Expertise;
      Order.Event_Description = req.body.Event_Description;
      Order.Approved = req.body.Approved;

      Order.date = Date.parse(req.body.date);

      Order.save()
        .then(() => res.json("Orders updated!"))
        .catch((err) => res.status(400).json("orders.js Error" + err));
    })
    .catch((err) => res.status(400).json("orders.js Error " + err));
});

module.exports = router;
