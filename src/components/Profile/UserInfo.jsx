import React from 'react';
import "../Common/styles/UserInfo.scss"

export default function UserInfo () {

  return (
    <div className="user-box">
      <div className="user-icon">
        <img src="profile-hex.png"/>  
      </div>
        <button id="edit">Edit Profile</button>
      <div className="user-info">
        <a>Username</a>
        <a>Elo</a>
      </div>
    </div>
  )
}