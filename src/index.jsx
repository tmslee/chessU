import React from "react";
import ReactDOM from "react-dom";
import { CookiesProvider } from "react-cookie";

import "./index.scss";

import Application from "./components/Application";

// ReactDOM.render(<Application />);
ReactDOM.render(
  <CookiesProvider>
    <Application />
  </CookiesProvider>, 
  document.getElementById("root"));