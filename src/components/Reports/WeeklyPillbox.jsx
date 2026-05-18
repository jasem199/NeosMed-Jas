import './WeeklyPillbox.css';

export default function WeeklyPillbox({ weeklyData }) {
  // weeklyData is an array of 7 objects: { date: Date, status: 'all_taken' | 'missed' | 'none_scheduled' | 'future' }
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="weeklyPillbox-container">
      <h3 className="weeklyPillbox-title">This Week's Pillbox</h3>
      
      <div className="weeklyPillbox-grid">
        {weeklyData.map((dayData, index) => {
          const dayName = days[dayData.date.getDay()];
          const isToday = new Date().toDateString() === dayData.date.toDateString();
          
          let icon;
          let boxClass = '';
          
          if (dayData.status === 'all_taken') {
            icon = <i className="ri-check-line"></i>;
            boxClass = 'status-taken';
          } else if (dayData.status === 'missed') {
            icon = <i className="ri-close-line"></i>;
            boxClass = 'status-missed';
          } else {
            icon = <i className="ri-capsule-line pillbox-emptyIcon"></i>;
            boxClass = 'status-empty';
          }

          return (
            <div key={index} className={`weeklyPillbox-day ${isToday ? 'is-today' : ''}`}>
              <div className="weeklyPillbox-dayLabel">{dayName}</div>
              <div className={`weeklyPillbox-box ${boxClass}`}>
                {icon}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
