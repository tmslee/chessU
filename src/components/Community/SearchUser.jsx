import React, {useEffect, useState} from 'react';
import {ListGroup, Form, Button, Col} from "react-bootstrap";
import { First } from 'react-bootstrap/esm/PageItem';
import UserListItem from './UserListItem';
// import FriendList from ''

export default function SearchUser(props) {
  const {currentUser, friends} = props;

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  // useEffect(() => {
  //   setSearchResult();
  // }, [searchTerm]);
  const isFriend = function (currentuser, user) {
    return true;
  }

  const parsedSearchResult = searchResult.map(res => {
    return (
      <ListGroup.Item>
        <UserListItem
          currentUser={currentUser}
          type={"user"}
          isFriend={isFriend()}
          user={res}
        />
      </ListGroup.Item>
    );
  })

  return (
    <div>
      <Form>
        <Form.Row>
          <Col>
            <Form.Group controlId="usernameSearch">
              <Form.Control type="text" placeholder="Search by username" />
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