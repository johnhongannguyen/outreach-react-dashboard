import React from "react";
import "./Mockup.css";

class Mockup extends React.Component {
  render() {
    return (
      <>
        <div className="mockupContainer">
          <div className="imgMockup">
            <img
              src="/images/mobile.svg"
              alt="Mockups"
              className="phoneMockups"
            ></img>
          </div>
          <div className="downloadAppBtn">
            <p>Easy Sign Up</p>
            <div className="googlePlay">
              <img src="/images/GooglePlay.svg" alt="GooglePlay"></img>
              <img src="/images/AppStore.svg" alt="AppStore"></img>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Mockup;
