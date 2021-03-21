import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MatchHistoryItem from "./MatchHistoryItem";
import "./styles/MatchHistory.scss";

const getHistory = (id) => {
  return axios.get(`http://localhost:8001/api/users/${id}/matches`)
  .then( res => res.data);
};

export default function MatchHistory(props) {

  const { currentUser } = props;

  const [history, setHistory] = useState();

  useEffect( () => {
    if(!history) {
      getHistory(currentUser.id)
      .then( res => setHistory(res))
    }
  }, [history])


  const historyRender = function() {
    return history.slice(0).reverse().map(match => {
      return(
        <MatchHistoryItem
        match={match}
        currentUser={currentUser}
        />
      )
    });
  } 
  console.log(history)
  
  return (
    <div className="matches">
    {history && <>{historyRender()}</>}
    </div>
  )

};