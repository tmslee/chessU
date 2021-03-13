import React, {useEffect, useState} from "react";

import "./styles/GameQueue.scss"
import {Button, Modal, Form} from "react-bootstrap";

const RANKED = "RANKED";
const CASUAL = "CASUAL";
const AI = "AI";

export default function GameQueue(props) {
  const {returnToGameOptions} = props;

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
     