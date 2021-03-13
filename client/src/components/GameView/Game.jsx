import './styles/Game.css';
import ChessBoard from "chessboardjsx";
import React from "react";
import { useState, useEffect, useRef } from "react";
import Chess from "chess.js";
import Countdown from './Timer';

function Game() {
  const [state, setState] = useState({
    position: "start",
    isBlackRunning: false,
    isWhiteRunning: true,
    isGameOver: false
  })

  // set current positions from Chess.js
  let game = useRef(null);

  if (state.position === "start"){
    game.current = new Chess();
  }

  // should get them by axios
  const usernameBlack = "Haopeng"
  const usernameWhite = "Thomas"

  //The logic to be performed on piece drop. See chessboardjsx.com/integrations for examples.
  // Signature: function({ sourceSquare: string, targetSquare: string, piece: string }) => void
  const onDrop = ({sourceSquare, targetSquare}) => {
    // return position change when the move is valid
    let move = game.current.move({
      from: sourceSquare,
      to: targetSquare
    });
    if (!move) return;
    setState(prev => ({...prev, position: game.current.fen()}));
    if (!game.current.game_over()){
      if (state.isWhiteRunning){
        setState(prev => ({...prev,
          isWhiteRunning: false,
          isBlackRunning: true,
        }));
      } else {
        setState(prev => ({...prev,
          isWhiteRunning: true,
          isBlackRunning: false,
        }));
      }
    } else {
      gameover();
    }
  }

  const gameover = function(){
    if (game.current && game.current.game_over()){
      setState(prev => ({...prev,
        isWhiteRunning: false,
        isBlackRunning: false,
        isGameOver: true
      }));
    }
  }

  return (
    <div className="gameView">
      <div className="countdown">
      <Countdown color={"white"} username={usernameWhite} isRunning={state.isWhiteRunning}/>
      <Countdown color={"black"} username={usernameBlack} isRunning={state.isBlackRunning}/>
      </div>
      <div style={{width: "560px"}}>
        <ChessBoard position={state.position} onDrop={onDrop} />
      </div>
    </div>
  );
}

export default Game;
