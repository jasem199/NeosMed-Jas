import './StockCard.css';

export default function StockCard({ med, onEdit }) {
  const isPast = med.status === 'past';
  const isLowStock = med.stock <= med.lowStockThreshold;

  const calculateDaysRemaining = () => {
    if (!med.stock || !med.frequency) return null;
    const days = Math.floor(med.stock / med.frequency);
    if (days === 0) return '< 1 day remaining';
    return `~${days} day${days > 1 ? 's' : ''} remaining`;
  };

  const daysRemaining = calculateDaysRemaining();
  const daysValue = med.stock && med.frequency ? Math.floor(med.stock / med.frequency) : 999;
  const isLowDays = daysValue <= 3;

  const handleBuyClick = (e) => {
    e.stopPropagation();
    alert(`Redirecting to Metro Mart to purchase ${med.name}...`);
  };

  return (
    <div className={`stockCard ${isPast ? 'archived-card' : ''}`}>
      <div className="stockCard-content">
        {/* Row 1: Title & Options */}
        <div className="stockCard-row">
          <h3 className="stockCard-title">
            <span className="stockCard-name">{med.name}</span>
            {med.strength && <span className="stockCard-strength"> | {med.strength}</span>}
          </h3>
          <button className="stockCard-menuBtn" onClick={() => onEdit?.(med)} aria-label="Edit options">
            <i className="ri-more-2-fill"></i>
          </button>
        </div>

        {/* Row 2: Subtitle/Frequency & Status Badge */}
        <div className="stockCard-row stockCard-subRow">
          <span className="stockCard-takes">
            Takes x{med.frequency || 1} time{med.frequency > 1 ? 's' : ''}
          </span>
          {isPast ? (
            <span className="stockCard-badge archived">Archived</span>
          ) : (
            <span className="stockCard-badge active">Active</span>
          )}
        </div>

        {/* Row 3: Count & Days Remaining */}
        <div className="stockCard-row stockCard-infoRow">
          <div className="stockCard-count">
            <span className={`stockCard-countNum ${isLowStock && !isPast ? 'low-stock' : ''}`}>
              {med.stock || 0}
            </span>
            <span className="stockCard-countLabel"> {med.unit?.toLowerCase() || 'pills'} left</span>
          </div>
          
          {daysRemaining && (
            <span className={`stockCard-days ${isLowDays && !isPast ? 'low-days' : ''}`}>
              {daysRemaining}
            </span>
          )}
        </div>

        {/* Row 4: Conditional Metro Mart Action Button */}
        {isLowStock && !isPast && (
          <>
            <div className="stockCard-divider"></div>
            <button className="stockCard-buyBtn" onClick={handleBuyClick}>
              <span>Buy medicine from Metro Mart</span>
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
