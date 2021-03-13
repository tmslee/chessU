import React from 'react';

import { Button, Modal } from 'react-bootstrap';

export default function Popup(props){
  const regame = props.regame;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton><h4>Game Over! Name Win!</h4></Modal.Header>
      <Modal.Footer>
        <Button variant="outline-success" onClick={regame}>Play once again</Button>
        <Button variant="outline-info" onClick={props.onHide}>Back to Home</Button>
      </Modal.Footer>
    </Modal>
  )
}