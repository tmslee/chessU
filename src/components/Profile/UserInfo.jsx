import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
    ranked10,
    ranked30,
    getOverallRank
  } = props;
  const [active, setActive] = useState(false);
  const [avatar, setAvatar] = useState({
    current: currentUser.profile_img,
    new: ''
  });

  useEffect( () => {

  }, currentUser)

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
        <img
          className="rank-img"
          alt="rank icon"
          src={getRankImg(getOverallRank(ranked30, ranked10, currentUser))}
        />
      </div>
        <button onClick={() => setSettings(true)} id="edit">Edit Profile</button>
    </div>
    </>
  )
};