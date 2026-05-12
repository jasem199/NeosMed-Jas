import React, { useState } from 'react';
import BottomSheet from '../BottomSheet/BottomSheet';
import { useApp } from '../../context/AppContext';
import './FamilySheets.css';

export default function AddMemberSheet({ isOpen, onClose }) {
  const { addFamilyMember } = useApp();
  const [step, setStep] = useState(0); // 0: Choose, 1: Identity, 2: Permissions, 3: Final
  const [method, setMethod] = useState(''); // 'phone', 'link', 'code'
  
  // Form State
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [phone, setPhone] = useState('');
  const [permissions, setPermissions] = useState({
    medicineList: true, // locked
    intakeHistory: true,
    stockHistory: true
  });
  const [notifications, setNotifications] = useState({
    medicineTime: true,
    missedDose: true,
    lowStock: false
  });

  const [inviteCode, setInviteCode] = useState('');

  const relationships = ['Mother', 'Father', 'Son', 'Daughter', 'Spouse', 'Sibling', 'Other'];

  const handleMethodSelect = (m) => {
    setMethod(m);
    setStep(1);
  };

  const handleIdentityNext = () => {
    if (!name || !relationship || (method === 'phone' && !phone)) return;
    setStep(2);
  };

  const handlePermissionsNext = () => {
    if (method === 'phone') {
      setStep(3); // Review
    } else if (method === 'code') {
      // Generate code
      setInviteCode('MED·4X9');
      setStep(3);
    } else {
      setStep(3); // Link
    }
  };

  const handleConfirm = () => {
    // Add to context
    const newMember = {
      name,
      relationship,
      phoneNumber: method === 'phone' ? phone : undefined,
      avatar: name.charAt(0).toUpperCase(),
      type: 'sharing_with',
      status: method === 'phone' ? 'Active' : 'Pending',
      inviteMethod: method === 'phone' ? undefined : (method === 'link' ? 'Link' : 'Code'),
      permissions,
      notifications
    };
    addFamilyMember(newMember);
    onClose();
    // reset
    setStep(0);
    setName('');
    setRelationship('');
    setPhone('');
  };

  const renderChooseMethod = () => (
    <div className="sheetContent">
      <button className="addOptionItem" onClick={() => handleMethodSelect('phone')}>
        <div className="addOptionIcon"><i className="ri-smartphone-line"></i></div>
        <div className="addOptionInfo">
          <div className="addOptionTitle">Add by Phone Number</div>
          <div className="addOptionDesc">For users already on NeosMed</div>
        </div>
        <span className="addOptionArrow"><i className="ri-arrow-right-s-line"></i></span>
      </button>
      <button className="addOptionItem" onClick={() => handleMethodSelect('link')}>
        <div className="addOptionIcon"><i className="ri-links-line"></i></div>
        <div className="addOptionInfo">
          <div className="addOptionTitle">Share Invite Link</div>
          <div className="addOptionDesc">Send via WhatsApp, Messenger, etc.</div>
        </div>
        <span className="addOptionArrow"><i className="ri-arrow-right-s-line"></i></span>
      </button>
      <button className="addOptionItem" onClick={() => handleMethodSelect('code')}>
        <div className="addOptionIcon"><i className="ri-key-2-line"></i></div>
        <div className="addOptionInfo">
          <div className="addOptionTitle">Share Invite Code</div>
          <div className="addOptionDesc">Generate a 6-digit code</div>
        </div>
        <span className="addOptionArrow"><i className="ri-arrow-right-s-line"></i></span>
      </button>
    </div>
  );

  const renderIdentityForm = () => {
    const isNextDisabled = !name || !relationship || (method === 'phone' && !phone);
    return (
      <div className="sheetContent formContent">
        <div className="formGroup">
          <label className="formLabel">Full Name</label>
          <input 
            type="text" 
            className="formInput" 
            placeholder="e.g. Ayesha Rahman" 
            value={name} 
            onChange={e => setName(e.target.value)} 
          />
        </div>

        <div className="formGroup">
          <label className="formLabel">Relationship</label>
          <div className="chipGroup">
            {relationships.map(rel => (
              <button 
                key={rel} 
                className={`chip ${relationship === rel ? 'selected' : ''}`}
                onClick={() => setRelationship(rel)}
              >
                {rel}
              </button>
            ))}
          </div>
        </div>

        {method === 'phone' && (
          <div className="formGroup">
            <label className="formLabel">Phone Number</label>
            <input 
              type="tel" 
              className="formInput" 
              placeholder="e.g. 01711000000" 
              value={phone} 
              onChange={e => setPhone(e.target.value)} 
            />
            <p className="helperText">This person must have NeosMed installed</p>
          </div>
        )}

        <button 
          className="primaryCta" 
          disabled={isNextDisabled}
          onClick={handleIdentityNext}
          style={{ marginTop: '1rem' }}
        >
          Next
        </button>
      </div>
    );
  };

  const renderPermissionsForm = () => (
    <div className="sheetContent formContent">
      <h3 className="sectionSubtitle">What can they see?</h3>
      
      <div className="toggleRow locked">
        <div className="toggleInfo">
          <div className="toggleTitle">Medicine List</div>
          <div className="toggleDesc">They will see all your medicines</div>
        </div>
        <div className="toggleSwitch on disabled">
          <div className="toggleKnob"></div>
        </div>
      </div>

      <div className="toggleRow" onClick={() => setPermissions(p => ({...p, intakeHistory: !p.intakeHistory}))}>
        <div className="toggleInfo">
          <div className="toggleTitle">Intake History</div>
          <div className="toggleDesc">They will see your daily taken and missed history</div>
        </div>
        <div className={`toggleSwitch ${permissions.intakeHistory ? 'on' : 'off'}`}>
          <div className="toggleKnob"></div>
        </div>
      </div>

      <div className="toggleRow" onClick={() => setPermissions(p => ({...p, stockHistory: !p.stockHistory}))}>
        <div className="toggleInfo">
          <div className="toggleTitle">Stock History</div>
          <div className="toggleDesc">They will see your current stock levels</div>
        </div>
        <div className={`toggleSwitch ${permissions.stockHistory ? 'on' : 'off'}`}>
          <div className="toggleKnob"></div>
        </div>
      </div>

      <div className="divider"></div>

      <h3 className="sectionSubtitle">Notifications</h3>

      <div className="toggleRow" onClick={() => setNotifications(n => ({...n, medicineTime: !n.medicineTime}))}>
        <div className="toggleInfo">
          <div className="toggleTitle">Medicine time alerts</div>
          <div className="toggleDesc">They get notified when it is your medicine time</div>
        </div>
        <div className={`toggleSwitch ${notifications.medicineTime ? 'on' : 'off'}`}>
          <div className="toggleKnob"></div>
        </div>
      </div>

      <div className="toggleRow" onClick={() => setNotifications(n => ({...n, missedDose: !n.missedDose}))}>
        <div className="toggleInfo">
          <div className="toggleTitle">Missed dose alerts</div>
          <div className="toggleDesc">They get notified if you miss a dose</div>
        </div>
        <div className={`toggleSwitch ${notifications.missedDose ? 'on' : 'off'}`}>
          <div className="toggleKnob"></div>
        </div>
      </div>

      <div className="toggleRow" onClick={() => setNotifications(n => ({...n, lowStock: !n.lowStock}))}>
        <div className="toggleInfo">
          <div className="toggleTitle">Low stock alerts</div>
          <div className="toggleDesc">They get notified when your stock is low</div>
        </div>
        <div className={`toggleSwitch ${notifications.lowStock ? 'on' : 'off'}`}>
          <div className="toggleKnob"></div>
        </div>
      </div>

      <button className="primaryCta" onClick={handlePermissionsNext} style={{ marginTop: '1rem' }}>
        Next
      </button>
    </div>
  );

  const renderFinalPhone = () => (
    <div className="sheetContent formContent">
      <div className="summaryCard">
        <div className="summaryHeader">
          <div className="summaryAvatar">{name.charAt(0)}</div>
          <div className="summaryInfo">
            <div className="summaryName">{name}</div>
            <div className="summaryRel">{relationship} • {phone}</div>
          </div>
        </div>
      </div>
      <button className="primaryCta" onClick={handleConfirm} style={{ marginTop: '2rem' }}>
        Confirm & Add Member
      </button>
    </div>
  );

  const renderFinalLink = () => (
    <div className="sheetContent formContent textCenter">
      <div className="inviteIconLarge"><i className="ri-links-line"></i></div>
      <h3 className="inviteTitle">Share this link with {name}</h3>
      <div className="inviteBox">
        <span className="inviteCodeText">neosmed.app/invite/x7y9z</span>
        <button className="iconBtn"><i className="ri-file-copy-line"></i></button>
      </div>
      <p className="helperText center">This link expires in 48 hours. They must have NeosMed installed.</p>
      
      <button className="secondaryCta shareBtn" style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
        <i className="ri-share-line"></i> Share via...
      </button>
      <button className="primaryCta" onClick={handleConfirm}>
        Done
      </button>
    </div>
  );

  const renderFinalCode = () => (
    <div className="sheetContent formContent textCenter">
      <div className="inviteIconLarge"><i className="ri-key-2-line"></i></div>
      <h3 className="inviteTitle">Share Invite Code</h3>
      <p className="helperText center" style={{ marginBottom: '1.5rem' }}>Ask {name} to enter this code in their NeosMed app under Family → Join with a Code</p>
      
      <div className="inviteBox large">
        <span className="inviteCodeText bold">{inviteCode}</span>
        <button className="iconBtn"><i className="ri-file-copy-line"></i></button>
      </div>
      <p className="helperText center danger">Expires in 48 hours</p>
      
      <button className="primaryCta" onClick={handleConfirm} style={{ marginTop: '2rem' }}>
        Done
      </button>
    </div>
  );

  const titles = [
    "Add or Invite",
    "Member Details",
    "Set Permissions",
    method === 'phone' ? "Looks good?" : (method === 'link' ? "Share Link" : "Share Code")
  ];

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title={titles[step]}>
      {step > 0 && (
        <button className="backBtn" onClick={() => setStep(s => s - 1)}>
          <i className="ri-arrow-left-line"></i> Back
        </button>
      )}
      
      {step === 0 && renderChooseMethod()}
      {step === 1 && renderIdentityForm()}
      {step === 2 && renderPermissionsForm()}
      {step === 3 && method === 'phone' && renderFinalPhone()}
      {step === 3 && method === 'link' && renderFinalLink()}
      {step === 3 && method === 'code' && renderFinalCode()}
    </BottomSheet>
  );
}
