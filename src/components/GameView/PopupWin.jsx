import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { Button, Modal } from 'react-bootstrap';

export default function PopupWin(props){
  const winner = props.winner;
  const isReceivedResign = props.isReceivedResign;
  const currentUserNotWins = props.currentUserNotWins;
  const currentUserWins = props.currentUserWins;
  const diffWinner = Math.abs(currentUserWins.winner_elo - currentUserWins.updatedWinner);
  const diffLoser = Math.abs(currentUserNotWins.winner_elo - currentUserNotWins.updatedWinner);
  const isWin = props.isWin;
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
      <Modal.Header closeButton><h4>Game Over! {result(winner)} {isReceivedResign && "Your opponent resigned."}</h4></Modal.Header>
      <Modal.Body>
        {isWin ? 
        <><p>winner: {currentUserWins.winnerName} ELO: {currentUserWins.winner_elo} + {diffWinner} = {currentUserWins.updatedWinner}</p></> : 
        <><p>loser: {currentUserNotWins.loserName} ELO:{ currentUserNotWins.loser_elo} - {diffLoser} = {currentUserNotWins.updatedLoser}</p></>}
      </Modal.Body>
      <Modal.Footer>
        <Link to={{pathname: "/"}} >
          <Button variant="outline-info" type="button">Back to Home</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  )
}