import React from "react";

import "./styles/HomeMenu.scss";
import AcceptTimer from "./AcceptTimer";

export default function GameAccept(props) {
  const {
    initialAcceptStatus,
    gameOptions, 
    returnToGameOptions, 
    loadGame, 
    setGameInfo,
    setIncomingGameInfo, 
    setInvitedStatus,
    invitedStatus
  } = props;

  return (
    <AcceptTimer
      initialAcceptStatus={initialAcceptStatus}
      gameOptions = {gameOptions}
      returnToGameOptions = {returnToGameOptions}
      loadGame = {loadGame}
      setGameInfo = {setGameInfo}
      setIncomingGameInfo={setIncomingGameInfo} 
      setInvitedStatus={setInvitedStatus}
      invitedStatus={invitedStatus}
    />
  );
};
     