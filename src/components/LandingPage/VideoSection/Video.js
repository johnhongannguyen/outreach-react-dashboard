import React from "react";
import "./Video.css";

const Video = () => {
  return (
    <div className="mainContent">
      <div className="bgVid-container">
        <video className="bgVid" autoPlay muted loop>
          <source
            // REFERNCE (video from coverr.co: https://coverr.co/videos/A%20Beautiful%20Vermont%20Road--ea7c5966-8a6f-4b5b-88bb-579d69d465cb)
            src="https://outreach-video-bucket.s3-us-west-2.amazonaws.com/Outreach_Hero_720p.mp4"
            type="video/mp4"
          />
        </video>
        <div className="contentOverlay">
          <h2>
            "Service to others is the rent you pay for your room here on Earth"
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Video;
