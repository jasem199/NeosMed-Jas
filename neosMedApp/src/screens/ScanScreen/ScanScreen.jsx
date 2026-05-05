import { useState, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_SCAN_RESULTS } from '../../data/mockData';
import './ScanScreen.css';

export default function ScanScreen() {
  const { setActiveScreen, addMedicinesBulk } = useApp();
  const [phase, setPhase] = useState('camera'); // camera | scanning | review | confirm
  const [results, setResults] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', strength: '', unit: '' });
  const [showToast, setShowToast] = useState(false);

  const handleCapture = () => {
    setPhase('scanning');
    // Simulate scan delay
    setTimeout(() => {
      setResults(MOCK_SCAN_RESULTS.map(r => ({ ...r })));
      setPhase('review');
    }, 2500);
  };

  const handleGallery = () => {
    // Same as capture — mock
    handleCapture();
  };

  const handleRemove = (id) => {
    setResults(prev => prev.filter(r => r.id !== id));
  };

  const handleEditStart = (item) => {
    setEditingId(item.id);
    setEditForm({ name: item.name, strength: String(item.strength), unit: item.unit });
  };

  const handleEditSave = (id) => {
    setResults(prev => prev.map(r =>
      r.id === id ? { ...r, name: editForm.name, strength: Number(editForm.strength), unit: editForm.unit, confidence: 1, edited: true } : r
    ));
    setEditingId(null);
  };

  const handleProceedToConfirm = () => {
    if (results.some(r => r.confidence < 0.7 && !r.edited)) return;
    setPhase('confirm');
  };

  const handleConfirmAll = () => {
    const meds = results.map(r => ({
      name: r.name,
      strength: r.strength,
      unit: r.unit,
      intakeAdvice: 'No preference',
      frequency: r.frequency || 1,
      times: ['08:00'],
      timeCategories: ['morning'],
      duration: 'Ongoing',
      durationDays: null,
      stock: 0,
      lowStockThreshold: 0,
      note: 'Added via prescription scan',
    }));
    addMedicinesBulk(meds);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setActiveScreen('home');
    }, 1800);
  };

  const hasLowConfidence = results.some(r => r.confidence < 0.7 && !r.edited);

  // Camera phase
  if (phase === 'camera') {
    return (
      <div className="scanScreen" id="scan-screen">
        <div className="cameraView">
          <div className="cameraTopBar">
            <button className="cameraBackBtn" onClick={() => setActiveScreen('home')} aria-label="Go back">
              <i className="ri-arrow-left-line"></i>
            </button>
            <button className="cameraFlashBtn" aria-label="Toggle flash">
              <i className="ri-flashlight-fill"></i>
            </button>
          </div>
          <div className="cameraFrame">
            <span className="cameraFrameCorner tl" />
            <span className="cameraFrameCorner tr" />
            <span className="cameraFrameCorner bl" />
            <span className="cameraFrameCorner br" />
            <span className="cameraHint">Align prescription<br />within the frame</span>
          </div>
          <div className="cameraBottomBar">
            <button className="galleryBtn" onClick={handleGallery} aria-label="Choose from gallery" id="gallery-btn">
              <i className="ri-image-line"></i>
            </button>
            <button className="captureBtn" onClick={handleCapture} aria-label="Capture photo" id="capture-btn" />
            <div className="captureBtnPlaceholder" />
          </div>
        </div>
      </div>
    );
  }

  // Scanning animation
  if (phase === 'scanning') {
    return (
      <div className="scanningOverlay" id="scanning-overlay">
        <div className="scanningSpinner" />
        <div className="scanningText">Reading your prescription…</div>
      </div>
    );
  }

  // Review phase
  if (phase === 'review') {
    return (
      <div className="scanScreen" id="scan-review-screen">
        <div className="addManualHeader" style={{ borderBottom: '1px solid var(--color-hairline)', padding: '16px', position: 'sticky', top: 0, background: 'var(--color-canvas)', zIndex: 10, display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="addManualBackBtn" onClick={() => setPhase('camera')} aria-label="Go back" style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-surface-card)', borderRadius: '9999px', fontSize: 18, cursor: 'pointer', border: 'none' }}>
            <i className="ri-arrow-left-line"></i>
          </button>
          <span style={{ fontSize: 18, fontWeight: 600, color: 'var(--color-ink)' }}>Review Results</span>
        </div>
        <div className="scanReviewScreen">
          <div className="scanResultCount">{results.length} medicines found</div>

          {results.map(item => (
            <div className={`scanResultCard${item.confidence < 0.7 && !item.edited ? ' lowConfidence' : ''}`} key={item.id}>
              <div className="scanCardTopRow">
                <div>
                  <span className="scanCardName">{item.name}</span>
                  {item.edited && <span className="scanCardEditedTag">Edited</span>}
                </div>
                <div className="scanCardActions">
                  <button className="scanCardEditBtn" onClick={() => handleEditStart(item)} aria-label="Edit"><i className="ri-pencil-line"></i></button>
                  <button className="scanCardRemoveBtn" onClick={() => handleRemove(item.id)} aria-label="Remove"><i className="ri-delete-bin-line"></i></button>
                </div>
              </div>
              <div className="scanCardDetails">
                <span className="scanCardDetail">{item.strength}mg</span>
                <span className="scanCardDetail">·</span>
                <span className="scanCardDetail">{item.unit}</span>
                {item.frequency && (
                  <>
                    <span className="scanCardDetail">·</span>
                    <span className="scanCardDetail">{item.frequency}x/day</span>
                  </>
                )}
              </div>
              {item.confidence < 0.7 && !item.edited && (
                <div className="scanCardWarning"><i className="ri-error-warning-fill"></i> Low confidence — please verify</div>
              )}

              {/* Edit form */}
              {editingId === item.id && (
                <div className="scanEditForm">
                  <div className="scanEditRow">
                    <input
                      className="scanEditInput"
                      placeholder="Medicine name"
                      value={editForm.name}
                      onChange={e => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="scanEditRow">
                    <input
                      className="scanEditInput"
                      placeholder="Strength"
                      type="number"
                      value={editForm.strength}
                      onChange={e => setEditForm(prev => ({ ...prev, strength: e.target.value }))}
                    />
                    <input
                      className="scanEditInput"
                      placeholder="Unit"
                      value={editForm.unit}
                      onChange={e => setEditForm(prev => ({ ...prev, unit: e.target.value }))}
                    />
                  </div>
                  <div className="scanEditActions">
                    <button className="scanEditCancelBtn" onClick={() => setEditingId(null)}>Cancel</button>
                    <button className="scanEditSaveBtn" onClick={() => handleEditSave(item.id)}>Save</button>
                  </div>
                </div>
              )}
            </div>
          ))}

          <button className="scanAddManualLink" onClick={() => setActiveScreen('addManual')}>
            + Add medicine manually
          </button>

          {results.length > 0 && (
            <div style={{ padding: '16px 0 24px', position: 'sticky', bottom: 0, background: 'var(--color-canvas)' }}>
              <button
                className="scanConfirmBtn"
                onClick={handleProceedToConfirm}
                disabled={hasLowConfidence}
                style={hasLowConfidence ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                id="proceed-to-confirm"
              >
                {hasLowConfidence ? 'Review highlighted fields first' : `Confirm ${results.length} Medicines`}
              </button>
            </div>
          )}

          {results.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px 24px' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}><i className="ri-clipboard-line"></i></div>
              <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-ink)', marginBottom: 8 }}>You removed all medicines</div>
              <div style={{ fontSize: 14, color: 'var(--color-mute)', marginBottom: 24 }}>Add at least one to continue</div>
              <button className="scanAddManualLink" onClick={() => setActiveScreen('addManual')}>
                Add Manually
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Confirm phase
  if (phase === 'confirm') {
    return (
      <div className="scanScreen" id="scan-confirm-screen">
        <div style={{ borderBottom: '1px solid var(--color-hairline)', padding: '16px', position: 'sticky', top: 0, background: 'var(--color-canvas)', zIndex: 10, display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-surface-card)', borderRadius: '9999px', fontSize: 18, cursor: 'pointer', border: 'none' }} onClick={() => setPhase('review')} aria-label="Go back">
            <i className="ri-arrow-left-line"></i>
          </button>
          <span style={{ fontSize: 18, fontWeight: 600, color: 'var(--color-ink)' }}>Confirm</span>
        </div>
        <div className="scanConfirmScreen">
          <div className="scanConfirmTitle">Almost done!</div>
          <div className="scanConfirmCount">{results.length} medicines will be added</div>

          <div className="scanConfirmList">
            {results.map(item => (
              <div className="scanConfirmItem" key={item.id}>
                <span className="scanConfirmIcon"><i className="ri-capsule-fill"></i></span>
                <div className="scanConfirmItemInfo">
                  <div className="scanConfirmItemName">{item.name}</div>
                  <div className="scanConfirmItemDetail">{item.strength}mg · {item.unit} · {item.frequency}x/day</div>
                </div>
              </div>
            ))}
          </div>

          <button className="scanConfirmBtn" onClick={handleConfirmAll} id="confirm-all-btn">
            Confirm & Add All
          </button>
          <button className="scanGoBackBtn" onClick={() => setPhase('review')}>
            Go Back
          </button>
        </div>

        {showToast && (
          <div className="scanToast">
            <i className="ri-check-line"></i> {results.length} medicines added successfully
          </div>
        )}
      </div>
    );
  }

  return null;
}
