import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import bg from "../assets/wedding_cover.jpg";
import "../styles/photographerProfile.css";
import "../styles/EditphotographerProfile.css";
import axios from "axios";
import ImageUploader from "react-images-upload";
import HomePhoto3 from "../assets/homephoto3.jpg";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePic: "",
      coverPic: "",
      pictures: [],
      photos: [
        // "assets/home2.jpg",
        // "assets/homephoto2.png",
        // "assets/homephoto3.jpg",
        // "assets/Recommend.jpg",
      ],

      videos: [
        // "https://www.youtube.com/embed/O41OuELay_A",
        // "https://www.youtube.com/embed/A6zLsU7RhX4",
        // "https://www.youtube.com/embed/C0_uv535Gzw",
      ],
      name: "",
      aboutme: "",
      location: "",
      price: "",
      equipment: "",
      displayPhotos: false,
      displayVideos: false,
      editname: false,
      editaboutme: false,
      editlocation: false,
      editprice: false,
      editequipment: false,
    };
    this.photoClick = this.photoClick.bind(this);
    this.videoClick = this.videoClick.bind(this);
    this.editClick = this.editClick.bind(this);
    this.updateClick = this.updateClick.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  photoClick() {
    this.setState({
      displayPhotos: !this.state.displayPhotos,
    });
  }

  videoClick() {
    this.setState({
      displayVideos: !this.state.displayVideos,
    });
  }

  editClick(parameter, event) {
    let keyHolder = "edit" + parameter;
    let valHolder = "this.state.edit" + parameter;
    console.log("Before the state is", this.state.editname);
    this.setState({
      [keyHolder]: [valHolder],
    });
    console.log("After the state is ", this.state.editname);
  }

  updateClick(parameter, event) {
    event.preventDefault();
    let keyHolder = parameter;
    let valHolder = "edit" + parameter;
    let refHolder = "this.refs." + parameter + "Input.value";
    let a = parameter + "Input";
    this.setState({
      [keyHolder]: eval(refHolder),
      [valHolder]: false,
    });
    // console.log(this.state.photographer);
    axios
      .post(
        "http://localhost:5000/photographers/update/5eadc2a882d5d9458437ab4d",
        {
          //  this.state.photographer
          Name: this.state.name,
          Username: this.state.userName,
          Password: this.state.password,
          ContactNumber: this.state.contact,
          Email: this.state.email,
          Calendar: this.state.calendar, //calendar link
          Level: this.state.level,
          Range: this.state.price,
          Address: this.state.location,
          Equipment: this.state.equipment,
          Bio: this.state.aboutme,
          Category: this.state.categories, //check number of categories
          ProfilePic: this.state.profilePic, //profile picture link
          CoverPic: this.state.coverPic,
          photos: this.state.photos,
          videos: this.state.videos,
          date: this.state.date,
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  onDrop(picture) {
    // event.preventDefault();
    this.setState({
      pictures: this.state.pictures.concat(picture),
      // pictures: picture,
    });
    axios
      .post(
        "http://localhost:5000/photographers/update/5eadc2a882d5d9458437ab4d",
        {
          //  this.state.photographer
          Name: this.state.name,
          Username: this.state.userName,
          Password: this.state.password,
          ContactNumber: this.state.contact,
          Email: this.state.email,
          Calendar: this.state.calendar, //calendar link
          Level: this.state.level,
          Range: this.state.price,
          Address: this.state.location,
          Equipment: this.state.equipment,
          Bio: this.state.aboutme,
          Category: this.state.categories, //check number of categories
          ProfilePic: this.state.profilePic, //profile picture link
          CoverPic: this.state.coverPic,
          photos: this.state.photos,
          videos: this.state.videos,
          date: this.state.date,
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(this.state.pictures);
  }
  componentWillMount() {
    //function runs at the start of component loading
    axios //sending a get request to get all the photographer info from Mongo
      .get("http://localhost:5000/photographers/5eadc2a882d5d9458437ab4d")
      .then((res) => {
        //res.data.map((entree) =>
        // console.log(res.data);
        this.setState({
          name: res.data.Name,
          userName: res.data.Username,
          password: res.data.Password,
          aboutme: res.data.Bio,
          categories: res.data.Category,
          location: res.data.Address,
          price: res.data.Range,
          contact: res.data.ContactNumber,
          equipment: res.data.Equipment,
          coverPic: res.data.CoverPic,
          profilePic: res.data.ProfilePic,
          level: res.data.Level,
          calendar: res.data.Calendar,
          photos: res.data.photos,
          email: res.data.Email,
          videos: res.data.videos,
          // photographer: res.data,
        });
        console.log(this.state.coverPic);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    var photoCode = (
      <div>
        <br />
        {this.state.photos.map((photo, index) => (
          <div key={index}>
            <img
              key={index}
              src={require(`../${photo}`)}
              alt="profilePhoto"
              className="profilePhoto pb-5"
            ></img>
            <br />
            <br />
          </div>
        ))}
      </div>
    );

    var videoCode = (
      <div>
        <br />
        {this.state.videos.map((video, index) => (
          <div key={index}>
            <iframe
              key={index}
              width="560"
              height="315"
              src={`${video}`}
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; 
                    gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <br />
            <br />
            <br />
            <br />
          </div>
        ))}
      </div>
    );

    var editNameCode = (
      <div className="nametext pb-5">
        <input type="text" defaultValue={this.state.name} ref="nameInput" />
        <button onClick={(event) => this.updateClick("name", event)}>
          Done
        </button>
        <br />
      </div>
    );

    var editAboutCode = (
      <div>
        <textarea
          className="abouttextbox"
          type="text"
          defaultValue={this.state.aboutme}
          ref="aboutmeInput"
        />
        <button
          className="aboutbutton"
          onClick={(event) => this.updateClick("aboutme", event)}
        >
          Done
        </button>
      </div>
    );

    var editLocationCode = (
      <div>
        <b>Location: </b>
        <input
          type="text"
          defaultValue={this.state.location}
          ref="locationInput"
        />
        <button onClick={(event) => this.updateClick("location", event)}>
          Done
        </button>
      </div>
    );

    var editPriceCode = (
      <div>
        <b>Price: </b>
        <input type="number" defaultValue={this.state.price} ref="priceInput" />
        <button onClick={(event) => this.updateClick("price", event)}>
          Done
        </button>
      </div>
    );

    var editEquipmentCode = (
      <div>
        <b>Equipment</b>
        <input
          type="text"
          defaultValue={this.state.equipment}
          ref="equipmentInput"
        />
        <button onClick={(event) => this.updateClick("equipment", event)}>
          Done
        </button>
      </div>
    );

    return (
      <div>
        {/* START JUMBOTRON */}
        <div
          style={{
            backgroundImage: "url(" + HomePhoto3 + ")",
          }}
          className="jumbotron jumbotron-fluid edit"
        >
          <div className="container"></div>
        </div>
        {/* END JUMBOTRON */}

        {/* START CONTENT */}

        <div className="container">
          <div className="row py-3">
            <div className="col-3 order-2" id="sidebar">
              <div className="sticky-top"></div>
            </div>
            <div className="col moveup" id="main">
              <img
                src={require("../" + this.state.profilePic)}
                alt="Avatar"
                className="prof1"
              ></img>
              {this.state.editname ? (
                editNameCode
              ) : (
                <h2
                  className="py-5"
                  onDoubleClick={(event) => this.editClick("name", event)}
                >
                  {this.state.name}
                </h2>
              )}
              <hr className="solid nameline"></hr>
              <h2
                className="pt-5"
                onDoubleClick={(event) => this.editClick("aboutme", event)}
              >
                About Me
              </h2>
              {this.state.editaboutme ? (
                editAboutCode
              ) : (
                <p
                  className="paratext pb-5"
                  onDoubleClick={(event) => this.editClick("aboutme", event)}
                >
                  {this.state.aboutme}
                </p>
              )}
              <hr className="solid"></hr>
              <h2 className="pt-5">Details</h2>
              <p className="paratext pb-5">
                {this.state.editlocation ? (
                  editLocationCode
                ) : (
                  <div
                    onDoubleClick={(event) => this.editClick("location", event)}
                  >
                    <b>Location: </b>
                    {this.state.location}
                  </div>
                )}

                <br />
                {this.state.editprice ? (
                  editPriceCode
                ) : (
                  <div
                    onDoubleClick={(event) => this.editClick("price", event)}
                  >
                    <b>Price: </b>
                    {this.state.price}
                  </div>
                )}

                <br />
                {this.state.editequipment ? (
                  editEquipmentCode
                ) : (
                  <div
                    onDoubleClick={(event) =>
                      this.editClick("equipment", event)
                    }
                  >
                    <b>Equipment: </b>
                    {this.state.equipment}
                  </div>
                )}
              </p>
              <hr class="solid"></hr>
              <h2 class="pt-5">My Work</h2>
              <br />
              <br />
              <Button variant="primary fbutton" onClick={this.photoClick}>
                Show Photos
              </Button>
              {this.state.displayPhotos ? photoCode : null}
              <Button variant="primary" onClick={this.videoClick}>
                Show Videos
              </Button>
              {this.state.displayVideos ? videoCode : null}
              <ImageUploader
                withIcon={true}
                buttonText="Choose images"
                onChange={this.onDrop}
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
              />
            </div>
          </div>
        </div>
        {/* END CONTENT */}
      </div>
    );
  }
}

export default Profile;
