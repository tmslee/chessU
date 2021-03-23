import axios from 'axios';
import React, { useState } from 'react';
import validator from "validator";
import FormError from "../Errors/FormError";
import "./styles/ChangeAvatar.scss";


export default function ChangeAvatar (props) {
  
  const { setActive, currentUser, setAvatar, avatar  } = props;
  const [error, setError] = useState();
  
  const updateAvatar = function(newAvatar, id) {
    axios.put(`/api/users/${id}/avatar`, newAvatar)
    .then( () => setAvatar({...avatar, current: avatar.new})); 
  }

  const validate = (url) => { 
    if (validator.isURL(url)) {
      setAvatar({...avatar, new: url}) 
      setError(false);
      return true;
    }
    return false;
  } 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(avatar.new)) {
      updateAvatar({avatar: avatar.new},currentUser.id);
      setActive(false);
    } else {
      setError(true);
    }
  };

  return(
    <>
    <div className="modal-bg4 bg-active">
    <div className="modal-avatar">
      <div className="modal-avatar-content">
      {avatar.new && <img id="avatar-preview" src={avatar.new} alt="" />}
      {!avatar.new && <span id="no-img">Image Preview</span>}
      </div>
      <div className="url-error">
        {error && <FormError message="Invalid Url" />}
      </div>
      <form className="modal-avatar-form" onSubmit={handleSubmit}>
        <input
        type="text"
        onChange={e => validate(e.target.value)}
        placeholder="Img Url"
        />
        <button className="submit" type="submit" onClick={handleSubmit}>Save</button>
      </form>
        <button onClick={() => setActive(false)} className="modal-close">X</button>
    </div>
    </div>
    </>
  )
};
