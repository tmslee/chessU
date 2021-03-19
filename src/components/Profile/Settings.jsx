import React, {useState} from 'react';
import "./styles/Settings.scss"
import axios from "axios";

const updateUser = function(newUserInfo, id) {
  axios.put(`http://localhost:8001/api/users/${id}`, newUserInfo)
  .then( res => console.log(res));
};

export default function Settings(props) {
  const {token, currentUser, setSettings, getCurrentUser, setCurrentUser} = props;

  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState(currentUser.password);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({
      username: username,
      email: email,
      password: password
    }, currentUser.id)
    setSettings(false);

    if(token){
      getCurrentUser(token).then( res => {
        setCurrentUser(res);
      });
    } else {
      setCurrentUser(null);
    }
  };

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
          value={username} 
          onChange={e => setUsername(e.target.value)}
          />
        </label>
        <label>
          <p>Email</p>
          <input 
          type="text"
          value={email} 
          onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label>
          <p>Password</p>
          <input 
          type="password" 
          value={password}
          onChange={e => setPassword(e.target.value)}
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