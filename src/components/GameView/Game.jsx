import './styles/Game.scss';
import ChessBoard from "chessboardjsx";
import React from "react";
import { useState, useRef, useEffect } from "react";
import Chess from "chess.js";
import Countdown from './Timer';
import PopupWin from './PopupWin';
import MovesLog from "./MovesLog"
import Chat from "../ChatRoom/Chat"
import useMove from "../../hooks/moves"
import axios from "axios";
import PopupConfirm from "./PopupConfirm";
import useResign from "../../hooks/resign";

function Game(props) {
  const { matchId } = props.match.params;
  const matchType = props.gameInfo.matchType;
  console.log(props);

  const eloRanked10 = props.currentUser.ranked10;
  const eloRanked30 = props.currentUser.ranked30;
  const eloRankedCasual = props.currentUser.casual;

  const opponentRanked10 = props.gameInfo.opponentRanked10;
  const opponentRanked30 = props.gameInfo.opponentRanked30;
  const opponentCasual = props.gameInfo.opponentCasual;

  const isRanked = true;
  let usernameWhite;
  let usernameBlack;
  let chessboardOrientation;
  // decide who is white or black
  if (props.currentUser.id === props.gameInfo.colors.white){
    usernameWhite = props.currentUser.username;
    if (usernameWhite === props.gameInfo.name1){
      usernameBlack = props.gameInfo.name2;
    } else {
      usernameBlack = props.gameInfo.name1;
    }
    chessboardOrientation = 'white';
  } else {
    usernameBlack = props.currentUser.username;
    if (usernameBlack === props.gameInfo.name1){
      usernameWhite = props.gameInfo.name2;
    } else {
      usernameWhite = props.gameInfo.name1;
    }
    chessboardOrientation = 'black';
  }
  console.log('white', usernameWhite, 'black', usernameBlack);

  let duration;
  if(props.gameInfo.timeLimit === null){
    duration = false;
  } else {
    duration = props.gameInfo.timeLimit;
  }

  const [state, setState] = useState({
    position: "start",
    isBlackRunning: false,
    isWhiteRunning: true,
    isGameOver: false,
    modalShow: false,
    reset: false,
    chessmoves: [],
    winner:'',
    roomId: matchId,
    isReceived: true,
    duration,
    isResign: false,
    isReceivedResign: false,
  })

  const roomId = state.roomId;
  let { currentMove, sendMove } = useMove(roomId);
  let { concede, sendConcedeMessage } = useResign(roomId);

  // set current positions from Chess.js
  let game = useRef(null);
  if (state.position === "start"){
    game.current = new Chess();
  }

  console.log('re-render');
  console.log(currentMove);
  console.log('before', state.isReceived);

  const gameover = function(winner){
    setState(prev => ({...prev,
      isWhiteRunning: false,
      isBlackRunning: false,
      isGameOver: true,
      modalShow: true,
      winner
    }));
  }
  const movesRecord = async function(move) {
    const record = {};
    if(move['player'] == usernameWhite){
      record['userID'] = props.gameInfo.colors.white;
    } else {
      record['userID'] = props.gameInfo.colors.black;
    }
    record["matchID"] = props.gameInfo.matchId;
    record["action"] = `from: ${move.from}, to: ${move.to}`;
    console.log('send', record);
    try {
      const recordMatch = await axios.post('http://localhost:8001/api/actions', record)
      console.log('send successfully');
      return recordMatch;
    } catch (err) {
      console.log(err, "error")
    }
  };

  const resultRecord = async function(){
    const matchResult = {
      white: props.gameInfo.colors.white, 
      black: props.gameInfo.colors.black,
      winner: props.currentUser.id,
    };
    if (matchResult['white'] === matchResult['winner']){
      matchResult['loser'] = matchResult['black'];
    } else {
      matchResult['loser'] = matchResult['white'];
    }
    matchResult["timeLimit"] = state.duration;
    const idMatch = props.gameInfo.matchId;
    console.log(matchResult);
    try{
      const result = await axios.put(`http://localhost:8001/api/matches/${idMatch}`, matchResult)
      console.log('record')
      return result;
    } catch (err) {
      console.log(err, "error")
    }
  }

  // the winner client side will send the result
  const resultSend = function(){ 
    if (game.current.turn() === 'b'){
      gameover('White');
    } else {
      gameover('Black');
    }
  }

  // if the move is not made by current user
  // reset the chessboard based on received move made by other user
  if(!currentMove.movedByCurrentUser && currentMove.length !== 0 && state.isReceived){
    console.log('not my move', !currentMove.movedByCurrentUser);
    
    const from = currentMove.body.from;
    const to = currentMove.body.to;
    game.current.move({ from, to });
    let moveReceived = {from, to};
    
    let chessmoves = state.chessmoves;
    if(state.isBlackRunning){
      moveReceived['player'] = usernameBlack;
      chessmoves.unshift(moveReceived);
    } else {
      moveReceived['player'] = usernameWhite;
      chessmoves.unshift(moveReceived);
    }
    
    if (!game.current.game_over()){
      if (state.isWhiteRunning){
        setState(prev => ({...prev,
          isWhiteRunning: false,
          isBlackRunning: true,
          position: game.current.fen(),
          chessmoves,
          isReceived: false
        }));
      } else {
        setState(prev => ({...prev,
          isWhiteRunning: true,
          isBlackRunning: false,
          position: game.current.fen(),
          chessmoves,
          isReceived: false
        }));
      }
      movesRecord(moveReceived);
    } else {
      resultSend();
    }
  }

  currentMove.movedByCurrentUser = true;

  // user makes a move
  //The logic to be performed on piece drop. See chessboardjsx.com/integrations for examples.
  // Signature: function({ sourceSquare: string, targetSquare: string, piece: string }) => void
  const onDrop = ({sourceSquare, targetSquare}) => {
    // return position change when the move is valid
    console.log(sourceSquare, targetSquare);
    let move = game.current.move({
      from: sourceSquare,
      to: targetSquare
    });
    if (!move) return;

    let moveMade = {from: sourceSquare, to: targetSquare};
    
    let chessmoves = state.chessmoves;
    if(state.isBlackRunning){
      moveMade['player'] = usernameBlack;
      chessmoves.unshift(moveMade);
      sendMove(moveMade);
    } else {
      moveMade['player'] = usernameWhite;
      chessmoves.unshift(moveMade);
      sendMove(moveMade);
    }

    if (!game.current.game_over()){
      if (state.isWhiteRunning){
        setState(prev => ({...prev,
          isWhiteRunning: false,
          isBlackRunning: true,
          position: game.current.fen(),
          chessmoves,
          isReceived: true
        }));
      } else {
        setState(prev => ({...prev,
          isWhiteRunning: true,
          isBlackRunning: false,
          position: game.current.fen(),
          chessmoves,
          isReceived: true
        }));
      }
    } else {
      resultSend();
      resultRecord();
    }
  }
  
  const setModalShow = function(bool){
    setState(prev => ({...prev, modalShow: bool }));
  }

  const setResign = function(bool){
    setState(prev => ({...prev, isResign: bool }));
  }

  const setisReceivedResign = function(bool){
    setState(prev => ({...prev, isReceivedResign: bool}))
  }

  const declareConcede = function(){
    console.log('You concede!');
    sendConcedeMessage(true);
    if (usernameWhite === props.currentUser.username){
      gameover('black');
    } else {
      gameover('white');
    }
  }
  
  console.log(concede);
  if(!concede.concededByCurrentUser && concede.length !== 0 && !state.isReceivedResign){
    if (usernameWhite === props.currentUser.username){
      gameover('white');
    } else {
      gameover('black');
    }
    resultRecord();
    setisReceivedResign(true);
  }

  const timeLimitShow = duration ? duration + 'mins' : 'unlimited' ;

  return (
    <div className="gameView">
      <div className="countdown">
        {state.duration &&  
        <Countdown color={"white"} 
        username={usernameWhite}
        isGameOver={state.isGameOver}
        isRunning={state.isWhiteRunning}
        duration={state.duration}
        timeout={gameover}/>}
        {state.duration &&  
        <Countdown color={"black"}
        username={usernameBlack}
        isGameOver={state.isGameOver}
        isRunning={state.isBlackRunning}
        duration={state.duration}
        timeout={gameover}/>}
      </div>
      <div className="chess-main">
        <div className="gameInfo">
          <div className="card border-primary mb-3">
            <div className="card-header">GAME INFO</div>
            <div className="card-body">
              <h4 className="card-title">You: {props.gameInfo.name1}</h4>
              <p className="card-text">ELO rank/10mins: {eloRanked10}</p>
              <p className="card-text">ELO rank/30mins: {eloRanked30}</p>
              <p className="card-text">ELO casual: {eloRankedCasual}</p>
              <h4 className="card-title">Opponent: {props.gameInfo.name2}</h4>
              <p className="card-text">ELO rank/10mins: {opponentRanked10}</p>
              <p className="card-text">ELO rank/30mins: {opponentRanked30}</p>
              <p className="card-text">ELO casual: {opponentCasual}</p>
              <p className="card-text">Game Mode: Ranked/Casual</p>
              <p className="card-text">Time Limit: {timeLimitShow}</p>
              <button type="button" class="btn btn-outline-danger" onClick={() => setResign(true)}>resign</button>
            </div>
          </div>
        </div>
      <div className="chessboard">
        <ChessBoard position={state.position} orientation={chessboardOrientation} onDrop={onDrop} roomId={state.roomId}/>
        <div className="move-chat">
          <div className="move_log">
            <MovesLog moves={state.chessmoves} roomId={state.roomId}/>
          </div>
          <Chat roomId={state.roomId}/>
        </div>
      </div>
      <PopupWin
        show={state.modalShow}
        onHide={() => setModalShow(false)}
        winner={state.winner}
        isRanked={isRanked}
        isReceivedResign={state.isReceivedResign}
      />
      <PopupConfirm show={state.isResign}
        resultSend={declareConcede}
        onHide={() => setResign(false)}
      />
      </div>
    </div>
  );
}

export default Game;
