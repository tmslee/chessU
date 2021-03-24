import React, { useEffect, useState } from "react";
import LoginForm from "./UserAuth/LoginForm";
import RegisterForm from "./UserAuth/RegisterForm";
import Game from './GameView/Game';
import Profile from "./Profile/index";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import HomeMenu from "./Home/HomeMenu";
import ChessNavBar from "./Navbar/ChessNavBar";
import Community from "./Community/Community";
import LeaderBoards from "./Community/LeaderBoards";
import useToken from "../hooks/useToken";

import AiGame from "./AiGame/AiGame";
import axios from 'axios';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import GameInviteToast from "./GameInviteToast";

import './Application.scss'

import "bootswatch/dist/sketchy/bootstrap.min.css";

export default function Application() {

  const [active, setActive] = useState({
    login: false,
    register: false
  });

  const { token, getToken, setToken } = useToken();
  const [currentUser, setCurrentUser] = useState();
  const [gameInfo, setGameInfo] = useState();
  const [invitedStatus, setInvitedStatus] = useState(false);
  const [incomingGameInfo, setIncomingGameInfo] = useState(null);
  const [inGame, setInGame] = useState(false);
  const [showResign, setShowResign] = useState(false);

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
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    }
    return axios.get('/api/me', {
      headers: headers
    }).then( res => {
      return res.data;
    })
  };

  const logout = function (){
    if (!inGame) {
      localStorage.clear();
      setToken(getToken());
    };
  };

  return (
    <>
    <Router>
    <ChessNavBar
    username={currentUser ? currentUser.username : null}
    setActive={setActive} 
    active={active}
    logout={logout}
    inGame={inGame}
    setShowResign={setShowResign}
    />

    <GameInviteToast
      currentUser={currentUser}
      setGameInfo={setGameInfo}
      invitedStatus={invitedStatus}
      setInvitedStatus={setInvitedStatus}
      incomingGameInfo={incomingGameInfo}
      setIncomingGameInfo={setIncomingGameInfo}
    />
    <main className="main-container">
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
      <Switch >
        <Route path="/" exact render={(props) => 
          (<HomeMenu 
            {...props} 
            currentUser={currentUser} 
            setGameInfo={setGameInfo}
            setActive={setActive} 
            active={active}
            setIncomingGameInfo={setIncomingGameInfo} 
            setInvitedStatus={setInvitedStatus}
            invitedStatus={invitedStatus}
          />)
        }/>
        { gameInfo &&
          <Route exact path="/game/:id" render={(props) => 
          (<Game 
            {...props}
            gameInfo = {gameInfo}
            currentUser = {currentUser}
            setInGame={setInGame}
            showResign={showResign}
            setShowResign={setShowResign}
          />)
        }/>
        }
        { gameInfo &&
          <Route path="/aigame/:id" render={(props) => (
            <AiGame {...props} currentUser = {currentUser} gameInfo = {gameInfo} />
          )} />
        }
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
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </main>
    </Router>
    </>
  );
};