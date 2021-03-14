import React, { useState } from 'react';
import UserInfo from "./UserInfo";
import Statistics from "./Statistics";
import Settings from "./Settings";

export default function Profile () {

  const [settings, setSettings] = useState(false);

  return (
    <>
    {settings && <Settings 
    setSettings={setSettings}
    />}
    <UserInfo
    setSettings={setSettings}
    />
    <Statistics/>
    </>
  )
}