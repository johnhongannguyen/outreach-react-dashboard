import React, { Component } from "react";

// Importing Features Component
import Features from "./FeatureComponent";

// Importing styles from stylesheet
import "./AllFeatures.css";


// Stateful component
class AllFeatures extends Component {
  state = {

    // An array of features
    features: [
      {
        icon: "Icon 1",
        title: "Volunteer Opportunities",
        description:
          "You can see various volunteering opportunities from different relief centres."
      },
      {
        icon: "Icon 2",
        title: "Filtered Results",
        description:
          "Filter using your availability, types of jobs preferred and locations."
      },
      {
        icon: "Icon 3",
        title: "Admin Panel",
        description:
          "An admin to assign you volunteer requests and manage volunteers to the centres. "
      }
    ]
  };
  render() {
    return (

        // Section of Features
      <div className="features-section">

          {/* Heading of Features Section */}
        <div className="features-heading">How Outreach Helps</div>

        {/* Using FEATURES component */}
        <Features features={this.state.features} />
      </div>
    );
  }
}

export default AllFeatures;
