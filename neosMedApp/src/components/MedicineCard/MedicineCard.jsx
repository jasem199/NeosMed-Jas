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
  const { isMedTaken, isMedSkipped, markTaken, unmarkTaken, isToday, isPast } = useApp();
  const taken = isMedTaken(medicine.id, time);
  const skipped = isMedSkipped(medicine.id, time);
  const isPastDate = isPast();

  const handleCheck = (e) => {
    e.stopPropagation();
    if (isPastDate) return;
    if (taken) {
      unmarkTaken(medicine.id, time);
    } else {
      if (disabled) return;
      markTaken(medicine.id, time);
    }
  };

  const cardClass = `medicineCard${taken ? ' taken' : ''}${skipped ? ' skipped' : ''}`;
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
        <div className="medCardName">{medicine.name} <span className="medCardStrength">| {medicine.strength}</span></div>
        <div className="medCardAdviceTag">{medicine.intakeAdvice}</div>
      </div>
      <button
        className={`medCardCheckBtn${taken ? ' checked' : ''}${isPastDate || (disabled && !taken) ? ' disabled' : ''}`}
        onClick={handleCheck}
        aria-label={taken ? `Unmark ${medicine.name} as taken` : `Mark ${medicine.name} as taken`}
        disabled={isPastDate || (disabled && !taken)}
      >
        {taken ? <i className="ri-check-line"></i> : ''}
      </button>
    </div>
  );
}
