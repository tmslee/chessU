import { Alert } from 'react-bootstrap';
import React, { useState } from 'react';
import Timer from "react-compound-timer";

export default function Countdown(props) {
  const [col, setCol] = useState("success");
  const username = props.username;
  const isRunning = props.isRunning;
  const color = props.color;
  const isGameOver = props.isGameOver;
  const timeout = props.timeout;
  const duration = props.duration;
  const opponent = props.opponent;

  return (
    <div className = "timer">
      <Alert variant={col}>
        <Alert.Heading>{color}: {username} </Alert.Heading>
        <Alert.Heading>Countdown: <Timer 
          initialTime={duration*60*1000}
          direction="backward"
          timeToUpdate={1000}
          onResume={() => setCol("danger")}
          onPause={() => setCol("success")}
          checkpoints={[{
            time: 0,
            callback: () => {
              timeout(opponent);
            },}
        ]}>
      {({ resume, pause, reset, start }) => (
            <span>
              <span><Timer.Minutes /> minutes</span>
              <span><Timer.Seconds /> seconds</span>
              {isGameOver ? reset() : start()}
              {isRunning ? resume() : pause()}
            </span>
        )}
        {}
          </Timer>
        </Alert.Heading>
      </Alert>
    </div>
  );
}
