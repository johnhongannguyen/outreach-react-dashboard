import React, { Component } from "react";

// Importing Features Component
import Features from "./FeatureComponent";

// Importing styles from stylesheet
import "./AllFeatures.css";

// Importing Typography component from material-ui
import Typography from "@material-ui/core/Typography";

// Importing svg icons
import VolunteerOpportunitiesIcon from "./Volunteer-Opportunities.svg";
import FilteredResultsIcon from "./Filtered-Results-Icon.svg";
import AdminPanelIcon from "./Admin-Panel.svg";

// Stateful component
class AllFeatures extends Component {
  state = {
    // An array of features
    features: [
      {
        icon: VolunteerOpportunitiesIcon,
        title: "Volunteer Opportunities",
        description:
          "You can see various volunteering opportunities from different relief centres."
      },
      {
        icon: FilteredResultsIcon,
        title: "Filtered Results",
        description:
          "Filter using your availability, types of jobs preferred and locations."
      },
      {
        icon: AdminPanelIcon,
        title: "Admin Panel",
        description:
          "An admin to assign volunteer requests and manage volunteers to the centres. "
      }
    ]
  };
  render() {
    return (
      // Section of Features
      <div className="features-section">
        {/* Heading of Features Section */}
        <Typography variant="h3" className="features-heading">
          Features
        </Typography>

        {/* Using FEATURES component */}
        <Features features={this.state.features} />
      </div>
    );
  }
}

// Exporting AllFeatures
export default AllFeatures;
