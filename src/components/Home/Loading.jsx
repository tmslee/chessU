import React from "react";

import "./styles/Loading.scss"
import {Modal} from "react-bootstrap";

export default function Loading() {

  return (
    <>
      <Modal.Body>
          <img
            className="queue__status-image"
            src="images/status.png"
            alt="Loading"
          />
          <h1 className="text--semi-bold">Loading your game...</h1>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </>
  );
};
     