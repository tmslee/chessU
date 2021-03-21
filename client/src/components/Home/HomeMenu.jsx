import React, {useEffect, useState} from "react";

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
  currentUser: null,
  opponent:null
};

export default function HomeMenu(props) {
  const {
    currentUser, 
    setGameRoute, 
    setGameInfo,
    setActive,
    active
  } = props; 

  const [showState, setShowState] = useState(false);
  //initialize with currentUser here
  const [gameOptions, setGameOptions] = useState({...EMPTY_GAME, currentUser});

  //maybe need to useEffect here whenever currentUser changes we update game Options
  const showModal = function (type) {
    setGameOptions(prev => ({...prev, type, currentUser})); // fuck you
    setShowState(true);
  };

  //this function resets gameOptions too
  const closeModal = function () {
    setShowState(false);
    console.log("options reset") 
    //also need to set currentUser when we reset
    setGameOptions({...EMPTY_GAME, currentUser});
  };

  useEffect(() => {
    console.log("==== options changed ====")
    console.log(gameOptions);
    console.log("==========================")

  }, [gameOptions]) 

  const isLoggedIn = (type) => {
    if(currentUser) {
      showModal(type)
    } else {
      setActive({
        ...active,
        login:true
      });
    };
  };
  
  return (
    <>
      <div className="menu">
        <button id="ranked" className="lined thin" onClick={() => {isLoggedIn(RANKED)}}>
          RANKED
        </button>
        <button id= "casual" className="lined thin" onClick={() => {isLoggedIn(CASUAL)}}>
          CASUAL
        </button>
        <button id = "ai" className="lined thin" onClick={() => {isLoggedIn(AI)}}>
          vs AI
        </button>
      </div>
  
      <GameOptionsModal
        showState={showState}
        gameOptions={gameOptions}
        setGameOptions={setGameOptions}
        closeModal={closeModal}
        setGameRoute={setGameRoute}
        setGameInfo={setGameInfo}
      />
    </>
  );
}