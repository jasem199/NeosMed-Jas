import './TopBar.css';

export default function TopBar() {
  return (
    <header className="topBar" id="top-bar">
      <div className="topBarLogo">
        <div className="topBarLogoIcon">N</div>
        <span className="topBarLogoText">NeosMed</span>
      </div>
      <button className="topBarAvatar" aria-label="Open profile" id="profile-avatar">
        JU
      </button>
    </header>
  );
}
