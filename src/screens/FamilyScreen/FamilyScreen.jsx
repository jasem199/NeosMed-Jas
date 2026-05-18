import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import './FamilyScreen.css';
import AddMemberSheet from '../../components/Family/AddMemberSheet';
import MemberDetailSheet from '../../components/Family/MemberDetailSheet';

export default function FamilyScreen() {
  const { familyMembers } = useApp();
  const [addSheetOpen, setAddSheetOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // Family = I will share my data to a family member (people I share with)
  const sharingWith = familyMembers.filter(m => m.type === 'sharing_with');

  const noMembers = sharingWith.length === 0;

  return (
    <div className="familyScreen" id="family-screen">
      <div className="familyHeader">
        <h1 className="familyTitle">Family Care Circle</h1>
        <p className="familySubtitle">People who can monitor your medication updates</p>
      </div>

      {noMembers ? (
        <div className="emptyState" id="family-empty-state">
          <div className="emptyStateIcon"><i className="ri-group-line"></i></div>
          <div className="emptyStateTitle">Your family circle is empty</div>
          <div className="emptyStateSubtext">Add a family member to share your medication schedule and daily updates.</div>
          <div className="emptyStateActions">
            <button className="primaryCta" onClick={() => setAddSheetOpen(true)}>
              + Add a Family Member
            </button>
          </div>
        </div>
      ) : (
        <div className="familyContent">
          {/* Section: Sharing With */}
          <section className="familySection">
            <div className="sectionHeader">
              <div className="sectionHeaderInfo">
                <h2 className="sectionTitle">My Family Members</h2>
                <p className="sectionSubtitle">Family members who receive alerts and view your intakes</p>
              </div>
            </div>
            
            <div className="memberList">
              {sharingWith.map(member => (
                <div key={member.id} className="memberCard caregiverCard" onClick={() => setSelectedMember(member)}>
                  <div className="memberAvatar">{member.avatar}</div>
                  <div className="memberInfo">
                    <div className="memberName">{member.name}</div>
                    <div className="memberRelation">{member.relationship}</div>
                  </div>
                  <div className={`statusTag ${member.status.toLowerCase()}`}>
                    {member.status}
                  </div>
                  <div className="memberActionIcon"><i className="ri-settings-3-line"></i></div>
                </div>
              ))}
            </div>
            
            <div className="sectionFooter">
              <button className="addMemberBtn" onClick={() => setAddSheetOpen(true)}>
                + Add a Family Member
              </button>
            </div>
          </section>
        </div>
      )}

      {/* Sheets */}
      {addSheetOpen && (
        <AddMemberSheet isOpen={addSheetOpen} onClose={() => setAddSheetOpen(false)} />
      )}
      
      {selectedMember && selectedMember.type === 'sharing_with' && (
        <MemberDetailSheet 
          isOpen={!!selectedMember} 
          onClose={() => setSelectedMember(null)} 
          member={selectedMember} 
        />
      )}
    </div>
  );
}
