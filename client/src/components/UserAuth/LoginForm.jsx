import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './styles/LoginForm.scss';
import FormError from '../Errors/FormError';
import axios from 'axios';

export default function LoginForm( props ) {

  const {
     setActive, 
     active,
     setToken
    } = props;

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);

  const loginUser = async function(username, password) {
    try {
      const user = await axios.post('http://localhost:8001/api/login', {username, password});
      await setToken(user.data.token);
      return user;
    } catch (err) {
      console.log(err, "error");
    }
  };
  

  const handleSubmit = async function(e) {
    e.preventDefault();
    const validLogin = await loginUser(username, password);
    if (validLogin) {
      setActive({...active, login: false  });
      console.log('logging in');
    } else {
      setError(true);
    }
  }

  return(
    <div className="modal-bg1 bg-active">
    <div className="modal-login">
      <div className="modal-login-content">
      <h1>Log In</h1>
      <form className="modal-login-form" onSubmit={handleSubmit}>
      {error && <FormError message="Invalid username/password" />}
        <label>
          <p>Username</p>
          <input 
          type="text" 
          onChange={e => setUserName(e.target.value)}
          required
          />
        </label>
        <label>
          <p>Password</p>
          <input 
          type="password" 
          onChange={e => setPassword(e.target.value)}
          required
          />
        </label>
        <div>
          <button className="submit" type="submit">Submit</button>
        </div>
      </form>
      </div>
      <button onClick={() => setActive({...active, login: false  })} className="modal-close">X</button>
    </div>
    </div>
  )
}
