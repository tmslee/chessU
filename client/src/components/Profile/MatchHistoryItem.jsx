import React, { useEffect, useState } from 'react';
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
    currentUser
  } = props;

  const [state, setState] = useState({
    winner: match.winner,
    loser: match.loser,
    backColor: {},
    winnerImg : match.winner_img,
    loserImg : match.loser_img,
    username: currentUser.username
  });

  const gameType = match.type;

  useEffect(() => {
    state.username === state.winner ?
     setState( prev => 
      ({...prev, 
      backColor: {backgroundColor: "limegreen"},
      winner: currentUser.username,
      winnerImg: currentUser.profile_img,
      username : currentUser.username
    })) : 
     setState( prev => 
      ({...prev, 
      backColor: {backgroundColor: "indianred"},
      loser: currentUser.username,
      loserImg: currentUser.profile_img,
      username : currentUser.username
    }))
  }, [currentUser])

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

  const getRanking = function (elo) {
    if(0 <= elo && elo <= 1149) return 'bronze';
    else if (1150 <= elo && elo <= 1499) return 'silver';
    else if (1500 <= elo && elo <= 1849) return 'gold';
    else if (1850 <= elo && elo <= 2199) return 'plat';
    else if (2200 <= elo && elo <= 2500) return 'diamond';
    else return 'master';
  }

  return (
  <div className="match" style={state.backColor} >
    <span>{gameType}</span>
    <img 
      alt="profile_img"
      className="profile-img"
      src={state.winnerImg} 
    />
    <img 
      className="rank-img"
      alt='rank icon' 
      src={getRankImg(getRanking(winnerElo))} 
    />
    <span> {state.winner} </span>
    <span> {winnerElo}</span>
    <img 
      alt="profile_img"
      className="profile-img"
      src={state.loserImg} 
    />
    <img
      className="rank-img"
      alt='rank icon' 
      src={getRankImg(getRanking(loserElo))} 
    />
    <span> {state.loser} </span>
    <span> {loserElo}</span>
  </div>
  )
};