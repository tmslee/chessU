import React, {Fragment} from "react";

import "./styles/ChessNavbar.scss"
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap";

export default function ChessNavBar(props) {
  const {currentUser} = props;

  return (
    <Navbar bg="light" expand="lg">
      
      <Navbar.Brand href="#home">
        <img
          alt=""
          src="http://shorturl.at/howPQ"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        ChessU
      </Navbar.Brand>


      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">

          <Nav.Link href="#home">Profile</Nav.Link>
          <Nav.Link href="#link">My Stats</Nav.Link>
          <Nav.Link href="#link">Community</Nav.Link>

          <NavDropdown title="Quick Play" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Ranked</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Casual</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">vs AI</NavDropdown.Item>

            {/* <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
          </NavDropdown>
        </Nav>

        {currentUser && 
          <Fragment>
            <p>Logged in as: {currentUser}</p>
            <Button variant="outline-success">Log out</Button>
          </Fragment>
        }
        {!currentUser && 
        <Fragment>
          <Button variant="outline-success">Sign up</Button>
          <Button variant="outline-success">Log in</Button>
        </Fragment>
        } 
      </Navbar.Collapse>
    </Navbar>
  )
}