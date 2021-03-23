import axios from "axios";
import React, {useState} from "react";
import FormError from '../Errors/FormError';
import './styles/RegisterForm.scss';


export default function RegisterForm(props) {
  const {
    setActive, 
    active,
    setToken
  } = props;

  const [error, setError] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: ''
  });

  const clearError = () => {
    setError(false);
  }

  const registerUser = function(newUser) {
    axios.post('/api/users', newUser)
    .then( result => {
      if (!result.data.token) {
        setError(true);
      } else {
        setToken(result.data.token);
        setActive({...active, register: false  });
      }
    })
  };
  
  const handleSubmit = function(e) {
    e.preventDefault();
    registerUser(newUser);
  };
  
  
  return(
    <div className="modal-bg2 bg-active">
    <div className="modal-register">
      <div className="modal-register-content">
      <h1>Register</h1>
      <form className="modal-register-form" onSubmit={handleSubmit}>
      {error && <FormError message="Username already exists." />}
        <label>
          <p>Username</p>
          <input 
          type="text" 
          onChange={e => setNewUser({
            ...newUser, username: e.target.value
          })}
          required
          />
        </label>
        <label>
          <p>Email</p>
          <input 
          type="text" 
          onChange={e => setNewUser({
            ...newUser, email: e.target.value
          })}
          required
          />
        </label>
        <label>
          <p>Password</p>
          <input 
          type="password" 
          onChange={e => setNewUser({
            ...newUser, password: e.target.value
          })}
          required
          />
        </label>
        <div>
          <button id="register-submit" onClick={clearError} type="submit">Submit</button>
        </div>
      </form>
      </div>
      <button onClick={() => setActive({...active, register: false  })} className="modal-close">X</button>
    </div>
    </div>
  )
}