import React, { useEffect, useState } from 'react';
import "./styles/Statistics.scss"

export default function Statistics(props) {
  const { currentUser, statsInfo } = props;
  console.log(currentUser)


  

  return (
    <div className="stats-box">
      <div className="stats">
        <a>W/L:  {statsInfo.data.wins.wins}/{statsInfo.data.losses.losses} </a>
        <a>ELO:  {currentUser.elo} </a>
        <a></a> 
      </div>
    </div>
  )
}