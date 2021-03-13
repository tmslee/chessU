import axios from "axios";
import React, {useState} from "react";
import FormError from '../Errors/FormError';
import '../Common/styles/RegisterForm.scss'


export default function RegisterForm(props) {
  
  const {setActive, active} = props;

  const [error, setError] = useState({
    active: false,
    message: 'Username Already Exists'
  });

  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: ''
  });

  const clearError = () => {
    setError({...error, active:false})
  }

  const registerUser = function(newUser) {
    axios.post('http://localhost:8001/api/users', newUser)
    .then( result => {
      if (!Array.isArray(result.data)) {
        setError({ ...error, active:true })
      } else {
        // setActive({...active, login: false  })
      }
    })
  };
  
  const handleSubmit = function(e) {
    e.preventDefault();
    registerUser(newUser)
  }
  
  
  return(
    <div className="modal-bg2 bg-active">
    <div className="modal-register">
      <div className="modal-register-content">
      <h1>Register</h1>
      <form className="modal-register-form" onSubmit={handleSubmit}>
      {error.active && <FormError message={error.message} />}
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
          <button onClick={clearError} type="submit">Submit</button>
        </div>
      </form>
      </div>
      <button onClick={() => setActive({...active, register: false  })} className="modal-close">X</button>
    </div>
    </div>
  )
}