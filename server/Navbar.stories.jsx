import React, {Fragment} from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "../index.scss";

import Navbar from "../components/Navbar/Navbar";

storiesOf("NavBar", module)
  // .addParameters({
  //   backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  // })
  .add("navBar", () => <Navbar> </Navbar>);