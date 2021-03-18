import { Game, move, status, moves, aiMove, getFen } from 'js-chess-engine'
import ChessBoard from "chessboardjsx";
import React from "react";
import { useState, useRef } from "react";
import Countdown from '../GameView/Timer';
import Popup from '../GameView/Popup';
import MovesLog from "../GameView/MovesLog"
import Chess from "chess.js";
import axios from "axios";

export default function AiGame(props){
  const currentUserId = props.currentUser.id
  const { matchId } = props.match.params; 

  const usernameWhite = props.currentUser.username;
  const usernameBlack = 'AI';
  const chessboardOrientation = 'white';

  const [state, setState] = useState({
    position: "start",
    isWhiteRunning: true,
    isGameOver: false,
    modalShow: false,
    reset: false,
    chessmoves: [],
    winner:'',
    roomId: matchId,
    isReceived: true
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
      resultRecord();
      gameover('White');
    } else {
      gameover('Black');
    }
  }

  const moveMadeByAi = function(){
    const aimove = ai.current.aiMove(3);
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
        chessmoves,
        isReceived: true
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
        chessmoves,
        isReceived: true
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

  return (
    <div className="gameView">
      <div className="countdown">
        <Countdown color={"white"} 
        username={usernameWhite}
        isGameOver={state.isGameOver}
        isRunning={state.isWhiteRunning}
        // timeout={gameover}
        />
      </div>
      <div className="chessboard">
        <ChessBoard position={state.position} orientation={chessboardOrientation} onDrop={onDrop} roomId={state.roomId}/>
        <MovesLog moves={state.chessmoves} roomId={state.roomId}/>
      </div>
      <Popup
        show={state.modalShow}
        onHide={() => setModalShow(false)}
        winner={state.winner}
      />
    </div>
  );
}