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
  currentUserID:null,
  opponentID:null
};

export default function HomeMenu(props) {
  const [showState, setShowState] = useState(false);

  //initialize with currentUser here
  const [gameOptions, setGameOptions] = useState({...EMPTY_GAME});

  //maybe need to useEffect here whenever currentUser changes we update game Options
  const showModal = function (type) {
    setGameOptions(prev => ({...prev, type}));
    setShowState(true);
  };

  //this function resets gameOptions too
  const closeModal = function () {
    setShowState(false);
    console.log("options reset")
    //also need to set currentUser when we reset
    setGameOptions({...EMPTY_GAME});
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
        showState={showState}
        gameOptions={gameOptions}
        setGameOptions={setGameOptions}
        closeModal={closeModal}
      />
    </>
  );
}