import React from 'react';

export default function Settings() {

  return(
    <div className="modal-bg3 bg-active">
    <div className="modal-settings">
      <div className="modal-settings-content">
      <h1>Log In</h1>
      <form className="modal-settings-form" onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input 
          type="text" 
          onChange={e => setUserName(e.target.value)}
          />
        </label>
        <label>
          <p>Password</p>
          <input 
          type="password" 
          onChange={e => setPassword(e.target.value)}
          />
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