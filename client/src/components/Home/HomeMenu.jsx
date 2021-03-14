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
    //initialize with currentUser here
    show:false,
    gameOptions: {...EMPTY_GAME}
  });

  //maybe need to useEffect here whenever currentUser changes we update game Options
  
  const showModal = (type) => setState( prev => {
    const gameOptions = {...prev.gameOptions, type};
    return {...prev, show:true, gameOptions}
  });

  //this function resets gameOptions too
  const closeModal = () => setState( prev => {
    console.log("options reset")
    return {...prev, show: false, gameOptions:{...EMPTY_GAME}};
  });

  const setGameOptions = (gameOptions) => setState(prev => {
    return {...prev, gameOptions};
  });

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
        closeModal={closeModal}
      />
    </>
  );
}