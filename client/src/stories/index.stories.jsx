import React, {} from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "../index.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

import ChessNavbar from "../components/Navbar/ChessNavBar";
import HomeMenu from "../components/Home/HomeMenu";
import GameAccept from "../components/Home/GameAccept";

storiesOf("ChessNavBar", module)
  .add("not logged in", () => 
    <ChessNavbar
      currentUser={null}
    />)

  .add("logged in", () => 
    <ChessNavbar
      currentUser={"user1"}
    />)


storiesOf("HomeMenu", module)
  .add("default", () => 
    <HomeMenu
      currentUser={null}
    />)


storiesOf("GameAccept", module)
  .add("default", () => 
    <GameAccept
      currentUser={null}
    />)
