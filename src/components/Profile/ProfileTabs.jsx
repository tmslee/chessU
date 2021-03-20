import "./styles/ProfileTabs.scss";

export default function ChangeAvatar (props) {

  const { setTabs } = props;
  
  return (
    <div class="profile-btn-group">
      <button onClick={() => 
      setTabs({stats:true, history: false})}>
        Stats
      </button>
      <button onClick={() => 
      setTabs({stats:false, history: true})}>
        Match History
        </button>
    </div>
  )
};