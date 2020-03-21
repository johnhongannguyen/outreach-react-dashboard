import React, { Component } from "react";
import img from "./image.jpg";
import img2 from "./two.jpg";

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
        infiniteLoop
        // axis="vertical"
        selectedItem={1}
        centerMode
        centerSlidePercentage={50}
        emulateTouch
      >
        <div>
          <img src={img} />
        </div>
        <div>
          <img src={img2} />
        </div>
        <div>
          <img src={img} />
        </div>
        <div>
          <img src={img2} />
        </div>
        <div>
          <img src={img} />
        </div>
        <div>
          <img src={img2} />
        </div>
      </Carousel>
    );
  }
}

export default ImgCarousel;
