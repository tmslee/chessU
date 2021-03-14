import React from 'react';
import "../Common/styles/UserInfo.scss"

export default function UserInfo (props) {

  const {setSettings} = props;

  return (
    <div className="user-box">
      <div className="user-icon">
        <img src="profile-hex.png"/>  
      </div>
        <button onClick={() => setSettings(true)} id="edit">Edit Profile</button>
      <div className="user-info">
        <a>Username</a>
        <a>Elo</a>
      </div>
    </div>
  )
}