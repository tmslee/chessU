import React from 'react';
import "./styles/Statistics.scss"

export default function Statistics(props) {
  const {currentUser} = props;
  
  // do a get request to users/:id which gives back all stats

  return (
    <div className="stats-box">
      <div className="stats">
        <a>W/L:</a>
        <a>ELO: </a>
      </div>
    </div>
  )
}