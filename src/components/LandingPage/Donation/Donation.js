import React, { Component } from "react";

// Importing styles from stylesheet
import "./Donation.css";

import img from "./image.jpg";

// Stateful component
class Donation extends Component {
  state = {
    // An array of images
    images: []
  };
  render() {
    return (
      // Section of Donation
      <div className="donation-gradientDiv">
        <div className="donation-section">
          <div class="donation-image-slider">
            <img src={img} alt="golf" />
          </div>
          <div class="donation-info">
            {/* Heading of Donation Section */}
            <div className="donation-heading">
              Small Actions x Lots of People
            </div>
            <div class="donation-change">
              = <span class="donation-big-change">Big Change </span>
            </div>

            <div class="donation-paragraph">
              Donations are used for providing essentials like food, water and
              medical acre and will be assisting in rebuilding efforts. Help
            </div>
            <div class="donation-button-container">
              <input type="button" value="DONATE" class="donation-btn" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Donation;
