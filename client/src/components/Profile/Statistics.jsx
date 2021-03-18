import React from 'react';
import "./styles/Statistics.scss"

export default function Statistics(props) {
  const {currentUser} = props;
  
  
  return (
    <div className="stats-box">
      <div className="stats">
        <a>W/L:</a>
        <a>ELO: </a>
      </div>
    </div>
  )
}