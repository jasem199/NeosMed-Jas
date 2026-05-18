import { useState } from 'react';
import './AlertsScreen.css';

const MOCK_ALERTS = [
  {
    id: 'alert-1',
    type: 'missed',
    title: 'Missed Dose: Metformin',
    desc: 'Grandpa missed his Evening dose (850mg) scheduled at 08:00 PM yesterday.',
    time: '14 hours ago',
    unread: true,
  },
  {
    id: 'alert-2',
    type: 'low_stock',
    title: 'Low Stock: Salbutamol',
    desc: 'Salbutamol is running low. Only 3 puffs left in stock.',
    time: '1 day ago',
    unread: true,
  },
  {
    id: 'alert-3',
    type: 'caregiver',
    title: 'Caregiver Sharing Invitation Accepted',
    desc: 'Sarah successfully connected to your care group and can now view your logs.',
    time: '2 days ago',
    unread: true,
  },
  {
    id: 'alert-4',
    type: 'refill',
    title: 'Refill Confirmed: Amoxicillin',
    desc: 'Successfully refilled 21 pills. New total stock: 21 pills.',
    time: '3 days ago',
    unread: false,
  }
];

export default function AlertsScreen() {
  const [alerts, setAlerts] = useState(MOCK_ALERTS);

  const handleMarkAllRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, unread: false })));
  };

  const handleClearAlert = (id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const handleToggleUnread = (id) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, unread: !a.unread } : a));
  };

  return (
    <div className="alertsScreen">
      <div className="alertsScreen-header">
        <div>
          <h1 className="alertsScreen-title">Notifications</h1>
          <p className="alertsScreen-subtitle">Stay updated on your family care</p>
        </div>
        {alerts.some(a => a.unread) && (
          <button className="alertsScreen-actionBtn" onClick={handleMarkAllRead}>
            Mark all read
          </button>
        )}
      </div>

      <div className="alertsScreen-content">
        {alerts.length === 0 ? (
          <div className="alertsScreen-empty">
            <div className="alertsScreen-emptyIconCircle">
              <i className="ri-notification-off-line"></i>
            </div>
            <h3 className="alertsScreen-emptyTitle">All clear!</h3>
            <p className="alertsScreen-emptyDesc">You have no active alerts or notifications.</p>
          </div>
        ) : (
          <div className="alertsScreen-list">
            {alerts.map((alert) => {
              let alertClass = `alertCard ${alert.type}`;
              if (alert.unread) alertClass += ' unread';
              
              let iconClass = '';
              if (alert.type === 'missed') iconClass = 'ri-error-warning-line';
              else if (alert.type === 'low_stock') iconClass = 'ri-box-3-line';
              else if (alert.type === 'caregiver') iconClass = 'ri-shield-user-line';
              else iconClass = 'ri-checkbox-circle-line';

              return (
                <div key={alert.id} className={alertClass}>
                  <div className="alertCard-iconCircle">
                    <i className={iconClass}></i>
                  </div>
                  <div className="alertCard-content" onClick={() => handleToggleUnread(alert.id)}>
                    <div className="alertCard-meta">
                      <span className="alertCard-time">{alert.time}</span>
                      {alert.unread && <span className="alertCard-unreadDot"></span>}
                    </div>
                    <h3 className="alertCard-title">{alert.title}</h3>
                    <p className="alertCard-desc">{alert.desc}</p>
                  </div>
                  <button 
                    className="alertCard-clearBtn" 
                    onClick={() => handleClearAlert(alert.id)}
                    aria-label="Clear alert"
                  >
                    <i className="ri-close-line"></i>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
