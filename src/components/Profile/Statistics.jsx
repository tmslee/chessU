import React from 'react';
import "./styles/Statistics.scss"

export default function Statistics(props) {
  const {currentUser} = props;
  
<<<<<<< HEAD
  // do a get request to users/:id which gives back all stats

=======
  
>>>>>>> e7eb234b4e10c3ff74a311aa768af7b9597f187b
  return (
    <div className="stats-box">
      <div className="stats">
        <a>W/L:</a>
        <a>ELO: </a>
      </div>
    </div>
  )
}