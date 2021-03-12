import React, {} from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "../index.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

import ChessNavbar from "../components/Navbar/ChessNavBar";

storiesOf("ChessNavBar", module)
  .add("not logged in", () => 
    <ChessNavbar
      currentUser={null}
    />)

  .add("logged in", () => 
    <ChessNavbar
      currentUser={"user1"}
    />)