import { useApp } from '../../context/AppContext';
import './BottomNav.css';

const tabs = [
  { id: 'medication', icon: '💊', label: 'Medication' },
  { id: 'family', icon: '👨‍👩‍👧', label: 'Family' },
  { id: 'stock', icon: '📦', label: 'Stock' },
  { id: 'reports', icon: '📊', label: 'Reports' },
  { id: 'notifications', icon: '🔔', label: 'Alerts', badge: 3 },
];

export default function BottomNav() {
  const { activeTab, setActiveTab } = useApp();

  return (
    <nav className="bottomNav" id="bottom-nav" aria-label="Main navigation">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          id={`nav-${tab.id}`}
          className={`bottomNavItem${activeTab === tab.id ? ' active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
          aria-label={tab.label}
          aria-current={activeTab === tab.id ? 'page' : undefined}
        >
          <span className="bottomNavIcon">{tab.icon}</span>
          <span className="bottomNavLabel">{tab.label}</span>
          {tab.badge && <span className="bottomNavBadge">{tab.badge}</span>}
        </button>
      ))}
    </nav>
  );
}
