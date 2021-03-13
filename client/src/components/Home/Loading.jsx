import React, {useEffect, useState} from "react";

import "./styles/Loading.scss"
import {Button, Modal, Form} from "react-bootstrap";

const RANKED = "RANKED";
const CASUAL = "CASUAL";
const AI = "AI";

export default function Loading(props) {
  const {} = props;

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
     