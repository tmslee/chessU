import React, {useState} from 'react';
import {Form, Tabs, Tab, ListGroup} from "react-bootstrap";


export default function FriendList(props) {
  const {} = props;

  const [key, setKey] = useState('Friends');

  return (
    <div>
      <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="Friends" title="Friends">
          <div>FRIENDLIST</div>
        </Tab>
        <Tab eventKey="Requests" title="Request">
          <div>FRIEND REQUEST LIST</div>
        </Tab>
        <Tab eventKey="Search" title="Search">
          <div>SEARCH FOR A UESR</div> 
        </Tab>
      </Tabs>
    </div>
  )
}