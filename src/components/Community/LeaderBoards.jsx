import React, {useState} from 'react';
import {Form, Tabs, Tab, ListGroup} from "react-bootstrap";

export default function LeaderBoards(props) {
  const {} = props;
  
  const [key, setKey] = useState('ranked30');

  return (
    <div>
      <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="ranked30" title="30 minutes ranked">
          <div>30 RANKED</div>
        </Tab>
        <Tab eventKey="ranked10" title="10 minutes ranked">
          <div>10 RANKED</div>
        </Tab>
        <Tab eventKey="ranked0" title="no time limit ranked">
          <div>UNLIMITED RANKED</div> 
        </Tab>
      </Tabs>
    </div>
  );
}