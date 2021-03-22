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

export default function GameOptionsModal(props) {
  
  const {
    showState,
    gameOptions, 
    setGameOptions, 
    closeModal,
    setGameInfo,
    setInvitedStatus
  } = props;

  const {
    mode,
    goToView
  } = useEnqueueFlow(SELECT_OPTIONS);

  const {enqueue, dequeue} = useQueue(gameOptions, setGameOptions, goToView);
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
  const loadGame = async function (data, currentUser, opponent, matchId, timeLimit) {
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

    setGameInfo({
      matchId : data.matchId,
      colors : data.colors,
      name1 : currentUser.username,
      name2 : opponent.username,
      timeLimit,
      opponentRanked10: opponent.ranked10,
      opponentRanked30: opponent.ranked30,
      opponentCasual: opponent.casual,
      matchType: data.type,
    })
    goToView(LOADING);
    history.push(`/game/${matchId}`);
  }

  const returnToGameOptions = function () {
    dequeue();
    setGameOptions({...gameOptions, opponent: null, timeLimit: undefined, difficulty: null});
    goToView(SELECT_OPTIONS);
    setInvitedStatus(false);
  }

  const returnToMenu = function () {
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
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////

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