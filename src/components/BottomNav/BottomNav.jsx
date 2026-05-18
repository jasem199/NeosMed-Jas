import { useApp } from '../../context/AppContext';
import './BottomNav.css';

const tabs = [
  { id: 'home', lineIcon: 'ri-home-5-line', fillIcon: 'ri-home-5-fill', label: 'Home' },
  { id: 'care', lineIcon: 'ri-heart-line', fillIcon: 'ri-heart-fill', label: 'Care' },
  { id: 'family', lineIcon: 'ri-group-line', fillIcon: 'ri-group-fill', label: 'Family' },
  { id: 'medicine', lineIcon: 'ri-medicine-bottle-line', fillIcon: 'ri-medicine-bottle-fill', label: 'Medicine' },
  { id: 'reports', lineIcon: 'ri-bar-chart-box-line', fillIcon: 'ri-bar-chart-box-fill', label: 'Reports' },
];

export default function BottomNav() {
  const { activeTab, setActiveTab } = useApp();

  return (
    <nav className="bottomNav" id="bottom-nav" aria-label="Main navigation">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const iconClass = isActive ? tab.fillIcon : tab.lineIcon;
        
        return (
          <button
            key={tab.id}
            id={`nav-${tab.id}`}
            className={`bottomNavItem${isActive ? ' active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            aria-label={tab.label}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className="bottomNavIcon">
              <i className={iconClass}></i>
            </span>
            <span className="bottomNavLabel">{tab.label}</span>
            {tab.badge && <span className="bottomNavBadge">{tab.badge}</span>}
          </button>
        );
      })}
    </nav>
  );
}
