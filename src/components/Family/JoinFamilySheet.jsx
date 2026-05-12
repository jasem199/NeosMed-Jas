import React, { useState } from 'react';
import BottomSheet from '../BottomSheet/BottomSheet';
import { useApp } from '../../context/AppContext';
import './FamilySheets.css';

export default function JoinFamilySheet({ isOpen, onClose }) {
  const { addFamilyMember } = useApp();
  const [step, setStep] = useState(1); // 1: Enter Code, 2: Review Invite
  const [code, setCode] = useState('');
  
  // Mock invite data
  const mockInvite = {
    name: 'Rafiqul Islam',
    relationship: 'Father', // They set me as 'Son', so I see them as 'Father' or whatever
    avatar: 'R',
    permissions: {
      medicineList: true,
      intakeHistory: true,
      stockHistory: false
    },
    notifications: {
      medicineTime: true,
      missedDose: true,
      lowStock: false
    }
  };

  const handleVerify = () => {
    if (code.length === 6) {
      // Fake verification delay
      setTimeout(() => setStep(2), 500);
    }
  };

  const handleAccept = () => {
    // Add to 'shared_with_me' list
    const newMember = {
      name: mockInvite.name,
      relationship: mockInvite.relationship,
      avatar: mockInvite.avatar,
      type: 'shared_with_me',
      status: 'Active',
      medicines: [], // empty mock
      takenMap: {}
    };
    addFamilyMember(newMember);
    onClose();
  };

  const renderEnterCode = () => (
    <div className="sheetContent formContent textCenter">
      <p className="helperText center" style={{ marginBottom: '1.5rem' }}>Enter the code shared by your family member</p>
      
      <input 
        type="text" 
        className="codeInput" 
        placeholder="MED·4X9" 
        value={code} 
        onChange={e => setCode(e.target.value.toUpperCase())}
        maxLength={6}
      />
      
      <button 
        className="primaryCta" 
        disabled={code.length < 6}
        onClick={handleVerify}
      >
        Verify
      </button>
    </div>
  );

  const renderReviewInvite = () => (
    <div className="sheetContent formContent">
      <div className="summaryCard">
        <div className="summaryHeader">
          <div className="summaryAvatar">{mockInvite.avatar}</div>
          <div className="summaryInfo">
            <div className="summaryName">{mockInvite.name} wants to share with you</div>
            <div className="summaryRel">They added you as their {mockInvite.relationship}</div>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      <h3 className="sectionSubtitle">You will have access to:</h3>
      <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
        <li>Their full medicine list</li>
        {mockInvite.permissions.intakeHistory && <li>Their daily intake history</li>}
        {mockInvite.permissions.stockHistory && <li>Their current stock levels</li>}
      </ul>

      <h3 className="sectionSubtitle" style={{ marginTop: '0.5rem' }}>You will receive notifications for:</h3>
      <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
        {mockInvite.notifications.medicineTime && <li>When it is their medicine time</li>}
        {mockInvite.notifications.missedDose && <li>If they miss a dose</li>}
        {mockInvite.notifications.lowStock && <li>When their stock is low</li>}
        {!mockInvite.notifications.medicineTime && !mockInvite.notifications.missedDose && !mockInvite.notifications.lowStock && (
          <li>No notifications enabled.</li>
        )}
      </ul>

      <div className="emptyStateActions" style={{ marginTop: '1.5rem' }}>
        <button className="primaryCta" onClick={handleAccept}>
          Accept & Join
        </button>
        <button className="secondaryCta" onClick={onClose} style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}>
          Decline
        </button>
      </div>
    </div>
  );

  const titles = [
    "",
    "Join with a Code",
    "Review Invitation"
  ];

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title={titles[step]}>
      {step === 1 && renderEnterCode()}
      {step === 2 && renderReviewInvite()}
    </BottomSheet>
  );
}
