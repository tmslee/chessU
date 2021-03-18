import React, {useEffect, useState} from 'react';
import {Form, Tabs, Tab, ListGroup} from "react-bootstrap";
import FriendList from './FriendList'
import RequestList from './RequestList'
import SearchUser from './SearchUser'


export default function Community(props) {
  const {currentUser} = props;

  const [key, setKey] = useState('Friends');

  const [friends, setFriends] = useState();
  const [requests, setRequests] = useState();

  useEffect(() => {
    if(currentUser){
      setFriends([]);
      setRequests([]);
    }
    else {
      setFriends([]);
      setRequests([]);
    }
  }, [currentUser]);

  return (
    <div>
      <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="Friends" title="Friends">
          <FriendList
            currentUser={currentUser}
            friends={friends}
          />
        </Tab>
        <Tab eventKey="Requests" title="Request">
          <RequestList
            currentUser={currentUser}
            requests={requests}
          />
        </Tab>
        <Tab eventKey="Search" title="Search">
          <SearchUser
            currentUser={currentUser}
            friends={friends}
          />
        </Tab>
      </Tabs>
    </div>
  )
}