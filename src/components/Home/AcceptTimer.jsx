import { Alert } from 'react-bootstrap';
import React, { useState } from 'react';
import Timer from "react-compound-timer";

export default function AcceptTimer(props) {
  const [col, setCol] = useState("success");

  return (
    <div className = "timer">
      <Alert variant={col}>
        <Alert.Heading>"Opponent Found!"</Alert.Heading>
        <Alert.Heading>Countdown: <Timer 
          initialTime={15000}
          direction="backward"
          timeToUpdate={1000}
          chechpoints={[{time: 0, callback: () => setCol("danger")},]}
          >
          <span><Timer.Seconds /> seconds</span>
      {/* {({ resume, pause }) => (
            <span>
              <span><Timer.Seconds /> seconds</span>
              {isRunning ? resume() : pause()}
            </span>
        )} */}
          </Timer>
        </Alert.Heading>
      </Alert>
    </div>
  );
}
