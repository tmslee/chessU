import React, { useState } from "react";
import { useCookies } from "react-cookie";
import LoginForm from "./UserAuth/LoginForm";
import RegisterForm from "./UserAuth/RegisterForm";
import Game from './GameView/Game';
import Profile from "./Profile/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeMenu from "./Home/HomeMenu";
import ChessNavBar from "./Navbar/ChessNavBar";
import Chat from "./Chat/Chat";

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Application() {

  const [active, setActive] = useState({
    login: false,
    register: false
  });
  const [cookie, setCookie] = useState(null);
  // if (!cookie) {
  //   return (
  //     <LoginForm setCookie={setCookie}/>
  //   )
  // }

  return (
    <>
    <ChessNavBar 
    setActive={setActive} 
    active={active} 
    />
    <Router>
    <main>
      {active.login && 
      <LoginForm 
      setActive={setActive}
      active={active}
      setCookie={setCookie}  
      /> }
      {active.register && 
      <RegisterForm 
      setActive={setActive}
      active={active} 
      /> }
      <Switch>
        <Route path="/" exact component={HomeMenu} />
        <Route path="/game" component={Game} />
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/profile" component={Profile} />
        <Route path="/chat" component={Chat}/>
      </Switch>
    </main>
    </Router>
    </>
  );

}