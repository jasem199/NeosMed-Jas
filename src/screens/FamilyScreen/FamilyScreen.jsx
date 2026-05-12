import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import './FamilyScreen.css';
import AddMemberSheet from '../../components/Family/AddMemberSheet';
import JoinFamilySheet from '../../components/Family/JoinFamilySheet';
import MemberDetailSheet from '../../components/Family/MemberDetailSheet';
import SharedDataScreen from './SharedDataScreen';

export default function FamilyScreen() {
  const { familyMembers } = useApp();
  const [addSheetOpen, setAddSheetOpen] = useState(false);
  const [joinSheetOpen, setJoinSheetOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const sharingWith = familyMembers.filter(m => m.type === 'sharing_with');
  const sharedWithMe = familyMembers.filter(m => m.type === 'shared_with_me');

  const noMembers = sharingWith.length === 0 && sharedWithMe.length === 0;

  if (selectedMember && selectedMember.type === 'shared_with_me') {
    return (
      <SharedDataScreen 
        member={selectedMember} 
        onBack={() => setSelectedMember(null)} 
      />
    );
  }

  return (
    <div className="familyScreen" id="family-screen">
      <div className="familyHeader">
        <h1 className="familyTitle">Family</h1>
      </div>

      {noMembers ? (
        <div className="emptyState" id="family-empty-state">
          <div className="emptyStateIcon"><i className="ri-group-line"></i></div>
          <div className="emptyStateTitle">Your family circle is empty</div>
          <div className="emptyStateSubtext">Add a caregiver or view someone's data to get started</div>
          <div className="emptyStateActions">
            <button className="primaryCta" onClick={() => setAddSheetOpen(true)}>
              + Add a Caregiver
            </button>
            <button className="secondaryCta" onClick={() => setJoinSheetOpen(true)}>
              Join with a Code
            </button>
          </div>
        </div>
      ) : (
        <div className="familyContent">
          {/* Section 1: Sharing With */}
          <section className="familySection">
            <div className="sectionHeader">
              <div className="sectionHeaderInfo">
                <h2 className="sectionTitle">My Caregivers</h2>
                <p className="sectionSubtitle">People you have allowed to see your data</p>
              </div>
            </div>
            
            {sharingWith.length === 0 ? (
              <div className="sectionEmptyText">
                <button className="addMemberBtn outline" onClick={() => setAddSheetOpen(true)}>
                  + Add a Caregiver
                </button>
              </div>
            ) : (
              <>
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
                    + Add a Caregiver
                  </button>
                </div>
              </>
            )}
          </section>

          <div className="sectionDivider"></div>

          {/* Section 2: Shared With Me */}
          <section className="familySection">
            <div className="sectionHeader">
              <div className="sectionHeaderInfo">
                <h2 className="sectionTitle">People Under My Care</h2>
                <p className="sectionSubtitle">People who have allowed you to see their data</p>
              </div>
            </div>
            
            {sharedWithMe.length === 0 ? (
              <div className="sectionEmptyText">
                <button className="addMemberBtn outline purple" onClick={() => setJoinSheetOpen(true)}>
                  Join with a Code
                </button>
              </div>
            ) : (
              <>
                <div className="memberList">
                  {sharedWithMe.map(member => (
                    <div key={member.id} className="memberCard patientCard" onClick={() => setSelectedMember(member)}>
                      <div className="memberAvatar variant">{member.avatar}</div>
                      <div className="memberInfo">
                        <div className="memberName">{member.name}</div>
                        <div className="memberRelation">{member.relationship}</div>
                      </div>
                      <div className="viewDataBtn">
                        View Data <i className="ri-arrow-right-line"></i>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="sectionFooter">
                  <button className="addMemberBtn purple" onClick={() => setJoinSheetOpen(true)}>
                    Join with a Code
                  </button>
                </div>
              </>
            )}
          </section>
        </div>
      )}

      {/* Sheets */}
      {addSheetOpen && (
        <AddMemberSheet isOpen={addSheetOpen} onClose={() => setAddSheetOpen(false)} />
      )}
      
      {joinSheetOpen && (
        <JoinFamilySheet isOpen={joinSheetOpen} onClose={() => setJoinSheetOpen(false)} />
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
