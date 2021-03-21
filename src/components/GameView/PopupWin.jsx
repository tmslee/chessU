import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { Button, Modal } from 'react-bootstrap';

export default function PopupWin(props){
  const winner = props.winner;
  const isReceivedResign = props.isReceivedResign;
  const currentUserNotWins = props.currentUserNotWins;
  const currentUserWins = props.currentUserWins;
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
        <><p>winner: {currentUserWins.winnerName} origin elo:{currentUserWins.winner_elo} new elo: {currentUserWins.updatedWinner}</p>
        <p>loser: {currentUserWins.loserName} origin elo:{currentUserWins.loser_elo} new elo: {currentUserWins.updatedLoser}</p></> : 
        <><p>winner: {currentUserNotWins.winnerName} origin elo:{currentUserNotWins.winner_elo} new elo: {currentUserNotWins.updatedWinner}</p>
        <p>loser: {currentUserNotWins.loserName} origin elo:{currentUserNotWins.loser_elo} new elo: {currentUserNotWins.updatedLoser}</p></>}
      </Modal.Body>
      <Modal.Footer>
        <Link to={{pathname: "/"}} >
          <Button variant="outline-info" type="button">Back to Home</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  )
}