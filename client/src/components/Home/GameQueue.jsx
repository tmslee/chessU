import React, {useEffect, useState} from "react";

import "./styles/GameQueue.scss"
import {Button, Modal, Form} from "react-bootstrap";

const RANKED = "RANKED";
const CASUAL = "CASUAL";
const AI = "AI";

const ACCEPT_MATCH = "ACCEPT_MATCH";

export default function GameQueue(props) {
  const {gameOptions, setGameOptions, goToView, returnToGameOptions} = props;
  
  const [opponent, setOpponent] = useState(gameOptions.opponent);

  const findOpponent = function(gameOptions) {
    //implement this: go into db and grab an opponent from queue
    console.log("finding opponent for game: ...");
    console.log(gameOptions);
    return "tempOpponent";
  };

  const inviteOpponent = function (gameOptions) {
    console.log("sending accept invitation to opponent...");
    //actually send an invitation here
  }

  // useEffect(() => {
  //   findOpponent(gameOptions);
  // }, []);

  useEffect(() => {
    if(!opponent) {
      const foundOpponent = findOpponent(gameOptions);
      //setOpponent(foundOpponent);
    }
    else {
      console.log(`opponent found! setting opponent as: ${opponent}`);
      setGameOptions({...gameOptions, opponent});
      console.log(`opponent set - inviting ${opponent} to a game`);
      inviteOpponent(gameOptions);
      goToView(ACCEPT_MATCH);
    }
  }, [opponent]);

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
     