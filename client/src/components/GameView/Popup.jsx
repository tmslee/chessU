import React from 'react';
import { Link } from "react-router-dom";

import { Button, Modal } from 'react-bootstrap';

export default function Popup(props){
  const regame = props.regame;
  const winner = props.winner;
  const result = function(winner){
    if (winner){
      return (winner + ' wins!')
    }
    return 'Timeout!'
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton><h4>Game Over! {result(winner)}</h4></Modal.Header>
      <Modal.Footer>
        <Button variant="outline-success" onClick={regame}>Play once again</Button>
        <Link to={{pathname: "/"}} >
          <Button variant="outline-info" type="button">Back to Home</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  )
}