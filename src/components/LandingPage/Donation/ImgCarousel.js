import React, { Component } from "react";
import img from "./image.jpg";
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
      <Carousel autoPlay="true" transitionTime="350" infiniteLoop="true">
        <div>
          <img src={img} />
        </div>
        <div>
          <img src={img} />
        </div>
        <div>
          <img src={img} />
        </div>
      </Carousel>
    );
  }
}

export default ImgCarousel;
