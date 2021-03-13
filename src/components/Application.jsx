import React, { useState } from "react";
import LoginForm from "./UserAuth/LoginForm"
import RegisterForm from "./UserAuth/RegisterForm"
import Game from './GameView/Game'

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
    <main>
    <h1>hi</h1>
    {/* <RegisterForm /> */}
    <Game />
    </main>
  );

}