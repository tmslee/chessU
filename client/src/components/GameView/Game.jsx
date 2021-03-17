import './styles/Game.css';
import ChessBoard from "chessboardjsx";
import React from "react";
import { useState, useRef } from "react";
import Chess from "chess.js";
import Countdown from './Timer';
import Popup from './Popup';
import MovesLog from "./MovesLog"
import Chat from "../ChatRoom/Chat"
import useMove from "../../hooks/moves"

function Game(props) {
  // const { matchId } = props.match.params; // which is also chat room id
  // const usernameBlack = props.user1;
  // const usernameWhite = props.user2;


  const usernameBlack = "Haopeng"
  const usernameWhite = "Thomas"

  const [state, setState] = useState({
    position: "start",
    isBlackRunning: false,
    isWhiteRunning: true,
    isGameOver: false,
    modalShow: false,
    reset: false,
    chessmoves: [],
    winner:'',
    roomId: 1,
    isReceived: true
  })

  const roomId = state.roomId;
  let { currentMove, sendMove } = useMove(roomId);

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
    } else {
      if (game.current.turn() === 'b'){
        gameover('White');
      } else {
        gameover('Black');
      }
    }
  }

  currentMove.movedByCurrentUser = true;

  // user makes a move
  //The logic to be performed on piece drop. See chessboardjsx.com/integrations for examples.
  // Signature: function({ sourceSquare: string, targetSquare: string, piece: string }) => void
  const onDrop = ({sourceSquare, targetSquare}) => {
    // return position change when the move is valid
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
      if (game.current.turn() === 'b'){
        gameover('White');
      } else {
        gameover('Black');
      }
    }
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
      winner:'',
      isReceived: true
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
        <ChessBoard position={state.position} onDrop={onDrop} roomId={state.roomId}/>
        <MovesLog moves={state.chessmoves} roomId={state.roomId}/>
        <Chat roomId={state.roomId}/>
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
