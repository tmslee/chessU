import { Alert, Button, Modal } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Timer from "react-compound-timer";

export default function AcceptTimer(props) {

  const {gameOptions, returnToGameOptions, loadGame} = props;

  const [col, setCol] = useState("success");
  const [acceptStatus, setAcceptStatus] = useState({
    currentUser: false,
    opponent: false
  });

  //NEED TO FIND A WAY TO KNOW WHEN OPPONENT ACCEPTS

  useEffect(() => {
    if (acceptStatus.currentUser && acceptStatus.opponent) loadGame(gameOptions);
  }, [acceptStatus]);

  return (
    <div className = "timer">
      <Modal.Body>
        <Alert variant={col}>
          <Alert.Heading>Opponent Found!</Alert.Heading>
          <Alert.Heading>
            {!acceptStatus.currentUser && <p>Accept match within: </p>}
            {(acceptStatus.currentUser && !acceptStatus.opponent) && <p>Waiting for opponent to accept: </p>}
            <Timer 
              initialTime={15000}
              direction="backward"
              timeToUpdate={1000}
              checkpoints={[
                {time: 6000, callback: () => setCol("danger")},
                //{time: 0, callback: () => returnToGameOptions()}
              ]}
            >
              <span><Timer.Seconds /> seconds</span>
            </Timer>
          </Alert.Heading>
        </Alert>
      </Modal.Body>


      <Modal.Footer>
      {!acceptStatus.currentUser && 
      <>
        <Button variant="secondary" onClick={returnToGameOptions}>
          Decline
        </Button>
        <Button 
          variant="primary" 
          onClick={() => setAcceptStatus(prev => {
            return {...prev, currentUser:true};
          })}
        >
          Accept
        </Button>
      </>
      }
      </Modal.Footer>
    </div>
  );
}
