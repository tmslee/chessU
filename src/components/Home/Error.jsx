import React from "react";

import "./styles/HomeMenu.scss"
import {Button, Modal} from "react-bootstrap";

export default function Error(props) {
  const {returnToMenu, message} = props;

  return (
    <>
      <Modal.Body>
        <section className="appointment__error-message">
          <h1 className="text--semi-bold">Error</h1>
          <h3 className="text--light">{message}</h3>
        </section>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={returnToMenu}>
          Return to Menu
        </Button>
      </Modal.Footer>
    </>
  );
};
     