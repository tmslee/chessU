import React, {useState} from 'react';
import {ListGroup, Form, Button, Col} from "react-bootstrap";
// import FriendList from ''

export default function SearchUser(props) {
  const {} = props;


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
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
      </ListGroup>
    </div>

  )
}