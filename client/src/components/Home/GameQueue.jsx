import React, {useEffect, useState} from "react";

import "./styles/GameQueue.scss"
import {Button, Modal} from "react-bootstrap";

const RANKED = "RANKED";
const CASUAL = "CASUAL";
const AI = "AI";

const ACCEPT_MATCH = "ACCEPT_MATCH";

export default function GameQueue(props) {
  const {gameOptions, setGameOptions, goToView, returnToGameOptions} = props;
  
  const [opponentID, setOpponentID] = useState(gameOptions.opponentID);

  const findOpponent = function(gameOptions) {
    //implement this: go into db and grab an opponent from queue. returns opponentID
    console.log("finding opponent for game: ...");
    console.log(gameOptions);
    return 1; 
  };

  const inviteOpponent = function (gameOptions) {
    console.log("sending accept invitation to opponent...");
    //actually send an invitation here
  }

  // useEffect(() => {
  //   findOpponent(gameOptions);
  // }, []);

  useEffect(() => {
    if(!opponentID) {
      const foundOpponentID = findOpponent(gameOptions);
      // uncomment line below if you want to use findOpponent.
      // keep it commented if you want to change the opponent in chrome dev tools manually
      //setOpponent(foundOpponentID);
    }
    else {
      console.log(`opponent found! setting opponent as: ${opponentID}`);
      setGameOptions({...gameOptions, opponentID});
      console.log(`opponent set - inviting ${opponentID} to a game`);
      inviteOpponent(gameOptions);
      goToView(ACCEPT_MATCH);
    }
  }, [opponentID]);

  return (
    <>
      <Modal.Body>
          <img
            className="queue__status-image"
            src="images/status.png"
            alt="Loading"
          />
          <h1 className="text--semi-bold">Searching for your opponent...</h1>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={returnToGameOptions}>
          Cancel
        </Button>
      </Modal.Footer>
    </>
  );
};
     