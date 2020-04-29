import React, { Component } from "react";
import Button from "react-bootstrap/Button";
// import ToggleButton from "react-bootstrap/ToggleButton";
// import bg from "../assets/wedding_cover.jpg";
import "../styles/photographerProfile.css";
import axios from "axios";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [
        "assets/home2.jpg",
        "assets/homephoto2.png",
        "assets/homephoto3.jpg",
        "assets/Recommend.jpg",
      ],

      videos: [
        "https://www.youtube.com/embed/O41OuELay_A",
        "https://www.youtube.com/embed/A6zLsU7RhX4",
        "https://www.youtube.com/embed/C0_uv535Gzw",
      ],
      name: "",
      aboutme: "",
      location: "",
      price: "",
      equipment: "",
      yes: "",
      displayPhotos: false,
      displayVideos: false,
    };
    this.photoClick = this.photoClick.bind(this);
    this.videoClick = this.videoClick.bind(this);
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

  componentDidMount() {
    //function runs at the start of component loading
    axios //sending a get request to get all the photographer info from Mongo
      .get("http://localhost:5000/photographers/" + this.props.match.params.id)
      .then((res) => {
        //res.data.map((entree) =>
        this.setState({
          name: res.data.Name,
          aboutme: res.data.Bio,
          location: res.data.Address,
          price: res.data.Range,
          equipment: res.data.Equipment,
        });

        //);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    let photoCode = (
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

    let videoCode = (
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

    return (
      <div>
        {/* START JUMBOTRON */}
        <div className="jumbotron jumbotron-fluid one">
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
                src={require("../assets/p2.jpg")}
                alt="Avatar"
                className="prof1"
              ></img>
              <br />
              <a
                className="btn btn-dark mx-auto my-auto"
                href={"/recommendation/" + this.props.match.params.id}
              >
                Book Now
              </a>
              <h2 className="py-5">{this.state.name}</h2>
              <hr className="solid"></hr>
              <h2 className="pt-5">About Me</h2>
              <p className="paratext pb-5">{this.state.aboutme}</p>
              <hr className="solid"></hr>
              <h2 className="pt-5">Details</h2>
              <p className="paratext pb-5">
                Location: {this.state.location} <br />
                Price: {this.state.price} <br />
                Equipment: {this.state.equipment}
              </p>
              <hr className="solid"></hr>
              <h2 className="pt-5">My Work</h2>
              <br />
              <br />
              <Button variant="btn btn-dark fbutton" onClick={this.photoClick}>
                Show Photos
              </Button>
              {this.state.displayPhotos ? photoCode : null}

              <Button variant="btn btn-dark" onClick={this.videoClick}>
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