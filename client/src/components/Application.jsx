import React, { useState } from "react";
import { useCookies } from "react-cookie";
import LoginForm from "./UserAuth/LoginForm";
import RegisterForm from "./UserAuth/RegisterForm";
import Game from './GameView/Game';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeMenu from "./Home/HomeMenu";

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Application() {

  
  const [cookie, setCookie] = useState(null);
  // if (!cookie) {
  //   return (
  //     <LoginForm setCookie={setCookie}/>
  //   )
  // }

  return (
    <Router>
    <main>
      <Switch>
        <Route path="/" exact component={HomeMenu} />
        <Route path="/game" component={Game} />
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
      </Switch>
    </main>
    </Router>
  );

}