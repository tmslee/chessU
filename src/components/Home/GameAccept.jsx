import React, {useEffect, useState} from "react";

import "./styles/HomeMenu.scss"
import {Button, Modal, Form} from "react-bootstrap";

const RANKED = "RANKED";
const CASUAL = "CASUAL";
const AI = "AI";

export default function GameAccept(props) {
  const {returnToGameOptions, loadGame, gameOptions} = props;

  return (
    <>
      <Modal.Body>
        {/* implement countdown timer here */}
        Opponent found!
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={returnToGameOptions}>
          Decline
        </Button>
        <Button variant="primary" onClick={() => loadGame(gameOptions)}>
          Accept
        </Button>  
      </Modal.Footer>
    </>
  );
};
     