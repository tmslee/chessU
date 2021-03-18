import React, {useState} from 'react';
import {Form, Tabs, Tab, ListGroup} from "react-bootstrap";
import UserListItem from "./UserListItem";
import axios from "axios";

export default function LeaderBoards(props) {
  const { currentUser } = props;
  const [type, setType] = useState('ranked30');
  const [users, setUsers] = useState();

  axios.get(`http://localhost:8001/api/leaderboards/${type}`)
  .then( res => console.log(res.data));
  // setUsers(res.data)

  const userListRender = () => {
    const userListItem = users.map( user => {
      return(
      <UserListItem 
      currentUser={currentUser}
      type={type}
      user={user}
      />
      )
    })
    return userListItem;
  } 
  
  // I NEED TO GRAB user object of { profile_img, username, elo, isFriend }

  return (
    <div>
      <Tabs
      id="controlled-tab-example"
      activeKey={type}
      onSelect={(k) => setType(k)}
      >
        { users && type === 'ranked30' &&
        <Tab eventKey="ranked30" title="30 minutes ranked">
          <div>30 RANKED</div>
          {userListRender}
        </Tab>
        }
        { users && type === 'ranked10' &&
        <Tab eventKey="ranked10" title="10 minutes ranked">
          <div>10 RANKED</div>
        </Tab>
        }
        { users && type === 'ranked0' &&
        <Tab eventKey="ranked0" title="no time limit ranked">
          <div>UNLIMITED RANKED</div> 
        </Tab>
        }
      </Tabs>
    </div>
  );
}