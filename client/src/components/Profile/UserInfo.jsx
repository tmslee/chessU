import React from 'react';
import "./styles/UserInfo.scss"

export default function UserInfo (props) {

  const {currentUser, setSettings} = props;

  return (
    <div className="user-box">
      <div className="user-icon">
        <img src={currentUser.profile_img} alt=""/>  
      </div>
        <button onClick={() => setSettings(true)} id="edit">Edit Profile</button>
      <div className="user-info">
        <a>{currentUser.username}</a>
      </div>
    </div>
  )
}