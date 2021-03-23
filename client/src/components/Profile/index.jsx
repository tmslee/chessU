import React, { useEffect, useState } from 'react';
import UserInfo from "./UserInfo";
import Statistics from "./Statistics";
import Settings from "./Settings";
import ProfileTabs from "./ProfileTabs";
import axios from "axios";
import MatchHistory from './MatchHistory';
import './styles/index.scss'

export default function Profile (props) {
  const {token, currentUser, setActive, getCurrentUser, setCurrentUser} = props
  const [settings, setSettings] = useState(false);
  const [statsInfo, setStatsInfo] = useState();
  const [tabs, setTabs] = useState({
    stats: true,
    history: false
  });

  useEffect(() => {
    if (!currentUser){
      setActive(prev => ({...prev, login: true }));
    } else {
      setActive(prev => ({...prev, login: false }));
      axios.get(`http://localhost:8001/api/stats/${currentUser.id}`)
      .then( res => setStatsInfo(res));
    }
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser){
      setActive(prev => ({...prev, login: true }));
    } else {
      setActive(prev => ({...prev, login: false }));
    }
  }, [currentUser]);

  return (
    <div className="profile-container">
    {currentUser &&  statsInfo &&
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
        <ProfileTabs 
          setTabs={setTabs}
          tabs={tabs}
        />
        {tabs.stats && 
        <Statistics
          currentUser={currentUser}
          statsInfo={statsInfo}
        />
        }
        {tabs.history &&
        <MatchHistory
          currentUser={currentUser}
        />
        }
      </>
    }
    </div>
  )
};