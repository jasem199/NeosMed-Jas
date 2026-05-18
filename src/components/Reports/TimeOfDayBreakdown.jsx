import './TimeOfDayBreakdown.css';

export default function TimeOfDayBreakdown({ timeData }) {
  const times = [
    { key: 'Morning', icon: 'ri-sun-line', label: 'Morning', tint: 'tint-morning' },
    { key: 'Afternoon', icon: 'ri-sun-fog-line', label: 'Afternoon', tint: 'tint-afternoon' },
    { key: 'Evening', icon: 'ri-moon-line', label: 'Evening', tint: 'tint-evening' },
  ];

  return (
    <div className="timeBreakdown-container">
      <h3 className="timeBreakdown-title">Time of Day Adherence</h3>
      <div className="timeBreakdown-list">
        {times.map((t) => {
          const data = timeData[t.key] || { taken: 0, total: 0 };
          const percent = data.total === 0 ? 0 : Math.round((data.taken / data.total) * 100);
          
          let colorClass = 'progress-good';
          if (percent < 50) colorClass = 'progress-bad';
          else if (percent < 80) colorClass = 'progress-warn';
          
          if (data.total === 0) colorClass = 'progress-empty';

          return (
            <div key={t.key} className="timeBreakdown-item">
              <div className="timeBreakdown-header">
                <div className="timeBreakdown-label">
                  <span className={`timeBreakdown-iconCircle ${t.tint}`}>
                    <i className={t.icon}></i>
                  </span>
                  {t.label}
                </div>
                <div className={`timeBreakdown-percent ${colorClass}`}>
                  {data.total > 0 ? `${percent}%` : 'N/A'}
                </div>
              </div>
              <div className="timeBreakdown-barBg">
                <div 
                  className={`timeBreakdown-barFill ${colorClass}`} 
                  style={{ width: `${data.total === 0 ? 0 : percent}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
