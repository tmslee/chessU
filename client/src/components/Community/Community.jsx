import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Tabs, Tab} from "react-bootstrap";
import FriendList from './FriendList'
import RequestList from './RequestList'
import SearchUser from './SearchUser'
import useUserState from './../../hooks/useUserList';


export default function Community(props) {
  const {currentUser} = props;

  const [key, setKey] = useState('Friends');

  const {
    friends,
    requests,
    myRequests,
    getFriends,
    getFriendRequests,
    getFriendRequestsByMe,
    removeFriend,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest
  } = useUserState(currentUser);

  return (
    <div>
      <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => {
        setKey(k);
        if(k === "Friends") getFriends();
        if(k === "Requests") getFriendRequests();
      }}
      >
        <Tab eventKey="Friends" title="Friends">
          <FriendList
            currentUser={currentUser}
            friends={friends}
            removeFriend={removeFriend}
            sendFriendRequest={sendFriendRequest}
            acceptFriendRequest={acceptFriendRequest}
            declineFriendRequest={declineFriendRequest}
          />
        </Tab>
        <Tab eventKey="Requests" title={`Requests (${requests.length})`}>
          <RequestList
            currentUser={currentUser}
            requests={requests}
            removeFriend={removeFriend}
            sendFriendRequest={sendFriendRequest}
            acceptFriendRequest={acceptFriendRequest}
            declineFriendRequest={declineFriendRequest}
          />
        </Tab>
        <Tab eventKey="Search" title="Search">
          <SearchUser
            currentUser={currentUser}
            friends={friends}
            requests={requests}
            pendingFriends={myRequests}
            removeFriend={removeFriend}
            sendFriendRequest={sendFriendRequest}
            acceptFriendRequest={acceptFriendRequest}
            declineFriendRequest={declineFriendRequest}
          />
        </Tab>
      </Tabs>
    </div>
  )
}