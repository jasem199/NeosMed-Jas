import './ConfirmModal.css';

export default function ConfirmModal({ 
  isOpen, 
  title, 
  message, 
  confirmText = 'Confirm', 
  cancelText = 'Cancel', 
  onConfirm, 
  onCancel,
  isDestructive = false
}) {
  if (!isOpen) return null;

  return (
    <>
      <div className="confirmModal-overlay" onClick={onCancel}></div>
      <div className="confirmModal-container">
        <h3 className="confirmModal-title">{title}</h3>
        {message && <p className="confirmModal-message">{message}</p>}
        <div className="confirmModal-actions">
          <button className="confirmModal-cancelBtn" onClick={onCancel}>
            {cancelText}
          </button>
          <button 
            className={`confirmModal-confirmBtn ${isDestructive ? 'destructive' : ''}`} 
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </>
  );
}
