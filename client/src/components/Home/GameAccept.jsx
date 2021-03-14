import React from "react";

import "./styles/HomeMenu.scss"
import AcceptTimer from "./AcceptTimer";

export default function GameAccept(props) {
  const {gameOptions, returnToGameOptions, loadGame} = props;

  return (
    <AcceptTimer
      gameOptions = {gameOptions}
      returnToGameOptions = {returnToGameOptions}
      loadGame = {loadGame}
    />
  );
};
     