import React, {useState} from "react";
import axios from "axios";
import FormError from "../Errors/FormError";

export default function SettingsEdit(props) {

  const {token, currentUser, setEdit, getCurrentUser, setCurrentUser} = props;

  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState(currentUser.password);
  const [error, setError] = useState(false);

  const clearError = () => {
    setError(false);
  };

  const updateUser = function(newUserInfo, id) {
    return axios.put(`http://localhost:8001/api/users/${id}`, newUserInfo)
    .then( res => {
      if(!res.data.id) {
        return false;
      }
      return true;
    });
  };

  const handleSubmit = (e) => {
    clearError();
    e.preventDefault();
    updateUser({
      username,
      email,
      password
    }, currentUser.id)
    .then( res => {
      if(res) {
        setEdit(false);
      } else {
        setError(true);
      }
    });

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
        {error && 
        <FormError message="Username already exists" />
        }
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
          <button className="submit" type="submit">Save</button>
        </div>
      </form>
  )
};