import React, { useEffect, useState } from 'react';
import UserInfo from "./UserInfo";
import Statistics from "./Statistics";
import Settings from "./Settings";

export default function Profile (props) {
  const {token, currentUser, setActive, getCurrentUser, setCurrentUser} = props
  const [settings, setSettings] = useState(false);

  useEffect(() => {
    if (!currentUser){
      setActive(prev => ({...prev, login: true }));
    } else {
      setActive(prev => ({...prev, login: false }));
    }
  }, [currentUser])

  return (
    <>
    {currentUser &&
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
        />
      </>
    }
    </>
  )
}