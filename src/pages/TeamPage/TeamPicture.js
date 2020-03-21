import React from "react";
import "./Team.css";

class TeamPage extends React.Component {
  //Array to create Team members
  state = {
    teamMembers: [
      {
        name: "Angel Augustine",
        Description: "PM | Front-end Developer",
        img: "/images/Angel.jpg",
        // github/Linkdin icons resources: https://fontawesome.com/
        github: "/images/github-logo.png",
        gitlink: "https://github.com/AngelAugustine",
        linkdin: "/images/linkdin-logo.png",
        link: "https://www.linkedin.com/in/angel-augustine-131219121/"
      },
      {
        name: "Jasmine Kaur",
        Description: "QA | Front-end Developer",
        img: "/images/Jasmine.jpg",
        // github/Linkdin icons resources: https://fontawesome.com/
        github: "/images/github-logo.png",
        gitlink: "https://github.com/jasminekaur95",
        linkdin: "/images/linkdin-logo.png",
        link: "https://www.linkedin.com/in/jasmine-kaur-914656195/"
      },

      {
        name: "Nikhil Wadekar",
        Description: "Full-stack Developer",
        img: "/images/Nikhil.jpg",
        // github/Linkdin icons resources: https://fontawesome.com/
        github: "/images/github-logo.png",
        gitlink: "https://github.com/nikhilrwadekar",
        linkdin: "/images/linkdin-logo.png",
        link: "https://www.linkedin.com/in/nwadekar/"
      },
      {
        name: "Davinder Dhindsa",
        Description: "Lead Designer | UX",
        img: "/images/Davinder.jpg",
        // github/Linkdin icons resources: https://fontawesome.com/
        github: "",
        linkdin: "/images/linkdin-logo.png",
        link: "https://www.linkedin.com/in/davinder-singh-00b8ab197/"
      },
      {
        name: "Blandy Castro",
        Description: "Front-end Developer",
        img: "/images/Blandy.jpg",
        // github/Linkdin icons resources: https://fontawesome.com/
        github: "/images/github-logo.png",
        gitlink: "https://github.com/BlandyC",
        linkdin: "/images/linkdin-logo.png",
        link: "https://www.linkedin.com/in/blandy-castro-a43010199/"
      },
      {
        name: "Satnam Thandi",
        Description: "Front-end Developer",
        img: "/images/Sam.jpg",
        // github/Linkdin icons resources: https://fontawesome.com/
        github: "/images/github-logo.png",
        gitlink: "https://github.com/ssingh124",
        linkdin: "/images/linkdin-logo.png",
        link: "https://www.linkedin.com/in/satnam-singh-50b3ba194/"
      },
      {
        name: "John Nguyen",
        Description: "Front-end Developer",
        img: "/images/Sam.jpg",
        // github/Linkdin icons resources: https://fontawesome.com/
        github: "/images/github-logo.png",
        gitlink: "https://github.com/johnhongannguyen",
        linkdin: "/images/linkdin-logo.png",
        link: "https://www.linkedin.com/in/john-nguyen-743832183"
      },
      {
        name: "Darshpreet Kaur",
        Description: "UI Designer",
        img: "/images/Darshpreet.jpg",
        // github/Linkdin icons resources: https://fontawesome.com/
        github: "",
        linkdin: "/images/linkdin-logo.png",
        link: "https://www.linkedin.com/in/darshpreet-kaur-025664125"
      },
      {
        name: "Manpreet Kaur",
        Description: "UI Designer",
        img: "/images/Darshpreet.jpg",
        // github/Linkdin icons resources: https://fontawesome.com/
        github: "",
        linkdin: "/images/linkdin-logo.png",
        link: "https://www.linkedin.com/in/manpreet-kaur-8b1520181"
      },
      {
        name: "Sandeep Singh",
        Description: "QA | UI Designer",
        img: "/images/Angel.jpg",
        // github/Linkdin icons resources: https://fontawesome.com/
        github: "",
        linkdin: "/images/linkdin-logo.png",
        link: "https://www.linkedin.com/in/sandeep-singh-288176132"
      }
    ]
  };
  // Resource from: https://flaviocopes.com/react-how-to-loop/.
  //Function to loop trough the first four elements of the array
  // teamMembers and push the properties into
  // a new array member including the html tags.
  createMember = () => {
    let member = [];

    for (let i = 0; i <= 9; i++) {
      let children = [];
      children.push(
        <img
          src={this.state.teamMembers[i].img}
          alt={this.state.teamMembers[i].name}
          className="img_teamPage"
        />
      );

      let children1 = [];
      children1.push(this.state.teamMembers[i].name);

      let children2 = [];
      children2.push(this.state.teamMembers[i].Description);

      let github = [];
      github.push(
        <a href={this.state.teamMembers[i].gitlink}>
          <img
            src={this.state.teamMembers[i].github}
            alt="github"
            className="img_git"
          />
        </a>
      );

      let linkdin = [];
      linkdin.push(
        <a href={this.state.teamMembers[i].link}>
          <img
            src={this.state.teamMembers[i].linkdin}
            alt="linkdin"
            className="img_link"
          />
        </a>
      );

      member.push(
        <div className="memberInfo">
          <div className="team-holder">
            <div className="img-holder">{children}</div>
            <div className="txt-holder">
              {" "}
              <h5>{children1}</h5>
              <p>{children2}</p>
              {github}
              {linkdin}
            </div>
          </div>
        </div>
      );
    }
    return member;
  };

  render() {
    return (
      <div className="teamPage">
        <div className="tp-header">
          <h1>Meet Our Team</h1>
          <p>
            Our team consists of 10 members with varied expertise in design,
            visual graphics, content management and software development. We are
            always striving to solve problems in our community, through elegant
            development and design decisions.
          </p>
          <p>
            With <span>Outreach</span> we have tried to come up with a solution
            for managing people like us, who are willing to volunteer, post a
            disaster.
          </p>
        </div>

        <div className="team-members">{this.createMember()}</div>
      </div>
    );
  }
}

export default TeamPage;

// display: flex;
// flex-wrap: wrap;
// justify-content: center
// width: 25%;
