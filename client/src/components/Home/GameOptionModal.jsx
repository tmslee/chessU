import React, {useEffect, useState} from "react";

import "./styles/GameOptionModal.scss"
import {Modal} from "react-bootstrap";

import useEnqueueFlow from "./../../hooks/useEnqueueFlow";
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

export default function GameOptionsModal(props) {
  
  const {show, gameType, hide} = props;
  const {
    mode,
    goToView
  } = useEnqueueFlow(SELECT_OPTIONS);

  const leaveQueue = function () {

  };

  const enqueue = function (params) {
    console.log(params);
    //need to implement actual enqueue
    goToView(IN_Q);
  }

  const loadGame = function (params) {
    console.log(params);
    //need to implement actual loadGame
    goToView(LOADING);
  }

  const returnToGameOptions = function () {
    leaveQueue();
    goToView(SELECT_OPTIONS);
  }
  // useEffect(() => {
   //   goToView(SELECT_OPTIONS);
  //   //also need to get off the queue.
  // },[show])

  return (
    <Modal show={show} onHide={hide} backdrop="static" keyboard={false}>
      <Modal.Header>
        {gameType === RANKED && <Modal.Title>Ranked Mode </Modal.Title>}
        {gameType === CASUAL && <Modal.Title>Casual Mode </Modal.Title>}
        {gameType === AI && <Modal.Title>VS AI </Modal.Title>}        
      </Modal.Header>

      {mode === SELECT_OPTIONS && 
        <GameForm
          gameType = {gameType}
          enqueue = {enqueue}
          loadGame = {loadGame}
          hide = {hide}
        />
      }
      {mode === IN_Q && 
        <GameQueue
          returnToGameOptions={returnToGameOptions}
        />
      }
      {mode === ACCEPT_MATCH && 
        <GameAccept

        />
      }      
      {mode === LOADING && 
        <Loading
          returnToGameOptions={returnToGameOptions}
        />
      }
      {mode === ERROR && 
        <Error
          gameType={gameType}
        />
      }  
    </Modal>
  );
}