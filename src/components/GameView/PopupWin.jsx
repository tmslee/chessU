import React from 'react';
import { Link } from "react-router-dom";

import { Button, Modal } from 'react-bootstrap';

export default function PopupWin(props){
  // const regame = props.regame;
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
      {/* {props.isRanked &&
      <>
      <p>You are in raked mode and if you would like to play once again</p>
      <p>you have to come back to the lobby and queue up for the next game</p>
      </>} */}
      <Modal.Footer>
        {/* <Button variant="outline-success" onClick={regame}>Play once again</Button> */}
        <Link to={{pathname: "/"}} >
          <Button variant="outline-info" type="button">Back to Home</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  )
}