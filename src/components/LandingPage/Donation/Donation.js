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
            <div className="donation-image-slider">
              {/* Calling ImageCarousel Components */}
              <ImgCarousel />
            </div>
            <div className="donation-info">
              {/* Heading of Donation Section */}
              <div className="donation-heading">
                Small Actions <span className="donation-x"> x </span>
                Lots of People
              </div>
              <div className="donation-change">
                = <span className="donation-big-change">Big Change</span>
              </div>

              <div className="donation-paragraph">
                Donations are used for providing essentials like food, water and
                medical care and will be assisting in rebuilding efforts. Help
                today!
              </div>
              <div className="donation-button-container">
                <input
                  type="button"
                  value="DONATE"
                  className="donation-btn"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Donation;
