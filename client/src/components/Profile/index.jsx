import React, { useEffect, useState } from 'react';
import UserInfo from "./UserInfo";
import Statistics from "./Statistics";
import Settings from "./Settings";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Profile (props) {
  const {token, currentUser, setActive, getCurrentUser, setCurrentUser} = props
  const [settings, setSettings] = useState(false);
  const [statsInfo, setStatsInfo] = useState();

  // const history = useHistory();
  
  useEffect(() => {
    if (!currentUser){
      setActive(prev => ({...prev, login: true }));
    } else {
      setActive(prev => ({...prev, login: false }));
      axios.get(`http://localhost:8001/api/stats/${currentUser.id}`)
      .then( res => setStatsInfo(res))
    }
  }, [currentUser])

  useEffect(() => {
    if (!currentUser){
      setActive(prev => ({...prev, login: true }));
    } else {
      setActive(prev => ({...prev, login: false }));
    }
  }, [currentUser])

  return (
    <>
<<<<<<< HEAD
    {currentUser &&  statsInfo &&
=======
    {currentUser &&
>>>>>>> development
      <>
        {settings && <Settings 
          token={token}
          currentUser={currentUser}
          setSettings={setSettings}
          getCurrentUser={getCurrentUser}
          setCurrentUser={setCurrentUser}
        />}
        <UserInfo
          currentUser={currentUser}
          setSettings={setSettings}
        />
        <Statistics
          currentUser={currentUser}
<<<<<<< HEAD
          statsInfo={statsInfo}
=======
>>>>>>> development
        />
      </>
    }
    </>
  )
}