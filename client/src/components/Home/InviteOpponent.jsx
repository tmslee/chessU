import React, {useEffect, useState} from "react";

import "./styles/GameQueue.scss"
import {Button, Modal} from "react-bootstrap";
import useMatchInvite from "../../hooks/useMatchInvite";

const ERROR = "ERROR";

export default function InviteOpponent(props) {
  const {goToView, gameOptions, socket} = props;
  const {opponentStatus} = useMatchInvite(gameOptions.currentUser, gameOptions, goToView, socket);
  
  return (
    <>
      <Modal.Body>
          <img
            className="queue__status-image"
            src="images/status.png"
            alt="Loading"
          />
          <h1 className="text--semi-bold">Inviting Friend...</h1>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </>
  );
};
     