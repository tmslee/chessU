import { Game, move, status, moves, aiMove, getFen } from 'js-chess-engine'
import ChessBoard from "chessboardjsx";
import React from "react";
import { useState, useRef } from "react";
import Countdown from '../GameView/Timer';
import PopupWin from '../GameView/PopupWin';
import MovesLog from "../GameView/MovesLog"
import Chess from "chess.js";
import axios from "axios";
import Chat from "../ChatRoom/Chat"
import { Button, Modal } from 'react-bootstrap';

export default function AiGame(props){
  console.log(props);
  const currentUserId = props.currentUser.id
  const { matchId } = props.match.params; 
  const difficulty = props.gameInfo.difficulty - 1;

  const usernameWhite = props.currentUser.username;
  const usernameBlack = 'AI';
  const chessboardOrientation = 'white';

  let duration;
  if(props.gameInfo.timeLimit === null){
    duration = false;
  } else {
    duration = props.gameInfo.timeLimit;
  }

  const [state, setState] = useState({
    position: "start",
    isWhiteRunning: true,
    isGameOver: false,
    modalShow: false,
    reset: false,
    chessmoves: [],
    winner:'',
    roomId: matchId,
    duration,
    chatPopup: false
  })

  let ai = useRef(null);
  let game = useRef(null);
  if (state.position === "start"){
    ai.current = new Game();
    game.current = new Chess();
  }

  const gameover = function(winner){
    setState(prev => ({...prev,
      isWhiteRunning: false,
      isGameOver: true,
      modalShow: true,
      winner
    }));
  }

  const movesRecord = async function(move) {
    const record = {};
    if(move['player'] == usernameWhite){
      record['userID'] = currentUserId;
    } else {
      record['userID'] = null;
    }
    record["matchID"] = props.match.params.id;
    record["action"] = `from: ${move.from}, to: ${move.to}`;
    try {
      const recordMatch = await axios.post('http://localhost:8001/api/actions', record)
      console.log('move send successfully');
      return recordMatch;
    } catch (err) {
      console.log(err, "error")
    }
  };

  const resultRecord = async function(currentUserId){
    const matchResult = {
      white: props.currentUser.id, 
      black: null,
    };
    if (currentUserId){
      matchResult['winner'] = props.currentUser.id;
      matchResult['loser'] = null;
    } else {
      matchResult['winner'] = null;
      matchResult['loser'] = props.currentUser.id;
    }
    const idMatch = props.match.params.id;
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
      resultRecord(currentUserId);
    } else {
      resultRecord();
    }
    if (game.current.turn() === 'b'){
      gameover('White');
    } else {
      gameover('Black');
    }
  }

  const moveMadeByAi = function(){
    const aimove = ai.current.aiMove(difficulty);
    const aiFrom = Object.keys(aimove)[0].toLowerCase();
    const aiTo = Object.values(aimove)[0].toLowerCase();
    let move = game.current.move({
      from: aiFrom,
      to: aiTo
    });
    if (!move) return;
    let moveMadeAi = {from: aiFrom, to: aiTo};
    let chessmoves = state.chessmoves;
    moveMadeAi['player'] = usernameBlack;
    chessmoves.unshift(moveMadeAi);

    if (!game.current.game_over()){
      setState(prev => ({...prev,
        isWhiteRunning: true,
        position: game.current.fen(),
        chessmoves
      }))
      movesRecord(moveMadeAi);
    } else {
      resultSend();
    }
  }

  const onDrop = ({sourceSquare, targetSquare}) => {
    // return position change when the move is valid
    let move = game.current.move({
      from: sourceSquare,
      to: targetSquare
    });
    if (!move) return;

    // tell AI the move
    let moveMade = {from: sourceSquare, to: targetSquare};
    let moveMadeUpperCaseFrom = sourceSquare.toUpperCase()
    let moveMadeUpperCaseTo = targetSquare.toUpperCase()
    ai.current.move(moveMadeUpperCaseFrom, moveMadeUpperCaseTo);

    // add player's name to move_logs
    let chessmoves = state.chessmoves;
    moveMade['player'] = usernameWhite;
    chessmoves.unshift(moveMade);

    if (!game.current.game_over()){
      setState(prev => ({...prev,
        isWhiteRunning: false,
        position: game.current.fen(),
        chessmoves
      }));
      movesRecord(moveMade);
      moveMadeByAi();
    } else {
      resultSend();
    }
  }
    
  const setModalShow = function(bool){
    setState(prev => ({...prev, modalShow: bool }));
  }

   // adds class to darken background color
  //  const duringPopUp = state.chatPopup ? " during-popup" : ""
  //  const setPopUp = function(bool){
  //   setState(prev => ({...prev, chatPopup: bool }));
  //  }

  return (
    <>
    <div className="gameView">
      <div className="countdown">
        {state.duration &&         
        <Countdown color={"white"} 
        username={usernameWhite}
        isGameOver={state.isGameOver}
        isRunning={state.isWhiteRunning}
        duration={state.duration}
        timeout={gameover}
        />}
      </div>
      <div className="chess-main">
        <div className="chessboard">
          <ChessBoard position={state.position} orientation={chessboardOrientation} onDrop={onDrop} roomId={state.roomId}/>
        </div>
        <div className="move-chat">
          <div className="move_log">
            <MovesLog moves={state.chessmoves} roomId={state.roomId}/>
          </div>
          {/* <Chat roomId={state.roomId}/> */}
        </div>
      <PopupWin
        show={state.modalShow}
        onHide={() => setModalShow(false)}
        winner={state.winner}
      />
      </div>
    </div>
    </>
  );
}