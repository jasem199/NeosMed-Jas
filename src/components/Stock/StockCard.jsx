import './StockCard.css';

export default function StockCard({ med, onEdit }) {
  const getStatusClass = () => {
    if (med.stock === 0) return 'status-empty';
    if (med.stock <= med.lowStockThreshold) return 'status-low';
    return 'status-good';
  };

  const calculateDaysRemaining = () => {
    if (!med.stock || !med.frequency) return 'Unknown days';
    const days = Math.floor(med.stock / med.frequency);
    if (days === 0) return '< 1 day remaining';
    return `~${days} day${days > 1 ? 's' : ''} remaining`;
  };

  return (
    <div className="stockCard">
      <div className="stockCard-content">
        <div className="stockCard-header">
          <h3 className="stockCard-title">
            <span className="stockCard-name">{med.name}</span>
            {med.strength && <span className="stockCard-strength"> | {med.strength}mg</span>}
          </h3>
          <button className="stockCard-menuBtn" onClick={() => onEdit?.(med)} aria-label="Edit options">
            <i className="ri-more-2-fill"></i>
          </button>
        </div>
        
        <div className="stockCard-stockInfo">
          <div className="stockCard-stockCount">
            <span className="stockCard-countValue">{med.stock || 0}</span>
            <span className="stockCard-countUnit">{med.unit?.toLowerCase() || 'units'} left</span>
          </div>
          
          <div className="stockCard-statusArea">
            <span className={`stockCard-statusBadge ${getStatusClass()}`}></span>
            <span className="stockCard-daysRemaining">{calculateDaysRemaining()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
