import React, {useState, useEffect} from 'react';
import {Form, Tabs, Tab, ListGroup} from "react-bootstrap";
import UserListItem from "./UserListItem";
import axios from "axios";

export default function LeaderBoards(props) {
  const { currentUser } = props;
  const [type, setType] = useState('ranked30');
  const [users, setUsers] = useState();

  useEffect( () => {
    axios.get(`http://localhost:8001/api/leaderboards/${type}`)
    .then( res => setUsers(res.data));
  },[type])
  // setUsers(res.data)

  const userListRender = () => {
    const userListItem = users.map( user => {
      return(
      <UserListItem 
      currentUser={currentUser}
      type="user"
      user={user}
      isFriend={true}
      />
      )
    })
    return userListItem;
  } 
  
  // I NEED TO GRAB user object of { profile_img, username, elo, isFriend }

  return (
    <div>
      { users && type &&
      <Tabs
      id="controlled-tab-example"
      activeKey={type}
      onSelect={(k) => setType(k)}
      >
        <Tab eventKey="ranked30" title="30 minutes ranked">
          <div>30 RANKED</div>
          {userListRender()}
        </Tab>
        <Tab eventKey="ranked10" title="10 minutes ranked">
          <div>10 RANKED</div>
          {userListRender()}
        </Tab>
        <Tab eventKey="ranked0" title="no time limit ranked">
          <div>UNLIMITED RANKED</div> 
          {userListRender()}
        </Tab>
      </Tabs>
    } 
    </div>
  );
}