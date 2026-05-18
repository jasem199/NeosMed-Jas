import './StockActionSheet.css';

export default function StockActionSheet({ isOpen, onClose, medicine, onRefill, onArchive, onDelete, onEdit }) {
  if (!isOpen || !medicine) return null;

  return (
    <>
      <div className="actionSheet-overlay" onClick={onClose}></div>
      <div className="actionSheet-container">
        <div className="actionSheet-header">
          <div className="actionSheet-dragHandle"></div>
          <h2 className="actionSheet-title">Options for {medicine.name}</h2>
          <button className="actionSheet-closeBtn" onClick={onClose} aria-label="Close">
            <i className="ri-close-line"></i>
          </button>
        </div>
        
        <div className="actionSheet-content">
          {medicine.status === 'active' && (
            <button className="actionSheet-option" onClick={() => { onRefill(medicine); onClose(); }}>
              <div className="actionSheet-optionIconBox"><i className="ri-add-box-line"></i></div>
              <div className="actionSheet-optionText">Refill Medicine</div>
            </button>
          )}

          <button className="actionSheet-option" onClick={() => { onEdit(medicine); onClose(); }}>
            <div className="actionSheet-optionIconBox"><i className="ri-edit-line"></i></div>
            <div className="actionSheet-optionText">Edit Details</div>
          </button>
          
          <button className="actionSheet-option" onClick={() => { onArchive(medicine.id); onClose(); }}>
            <div className="actionSheet-optionIconBox"><i className="ri-archive-line"></i></div>
            <div className="actionSheet-optionText">
              {medicine.status === 'past' ? 'Restore to Active' : 'Archive Medicine'}
            </div>
          </button>
          
          <div className="actionSheet-divider"></div>
          
          <button className="actionSheet-option danger" onClick={() => { onDelete(medicine); onClose(); }}>
            <div className="actionSheet-optionIconBox"><i className="ri-delete-bin-line"></i></div>
            <div className="actionSheet-optionText">Delete Medicine</div>
          </button>
        </div>
      </div>
    </>
  );
}
