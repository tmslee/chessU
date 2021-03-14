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

const EMPTY_GAME = {
  type:null,
  timelimit:null,
  difficulty:null,
  currentUserID:null,
  opponentID:null
};

export default function GameOptionsModal(props) {
  
  const {
    showState,
    gameOptions, 
    setGameOptions, 
    closeModal
  } = props;

  const {
    mode,
    goToView
  } = useEnqueueFlow(SELECT_OPTIONS);


  const leaveQueue = function (gameOptions) {
    //implement getting off queue here
    console.log("leaving queue...");
  };

  const enqueue = function (gameOptions) {
    console.log("joining queue...");
    console.log(gameOptions);
    //need to implement actual enqueue here
    goToView(IN_Q);
  }

  const loadGame = function (gameOptions) {
    leaveQueue(gameOptions);
    console.log("loading game...");
    console.log(gameOptions);
    goToView(LOADING);
    //need to implement actual loadGame here
  }

  const returnToGameOptions = function () {
    leaveQueue(gameOptions);
    console.log("returning to game settings...");
    console.log("setting opponent to null");
    setGameOptions({...gameOptions, opponentID: null});
    console.log(gameOptions);
    goToView(SELECT_OPTIONS);
  }

  const returnToMenu = function () {
    console.log("returning to home page...");
    closeModal();
    console.log(gameOptions);
  }
  
  // useEffect(() => {
   //   goToView(SELECT_OPTIONS);
  //   //also need to get off the queue.
  // },[show])

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