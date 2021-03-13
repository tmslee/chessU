import { Alert } from 'react-bootstrap';
import React, { useState } from 'react';
import Timer from "react-compound-timer";

export default function Countdown(props) {
  const [col, setCol] = useState("success");
  const username = props.username;
  const isRunning = props.isRunning;
  const color = props.color;

  return (
    <div className = "timer">
      <Alert variant={col}>
        <Alert.Heading>{color}: {username} </Alert.Heading>
        <Alert.Heading>Countdown: <Timer 
          initialTime={60*1000}
          direction="backward"
          timeToUpdate={1000}
          chechpoints={[{time: 0, callback: () => setCol("danger")},]}
          >
      {({ resume, pause }) => (
            <span>
              <span><Timer.Minutes /> minutes</span>
              <span><Timer.Seconds /> seconds</span>
              {isRunning ? resume() : pause()}
            </span>
        )}
          </Timer>
        </Alert.Heading>
      </Alert>
    </div>
  );
}
