import { Game } from 'js-chess-engine'
import ChessBoard from "chessboardjsx";
import React from "react";
import { useState, useRef } from "react";
import Countdown from '../GameView/Timer';
import PopupWin from './PopupWin';
import MovesLog from "../GameView/MovesLog"
import Chess from "chess.js";
import axios from "axios";
import PopupConfirm from "../GameView/PopupConfirm";

export default function AiGame(props){
  const currentUserId = props.currentUser.id
  const { matchId } = props.match.params; 
  const difficulty = props.gameInfo.difficulty - 1;

  const eloRanked10 = props.currentUser.ranked10;
  const eloRanked30 = props.currentUser.ranked30;
  const eloRankedCasual = props.currentUser.casual;

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
    isResign: false
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
    try{
      const result = await axios.put(`http://localhost:8001/api/matches/${idMatch}`, matchResult)
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

  const setResign = function(bool){
    setState(prev => ({...prev, isResign: bool }));
  }

  const timeLimitShow = duration ? duration + 'mins' : 'unlimited' ;

  const difficultyShow = function(){
    if (difficulty === 0){
      return 'easy'
    } else if (difficulty === 1) {
      return 'normal'
    } else {
      return 'hard';
    }
  }

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
        <div className="gameInfo">
          <div className="card border-primary mb-3">
            <div className="card-header">GAME INFO</div>
            <div className="card-body">
              <h4 className="card-title">Player: {usernameWhite}</h4>
              <p className="card-text">ELO rank/10mins: {eloRanked10}</p>
              <p className="card-text">ELO rank/30mins: {eloRanked30}</p>
              <p className="card-text">ELO casual: {eloRankedCasual}</p>
              <h4 className="card-title">Opponent: AI</h4>
              <p className="card-text">Game Mode: Vs AI</p>
              <p className="card-text">Time Limit: {timeLimitShow}</p>
              <p className="card-text">Difficulty: {difficultyShow()}</p>
              <button type="button" class="btn btn-outline-danger" onClick={() => setResign(true)}>resign</button>
            </div>
          </div>
        </div>
        <div className="chessboard">
          <ChessBoard position={state.position} orientation={chessboardOrientation} onDrop={onDrop} roomId={state.roomId}/>
        </div>
        <div className="move-chat">
          <div className="move_log">
            <MovesLog moves={state.chessmoves} roomId={state.roomId}/>
          </div>
        </div>
      <PopupWin
        show={state.modalShow}
        onHide={() => setModalShow(false)}
        winner={state.winner}
      />
      <PopupConfirm show={state.isResign}
      resultSend={resultSend}
      onHide={() => setResign(false)}
      />
      </div>
    </div>
    </>
  );
}