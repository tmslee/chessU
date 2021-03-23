import React from "react";

import "./styles/GameQueue.scss";
import {Modal} from "react-bootstrap";
import useMatchInvite from "../../hooks/useMatchInvite";

export default function InviteOpponent(props) {
  const {goToView, gameOptions} = props;
  useMatchInvite(gameOptions.currentUser, gameOptions, goToView);
  
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
     