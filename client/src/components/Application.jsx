import React, { useEffect, useState } from "react";
import LoginForm from "./UserAuth/LoginForm";
import RegisterForm from "./UserAuth/RegisterForm";
import Game from './GameView/Game';
import Profile from "./Profile/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeMenu from "./Home/HomeMenu";
import ChessNavBar from "./Navbar/ChessNavBar";
import Community from "./Community/Community";
import LeaderBoards from "./Community/LeaderBoards";
import useToken from "../hooks/useToken";
import AiGame from "./AiGame/AiGame";
import axios from 'axios';
import "bootswatch/dist/sketchy/bootstrap.min.css";

export default function Application() {

  const [active, setActive] = useState({
    login: false,
    register: false
  });

  const { token, getToken, setToken } = useToken();
  const [currentUser, setCurrentUser] = useState();
  const [gameRoute, setGameRoute] = useState();
  const [gameInfo, setGameInfo] = useState();

  console.log('re-render application')
  useEffect(()=> {
    if(token){
      getCurrentUser(token).then( res => {
        setCurrentUser(res);
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
  };

  const logout = function (){
    localStorage.clear();
    setToken(getToken());
  };

  return (
    <>
    <Router>
    <ChessNavBar
    username={currentUser ? currentUser.username : null}
    setActive={setActive} 
    active={active}
    logout={logout}
    />
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
      setToken={setToken}
      /> }
      <Switch>
        <Route path="/" exact render={(props) => 
          (<HomeMenu 
            {...props} 
            currentUser={currentUser} 
            setGameRoute={setGameRoute} 
            setGameInfo={setGameInfo}
            setActive={setActive} 
            active={active}
          />)
        }/>
          <Route exact path="/game/:id" render={(props) => 
          (<Game 
            {...props} 
            gameInfo = {gameInfo}
            currentUser = {currentUser}
          />)
        }/>
        <Route path="/aigame/:id" render={(props) => (
          <AiGame {...props} currentUser = {currentUser} gameInfo = {gameInfo} />
        )} />
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        
        <Route path="/profile" exact render={(props) => 
          (<Profile 
            {...props} 
            token={token}
            currentUser={currentUser}
            setActive={setActive} 
            getCurrentUser={getCurrentUser}
            setCurrentUser={setCurrentUser}
          />)
        }/>

        <Route path="/community" exact render={(props) => 
          (<Community
            {...props} 
            currentUser={currentUser} 
          />)
        } />
        <Route path="/leaderboards" exact render={(props) => 
          (<LeaderBoards
            {...props} 
            token={token}
            currentUser={currentUser} 
          />)
        }/>
      </Switch>
    </main>
    </Router>
    </>
  );
};