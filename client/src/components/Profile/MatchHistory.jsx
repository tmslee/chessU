import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MatchHistoryItem from "./MatchHistoryItem";
import "./styles/MatchHistory.scss";

const rankMap = {
  "bronze":0,
  "silver":1,
  "gold":2,
  "plat":3,
  "diamond":4,
  "master":5
};

const getHistory = (id) => {
  return axios.get(`http://localhost:8001/api/users/${id}/matches`)
  .then( res => res.data);
};

export default function MatchHistory(props) {

  const { 
    currentUser,
    ranked10,
    ranked30,
    getOverallRankByUserName
  } = props;

  const [history, setHistory] = useState();

  useEffect( () => {
    if(!history) {
      getHistory(currentUser.id)
      .then( res => setHistory(res));
    }
  }, [history, currentUser]);

  const historyRender = function() {
    return history.slice(0).reverse().map(match => {
      return(
        <MatchHistoryItem
        match={match}
        currentUser={currentUser}
        ranked10={ranked10}
        ranked30={ranked30}
        getOverallRankByUserName={getOverallRankByUserName}
        />
      );
    });
  }; 
  
  return (
    <div className="matches">
    {history && <>{historyRender()}</>}
    </div>
  );

};