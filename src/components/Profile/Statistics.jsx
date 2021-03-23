import React from 'react';
import "./styles/Statistics.scss";

export default function Statistics(props) {
  const { currentUser, statsInfo } = props;

  const {
    wins,
    losses,
    matches,
    actions,
    // whiteWins,
    // blackWins,
    // avgMatch
  } = statsInfo.data;

  return (
    <div className="stats-box">
      <div className="stats">
        <table className="table">
          <tbody>
          <tr>
            <th scope="row">W/L</th>
            <td>{wins}/{losses}</td>
          </tr>
          <tr>
          <th scope="row">Ranked 30 Elo</th>
            <td>{currentUser.ranked30}</td>
          </tr>
          <tr>
            <th scope="row">Ranked 10 Elo</th>
            <td>{currentUser.ranked10}</td>
          </tr>
          <tr>
            <th scope="row">Casual Elo</th>
            <td>{currentUser.casual}</td>
          </tr>
          <tr>
            <th scope="row">Total Matches</th>
            <td>{matches}</td>
          </tr>
          <tr>
            <th scope="row">Avg Moves</th>
            <td>{Math.round(actions/matches *10)/10}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}