import React, { useState } from 'react';
import BottomSheet from '../BottomSheet/BottomSheet';
import { useApp } from '../../context/AppContext';
import './FamilySheets.css';

export default function MemberDetailSheet({ isOpen, onClose, member }) {
  const { updateFamilyMemberPermissions, removeFamilyMember } = useApp();
  const [showConfirmRemove, setShowConfirmRemove] = useState(false);

  if (!member) return null;

  const handleTogglePermission = (key) => {
    updateFamilyMemberPermissions(member.id, { [key]: !member.permissions[key] }, {});
  };

  const handleToggleNotification = (key) => {
    updateFamilyMemberPermissions(member.id, {}, { [key]: !member.notifications[key] });
  };

  const handleRemove = () => {
    removeFamilyMember(member.id);
    onClose();
  };

  const renderContent = () => (
    <div className="sheetContent formContent">
      <div className="summaryCard" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="summaryHeader">
          <div className="summaryAvatar">{member.avatar}</div>
          <div className="summaryInfo">
            <div className="summaryName">{member.name}</div>
            <div className="summaryRel">{member.relationship} {member.phoneNumber ? `• ${member.phoneNumber}` : ''}</div>
          </div>
        </div>
        <div className={`statusTag ${member.status.toLowerCase()}`}>
          {member.status}
        </div>
      </div>

      {member.status === 'Pending' && (
        <div className="summaryCard" style={{ borderColor: '#F9AB00', backgroundColor: '#FEF7E0' }}>
          <h3 className="sectionSubtitle" style={{ marginBottom: '4px' }}>Invite Pending</h3>
          <p className="helperText">Shared via {member.inviteMethod}</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button className="primaryCta" style={{ padding: '0.5rem', flex: 1 }}>Resend</button>
            <button className="secondaryCta" style={{ padding: '0.5rem', flex: 1, borderColor: 'var(--color-error-deep)', color: 'var(--color-error-deep)' }} onClick={handleRemove}>Cancel Invite</button>
          </div>
        </div>
      )}

      <div className="summaryCard">
        <h3 className="sectionSubtitle">What they can see</h3>
        <div className="toggleRow locked" style={{ paddingBottom: '0.2rem' }}>
          <div className="toggleInfo">
            <div className="toggleTitle">Medicine List</div>
          </div>
          <div className="toggleSwitch on disabled"><div className="toggleKnob"></div></div>
        </div>
        <div className="toggleRow" style={{ paddingBottom: '0.2rem' }} onClick={() => handleTogglePermission('intakeHistory')}>
          <div className="toggleInfo">
            <div className="toggleTitle">Intake History</div>
          </div>
          <div className={`toggleSwitch ${member.permissions.intakeHistory ? 'on' : 'off'}`}><div className="toggleKnob"></div></div>
        </div>
        <div className="toggleRow" style={{ paddingTop: '0' }} onClick={() => handleTogglePermission('stockHistory')}>
          <div className="toggleInfo">
            <div className="toggleTitle">Stock History</div>
          </div>
          <div className={`toggleSwitch ${member.permissions.stockHistory ? 'on' : 'off'}`}><div className="toggleKnob"></div></div>
        </div>
      </div>

      <div className="summaryCard">
        <h3 className="sectionSubtitle">Notifications</h3>
        <div className="toggleRow" style={{ paddingBottom: '0.2rem' }} onClick={() => handleToggleNotification('medicineTime')}>
          <div className="toggleInfo">
            <div className="toggleTitle">Medicine time alerts</div>
          </div>
          <div className={`toggleSwitch ${member.notifications.medicineTime ? 'on' : 'off'}`}><div className="toggleKnob"></div></div>
        </div>
        <div className="toggleRow" style={{ paddingBottom: '0.2rem' }} onClick={() => handleToggleNotification('missedDose')}>
          <div className="toggleInfo">
            <div className="toggleTitle">Missed dose alerts</div>
          </div>
          <div className={`toggleSwitch ${member.notifications.missedDose ? 'on' : 'off'}`}><div className="toggleKnob"></div></div>
        </div>
        <div className="toggleRow" style={{ paddingTop: '0' }} onClick={() => handleToggleNotification('lowStock')}>
          <div className="toggleInfo">
            <div className="toggleTitle">Low stock alerts</div>
          </div>
          <div className={`toggleSwitch ${member.notifications.lowStock ? 'on' : 'off'}`}><div className="toggleKnob"></div></div>
        </div>
      </div>

      <button className="joinCodeTextBtn" style={{ color: 'var(--color-error-deep)', textAlign: 'center', marginTop: '1rem' }} onClick={() => setShowConfirmRemove(true)}>
        Remove Member
      </button>
    </div>
  );

  const renderConfirmRemove = () => (
    <div className="sheetContent formContent textCenter">
      <div className="inviteIconLarge" style={{ color: 'var(--color-error-deep)' }}><i className="ri-error-warning-line"></i></div>
      <h3 className="inviteTitle">Remove {member.name}?</h3>
      <p className="helperText center" style={{ marginBottom: '2rem' }}>They will lose access to your medicine data and stop receiving notifications.</p>
      
      <div className="emptyStateActions">
        <button className="primaryCta" style={{ backgroundColor: 'var(--color-error-deep)' }} onClick={handleRemove}>
          Remove
        </button>
        <button className="secondaryCta" onClick={() => setShowConfirmRemove(false)}>
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title={showConfirmRemove ? '' : member.name}>
      {showConfirmRemove ? renderConfirmRemove() : renderContent()}
    </BottomSheet>
  );
}
