import React from 'react';
import "./styles/MatchHistoryItem.scss";

export default function MatchHistoryItem(props) {

  const { match, currentUser } = props;
  const gameType = match.type;
  const backColor = currentUser.username === match.winner? {backgroundColor: "limegreen" } : {backgroundColor: "indianred"};
  const opponent = match.winner === currentUser.username? match.loser : match.winner;
  const white = match.white === currentUser.id? currentUser.username : opponent;
  const black = match.black === currentUser.id? currentUser.username : opponent;
  let winnerElo;
  let loserElo;

  if (gameType === "RANKED30") {
    winnerElo = match.winranked30elo;
    loserElo = match.loseranked30elo;
  } else if (gameType === "RANKED10") {
    winnerElo = match.winranked10elo;
    loserElo = match.loseranked10elo;
  } else {
    winnerElo = match.wincasualelo;
    loserElo = match.losecasualelo;
  };

  return (
  <div className="match" style={backColor} >
    <a>{gameType}</a>
    <img src={match.winner_img} />
    <a> {match.winner} </a>
    <a> {winnerElo}</a>
    <img src={match.loser_img} />
    <a> {match.loser} </a>
    <a> {loserElo}</a>
  </div>
  )
};