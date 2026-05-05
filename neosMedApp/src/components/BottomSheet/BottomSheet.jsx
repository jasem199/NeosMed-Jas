import { useState, useEffect, useCallback } from 'react';
import './BottomSheet.css';

export default function BottomSheet({ isOpen, onClose, title, children }) {
  const [closing, setClosing] = useState(false);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 250);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen && !closing) return null;

  return (
    <div className="bottomSheetOverlay" onClick={handleClose} role="dialog" aria-modal="true" aria-label={title}>
      <div
        className={`bottomSheetContainer${closing ? ' closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="bottomSheetHandle" />
        {title && <h2 className="bottomSheetTitle">{title}</h2>}
        {children}
      </div>
    </div>
  );
}
