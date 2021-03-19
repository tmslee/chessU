import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Tabs, Tab} from "react-bootstrap";
import FriendList from './FriendList'
import RequestList from './RequestList'
import SearchUser from './SearchUser'


export default function Community(props) {
  const {currentUser} = props;

  const [key, setKey] = useState('Friends');

  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [myRequests, setMyRequests] = useState([]);

  const getFriends = function () {
    if(currentUser){
      axios.get(`http://localhost:8001/api/friends/${currentUser.id}`)
      .then( res => {
        setFriends(res.data)
      });
    }
  };
  const getFriendRequests = function (){
    if(currentUser){
      axios.get(`http://localhost:8001/api/friendRequests/${currentUser.id}`)
      .then( res => {
        setRequests(res.data)
      });
    }
  }
  const getFriendRequestsByMe = function (){
    if(currentUser){
      axios.get(`http://localhost:8001/api/friendRequestsByMe/${currentUser.id}`)
      .then( res => {
        console.log(res.data);
        setMyRequests(res.data)
      });
    }
  }
  const removeFriend = async function (currentUserID, userID) {
    await axios.delete(`http://localhost:8001/api/friends/${currentUserID}/${userID}`)
    getFriends();
    getFriendRequestsByMe();
  }
  const sendFriendRequest = async function (currentUserID, userID) {
    await axios.post(`http://localhost:8001/api/friends/${currentUserID}/${userID}`);
    getFriends();
    getFriendRequestsByMe();
  }
  const acceptFriendRequest = async function (currentUserID, userID) {
    await axios.post(`http://localhost:8001/api/friendRequests/${currentUserID}/${userID}`);
    getFriendRequests();
  }
  const declineFriendRequest = async function (currentUserID, userID) {
    await axios.delete(`http://localhost:8001/api/friendRequests/${currentUserID}/${userID}`);
    getFriendRequests();
  }

  useEffect(() => {
    getFriends();
    getFriendRequests();
    getFriendRequestsByMe();
  }, [currentUser]);

  // useEffect(() => {
  //   getFriends();
  // }, [removeFriend]);

  // useEffect(() => {
  //   getFriendRequests();
  // }, [acceptFriendRequest, declineFriendRequest]);

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