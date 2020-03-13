import React from "react";
import axios from "axios";
import "./Contact.css";

// Refference for contact page https://reactjs.org/docs/forms.html

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      message: ""
    };
    // binding handleChange function with this.
    this.handleChange = this.handleChange.bind(this);
  }

  //function that handles changes in input field and assign values to state
  handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    // setting all value from contact page to state(where name is the field name(email) or value(ss@gmail.com) conatins value )
    this.setState({ [name]: value });
  }

  // Axios POST request to stay on the same page
  handleFormSubmit(e) {
    // ref https://www.w3schools.com/jsref/event_preventdefault.asp
    e.preventDefault();

    // Axios POST request to the server
    // Reference https://www.npmjs.com/package/axios
    axios
      .post("/submit", null, {
        params: {
          name: this.state.name,
          message: this.state.message,
          email: this.state.email
        }
      })
      .then(response => {
        this.setState({
          ...this.state,
          formSubmitMessage: response.data
        });
      });
  }

  render() {
    return (
      <div className="Contactmain">
        <div className="contact-image-form">
          <div className="gradientDiv">
            <div className="contact-section">
              <div className="ContactPage">
                <h1>Contact Us</h1>
                <p className="welcome-message">
                  Thank you for visiting our website. Feel free to send us a
                  message.
                </p>

                {Array.isArray(this.state.formSubmitMessage) ? (
                  <ul className="Contact-error">
                    {this.state.formSubmitMessage.map(errorMessage => (
                      <li>{errorMessage}</li>
                    ))}
                  </ul>
                ) : (
                  this.state.formSubmitMessage
                )}

                <form>
                  <p>Name</p>
                  <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                  <p>Email</p>
                  <input
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <p>Message</p>

                  <textarea
                    rows="4"
                    cols="50"
                    type="text"
                    name="message"
                    value={this.state.message}
                    onChange={this.handleChange}
                  ></textarea>

                  <br />
                  <br />

                  <input
                    className="submitButton"
                    type="button"
                    name="Submit"
                    value="Submit"
                    onClick={this.handleFormSubmit.bind(this)}
                  />
                </form>
              </div>
              <div className="contact-image"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
