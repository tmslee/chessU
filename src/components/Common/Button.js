import React from "react";

import "./styles/Button.scss";
const classNames = require('classnames');

export default function Button(props) {
   const buttonClass = classNames("button", {
     "button--confirm": props.confirm,
     "button--danger": props.danger
   });
 
   return (
     <button
       className={buttonClass}
       onClick={props.onClick}
       disabled={props.disabled}
     >
       {props.children}
     </button>
   );
 }