import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import SharedDataScreen from '../FamilyScreen/SharedDataScreen';
import JoinFamilySheet from '../../components/Family/JoinFamilySheet';
import './CareScreen.css';

export default function CareScreen() {
  const { familyMembers } = useApp();
  const [selectedMember, setSelectedMember] = useState(null);
  const [joinSheetOpen, setJoinSheetOpen] = useState(false);

  // Care = I am assigned as caregiver (people sharing their data with me)
  const sharedWithMe = familyMembers.filter(m => m.type === 'shared_with_me');

  if (selectedMember) {
    return (
      <SharedDataScreen 
        member={selectedMember} 
        onBack={() => setSelectedMember(null)} 
      />
    );
  }

  return (
    <div className="careScreen" id="care-screen">
      <div className="careHeader">
        <div>
          <h1 className="careTitle">Care Dashboard</h1>
          <p className="careSubtitle">You are assigned as their active caregiver</p>
        </div>
      </div>

      <div className="careContent">
        {sharedWithMe.length === 0 ? (
          <div className="emptyState" id="care-empty-state">
            <div className="emptyStateIcon"><i className="ri-heart-pulse-line"></i></div>
            <div className="emptyStateTitle">No care assignments yet</div>
            <div className="emptyStateSubtext">Enter a family member's connection code to look after their medication habits.</div>
            <div className="emptyStateActions">
              <button className="primaryCta" onClick={() => setJoinSheetOpen(true)}>
                Join with a Code
              </button>
            </div>
          </div>
        ) : (
          <div className="careDashboard-section">
            <div className="careDashboard-meta">
              <span className="careDashboard-count">{sharedWithMe.length} person under your care</span>
            </div>
            
            <div className="careMemberList">
              {sharedWithMe.map(member => (
                <div key={member.id} className="careMemberCard" onClick={() => setSelectedMember(member)}>
                  <div className="careMemberAvatar">{member.avatar}</div>
                  <div className="careMemberInfo">
                    <h3 className="careMemberName">{member.name}</h3>
                    <p className="careMemberRelation">{member.relationship}</p>
                  </div>
                  <div className="careMemberAction">
                    <span className="careViewBtn">
                      View Logs <i className="ri-arrow-right-line"></i>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="careDashboard-footer">
              <button className="addMemberBtn outline purple" onClick={() => setJoinSheetOpen(true)}>
                <i className="ri-key-2-line"></i> Enter Another Code
              </button>
            </div>
          </div>
        )}
      </div>

      {joinSheetOpen && (
        <JoinFamilySheet isOpen={joinSheetOpen} onClose={() => setJoinSheetOpen(false)} />
      )}
    </div>
  );
}
