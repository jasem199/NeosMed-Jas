import { useApp } from '../../context/AppContext';
import './TopBar.css';

export default function TopBar() {
  const { activeTab, setActiveTab } = useApp();

  return (
    <header className="topBar" id="top-bar">
      <div className="topBarLogo">
        <div className="topBarLogoIcon"><i className="ri-heart-pulse-fill"></i></div>
        <span className="topBarLogoText">NeosMed</span>
      </div>
      
      <div className="topBarActions">
        <button 
          className={`topBarBtn ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
          aria-label="Alerts"
          id="top-alerts-btn"
        >
          <i className="ri-notification-3-line"></i>
          <span className="topBarBadge">3</span>
        </button>
        <button className="topBarAvatar" aria-label="Open profile" id="profile-avatar">
          <i className="ri-user-line"></i>
        </button>
      </div>
    </header>
  );
}
