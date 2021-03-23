import React, { useState, useEffect } from 'react';
import ChangeAvatar from './ChangeAvatar';
import "./styles/UserInfo.scss"
import bronze from './../../../src/images/bronze.png'
import silver from './../../../src/images/silver.png'
import gold from './../../../src/images/gold.png'
import plat from './../../../src/images/plat.png'
import diamond from './../../../src/images/diamond.png'
import master from './../../../src/images/master.png'

export default function UserInfo (props) {

  const {
    currentUser, 
    setSettings,
    getCurrentUser, 
    setCurrentUser,
    token
  } = props;
  const [active, setActive] = useState(false);
  const [avatar, setAvatar] = useState({
    current: currentUser.profile_img,
    new: ''
  });

  const getRankImg = function (rank) {
    switch(rank) {
      case "bronze":
        return bronze;
      case "silver":
        return silver;
      case "gold":
        return gold;
      case "plat":
        return plat;
      case "diamond":
        return diamond;
      case "master":
        return master;
      default:
        return bronze;
    }
  }

  const getRanking = function (elo30, elo10) {
    const elo = elo30 <= elo10 ? elo10 : elo30;
    if(0 <= elo && elo <= 1149) return 'bronze';
    else if (1150 <= elo && elo <= 1499) return 'silver';
    else if (1500 <= elo && elo <= 1849) return 'gold';
    else if (1850 <= elo && elo <= 2199) return 'plat';
    else if (2200 <= elo && elo <= 2500) return 'diamond';
    else return 'master';
  }

  return (
    <>
    {active && 
    <ChangeAvatar 
    setActive={setActive} 
    currentUser={currentUser}
    setAvatar={setAvatar}
    avatar={avatar}
    getCurrentUser={getCurrentUser}
    setCurrentUser={setCurrentUser}
    token={token}
    />
    }
    <div className="user-box">
      <div className="user-icon">
        <img id="avatar" src={avatar.current} alt=""/> 
        <button id="edit-img"onClick={() => setActive(true)}><img src="http://simpleicon.com/wp-content/uploads/camera.png" alt=""/></button>
      </div>
      <div className="user-info">
        <img
          className="rank-img"
          alt="rank icon"
          src={getRankImg(getRanking(currentUser.ranked30, currentUser.ranked10))}
        />
        <span>{currentUser.username}</span>
        </div>
        <button onClick={() => setSettings(true)} id="edit">Edit Profile</button>
    </div>
    </>
  )
};