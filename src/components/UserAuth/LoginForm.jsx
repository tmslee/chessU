import React, {useState} from 'react';
import PropTypes from 'prop-types';
import '../Common/styles/LoginForm.scss';
import axios from 'axios';

const loginUser = async function(credentials) {
  const users = await axios.get('http://localhost:8001/api/users')
  const usersData = users.data
  for (let user of usersData) {
    if (credentials.username === user.username && credentials.password === user.password) {
      return true
    }
  }
}

export default function Login() {

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async function(e) {
    e.preventDefault();
    const validLogin = await loginUser( {username, password})

    if (validLogin) {
      //set cookie
    }
  }

  return(
    <div className="modal-bg1 bg-active">
    <div className="modal-login">
      <div className="modal-login-content">
      <h1>Please Log In</h1>
      <form className="modal-login-form" onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      </div>
    </div>
    </div>
  )
}
