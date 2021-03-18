import React, { useEffect, useState } from 'react';
import "./styles/Statistics.scss"

export default function Statistics(props) {
  const { currentUser, statsInfo } = props;
  console.log(currentUser)


  const {
    wins,
    losses,
    matches,
    actions,
    whiteWins,
    blackWins,
    avgMatch
  } = statsInfo.data;

  console.log(statsInfo.data.avgMatch)

  return (
    <div className="stats-box">
      <div className="stats">
        <a>W/L:  {wins}/{losses} </a>
        <a>Total Matches Played: {matches}</a>
        <a>Avg Moves Per Match: {actions/matches} </a> 
        <a>Percent Wins On White: {whiteWins/matches} </a> 
        <a>Percent Wins On Black: {blackWins/matches} </a> 
        <a>Avg Match Length: {avgMatch.minutes}.{avgMatch.seconds} </a>
      </div>
    </div>
  )
}