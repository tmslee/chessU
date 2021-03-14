import React, {useState} from "react";

import "./styles/HomeMenu.scss"
import {Button, Modal} from "react-bootstrap";

import GameOptionsModal from "./GameOptionModal";

const RANKED = "RANKED";
const CASUAL = "CASUAL";
const AI = "AI";

const EMPTY_GAME = {
  type:null,
  timeLimit:null,
  difficulty:null,
  currentUser:null,
  opponent:null
};

export default function HomeMenu(props) {
  const [state, setState] = useState({
    show:false,
    gameOptions: {...EMPTY_GAME}
  });

  const showModal = (type) => setState( prev => {
    const gameOptions = {...prev.gameOptions, type};
    return {...prev, show:true, gameOptions}
  });

  const closeModal = () => setState( prev => {
    return {...prev, show: false, gameOptions:{...EMPTY_GAME}};
  });

  const setGameOptions = (gameOptions) => setState(prev => {
    return {...prev, gameOptions};
  });

  const resetGameOptions = function () {
    setState(prev => {
      return {...prev, gameOptions:{...EMPTY_GAME}};
    });
  };

  return (
    <>
      <header>Queue up for a game</header>
      <div>
        <Button variant="primary" onClick={() => {showModal(RANKED)}}>
          Ranked
        </Button>
        <Button variant="primary" onClick={() => {showModal(CASUAL)}}>
          Casual
        </Button>
        <Button variant="primary" onClick={() => {showModal(AI)}}>
          vs AI
        </Button>
      </div>
  
      <GameOptionsModal
        showState={state.show}
        gameOptions={state.gameOptions}
        setGameOptions={setGameOptions}
        resetGameOptions={resetGameOptions}
        closeModal={closeModal}
      />
    </>
  );
}