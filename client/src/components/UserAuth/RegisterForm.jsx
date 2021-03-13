import axios from "axios";
import React, {useState} from "react";
import '../Common/styles/RegisterForm.scss'

const registerUser = function(newUser) {
  axios.post('http://localhost:8001/api/users', newUser)
  .then( (result) => console.log(result))
  .catch( err => console.log("HELLO"))
}

export default function RegisterForm() {

  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = function(e) {
    e.preventDefault();
    registerUser(newUser)
    console.log("done")
  }

  return(
    <div className="modal-bg2 bg-active">
    <div className="modal-register">
      <div className="modal-register-content">
      <h1>Register</h1>
      <form className="modal-register-form" onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setNewUser({
            ...newUser, username: e.target.value
          })}/>
        </label>
        <label>
          <p>Email</p>
          <input type="text" onChange={e => setNewUser({
            ...newUser, email: e.target.value
          })}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setNewUser({
            ...newUser, password: e.target.value
          })}/>
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