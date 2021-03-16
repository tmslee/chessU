import React, { useEffect, useState } from "react";
import LoginForm from "./UserAuth/LoginForm";
import RegisterForm from "./UserAuth/RegisterForm";
import Game from './GameView/Game';
import Profile from "./Profile/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeMenu from "./Home/HomeMenu";
import ChessNavBar from "./Navbar/ChessNavBar";
import useToken from "../hooks/useToken";
import axios from 'axios';
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Application() {

  const [active, setActive] = useState({
    login: false,
    register: false
  });

  const { token, getToken, setToken } = useToken();
  const [currentUser, setCurrentUser] = useState();
  
  useEffect(()=> {
    if(token){
      getCurrentUser(token).then( res => {
        setCurrentUser(res.id);
      });
    } else {
      setCurrentUser(null);
    }
  }, [token]);

  const getCurrentUser = function(token) {
    console.log("getting curent user...");
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    }
    return axios.get('http://localhost:8001/api/me', {
      headers: headers
    }).then( res => {
      console.log(res);
      return res.data;
    })
  }

  const logout = function (){
    localStorage.clear();
    setToken(getToken());
  }

  return (
    <>
    <ChessNavBar
    currentUser={currentUser}
    setActive={setActive} 
    active={active}
    logout={logout}
    />
    <Router>
    <main>
      {active.login && 
      <LoginForm 
      setActive={setActive}
      active={active}
      setToken={setToken}
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
      </Switch>
    </main>
    </Router>
    </>
  );

}