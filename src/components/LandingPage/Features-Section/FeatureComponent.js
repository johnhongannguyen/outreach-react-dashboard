import React, { useState } from "react";

// Importing styles from stylesheet
import "./Features.css";

// Stateless Component
const Features = ({ features }) => {
  // const { features } = this.props;

  // Mapping each feature
  const featureList = features.map(feature => {
    return (
      // Container for each feature
      <div className="feature" key={feature.id}>
        {/* FEATURE ICON */}
        <div className="feature-icon">
          <img
            src={feature.icon}
            // width="400px"
            className="feature-img"
            viewBox="0 0 60 100"
          />
        </div>

        {/* FEATURE TITLE */}
        <div className="feature-title">{feature.title}</div>

        {/* FEATURE DESCRIPTION */}
        <div className="feature-description">{feature.description}</div>
      </div>
    );
  });

  // Rendering the feature-list
  return <div className="feature-list">{featureList}</div>;
};

// Exporting Features
export default Features;
