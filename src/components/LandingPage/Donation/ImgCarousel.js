import React, { Component } from "react";
import img1 from "./DonationImages/img1.jpg";
import img2 from "./DonationImages/img2.jpg";
import img3 from "./DonationImages/img3.jpg";
import img4 from "./DonationImages/img4.jpg";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./Donation.css";

// Stateful component
class ImgCarousel extends Component {
  state = {
    // An array of images
    images: []
  };
  render() {
    return (
      <Carousel
        autoPlay
        // transitionTime="150"
        showArrows={false}
        infiniteLoop
        // axis="vertical"
        selectedItem={1}
        centerMode
        centerSlidePercentage={50}
        emulateTouch
      >
        <div>
          <img src={img1} />
        </div>
        <div>
          <img src={img2} />
        </div>
        <div>
          <img src={img3} />
        </div>
        <div>
          <img src={img4} />
        </div>
        {/* <div>
          <img src={img2} />
        </div>
        <div>
          <img src={img2} />
        </div> */}
      </Carousel>
    );
  }
}

export default ImgCarousel;
