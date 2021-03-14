import { Alert } from 'react-bootstrap';
import React, { useState } from 'react';
import Timer from "react-compound-timer";

export default function Countdown(props) {
  const [col, setCol] = useState("success");
  const username = props.username;
  const isRunning = props.isRunning;
  const color = props.color;
  const isGameOver = props.isGameOver;

  return (
    <div className = "timer">
      <Alert variant={col}>
        <Alert.Heading>{color}: {username} </Alert.Heading>
        <Alert.Heading>Countdown: <Timer 
          initialTime={10*1000}
          direction="backward"
          timeToUpdate={1000}
          onResume={() => setCol("danger")}
          onPause={() => setCol("success")}>
      {({ resume, pause, reset }) => (
            <span>
              <span><Timer.Minutes /> minutes</span>
              <span><Timer.Seconds /> seconds</span>
              {isGameOver && reset()}
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
