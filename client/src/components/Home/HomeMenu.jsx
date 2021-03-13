import React, {useState} from "react";

import "./styles/HomeMenu.scss"
import {Button, Modal} from "react-bootstrap";

import GameOptionsModal from "./GameOptionModal";

const RANKED = "RANKED";
const CASUAL = "CASUAL";
const AI = "AI";

export default function HomeMenu(props) {
  const [state, setState] = useState({
    show:false,
    gameType: null
  });
  const showModal = (gameType) => setState( prev => ({...prev, show:true, gameType}));
  const closeModal = () => setState( prev => ({...prev, show:false, gameType:null}));

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
        show={state.show}
        gameType={state.gameType}
        hide={closeModal}
      />
    </>
  );
}