import React from 'react';
import "./styles/Statistics.scss";

export default function Statistics(props) {
  const { currentUser, statsInfo } = props;

  const {
    wins,
    losses,
    matches,
    actions,
    whiteWins,
    blackWins,
    avgMatch
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
        {/* <a>W/L:  {wins}/{losses} </a>
        <a>Ranked 30 Elo: {currentUser.ranked30} </a>
        <a>Ranked 10 Elo: {currentUser.ranked10} </a>
        <a>Casual Elo: {currentUser.casual} </a>
        <a>Total Matches Played: {matches}</a>
        <a>Avg Moves Per Match: {actions/matches} </a>  */}
        {/* <a>Percent Wins On White: {whiteWins/matches * 100} </a>  */}
        {/* <a>Percent Wins On Black: {blackWins/matches * 100} </a>  */}
        {/* <a>Avg Match Length: {avgMatch.minutes}.{avgMatch.seconds} </a> */}
      </div>
    </div>
  )
}