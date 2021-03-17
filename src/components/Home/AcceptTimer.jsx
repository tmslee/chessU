import { Alert, Button, Modal } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Timer from "react-compound-timer";
import useAcceptStatus from "../../hooks/useAcceptStatus";

export default function AcceptTimer(props) {

  const {gameOptions, returnToGameOptions, loadGame, setGameRoute} = props;

  const [col, setCol] = useState("success");
  const {
    userStatus, 
    opponentStatus, 
    acceptMatch, 
    declineMatch
  } = useAcceptStatus(gameOptions, returnToGameOptions, loadGame, setGameRoute);

  const declineThenGameOptions = async function () {
    await declineMatch();
    returnToGameOptions();
  }

  return (
    <div className = "timer">
      <Modal.Body>
        <Alert variant={col}>
          <Alert.Heading>Opponent Found!</Alert.Heading>
          <Alert.Heading>
            {userStatus === 0 && <p>Accept match within: </p>}
            {(userStatus === 1 && opponentStatus === 0) && <p>Waiting for opponent to accept: </p>}
            <Timer 
              initialTime={15000}
              direction="backward"
              timeToUpdate={1000}
              checkpoints={[
                {time: 6000, callback: () => setCol("danger")},
                {time: 0, callback: () => {
                  declineThenGameOptions();
                }}
              ]}
            >
              <span><Timer.Seconds /> seconds</span>
            </Timer>
          </Alert.Heading>
        </Alert>
      </Modal.Body>


      <Modal.Footer>
      {userStatus === 0 && 
      <>
        <Button variant="secondary" onClick={() => {
          declineThenGameOptions();
        }}>
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
