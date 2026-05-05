import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import './MedicineCard.css';

const unitIcons = {
  Pills: <i className="ri-capsule-fill"></i>,
  Syrup: <i className="ri-flask-fill"></i>,
  Drop: <i className="ri-drop-fill"></i>,
  Puff: <i className="ri-mist-fill"></i>,
  Injection: <i className="ri-syringe-fill"></i>,
  Other: <i className="ri-medicine-bottle-fill"></i>,
};

export default function MedicineCard({ medicine, time, onCardTap, disabled = false }) {
  const { isMedTaken, isMedSkipped, markTaken, unmarkTaken, isPast } = useApp();
  const taken = isMedTaken(medicine.id, time);
  const skipped = isMedSkipped(medicine.id, time);
  const isPastDate = isPast();

  // Local state to hold the "taken" visual during animation
  const [isAnimating, setIsAnimating] = useState(false);

  // Sync animation state with actual taken state when it updates globally
  useEffect(() => {
    if (taken) {
      setIsAnimating(false);
    }
  }, [taken]);

  const handleCheck = (e) => {
    e.stopPropagation();
    if (isPastDate) return;
    
    if (taken) {
      unmarkTaken(medicine.id, time);
    } else {
      if (disabled || isAnimating) return;
      
      // Start local animation
      setIsAnimating(true);
      
      // Delay the global state update so the transition has time to play
      setTimeout(() => {
        markTaken(medicine.id, time);
      }, 500); 
    }
  };

  const isActuallyTaken = taken || isAnimating;
  const cardClass = `medicineCard${isActuallyTaken ? ' taken' : ''}${skipped ? ' skipped' : ''}`;
  const unitClass = medicine.unit.toLowerCase();

  return (
    <div
      className={cardClass}
      onClick={() => onCardTap && onCardTap(medicine, time)}
      role="button"
      tabIndex={0}
      aria-label={`${medicine.name} ${medicine.strength}`}
    >
      <div className={`medCardIcon ${unitClass}`}>
        {unitIcons[medicine.unit] || <i className="ri-medicine-bottle-fill"></i>}
      </div>
      <div className="medCardInfo">
        <div className="medCardName">
          <span className="medCardNameText">{medicine.name}</span>
          <span className="medCardStrength"> | {medicine.strength}</span>
        </div>
        <div className="medCardAdviceTag">{medicine.intakeAdvice}</div>
      </div>
      <button
        className={`medCardCheckBtn${isActuallyTaken ? ' checked' : ''}${isPastDate || (disabled && !isActuallyTaken) ? ' disabled' : ''}`}
        onClick={handleCheck}
        aria-label={isActuallyTaken ? `Unmark ${medicine.name} as taken` : `Mark ${medicine.name} as taken`}
        disabled={isPastDate || (disabled && !isActuallyTaken)}
      >
        {isActuallyTaken ? <i className="ri-check-line"></i> : <span className="medCardCheckPlaceholder" />}
      </button>
    </div>
  );
}
