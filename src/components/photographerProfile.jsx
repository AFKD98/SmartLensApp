import React, { Component } from "react";
import bg from "../assets/wedding_cover.jpg";
import "../styles/photographerProfile.css";

class Profile extends Component {
    state = {

    };

    render(){
        return (
            <div>
                {/* START JUMBOTRON */}
                <div className = "jumbotron jumbotron-fluid one">
                    <div className = "container">
                        
                    </div>
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
                            <img src = {require('../assets/p2.jpg')} alt = "Avatar" className="prof1"></img>
                            <h2 className="py-5">Name Surname</h2>
                            <hr class="solid"></hr>
                            <h2 class="pt-5">About Me</h2>
                            <p class="paratext pb-5">I have shot hundreds of differnt stories (weddings, engagements,
                                parties of all kinds, family reunions etc.) around the globe.
                                The best rewards I get are those warm words about my ability to
                                capture sincere emotions in a creative way. I do love photography - 
                                it's so exciting!
                            </p>
                            <hr class="solid"></hr>
                            <h2 class="pt-5">Details</h2>
                            <p class="paratext pb-5">
                                Location: DHA Phase 5, Lahore <br/>
                                Price: Rs. 25k per day <br/>
                                Equipment: Nikon Coolpix S9700
                            </p>
                            <hr class="solid"></hr>
                            <h2 class="pt-5">My Work</h2>
                            <img src = {require('../assets/homephoto2.png')} alt = "profilePhoto" className="profilePhoto pb-5"></img>
                        </div>
                    </div>
                </div>




                <div className = "container">
                    <img src = {require('../assets/p2.jpg')} alt = "Avatar" className="prof1"></img>
                    <h2 class="py-5">Name Surname</h2>
                    <hr class="solid"></hr>
                    <h2 class="pt-5">About Me</h2>
                    <p class="paratext pb-5">I have shot hundreds of differnt stories (weddings, engagements,
                        parties of all kinds, family reunions etc.) around the globe.
                        The best rewards I get are those warm words about my ability to
                        capture sincere emotions in a creative way. I do love photography - 
                        it's so exciting!
                    </p>
                    <hr class="solid"></hr>
                    <h2 class="pt-5">Details</h2>
                    <p class="paratext pb-5">
                        Location: DHA Phase 5, Lahore <br/>
                        Price: Rs. 25k per day <br/>
                        Equipment: Nikon Coolpix S9700
                    </p>
                    <hr class="solid"></hr>
                    <h2 class="pt-5">My Work</h2>
                    <img src = {require('../assets/homephoto2.png')} alt = "profilePhoto" className="profilePhoto pb-5"></img>
                </div>
                {/* END CONTENT */}
            </div>

        )
    }
}

export default Profile;
