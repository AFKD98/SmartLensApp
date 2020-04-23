import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import bg from "../assets/wedding_cover.jpg";
import "../styles/photographerProfile.css";

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

  render() {
    var photoCode = (
      <div>
        <br />
        {this.state.photos.map((photo, index) => (
          <div>
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
          <div>
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
              <div className="sticky-top">
                <h1>Calender here</h1>
              </div>
            </div>
            <div className="col moveup" id="main">
              <img
                src={require("../assets/p2.jpg")}
                alt="Avatar"
                className="prof1"
              ></img>
              <h2 className="py-5">Name Surname</h2>
              <hr class="solid"></hr>
              <h2 class="pt-5">About Me</h2>
              <p class="paratext pb-5">
                I have shot hundreds of differnt stories (weddings, engagements,
                parties of all kinds, family reunions etc.) around the globe.
                The best rewards I get are those warm words about my ability to
                capture sincere emotions in a creative way. I do love
                photography - it's so exciting!
              </p>
              <hr class="solid"></hr>
              <h2 class="pt-5">Details</h2>
              <p class="paratext pb-5">
                Location: DHA Phase 5, Lahore <br />
                Price: Rs. 25k per day <br />
                Equipment: Nikon Coolpix S9700
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
            </div>
          </div>
        </div>
        {/* END CONTENT */}
      </div>
    );
  }
}

export default Profile;
