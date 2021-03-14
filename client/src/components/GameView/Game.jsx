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
    chessmoves: [],
    winner:''
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

    console.log(game.current.in_checkmate(), game.current.turn());

    if (!game.current.game_over()){
      if (state.isWhiteRunning){
        setState(prev => ({...prev,
          isWhiteRunning: false,
          isBlackRunning: true,
          position: game.current.fen(),
          chessmoves
        }));
      } else {
        setState(prev => ({...prev,
          isWhiteRunning: true,
          isBlackRunning: false,
          position: game.current.fen(),
          chessmoves
        }));
      }
    } else {
      if (game.current.turn() === 'b'){
        gameover('white');
      } else {
        gameover('black');
      }
    }
  }

  const gameover = function(winner){
    setState(prev => ({...prev,
      isWhiteRunning: false,
      isBlackRunning: false,
      isGameOver: true,
      modalShow: true,
      winner
    }));
  }
  
  const setModalShow = function(bool){
    setState(prev => ({...prev, modalShow: bool }));
  }
  
  const regame = function(){
    setState({ 
      position: "start",
      isBlackRunning: false,
      isWhiteRunning: true,
      isGameOver: false,
      modalShow: false,
      chessmoves: [],
      winner:''
    });
  }

  return (
    <div className="gameView">
      <div className="countdown">
        <Countdown color={"white"} 
        username={usernameWhite}
        isGameOver={state.isGameOver}
        isRunning={state.isWhiteRunning}
        timeout={gameover}/>
        <Countdown color={"black"}
        username={usernameBlack}
        isGameOver={state.isGameOver}
        isRunning={state.isBlackRunning}
        timeout={gameover}/>
      </div>
      <div className="chessboard">
        <ChessBoard position={state.position} onDrop={onDrop} />
        <MovesLog moves={state.chessmoves}/>
      </div>
      <Popup
        show={state.modalShow}
        onHide={() => setModalShow(false)}
        regame={regame}
        winner={state.winner}
      />
    </div>
  );
}

export default Game;
