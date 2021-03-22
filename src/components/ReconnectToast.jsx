import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";


export default function ReconnectToast(props){
  const {gameInfo} = props;
  const {matchId} = gameInfo;
  const history = useHistory();

  return(
    <button id="reconnect"
      onClick={() => {
        history.push(`/game/${matchId}`);
      }}
    >
      RECONNECT
    </button>
  );
}