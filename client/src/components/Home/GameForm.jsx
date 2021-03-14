import React, {useEffect, useState} from "react";

import "./styles/HomeMenu.scss"
import {Button, Modal, Form, Row, Col} from "react-bootstrap";

const RANKED = "RANKED";
const CASUAL = "CASUAL";
const AI = "AI";

export default function GameForm(props) {
  const {
    gameOptions, 
    setGameOptions, 
    enqueue, loadGame, 
    returnToMenu
  } = props;

  // const [gameOptions, setGameOptions] = useState({
  //   gameType,
  //   timeLimit: null,
  //   opponent: null,
  //   difficulty: null
  // });

  let newGameOptions = {...gameOptions};

  const setTime = (timeLimit) => {
    newGameOptions = {...newGameOptions, timeLimit};
    setGameOptions(newGameOptions);
  };

  const setOpponent = (opponent) => {    
    newGameOptions = {...newGameOptions, opponent};
    setGameOptions(newGameOptions);
  };
  
  const setDifficulty = (difficulty) => {    
    newGameOptions = {...newGameOptions, difficulty};
    setGameOptions(newGameOptions);
  };

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
       
          {gameOptions.type === CASUAL &&     
            <Form.Group as={Col} controlId="inviteUser">
              <Form.Label>Invite a Friend</Form.Label>
              <Form.Control 
                placeholder="leaving it blank will find a random opponent"
                onChange = {event => setOpponent(event.target.value)}
              />
            </Form.Group>
          }

          {gameOptions.type === AI && 
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
        <Button variant="secondary" onClick={returnToMenu}>
          Cancel
        </Button>
        {(gameOptions.type === RANKED || gameOptions.type === CASUAL) && <Button variant="primary" onClick={() => enqueue(gameOptions)}>Queue Up</Button> }
        {(gameOptions.type === AI) && <Button variant="primary" onClick={() => loadGame(gameOptions)}>Start Game</Button> }
      </Modal.Footer>
    </Form>
  );
};
     