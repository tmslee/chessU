import React, {useState} from "react";
import logo from './../../../src/images/logo.png'
import "./styles/ChessNavbar.scss"
import {Navbar, Nav, Button, Modal} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import useResign from "../../hooks/resign";

export default function ChessNavBar(props) {
  const {
    username,
    setActive,
    active,
    logout,
    inGame,
    setShowResign
  } = props;

  // let { concede, sendConcedeMessage } = useResign(roomId);

  const history = useHistory();
  // const [show, setShow] = useState(false);
  
  const handleClick = function(url) {
    if (!inGame) {
      history.push(url);
    } else {
      setShowResign(true);
      // alert("You have to resign before back to lobby!")
      }
    }
  
  const onProfile = window.location.pathname === "/profile";

  return (
    <Navbar bg="light" expand="lg" style={{...{zIndex:1}, ...{background:'#F0F0D8'}}} className="navbar">
      {/* {show && <Modal>
        <Modal.Header>
          <h4>STOP!</h4>
        </Modal.Header>
      </Modal> } */}
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
        <Nav.Link onClick={() => handleClick("/")}>Play</Nav.Link>
        {username && <Nav.Link onClick={() => handleClick("/profile")}>Profile</Nav.Link>}
        {!username && <Nav.Link onClick={() => setActive({...active, login: true  })} >Profile</Nav.Link>}
        <Nav.Link onClick={() => handleClick("/leaderboards")}>LeaderBoards</Nav.Link>
        {username && <Nav.Link onClick={() => handleClick("/community")}>Commnity</Nav.Link>}
        {!username && <Nav.Link onClick={() => setActive({...active, login: true  })} >Commnity</Nav.Link>}
        </Nav>
        {username && onProfile &&
          <div>
            <p>Logged in as: {username}</p>
            <Button className="user-login"
              onClick={ () => {
                handleClick("/")
                logout()
              }}
              variant="outline-success"
              // onClick={() => logout()}
            >Log out</Button>
          </div>
        }
        {username && !onProfile &&
          <div>
            <h6>Logged in as: {username}</h6>
            <Button className="user-login"
              variant="outline-success"
              onClick={
                () => {
                  handleClick("/")
                  logout()
                }} 
            >Log out</Button>
          </div>
        }
        {!username && 
        <div className="user-login">
          <Button onClick={() => setActive({...active, register: true  })} variant="outline-success">Sign up</Button>
          <Button onClick={() => setActive({...active, login: true  })}variant="outline-success">Log in</Button>
        </div>
        } 
      </Navbar.Collapse>
    </Navbar>
  )
}