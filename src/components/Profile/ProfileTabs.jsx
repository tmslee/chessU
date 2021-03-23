import "./styles/ProfileTabs.scss";

export default function ProfileTabs (props) {

  const { setTabs } = props;
  
  return (
    <div className="profile-btn-group">
      <button onClick={() => 
      setTabs({stats:true, history: false})}>
        Stats
      </button>
      <button onClick={() => 
      setTabs({stats:false, history: true})}>
        History
        </button>
    </div>
  )
};