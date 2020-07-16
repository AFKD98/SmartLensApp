import React, { Component } from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import bg from "../assets/wedding_cover.jpg";
import "../styles/photographerProfile.css";
import "../styles/EditphotographerProfile.css";
import axios from "axios";
import ImageUploader from "react-images-upload";
import HomePhoto3 from "../assets/homephoto3.jpg";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { validateUrl } from "youtube-validate";
import { validateVideoID } from "youtube-validate";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePic: "",
      coverPic: "",
      profilePicture: {},
      photos: [],
      videos: [],
      name: "",
      aboutme: "",
      location: "",
      price: "",
      equipment: "",
      videoURL: "",
      displayPhotos: false,
      displayVideos: false,
      editname: false,
      editaboutme: false,
      editlocation: false,
      editprice: false,
      editequipment: false,
      editvideos: false,
    };
    this.photoClick = this.photoClick.bind(this);
    this.videoClick = this.videoClick.bind(this);
    this.editClick = this.editClick.bind(this);
    this.updateClick = this.updateClick.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.videoHandler = this.videoHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onVideoChangeHandler = this.onVideoChangeHandler.bind(this);
    this.deleteVideo = this.deleteVideo.bind(this);
  }
  deleteVideo(video) {
    console.log(video);

    axios
      .post(
        "https://smartlensapplication.herokuapp.com/photographers/deleteVideo/" +
          this.props.match.params.id,
        {
          VideoURL: video,
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
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

  videoHandler(event) {
    event.preventDefault();

    this.setState(
      {
        videos: this.state.videos.concat(this.state.videoURL),
      },
      async () => {
        try {
          await axios
            .post(
              "https://smartlensapplication.herokuapp.com/photographers/updatetext/" +
                this.props.match.params.id,
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
                videos: this.state.videos,
                date: this.state.date,
              }
            )
            .then(function (response) {
              console.log(response);
              console.log(this.state.videoURL);
            })
            .catch(function (error) {
              console.log(error);
            });
        } catch (e) {
          console.log("error in post request");
        }
      }
    );
  }
  onChangeHandler(event) {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }
  onVideoChangeHandler(event) {
    let nam = event.target.name;
    let val = event.target.value;
    val = event.target.value.replace("watch?v=", "embed/");
    console.log(val);
    this.setState({ [nam]: val });
  }

  updateClick(parameter, event) {
    event.preventDefault();
    let keyHolder = parameter;
    let valHolder = "edit" + parameter;
    let refHolder = "this.refs." + parameter + "Input.value";
    let a = parameter + "Input";
    console.log(event.target);
    // this.setState({
    //   [keyHolder]: eval(refHolder),
    //   [valHolder]: false,
    // });
    this.setState(
      { [keyHolder]: eval(refHolder), [valHolder]: false },
      async () => {
        try {
          await axios
            .post(
              "https://smartlensapplication.herokuapp.com/photographers/updatetext/" +
                this.props.match.params.id,
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
        } catch (e) {
          console.log("error in post request");
        }
      }
    );
  }
  onDrop(picture) {
    // event.preventDefault();
    this.setState({
      // pictures: this.state.pictures.concat(picture),
      profilePicture: picture,
      // pictures: picture,
    });
    axios
      .post(
        "https://smartlensapplication.herokuapp.com/photographers/update/" +
          this.props.match.params.id,
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
  componentDidMount() {
    //function runs at the start of component loading
    axios //sending a get request to get all the photographer info from Mongo
      .get(
        "https://smartlensapplication.herokuapp.com/photographers/" +
          this.props.match.params.id
      )
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
          date: res.data.date,
          // photographer: res.data,
        });
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  editVideo() {
    return (
      <div className="nametext pb-5">
        <input type="text" ref="videoInput" />
        <button
          className="btn btn-dark"
          onClick={(event) => this.updateClick("videos", event)}
        >
          ADD
        </button>
        <br />
      </div>
    );
  }
  render() {
    var photoCode = (
      <div>
        <br />
        {this.state.photos.map((photo, index) => (
          <div key={index}>
            <img
              key={index}
              src={`https://smartlensapplication.herokuapp.com/${photo}`}
              onerror="this.style.display='none';"
              alt="profilePhoto"
              className="profilePhoto pb-5"
            ></img>
            <Button className=" btn btn-danger imagedeletebutton">
              delete
            </Button>
            <br />
            <br />
          </div>
        ))}
        <ImageUploader
          withIcon={true}
          buttonText="Choose images"
          onChange={this.onDrop}
          imgExtension={[".jpg", ".gif", ".png", ".gif"]}
          maxFileSize={5242880}
        />
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
              onerror="this.style.display='none';"
              frameBorder="1"
              allow="accelerometer; autoplay; encrypted-media; 
                    gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <Button
              className=" btn btn-danger videodeletebutton"
              onClick={() => {
                this.deleteVideo(video);
              }}
            >
              delete
            </Button>
            <br />
            <br />
            <br />
            <br />
          </div>
        ))}
        <Form onSubmit={this.videoHandler}>
          <Form.Group
            controlId="videos"
            className="pr-md-2"
            onChange={this.onVideoChangeHandler}
          >
            <Form.Label>Add videos</Form.Label>
            <Form.Control
              name="videoURL"
              type="url"
              placeholder="Enter video URL"
            />
            <Button className="mt-3" className="btn btn-dark" type="submit">
              Submit
            </Button>
          </Form.Group>
        </Form>
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
          styles={{
            backgroundImage:
              "https://smartlensapplication.herokuapp.com/" +
              this.state.coverPic,
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
                src={
                  "https://smartlensapplication.herokuapp.com/" +
                  this.state.profilePic
                }
                onerror="this.style.display='none';"
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
              <div className="paratext pb-5">
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
              </div>
              <hr className="solid"></hr>
              <h2 className="pt-5">My Work</h2>
              <br />
              <br />
              <Button
                className="btn btn-dark"
                variant="primary fbutton"
                onClick={this.photoClick}
              >
                Show Photos
              </Button>
              {this.state.displayPhotos ? photoCode : null}
              <Button
                className="btn btn-dark"
                variant="primary"
                onClick={this.videoClick}
              >
                Show Videos
              </Button>

              {this.state.displayVideos ? videoCode : null}
            </div>
          </div>
        </div>
        {/* END CONTENT */}
      </div>
    );
  }
}

export default Profile;
