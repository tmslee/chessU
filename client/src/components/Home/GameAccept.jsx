import React from "react";

import "./styles/HomeMenu.scss"
import AcceptTimer from "./AcceptTimer";

export default function GameAccept(props) {
  const {
    initialAcceptStatus,
    gameOptions, 
    returnToGameOptions, 
    loadGame, 
    setGameRoute, 
    setGameInfo,
    socket
  } = props;

  return (
    <AcceptTimer
      initialAcceptStatus={initialAcceptStatus}
      gameOptions = {gameOptions}
      returnToGameOptions = {returnToGameOptions}
      loadGame = {loadGame}
      setGameRoute = {setGameRoute}
      setGameInfo = {setGameInfo}
      socket={socket}
    />
  );
};
     