import './styles/Game.css';
import ChessBoard from "chessboardjsx";
import React from "react";
import { useState, useEffect, useRef } from "react";
import Chess from "chess.js";
import Countdown from './Timer';
import Popup from './Popup';
import MovesLog from "./MovesLog"

function Game() {
  const [state, setState] = useState({
    position: "start",
    isBlackRunning: false,
    isWhiteRunning: true,
    isGameOver: false,
    modalShow: false,
    reset: false,
    chessmoves: []
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
    
    let chessmoves = state.chessmoves;
    if(state.isBlackRunning){
      chessmoves.unshift({player: usernameBlack, from: sourceSquare, to: targetSquare})
    } else {
      chessmoves.unshift({player: usernameWhite, from: sourceSquare, to: targetSquare})
    }

    setState(prev => ({...prev, position: game.current.fen(), chessmoves}));
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
        isGameOver: true,
        modalShow: true
      }));
    }
  }

  const setModalShow = function(bool){
    setState(prev => ({...prev, modalShow: bool }));
  }

  const regame = function(){
    setState(prev => ({...prev, 
      position: "start",
      isBlackRunning: false,
      isWhiteRunning: true,
      isGameOver: false,
      modalShow: false
    }));
  }

  return (
    <div className="gameView">
      <div className="countdown">
        <Countdown color={"white"} 
        username={usernameWhite}
        isGameOver={state.isGameOver}
        isRunning={state.isWhiteRunning}/>
        <Countdown color={"black"}
        username={usernameBlack}
        isGameOver={state.isGameOver}
        isRunning={state.isBlackRunning}/>
      </div>
      <div className="chessboard">
        <ChessBoard position={state.position} onDrop={onDrop} />
        <MovesLog moves={state.chessmoves}/>
      </div>
      <Popup
        show={state.modalShow}
        onHide={() => setModalShow(false)}
        regame={regame}
      />
    </div>
  );
}

export default Game;
