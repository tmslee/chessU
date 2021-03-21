import React, {Fragment, useState, useEffect} from "react";
import logo from './../../../src/images/logo.png'
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
    <Navbar bg="light" expand="lg" style={{...{zIndex:1}, ...{background:'#F0F0D8'}}} className="navbar">
      
      <div className="logo" onClick={() => handleClick("/")}>
      <Navbar.Brand >
        <img
          alt="logo"
          src={logo}
          height="75"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <h3 className="logo-name">ChessU</h3>
      </div>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link onClick={() => handleClick("/leaderboards")}>LeaderBoards</Nav.Link>
          {username && <Nav.Link onClick={() => handleClick("/profile")}>Profile</Nav.Link>}
          {!username && <Nav.Link onClick={() => setActive({...active, login: true  })} >Profile</Nav.Link>}
        
          {username && <Nav.Link onClick={() => handleClick("/community")}>Commnity</Nav.Link>}
          {!username && <Nav.Link onClick={() => setActive({...active, login: true  })} >Commnity</Nav.Link>}
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