const router = require("express").Router();
let photographers = require("../models/photographers.model"); //moongoose model we created
let category = require("../models/category.model"); //moongoose model we created
const multer = require("multer");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//const upload = multer({ dest: "uploads/" });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 1024, //file size of the image
  },
  fileFilter: fileFilter,
});

router.route("/").get((req, res) => {
  //this is /user url home
  photographers
    .find() //mongoose database all the users
    .then((photographers) => res.json(photographers)) //results are returned in json format
    .catch((err) => res.status(400).json("Error " + err)); //error message
});

var cpUpload = upload.fields([
  { name: "ProfilePic", maxCount: 1 },
  { name: "CoverPic", maxCount: 1 },
  { name: "photos", maxCount: 1 },
]);

router.route("/add").post(auth, cpUpload, (req, res) => {
  // console.log("req files", req.files);
  var { Name, Email, Password } = req.body;

  // Simple validation
  if (!Name || !Email || !Password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for exisiting user
  photographers
    .findOne({ Email })
    .then((user) => {
      if (user)
        return res
          .status(400)
          .json({ msg: `User already exists ${user.Email}` });
      else {
        const _id = new mongoose.Types.ObjectId();
        const Username = req.body.Username;
        const ContactNumber = req.body.ContactNumber;
        const Calendar = req.body.Calendar; //calendar link
        const Level = req.body.Level;
        const Range = req.body.Range;
        const Address = req.body.Address;
        const Equipment = req.body.Equipment;
        const Bio = req.body.Bio;
        var Category = req.body.Category; //check number of categories
        const ProfilePic = req.body.ProfilePic; //profile picture link
        const CoverPic = req.body.CoverPic;
        // const ProfilePic = req.files["ProfilePic"][0].path.replace(/\\/g, "/"); //profile picture link
        // const CoverPic = req.files["CoverPic"][0].path.replace(/\\/g, "/");
        const date = Date.parse(req.body.date);
        const videos = req.body.videos;

        const newphotographers = new photographers({
          _id: _id,
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
          date,
          videos,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newphotographers.Password, salt, (err, hash) => {
            if (err) console.log("hash err", err);
            newphotographers.Password = hash;

            newphotographers
              .save() //save the user
              .then((user) => {
                jwt.sign(
                  { id: user.id },
                  config.get("jwtSecret"),
                  { expiresIn: 3600 },
                  (err, token) => {
                    if (err) throw err;
                    res.json({
                      token: token,
                      user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                      },
                    });
                  }
                );
                // console.log(newphotographers);
                // Category = JSON.parse(Category);
                // console.log(Category);
                // var i = 0;
                // var br = 0;
                // for (i = 0; i < Category.length && br != 1; i++) {
                //   console.log(i);
                //   console.log(Category[i]);
                //   category
                //     .find({ categoryname: Category[i] })
                //     .then((category) => {
                //       console.log(category);
                //       category[0].categoryname = category[0].categoryname;
                //       if (category[0].photographers[0] == "undefined") {
                //         category[0].photographers = [];
                //       }
                //       category[0].photographers.push(_id);
                //       console.log(category);
                //       category[0]
                //         .save()
                //         .then(() => {
                //           console.log(i);
                //           console.log(Category.length);
                //           if (i == Category.length) {
                //             res.json("category updated & photographers added!");
                //             br = 1;
                //           }
                //         })
                //         .catch((err) => console.log("1Error " + err));
                //     })
                //     .catch((err) => console.log("2Error " + err));
                // }
              });
          });
        });
      }
    })
    .catch((err) => res.status(400).json("findOne " + err)); //else error message

  // .catch((err) => console.log("3Error " + err)); //else error message
});

router.post("/login", (req, res) => {
  const { Email, Password } = req.body;

  // Simple validation
  if (!Email || !Password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for exisiting user
  photographers.findOne({ Email }).then((photographer) => {
    if (!photographer)
      return res.status(400).json({ msg: "Photographer does not exist" });

    // Validate password
    bcrypt.compare(Password, photographer.Password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      jwt.sign(
        { id: photographer.id },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token: token,
            user: {
              id: photographer.id,
              name: photographer.Name,
              email: photographer.Email,
            },
          });
        }
      );
    });
  });
});

router.route("/:id").get((req, res) => {
  //photographer return by id
  photographers
    .findById(req.params.id)
    .then((photographers) => res.json(photographers))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/:id").delete(auth, (req, res) => {
  //delete photographer by id
  photographers
    .findByIdAndDelete(req.params.id)
    .then((photographers) => res.json("Photographer deleted."))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/update/:id").post(cpUpload, (req, res) => {
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

      photographers.ProfilePic = req.files["ProfilePic"][0].path.replace(
        /\\/g,
        "/"
      ); //profile picture link
      photographers.CoverPic = req.files["CoverPic"][0].path.replace(
        /\\/g,
        "/"
      );
      photographers.photos.push(
        req.files["photos"][0].path.replace(/\\/g, "/")
      );
      photographers.date = Date.parse(req.body.date);
      photographers.videos.push(req.body.videos);

      photographers
        .save()
        .then(() => res.json("Photographer updated!"))
        .catch((err) => res.status(400).json("save par Error" + err));
    })
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/deleteVideo/:id").post((req, res) => {
  photographers
    .findById(req.params.id)
    .then((photographers) => {
      photographers.videos.findOneAndDelete(req.body.VideoURL);

      photographers
        .save()
        .then(() => res.json("Video Deleted!"))
        .catch((err) =>
          res.status(400).json("Error while deleting video" + err)
        );
    })
    .catch((err) => res.status(400).json("Error " + err));
});
router.route("/updatetext/:id").post((req, res) => {
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

      photographers.date = Date.parse(req.body.date);
      photographers.videos = req.body.videos;

      photographers
        .save()
        .then(() => res.json("Photographer updated!"))
        .catch((err) => res.status(400).json("Error" + err));
    })
    .catch((err) => res.status(400).json("Error " + err));
});

// @route   GET api/aith/user
// @desc    Get user data
// @access  Private
router.get("/getuser", auth, (req, res) => {
  photographers
    .findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

module.exports = router;
