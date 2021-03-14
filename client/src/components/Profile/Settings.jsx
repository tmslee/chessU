import React from 'react';
import "./styles/Settings.scss"
import axios from "axios";

const updateUser = function(newUserInfo, id) {
  axios.put(`http://localhost:8001/api/users/${id}`, newUserInfo)
  .then( res => console.log(res))
}

export default function Settings(props) {

  const {currentUser, setSettings} = props;
  


  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({
      username: 'alvin',
      email: 'alvin@gmail.com',
      password: '123'
    }, 1)
  }

  return(
    <div className="modal-bg3 bg-active">
    <div className="modal-settings">
      <div className="modal-settings-content">
      <h1>Settings</h1>
      <form className="modal-settings-form" onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input 
          type="text" 
          />
        </label>
        <label>
          <p>Password</p>
          <input 
          type="password" 
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      </div>
      <button onClick={ () => setSettings(false)} className="modal-close">X</button>
    </div>
    </div>
  )
}