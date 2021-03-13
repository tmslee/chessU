import React, {useEffect, useState} from "react";

import "./styles/HomeMenu.scss"
import {Button, Modal, Form, Row, Col} from "react-bootstrap";

const RANKED = "RANKED";
const CASUAL = "CASUAL";
const AI = "AI";

export default function GameForm(props) {
  const {gameType, enqueue, loadGame, hide} = props;
  const [gameOptions, setGameOptions] = useState({
    gameType,
    timeLimit: null,
    opponent: null,
    difficulty: null
  });
  const setTime = (timeLimit) => {setGameOptions(prev => ({...prev, timeLimit}))};
  const setOpponent = (opponent) => {setGameOptions(prev => ({...prev, opponent}))};
  const setDifficulty = (difficulty) => {setGameOptions(prev => ({...prev, difficulty}))};

  return (
    <Form onSubmit={event => event.preventDefault()}>
      <Modal.Body>
        <Form.Row>
          <Form.Group as={Row}>
            <Form.Label as="legend" row sm={2}>
              Timer Setting
            </Form.Label>
            <Col sm={10}>
              <Form.Check
                type="radio"
                label="10 minutes"
                name="timeSetting"
                id="timeSetting1"
                onClick={() => setTime(10)}
              />
              <Form.Check
                type="radio"
                label="30 minutes"
                name="timeSetting"
                id="timeSetting2"
                onClick={() => setTime(30)}
              />
              <Form.Check
                type="radio"
                label="unlimited"
                name="timeSetting"
                id="timeSetting3"
                onClick={() => setTime(null)}
              />
            </Col>
          </Form.Group>
       
          {gameType === CASUAL &&     
            <Form.Group as={Col} controlId="inviteUser">
              <Form.Label>Invite a Friend</Form.Label>
              <Form.Control 
                placeholder="leaving it blank will find a random opponent"
                onChange = {event => setOpponent(event.target.value)}
              />
            </Form.Group>
          }

          {gameType === AI && 
            <Form.Group as={Row}>
              <Form.Label as="legend" row sm={2}>
                Difficulty
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="easy"
                  name="difficultySetting"
                  id="difficultySetting1"
                  onClick={() => setDifficulty(1)}
                />
                <Form.Check
                  type="radio"
                  label="normal"
                  name="difficultySetting"
                  id="difficultySetting2"
                  onClick={() => setDifficulty(2)}
                />
                <Form.Check
                  type="radio"
                  label="hard"
                  name="difficultySetting"
                  id="difficultySetting3"
                  onClick={() => setDifficulty(3)}
                />
              </Col>
            </Form.Group>
          }
        </Form.Row>

      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={hide}>
          Cancel
        </Button>
        {(gameType === RANKED || gameType === CASUAL) && <Button variant="primary" onClick={() => enqueue(gameOptions)}>Queue Up</Button> }
        {(gameType === AI) && <Button variant="primary" onClick={() => loadGame(gameOptions)}>Start Game</Button> }
      </Modal.Footer>
    </Form>
  );
};
     