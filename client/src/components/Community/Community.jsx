import React, {useState} from 'react';
import {Form, Tabs, Tab, ListGroup} from "react-bootstrap";
import FriendList from './FriendList'
import RequestList from './RequestList'
import SearchUser from './SearchUser'


export default function Community(props) {
  const {currentUser} = props;

  const [key, setKey] = useState('Friends');
  const friends = [];
  const requests = [];

  return (
    <div>
      <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="Friends" title="Friends">
          <FriendList/>
        </Tab>
        <Tab eventKey="Requests" title="Request">
          <RequestList/>
        </Tab>
        <Tab eventKey="Search" title="Search">
          <SearchUser/>
        </Tab>
      </Tabs>
    </div>
  )
}