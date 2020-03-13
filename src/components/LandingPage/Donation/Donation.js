import React, { Component } from "react";

// Importing styles from stylesheet
import "./Donation.css";
// Importing Image Carousel
import ImgCarousel from "./ImgCarousel.js";

// Stateful component
class Donation extends Component {
  state = {
    // An array of images
  };
  render() {
    return (
      // Section of Donation
      <div className="donation">
        <div className="donation-gradientDiv">
          <div className="donation-section">
            {/* Image Carousel Part of section */}
            <div class="donation-image-slider">
              {/* Calling ImageCarousel Components */}
              <ImgCarousel />
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
      </div>
    );
  }
}

export default Donation;
