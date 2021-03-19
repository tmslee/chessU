import axios from 'axios';
import "./styles/ProfileTabs.scss";

export default function ChangeAvatar (props) {
  
  return (
    <div class="profile-btn-group">
    <button class="bttn-pill bttn-md bttn-primary">Stats</button>
    <button class="bttn-stretch bttn-md bttn-primary">Match History</button>
    </div>
  )
};