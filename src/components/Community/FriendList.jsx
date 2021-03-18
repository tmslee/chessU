import React, {useState} from 'react';
import {Form, Tabs, Tab, Sonnet, ListGroup} from "react-bootstrap";


export default function FriendList(props) {
  const {} = props;
  
  const [friends, setFriends] = useState();

  const getFriends = function () {

  }

  return (
    <div>
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
        <Tab eventKey="Friends" title="Home">
          <Sonnet />
        </Tab>
        <Tab eventKey="Requests" title="Profile">
          <Sonnet />
        </Tab>
        <Tab eventKey="Search" title="Contact">
          <Sonnet />
        </Tab>
      </Tabs>
    </div>
  )
}