import { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import AdherenceRing from '../../components/Reports/AdherenceRing';
import WeeklyPillbox from '../../components/Reports/WeeklyPillbox';
import TimeOfDayBreakdown from '../../components/Reports/TimeOfDayBreakdown';
import './ReportsScreen.css';

export default function ReportsScreen() {
  const { takenMap } = useApp();

  const { weeklyData, adherenceStats, timeData } = useMemo(() => {
    const data = [];
    let totalTaken = 0;
    let totalMissed = 0;
    
    const timeDataMap = {
      Morning: { taken: 0, total: 0 },
      Afternoon: { taken: 0, total: 0 },
      Evening: { taken: 0, total: 0 }
    };
    
    // Generate past 7 days ending today
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      
      const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      const dayRecords = takenMap[dateKey] || {};
      const actions = Object.values(dayRecords);
      
      let status = 'none_scheduled'; // Default
      
      if (actions.length > 0) {
        let dayTaken = 0;
        let daySkipped = 0;

        Object.keys(dayRecords).forEach(mapKey => {
          const action = dayRecords[mapKey];
          const timeCategory = mapKey.split('_')[1]; // e.g., 'Morning', 'Evening'
          
          if (timeCategory && timeDataMap[timeCategory]) {
            timeDataMap[timeCategory].total += 1;
            if (action.taken) timeDataMap[timeCategory].taken += 1;
          }

          if (action.taken) dayTaken += 1;
          if (action.skipped) daySkipped += 1;
        });
        
        totalTaken += dayTaken;
        totalMissed += daySkipped;
        
        if (daySkipped > 0) {
          status = 'missed';
        } else if (dayTaken > 0) {
          status = 'all_taken';
        }
      } else if (i === 0) {
        // Today with no actions yet
        status = 'future';
      }
      
      // If it's a past day with no actions, let's just mark it empty for now 
      // instead of assuming missed, unless we know they had a schedule.
      // For simplicity, we just leave it as 'none_scheduled' which shows a dot.

      data.push({
        date: d,
        status: status
      });
    }
    
    const totalActions = totalTaken + totalMissed;
    const percentage = totalActions === 0 ? 100 : (totalTaken / totalActions) * 100;
    
    return {
      weeklyData: data,
      adherenceStats: {
        percentage,
        missed: totalMissed
      },
      timeData: timeDataMap
    };
  }, [takenMap]);

  return (
    <div className="reportsScreen">
      <div className="reportsScreen-header">
        <h1 className="reportsScreen-title">My Reports</h1>
        <p className="reportsScreen-subtitle">Your medication habits this week</p>
      </div>

      <div className="reportsScreen-content">
        <div className="reportsScreen-section reportsScreen-stagger-1">
          <AdherenceRing 
            percentage={adherenceStats.percentage} 
            missedDoses={adherenceStats.missed} 
          />
        </div>
        
        <div className="reportsScreen-section reportsScreen-stagger-2">
          <TimeOfDayBreakdown timeData={timeData} />
        </div>
        
        <div className="reportsScreen-section reportsScreen-stagger-3">
          <WeeklyPillbox weeklyData={weeklyData} />
        </div>
      </div>
    </div>
  );
}
