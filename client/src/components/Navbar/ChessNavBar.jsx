import React, {Fragment, useEffect} from "react";

import "./styles/ChessNavbar.scss"
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap";


export default function ChessNavBar(props) {
  const {
    setActive,
    active, 
    getCurrentUser,
    token
  } = props;

  let currentUser = null;
  console.log(`current token: ${token}`);
  // if(token) {
  //   currentUser = getCurrentUser(token);
  // }

  useEffect( async () => {
    if (token) {
      try {
        currentUser = await getCurrentUser(token)
      } catch (err) {
        console.log(err);
      }
    } else {
      currentUser = null;
    }
    console.log(currentUser);
  }, [token])

  return (
    <Navbar bg="light" expand="lg">
      
      <Navbar.Brand href="/">
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

          <Nav.Link href="/profile">Profile</Nav.Link>
          <Nav.Link href="/">My Stats</Nav.Link>
          <Nav.Link href="/community">Community</Nav.Link>

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
          <Button onClick={() => setActive({...active, register: true  })} variant="outline-success">Sign up</Button>
          <Button onClick={() => setActive({...active, login: true  })}variant="outline-success">Log in</Button>
        </Fragment>
        } 
      </Navbar.Collapse>
    </Navbar>
  )
}