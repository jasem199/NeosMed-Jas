import './AdherenceRing.css';

export default function AdherenceRing({ percentage, missedDoses }) {
  const radius = 80;
  const strokeWidth = 16;
  const normalizedRadius = radius - strokeWidth * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  let colorClass = 'ring-good';
  if (percentage < 50) colorClass = 'ring-bad';
  else if (percentage < 80) colorClass = 'ring-warn';

  return (
    <div className="adherenceRing-container">
      <div className="adherenceRing-svgWrapper">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="adherenceRing-svg"
        >
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="ringGradientGood" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            <linearGradient id="ringGradientWarn" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
            <linearGradient id="ringGradientBad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-error)" />
              <stop offset="100%" stopColor="var(--color-error-deep)" />
            </linearGradient>
          </defs>
          {/* Background Ring */}
          <circle
            className="adherenceRing-bg"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Progress Ring */}
          <circle
            className={`adherenceRing-circle ${colorClass}`}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div className="adherenceRing-text">
          <span className="adherenceRing-percent">{Math.round(percentage)}%</span>
          <span className="adherenceRing-label">adherence</span>
        </div>
      </div>
      
      <div className="adherenceRing-info">
        <h3 className="adherenceRing-title">Weekly Adherence</h3>
        <p className="adherenceRing-desc">
          You took <strong>{Math.round(percentage)}%</strong> of your scheduled medicines this week.
        </p>
        {missedDoses > 0 && (
          <p className="adherenceRing-alert">
            <i className="ri-error-warning-fill"></i> {missedDoses} missed dose{missedDoses > 1 ? 's' : ''}
          </p>
        )}
      </div>
    </div>
  );
}
