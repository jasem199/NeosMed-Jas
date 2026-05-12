import React, { useState } from 'react';
import MedicineCard from '../../components/MedicineCard/MedicineCard';
import { useApp } from '../../context/AppContext';
import './SharedDataScreen.css';

export default function SharedDataScreen({ member, onBack }) {
  const { updateFamilyMemberPermissions } = useApp();
  const [activeTab, setActiveTab] = useState('medicines'); // medicines | history | stock | settings

  if (!member) return null;

  const mockMedicines = member.medicines || [];

  const renderMedicines = () => (
    <div className="sharedContentList">
      {mockMedicines.length === 0 ? (
        <div className="sectionEmptyText textCenter" style={{ marginTop: '2rem' }}>No medicines added yet</div>
      ) : (
        mockMedicines.map(med => (
          <MedicineCard key={med.id} medicine={med} disabled />
        ))
      )}
    </div>
  );

  const renderHistory = () => (
    <div className="sharedContentList">
      <div className="dateStrip">
        <div className="dateItem active">
          <div className="dateDay">Today</div>
          <div className="dateNum">10</div>
        </div>
        {/* Mock other days */}
      </div>
      
      {mockMedicines.length === 0 ? (
        <div className="sectionEmptyText textCenter" style={{ marginTop: '2rem' }}>No history available</div>
      ) : (
        <div className="timeCard">
          <div className="timeCategoryHeader">
            <div className="timeCategoryLabel">
              <span className="timeCategoryIcon"><i className="ri-time-line"></i></span>
              08:00 AM
            </div>
          </div>
          <div className="timeCardList">
            {mockMedicines.map(med => (
              <MedicineCard key={med.id} medicine={med} time="08:00" disabled />
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderStock = () => (
    <div className="sharedContentList">
      {mockMedicines.length === 0 ? (
        <div className="sectionEmptyText textCenter" style={{ marginTop: '2rem' }}>No stock data available</div>
      ) : (
        mockMedicines.map(med => (
          <div key={med.id} className="stockCard">
            <div className="stockInfo">
              <div className="stockName">{med.name}</div>
              <div className="stockCount">{med.stock} {med.unit.toLowerCase()} left</div>
            </div>
            <div className={`stockStatus ${med.stock <= med.lowStockThreshold ? 'low' : 'ok'}`}>
              {med.stock <= med.lowStockThreshold ? 'Low' : 'OK'}
            </div>
          </div>
        ))
      )}
    </div>
  );

  const handleToggleNotification = (key) => {
    updateFamilyMemberPermissions(member.id, {}, { [key]: !member.notifications[key] });
  };

  const renderSettings = () => (
    <div className="sharedContentList" style={{ marginTop: '1rem' }}>
      <h3 className="sectionSubtitle">My Notifications</h3>
      <p className="helperText" style={{ marginBottom: '1rem' }}>Choose what alerts you want to receive about {member.name}'s medicines.</p>
      
      <div className="summaryCard" style={{ padding: '0 1rem' }}>
        <div className="toggleRow" style={{ borderBottom: '1px solid var(--color-hairline-soft)' }} onClick={() => handleToggleNotification('medicineTime')}>
          <div className="toggleInfo">
            <div className="toggleTitle">Medicine time alerts</div>
            <div className="toggleDesc">Get notified when it's their time to take medicine</div>
          </div>
          <div className={`toggleSwitch ${member.notifications.medicineTime ? 'on' : 'off'}`}><div className="toggleKnob"></div></div>
        </div>
        <div className="toggleRow" style={{ borderBottom: '1px solid var(--color-hairline-soft)' }} onClick={() => handleToggleNotification('missedDose')}>
          <div className="toggleInfo">
            <div className="toggleTitle">Missed dose alerts</div>
            <div className="toggleDesc">Get notified if they miss a scheduled dose</div>
          </div>
          <div className={`toggleSwitch ${member.notifications.missedDose ? 'on' : 'off'}`}><div className="toggleKnob"></div></div>
        </div>
        <div className="toggleRow" onClick={() => handleToggleNotification('lowStock')}>
          <div className="toggleInfo">
            <div className="toggleTitle">Low stock alerts</div>
            <div className="toggleDesc">Get notified when their medicine stock is running low</div>
          </div>
          <div className={`toggleSwitch ${member.notifications.lowStock ? 'on' : 'off'}`}><div className="toggleKnob"></div></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="sharedDataScreen" id="shared-data-screen">
      <div className="sharedHeader">
        <button className="backBtn inline" onClick={onBack}>
          <i className="ri-arrow-left-line"></i>
        </button>
        <div className="sharedTitleInfo">
          <h1 className="sharedTitle">{member.name}</h1>
          <div className="sharedSubtitle">{member.relationship}</div>
        </div>
      </div>

      <div className="sharedTabs">
        <button 
          className={`sharedTab ${activeTab === 'medicines' ? 'active' : ''}`}
          onClick={() => setActiveTab('medicines')}
        >
          Medicines
        </button>
        <button 
          className={`sharedTab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Intake History
        </button>
        <button 
          className={`sharedTab ${activeTab === 'stock' ? 'active' : ''}`}
          onClick={() => setActiveTab('stock')}
        >
          Stock
        </button>
        <button 
          className={`sharedTab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      <div className="sharedBody">
        {activeTab === 'medicines' && renderMedicines()}
        {activeTab === 'history' && renderHistory()}
        {activeTab === 'stock' && renderStock()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </div>
  );
}
