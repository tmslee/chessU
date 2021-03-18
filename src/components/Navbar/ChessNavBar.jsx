import React, {Fragment, useState, useEffect} from "react";

import "./styles/ChessNavbar.scss"
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap";
import {useHistory} from "react-router-dom";


export default function ChessNavBar(props) {
  const {
    username,
    setActive,
    active,
    logout
  } = props;

  const history = useHistory();

  const handleClick = function(url) {
    history.push(url);
  }
  
  const onProfile = window.location.pathname === "/profile";

  return (
    <Navbar bg="light" expand="lg">
      
      <Navbar.Brand onClick={() => handleClick("/")}>
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
        <Nav.Link onClick={() => handleClick("/leaderboards")}>LeaderBoards</Nav.Link>
          {username && <Nav.Link onClick={() => handleClick("/profile")}>Profile</Nav.Link>}
          {!username && <Nav.Link onClick={() => setActive({...active, login: true  })} >Profile</Nav.Link>}
          <Nav.Link onClick={() => handleClick("/community")}>Community</Nav.Link>

          <NavDropdown title="Quick Play" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Ranked</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Casual</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">vs AI</NavDropdown.Item>

            {/* <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
          </NavDropdown>
        </Nav>
        {username && onProfile &&
          <Fragment>
            <p>Logged in as: {username}</p>
            <Button 
              onClick={ () => {
                handleClick("/")
                logout()
              }}
              variant="outline-success"
              // onClick={() => logout()}
            >Log out</Button>
          </Fragment>
        }
        {username && !onProfile &&
          <Fragment>
            <p>Logged in as: {username}</p>
            <Button 
              variant="outline-success"
              onClick={() => logout()}
            >Log out</Button>
          </Fragment>
        }
        {!username && 
        <Fragment>
          <Button onClick={() => setActive({...active, register: true  })} variant="outline-success">Sign up</Button>
          <Button onClick={() => setActive({...active, login: true  })}variant="outline-success">Log in</Button>
        </Fragment>
        } 
      </Navbar.Collapse>
    </Navbar>
  )
}