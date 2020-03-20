import React from "react";
import "./Header.css";
import { Button, Nav, Navbar} from "react-bootstrap";
import outreachlogo from "../images/outreach_logo.png";

class Header extends React.Component {
  render() {
    return (
      // Boilerplate from React Bootstrap Nav: https://react-bootstrap.github.io/components/navbar/
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand className="logo" href="/">
          <img
            src={outreachlogo}
            alt="Logo"
            className="header-outreach-logo"
          />

        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/donate">Donate</Nav.Link>
            <Nav.Link href="/team">Team</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link eventKey={2} href="/download">
              <Button
                size="lg"
                style={{ backgroundColor: "#F27821", color: "#fff" }}
                variant=""
              >
                Download
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    );
  }
}

export default Header;
