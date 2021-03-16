import React, {Fragment, useState, useEffect} from "react";

import "./styles/ChessNavbar.scss"
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap";


export default function ChessNavBar(props) {
  const {
    setActive,
    active, 
    getCurrentUser,
    token
  } = props;

  const[state, setState] = useState(token);

  useEffect(() => {
    setState(token);
  }, [token]);

  let currentUser;

  const getCurrUser = async function (token) {
    if (token) {
      getCurrentUser(token).then(res => {
        console.log(res.data);
        return res.id;
      });
    } else {
      return currentUser = null;
    }
  }



  console.log(`current user: ${currentUser}`);

  // let currentUser = null;
  // useEffect(() => {
  //   if (token) {
  //     getCurrentUser(token).then(res => {
  //       currentUser = res.id;  
  //     })
  //   } else {
  //     currentUser = null;
  //   }
  // }, [token])

  // const getCurrUser = async function (token) {
  //   if (token) {
  //     console.log("getCurrentUser returns: ", getCurrentUser(token));
  //     return getCurrentUser(token).then(res => {
  //       console.log(res.id);
  //       return res.id
  //     });
  //   } else {
  //     return null;
  //   }
  // }
  
  // getCurrUser(token).then(res => {
  //   const CU =  res.id;
  //   console.log(CU);
  // })

  // const [currentUser, setCurrentUser] = useState(getCurrUser(token));
  
  // const setCurrUser = async function (token) {
  //   if (token) {
  //     await getCurrentUser(token).then(res => {
  //       setCurrentUser(res.id);
  //     });
  //     console.log(`currentUser: ${currentUser}`);

  //   } else {
  //     await setCurrentUser(null);
  //     console.log(`currentUser: ${currentUser}`);
  //   } 
  // };

  // useEffect(() => {
  //   setCurrUser(token);
  // }, [token])

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