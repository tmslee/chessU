import React, {useState} from "react";
import axios from "axios";
// import "./styles/Settings.scss"

const updateUser = function(newUserInfo, id) {
  axios.put(`http://localhost:8001/api/users/${id}`, newUserInfo)
  .then( res => console.log(res));
};

export default function SettingsEdit(props) {

  const {token, currentUser, setEdit, getCurrentUser, setCurrentUser} = props;

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
    setEdit(false);

    if(token){
      getCurrentUser(token).then( res => {
        setCurrentUser(res);
      });
    } else {
      setCurrentUser(null);
    }
  };

  return (
    <form className="modal-settings-form" onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input 
          type="text"
          value={username} 
          onChange={e => setUsername(e.target.value)}
          required
          />
        </label>
        <label>
          <p>Email</p>
          <input 
          type="text"
          value={email} 
          onChange={e => setEmail(e.target.value)}
          required
          />
        </label>
        <label>
          <p>Password</p>
          <input 
          type="password" 
          placeholder="Enter new password"
          onChange={e => setPassword(e.target.value)}
          required
          />
        </label>
        <div>
          <button type="submit">Save Changes</button>
        </div>
      </form>
  )

}