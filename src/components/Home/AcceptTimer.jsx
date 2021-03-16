import { Alert, Button, Modal } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Timer from "react-compound-timer";
import useAcceptStatus from "../../hooks/useAcceptStatus";

export default function AcceptTimer(props) {

  const {gameOptions, returnToGameOptions, loadGame} = props;

  const [col, setCol] = useState("success");
  const {matchAcceptStatus, acceptMatch, opponentAccept} = useAcceptStatus(gameOptions);

  //NEED TO FIND A WAY TO KNOW WHEN OPPONENT ACCEPTS

  return (
    <div className = "timer">
      <Modal.Body>
        <Alert variant={col}>
          <Alert.Heading>Opponent Found!</Alert.Heading>
          <Alert.Heading>
            {!matchAcceptStatus.currentUser && <p>Accept match within: </p>}
            {(matchAcceptStatus.currentUser && !matchAcceptStatus.opponent) && <p>Waiting for opponent to accept: </p>}
            <Timer 
              initialTime={15000}
              direction="backward"
              timeToUpdate={1000}
              checkpoints={[
                {time: 6000, callback: () => setCol("danger")},
                {time: 0, callback: () => returnToGameOptions()}
              ]}
            >
              <span><Timer.Seconds /> seconds</span>
            </Timer>
          </Alert.Heading>
        </Alert>
      </Modal.Body>


      <Modal.Footer>
      {!matchAcceptStatus.currentUser && 
      <>
        <Button variant="secondary" onClick={returnToGameOptions}>
          Decline
        </Button>
        <Button 
          variant="primary" 
          onClick={acceptMatch}
        >
          Accept
        </Button>
      </>
      }
      </Modal.Footer>
    </div>
  );
}
