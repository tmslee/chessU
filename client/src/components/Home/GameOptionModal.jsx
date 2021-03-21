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
import InviteOpponent from "./InviteOpponent";
import OpponentUnavailable from "./OpponentUnavailable";

const RANKED = "RANKED";
const CASUAL = "CASUAL";
const AI = "AI";

const SELECT_OPTIONS = "SELECT_OPTIONS";
const IN_Q = "IN_Q";
const ACCEPT_MATCH = "ACCEPT_MATCH";
const LOADING = "LOADING";
const INVITE_OPPONENT = "INVITING_OPPONENT";
const OPPONENT_UNAVAIL = 'OPPONENT_UNAVAIL';
const WAITING_FOR_OPPONENT = "WAITING_FOR_OPPONENT";
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
    setGameInfo,
    setInvitedStatus
  } = props;

  const {
    mode,
    goToView
  } = useEnqueueFlow(SELECT_OPTIONS);

  const {inQueue, enqueue, dequeue} = useQueue(gameOptions, setGameOptions, goToView);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if(gameOptions.currentUser){
      axios.get(`http://localhost:8001/api/friends/${gameOptions.currentUser.id}`)
      .then( res => {
        setFriends(res.data)
      });
    }
  }, [gameOptions]);

  const history = useHistory();
  const loadGame = function (data, currentUser, opponent, matchId, timeLimit) {
    // leaveQueue(gameOptions.currentUserID);
    console.log("ai loading game...");
    if (opponent.username === 'AI'){
      setGameInfo({
        type: data.type,
        difficulty: data.difficulty,
        timeLimit: data.timeLimit,
        matchId : data.matchId,
        colors : data.colors,
        name1 : currentUser.username,
        name2 : opponent.username 
      })
      history.push(`/aigame/${matchId}`);
      setInvitedStatus(false);
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
      name2 : opponent.username,
      timeLimit
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
    setInvitedStatus(false);
  }

  const returnToMenu = function () {
    console.log("returning to home page...");
    closeModal();
    setInvitedStatus(false);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  const isFriend = function (id, friends) {
    for(const friend of friends){
      if(friend.id === id) return true;
    }
    return false;
  }

  const inviteToGame = function (gameOptions) {
    if (gameOptions.opponent && isFriend(gameOptions.opponent.id, friends)) {
      goToView(INVITE_OPPONENT);
    } else {
      //display error
      console.log("this is not your friend");
    } 
    
    /*
    1. check if opponent is friend.
    2. check if they are not in queue and not in match accept state
      - send a message to server asking for this guy's status
      - if theyre in queue or match accept state
        - server sends back message saying theyre busy
      - else 
        - server sets up matches, matchConfirmStatus, userSockets
        - server sends inv message to opponent => which will set state and elicit changes to opponent client
        - @ client side of both opponents, show UI that detects on click which sends confirmation status back 
          to server
        - proceed with match making accordingly
    */
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////

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
          inviteToGame = {inviteToGame}
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
          initialAcceptStatus={0}
          gameOptions = {gameOptions}
          loadGame = {loadGame}
          returnToGameOptions={returnToGameOptions}
          setGameRoute = {setGameRoute}
          setGameInfo = {setGameInfo}
        />
      }     
      {mode === INVITE_OPPONENT &&
        <InviteOpponent
          gameOptions={gameOptions}
          goToView={goToView}
        />
      }
      {mode === WAITING_FOR_OPPONENT &&
        <GameAccept
        initialAcceptStatus={1}
        gameOptions = {gameOptions}
        loadGame = {loadGame}
        returnToGameOptions={returnToGameOptions}
        setGameRoute = {setGameRoute}
        setGameInfo = {setGameInfo}
        />
      }
      {mode === OPPONENT_UNAVAIL &&
        <OpponentUnavailable
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