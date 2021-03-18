import React, {useEffect, useState} from "react";

import {useHistory} from "react-router-dom";

import "./styles/GameOptionModal.scss";
import {Modal} from "react-bootstrap";
import axios from "axios";

import useEnqueueFlow from "./../../hooks/useEnqueueFlow";
import useQueue from "./../../hooks/useQueue";

import GameForm from "./GameForm";
import GameQueue from './GameQueue';
import GameAccept from './GameAccept';
import Loading from './Loading';
import Error from './Error';

const RANKED = "RANKED";
const CASUAL = "CASUAL";
const AI = "AI";

const SELECT_OPTIONS = "SELECT_OPTIONS";
const IN_Q = "IN_Q";
const ACCEPT_MATCH = "ACCEPT_MATCH";
const LOADING = "LOADING";
const ERROR = "ERROR";

// const EMPTY_GAME = {
//   type:null,
//   timelimit:null,
//   difficulty:null,
//   currentUser:null,
//   opponentID:null
// };

export default function GameOptionsModal(props) {
  
  const {
    showState,
    gameOptions, 
    setGameOptions, 
    closeModal,
    setGameRoute,
    setGameInfo
  } = props;

  const {
    mode,
    goToView
  } = useEnqueueFlow(SELECT_OPTIONS);

  const {inQueue, enqueue, dequeue} = useQueue(gameOptions, setGameOptions, goToView);

  const history = useHistory();
  const loadGame = function (data, currentUser, opponent, matchId) {
    // leaveQueue(gameOptions.currentUserID);
    console.log("ai loading game...");
    if (opponent.username === 'AI'){
      setGameInfo({
        matchId : data.matchId,
        colors : data.colors,
        name1 : currentUser.username,
        name2 : opponent.username 
      })
      history.push(`/aigame/${matchId}`);
      return
    } 

    dequeue();
    console.log("loading game...");
    console.log({
      matchId : data.matchId,
      colors : data.colors,
      name1 : currentUser.username,
      name2 : opponent.username 
    });
    setGameInfo({
      matchId : data.matchId,
      colors : data.colors, // { white : id, black : id }
      name1 : currentUser.username,
      name2 : opponent.username 
    })
    goToView(LOADING);
    history.push(`/game/${matchId}`);
  }

  const returnToGameOptions = function () {
    // leaveQueue(gameOptions.currentUserID);
    dequeue();
    console.log("returning to game settings...");
    console.log("setting opponent to null");
    setGameOptions({...gameOptions, opponent: null});
    goToView(SELECT_OPTIONS);
  }

  const returnToMenu = function () {
    console.log("returning to home page...");
    closeModal();
  }
  
 // useEffect(() => {
   //   goToView(SELECT_OPTIONS);
  //   //also need to get off the queue.
  // },[show])


  // console.log(gameOptions, "HERE")

  return (
    <Modal show={showState} onHide={closeModal} backdrop="static" keyboard={false}>
      <Modal.Header>
        {gameOptions.type === RANKED && <Modal.Title>Ranked Mode </Modal.Title>}
        {gameOptions.type === CASUAL && <Modal.Title>Casual Mode </Modal.Title>}
        {gameOptions.type === AI && <Modal.Title>VS AI </Modal.Title>}        
      </Modal.Header>

      {mode === SELECT_OPTIONS && 
        <GameForm
          gameOptions = {gameOptions}
          setGameOptions = {setGameOptions}
          enqueue = {enqueue}
          loadGame = {loadGame}
          returnToMenu = {returnToMenu}
        />
      }
      {mode === IN_Q && 
        <GameQueue
          gameOptions = {gameOptions}
          setGameOptions = {setGameOptions}
          goToView = {goToView}
          returnToGameOptions={returnToGameOptions}
        />
      }
      {mode === ACCEPT_MATCH && 
        <GameAccept
          gameOptions = {gameOptions}
          loadGame = {loadGame}
          returnToGameOptions={returnToGameOptions}
          setGameRoute = {setGameRoute}
          setGameInfo = {setGameInfo}
        />
      }      
      {mode === LOADING && 
        <Loading
        />
      }
      {mode === ERROR && 
        <Error
          returnToMenu={returnToMenu}
        />
      }  
    </Modal>
  );
}