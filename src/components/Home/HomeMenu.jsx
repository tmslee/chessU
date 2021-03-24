import React, { useState } from "react";
import "./styles/HomeMenu.scss";
import GameOptionsModal from "./GameOptionModal";
import aiIcon from './../../../src/images/vs_ai.png';
import casualIcon from './../../../src/images/casual.png';
import rankedIcon from './../../../src/images/ranked.png';

const RANKED = "RANKED";
const CASUAL = "CASUAL";
const AI = "AI";

const EMPTY_GAME = {
  type:null,
  timeLimit:undefined,
  difficulty:null,
  currentUser: null,
  opponent:null
};

export default function HomeMenu(props) {
  const {
    currentUser,  
    setGameInfo,
    setActive,
    active,
    setInvitedStatus,
    setIncomingGameInfo,
    invitedStatus
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
    //also need to set currentUser when we reset
    setGameOptions({...EMPTY_GAME, currentUser});
  };

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
    <div className="home-container">
      <div className="menu">
        <button id="ranked" className="lined thin play-btn" onClick={() => {isLoggedIn(RANKED)}}>
          <img
            className="btn-icon"
            alt="icon"
            src={rankedIcon}  
          />
          RANKED
          <img
            className="btn-icon"
            alt="icon"
            src={rankedIcon}  
          />
        </button>
        <button id= "casual" className="lined thin play-btn" onClick={() => {isLoggedIn(CASUAL)}}>
          <img
            className="btn-icon"
            alt="icon"
            src={casualIcon}  
          />
          CASUAL
          <img
            className="btn-icon"
            alt="icon"
            src={casualIcon}  
          />
        </button>
        <button id = "ai" className="lined thin play-btn" onClick={() => {isLoggedIn(AI)}}>
          <img
            className="btn-icon"
            alt="icon"
            src={aiIcon}  
          />
          vs AI
          <img
            className="btn-icon"
            alt="icon"
            src={aiIcon}  
          />
        </button>
      </div>
  
      <GameOptionsModal
        showState={showState}
        gameOptions={gameOptions}
        setGameOptions={setGameOptions}
        closeModal={closeModal}
        setGameInfo={setGameInfo}
        setIncomingGameInfo={setIncomingGameInfo} 
        setInvitedStatus={setInvitedStatus}
        invitedStatus={invitedStatus}
      />
    </div>
  );
}