import React, {useState} from 'react';
import SettingsEdit from "./SettingsEdit";
import "./styles/Settings.scss";


export default function Settings(props) {
  const {token, currentUser, setSettings, getCurrentUser, setCurrentUser} = props;
  const [edit, setEdit] = useState(false);

  return(
    <div className="modal-bg3 bg-active">
    <div className="modal-settings">
      <div className="modal-settings-content">
      <h1>Settings</h1>
      {edit && 
      <SettingsEdit
      token={token}
      currentUser={currentUser}
      getCurrentUser={getCurrentUser}
      setCurrentUser={setCurrentUser}
      setEdit={setEdit}
      />}
      {!edit && 
      <>
      <div className="modal-settings-info" >
      <a style={{fontWeight:'bold'}}>Username:</a>
      <a>{currentUser.username}</a>
      <a style={{fontWeight:'bold'}}>Email:</a>
      <a>{currentUser.email}</a>
      <a style={{fontWeight:'bold'}}>Password:</a>
      <a>******</a>
      </div>
      <button id="edit" onClick={ () => setEdit(true)}>Edit</button>
      </>
      }
      </div>
      <button onClick={ () => setSettings(false)} className="modal-close">X</button>
    </div>
    </div>
  )
}
