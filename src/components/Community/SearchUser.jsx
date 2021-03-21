import axios from 'axios';
import React, { useState} from 'react';
import {ListGroup, Form, Button, Col} from "react-bootstrap";
import UserListItem from './UserListItem';
import "./styles/SearchUser.scss";

export default function SearchUser(props) {
  const {
    currentUser,
    friends,
    requests,
    pendingFriends,
    removeFriend,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    ranked10,
    ranked30,
    getOverallRank
  } = props;

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const isFriend = function (user) {
    for(const friend of friends){
      if(friend.id === user.id) return true;
    }
    return false;
  }
  const isPending = function (user){
    for(const friend of pendingFriends){
      if(friend.id === user.id) return true;
    }
    return false;
  }
  const isRequesting = function (user){
    for(const friend of requests){
      if(friend.id === user.id) return true;
    }
    return false;
  }

  const parsedSearchResult = searchResult.map(res => {
    return (
      <ListGroup.Item
        key={res.id}
      >
        <UserListItem
          currentUser={currentUser}
          isFriend={isFriend(res)}
          isPending={isPending(res)}
          isRequesting={isRequesting(res)}
          user={res}
          removeFriend={removeFriend}
          sendFriendRequest={sendFriendRequest}
          acceptFriendRequest={acceptFriendRequest}
          declineFriendRequest={declineFriendRequest}
          rank={getOverallRank(ranked30, ranked10, res)}
        />
      </ListGroup.Item>
    );
  })

  const search = function (searchTerm) {
    axios.get(`http://localhost:8001/api/user_search/${currentUser.id}/${searchTerm}`).then(searchRes => 
    {
      console.log(searchRes);
      setSearchResult(searchRes.data);
    })
  }

  const submitSearch = function (event) {
    event.preventDefault();
    search(searchTerm);
  }

  return (
    <div>
      <Form onSubmit={submitSearch}>
        <Form.Row className="search-form">
          <Col className="search-bar-container">
            <Form.Group controlId="usernameSearch" className="search-bar">
              <Form.Control 
               className="search-bar"
                type="text" 
                placeholder="Search by username" 
                onChange={event => setSearchTerm(event.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Col>
        </Form.Row>

      </Form>
      <ListGroup variant="flush">
        {parsedSearchResult}
      </ListGroup>
    </div>

  )
}