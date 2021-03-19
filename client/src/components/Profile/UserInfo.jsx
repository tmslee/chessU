import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ChangeAvatar from './ChangeAvatar';
import "./styles/UserInfo.scss"

export default function UserInfo (props) {

  const {currentUser, setSettings } = props;
  const [active, setActive] = useState(false);
  const [avatar, setAvatar] = useState({
    current: currentUser.profile_img,
    new: ''
  });

  useEffect( () => {

  }, currentUser)

  return (
    <>
    {active && 
    <ChangeAvatar 
    setActive={setActive} 
    currentUser={currentUser}
    setAvatar={setAvatar}
    avatar={avatar}
    />
    }
    <div className="user-box">
    {/* <button onClick={() => setActive(true)} >change avatar</button>  */}
      <div className="user-icon">
        <img id="avatar" src={avatar.current} alt=""/> 
        <button id="edit-img"onClick={() => setActive(true)}><img src="http://simpleicon.com/wp-content/uploads/camera.png"/></button>
      </div>
      <div className="user-info">
        <a>{currentUser.username}</a>
      </div>
        <button onClick={() => setSettings(true)} id="edit">Edit Profile</button>
    </div>
    </>
  )
};