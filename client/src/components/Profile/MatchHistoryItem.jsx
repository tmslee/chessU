import React from 'react';
import "./styles/MatchHistoryItem.scss";
import bronze from './../../../src/images/bronze.png'
import silver from './../../../src/images/silver.png'
import gold from './../../../src/images/gold.png'
import plat from './../../../src/images/plat.png'
import diamond from './../../../src/images/diamond.png'
import master from './../../../src/images/master.png'

export default function MatchHistoryItem(props) {

  const { 
    match, 
    currentUser,
    ranked10,
    ranked30,
    getOverallRankByUserName
  } = props;

  const gameType = match.type;
  const backColor = currentUser.username === match.winner? {backgroundColor: "limegreen" } : {backgroundColor: "indianred"};
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

  const getRankImg = function (rank) {
    switch(rank) {
      case "bronze":
        return bronze;
      case "silver":
        return silver;
      case "gold":
        return gold;
      case "plat":
        return plat;
      case "diamond":
        return diamond;
      case "master":
        return master;
      default:
        return bronze;
    }
  }

  return (
  <div className="match" style={backColor} >
    <span>{gameType}</span>
    <img 
      alt="profile_img"
      className="profile-img"
      src={match.winner_img} 
    />
    <img 
      className="rank-img"
      alt='rank icon' 
      src={getRankImg(getOverallRankByUserName(ranked30, ranked10, match.winner))} 
    />
    <span> {match.winner} </span>
    <span> {winnerElo}</span>
    <img 
      alt="profile_img"
      className="profile-img"
      src={match.loser_img} 
    />
    <img
      className="rank-img"
      alt='rank icon' 
      src={getRankImg(getOverallRankByUserName(ranked30, ranked10, match.loser))} 
    />
    <span> {match.loser} </span>
    <span> {loserElo}</span>
  </div>
  )
};