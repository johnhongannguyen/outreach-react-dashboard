import React, { useState } from "react";

// Importing Styles
import "./Outreachuserflow.css";

// Importing svg paths
import Path1 from "./userflow-line-1.svg";
import Path2 from "./userflow-line-2.svg";

// Importing svg icons
import ChoosePreference from "./choose-preference.svg";
import SendRequest from "./send-request.svg";
import StartVolunteering from "./start_volunteering.svg";

// Stateless component
export default function Outreachuserflow() {
  return (
    // START - Outer container
    <div className="userflow-section">
      {/* Main heading */}
      <div className="userflow-heading">How Outreach Works</div>

      {/* START - Div container for all the images and text */}
      <div className="outreach-work-process">
        {/* START - First process  */}
        <div class="step-first-container">
          {/* Choose preference svg icon */}
          <img
            src={ChoosePreference}
            className="choose-preference-svg"
            viewBox="0 0 60 100"
          />

          <div class="first-information-step">
            <div className="header">Choose preferences</div>
            <div className="userflow-description">
              Users choose their volunteering preferences like availability,
              type of work and location.
            </div>
          </div>
        </div>
        {/* END - First process */}

        {/* First path svg image */}
        <img src={Path1} className="first-path" viewBox="0 0 60 100" />

        {/* START - Second process used for mobile view  */}
        <div class="step-second-container">
          {/* Send request svg icon */}
          <img
            src={SendRequest}
            className="send-request-svg"
            viewBox="0 0 60 100"
          />

          <div class="second-information-step">
            <div className="header">Send request to centers</div>
            <div className="userflow-description">
              Send request for the most suitable volunteer opportunity.
            </div>
          </div>
        </div>
        {/* END - Second process used for mobile view  */}

        {/* START - Second process used for web view  */}
        <div class="step-second-container-duplicate">
          <div class="second-information-step-duplicate">
            <div className="header">Send request to centers</div>
            <div className="userflow-description">
              Send request for the most suitable volunteer opportunity.
            </div>
          </div>

          {/* Send request svg icon */}
          <img
            src={SendRequest}
            className="send-request-svg-duplicate"
            viewBox="0 0 60 100"
          />
        </div>
        {/* END - Second process used for web view  */}

        {/* Second path svg image */}
        <img src={Path2} className="second-path" viewBox="0 0 60 100" />

        {/* START - Third process  */}
        <div class="step-three-container">
          {/* Start volunteering svg icon */}
          <img
            src={StartVolunteering}
            width="200px"
            height="200px"
            className="start-volunteering-svg"
            viewBox="0 0 60 100"
          />

          <div class="third-information-step">
            <div className="header">Start Volunteering</div>
            <div className="userflow-description">
              Start volunteering after admin's confirmation.
            </div>
          </div>
        </div>
        {/* END - Third process  */}
      </div>
      {/* END - Div container for all the images and text */}
    </div>
    // END - Outer container
  );
}
