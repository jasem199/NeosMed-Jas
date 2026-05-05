import { useState, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { TIME_CATEGORIES } from '../../data/mockData';
import DatePicker from '../../components/DatePicker/DatePicker';
import MedicineCard from '../../components/MedicineCard/MedicineCard';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import './HomeScreen.css';

function format12Hour(time24) {
  if (!time24) return '';
  const [hourStr, minStr] = time24.split(':');
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  if (hour === 0) hour = 12;
  const formattedHour = hour < 10 ? `0${hour}` : hour;
  return `${formattedHour}:${minStr} ${ampm}`;
}

export default function HomeScreen() {
  const {
    medicines,
    getMedicinesByCategory,
    getTakenCount,
    getTotalScheduled,
    getLowStockMedicines,
    isMedTaken,
    isMedSkipped,
    markTaken,
    markSkipped,
    isToday,
    isPast,
    isFuture,
    setActiveScreen,
  } = useApp();

  const [detailMed, setDetailMed] = useState(null);
  const [detailMedTime, setDetailMedTime] = useState(null);
  const [addSheetOpen, setAddSheetOpen] = useState(false);
  const [skipConfirm, setSkipConfirm] = useState(false);
  const [lowStockDismissed, setLowStockDismissed] = useState(false);

  const takenCount = getTakenCount();
  const totalScheduled = getTotalScheduled();
  const lowStockMeds = getLowStockMedicines();
  const progressPercent = totalScheduled > 0 ? Math.round((takenCount / totalScheduled) * 100) : 0;
  const allDone = takenCount === totalScheduled && totalScheduled > 0 && isToday();
  const noMedicines = medicines.length === 0;

  const handleCardTap = useCallback((med, time) => {
    if (isPast()) return;
    setDetailMed(med);
    setDetailMedTime(time);
    setSkipConfirm(false);
  }, [isPast]);

  const handleMarkTaken = () => {
    if (detailMed && detailMedTime) {
      markTaken(detailMed.id, detailMedTime);
      setDetailMed(null);
      setDetailMedTime(null);
    }
  };

  const handleSkip = () => {
    if (!skipConfirm) {
      setSkipConfirm(true);
      return;
    }
    if (detailMed && detailMedTime) {
      markSkipped(detailMed.id, detailMedTime);
      setDetailMed(null);
      setDetailMedTime(null);
      setSkipConfirm(false);
    }
  };

  const handleCheckAll = (timeStr) => {
    medicines.forEach(m => {
      const times = m.times || ['08:00'];
      if (times.includes(timeStr)) {
        if (!isMedTaken(m.id, timeStr) && !isMedSkipped(m.id, timeStr)) {
          markTaken(m.id, timeStr);
        }
      }
    });
  };

  // Generate flat schedule and group by time
  const schedule = [];
  medicines.forEach(med => {
    const times = med.times || ['08:00'];
    times.forEach(t => {
      schedule.push({ medicine: med, time: t });
    });
  });

  const MEAL_PRIORITY = {
    'Before meal': 0,
    'With meal': 1,
    'After meal': 2,
    'No preference': 3
  };

  schedule.sort((a, b) => {
    const timeDiff = a.time.localeCompare(b.time);
    if (timeDiff !== 0) return timeDiff;
    
    const pA = MEAL_PRIORITY[a.medicine.intakeAdvice] ?? 4;
    const pB = MEAL_PRIORITY[b.medicine.intakeAdvice] ?? 4;
    return pA - pB;
  });

  const activeByTime = {};
  const takenMeds = [];

  schedule.forEach(item => {
    const taken = isMedTaken(item.medicine.id, item.time);
    const skipped = isMedSkipped(item.medicine.id, item.time);
    if (taken || skipped) {
      if (taken) takenMeds.push(item);
    } else {
      if (!activeByTime[item.time]) activeByTime[item.time] = [];
      activeByTime[item.time].push(item);
    }
  });

  const activeTimeKeys = Object.keys(activeByTime);

  return (
    <div className="homeScreen" id="home-screen">
      <DatePicker />

      {/* Progress Bar */}
      {!noMedicines && (
        <div className="progressSection">
          <div className="progressBar">
            <div className="progressFill" style={{ width: `${progressPercent}%` }} />
          </div>
          <div className="progressLabel">
            <span className="progressCount">{takenCount}</span> of {totalScheduled} medicines taken today
          </div>
        </div>
      )}

      {/* Low Stock Banner */}
      {lowStockMeds.length > 0 && !lowStockDismissed && (
        <div className="lowStockBanner" id="low-stock-banner">
          <span className="lowStockIcon">⚠️</span>
          <div className="lowStockInfo">
            <div className="lowStockTitle">{lowStockMeds[0].name} is running low</div>
            <div className="lowStockDetail">Only {lowStockMeds[0].stock} {lowStockMeds[0].unit.toLowerCase()} left</div>
          </div>
          <button className="lowStockDismiss" onClick={() => setLowStockDismissed(true)} aria-label="Dismiss">✕</button>
        </div>
      )}

      {/* Past Date Notice */}
      {isPast() && <div className="pastDateNotice">You are viewing a past date</div>}

      {/* Empty State */}
      {noMedicines && (
        <div className="emptyState" id="empty-state">
          <div className="emptyStateIcon">💊</div>
          <div className="emptyStateTitle">No medicines added yet</div>
          <div className="emptyStateSubtext">Add your first medicine to start tracking</div>
          <button className="emptyStateCta" onClick={() => setAddSheetOpen(true)}>
            Add your first medicine
          </button>
        </div>
      )}

      {/* All Done State */}
      {allDone && (
        <div className="allDoneState" id="all-done-state">
          <div className="allDoneIcon">🎉</div>
          <div className="allDoneTitle">All done for today!</div>
          <div className="allDoneSubtext">Great job 💪</div>
        </div>
      )}

      {/* Medicine Groups by Exact Time */}
      {!noMedicines && !allDone && activeTimeKeys.map(timeStr => {
        const meds = activeByTime[timeStr];
        return (
          <section className="timeCategorySection" key={timeStr} id={`section-${timeStr.replace(':','')}`}>
            <div className="timeCategoryHeader">
              <div className="timeCategoryLabel">
                <span className="timeCategoryIcon">⏰</span>
                {format12Hour(timeStr)}
              </div>
              {isToday() && (
                <button className="checkAllBtn" onClick={() => handleCheckAll(timeStr)}>
                  Check All
                </button>
              )}
            </div>
            <div className="timeCategoryCards">
              {meds.map(({ medicine }) => (
                <MedicineCard
                  key={`${medicine.id}-${timeStr}`}
                  medicine={medicine}
                  time={timeStr}
                  onCardTap={handleCardTap}
                  disabled={isPast()}
                />
              ))}
            </div>
          </section>
        );
      })}

      {/* Taken Section */}
      {takenMeds.length > 0 && (
        <div className="statusSection" id="taken-section">
          <div className="statusSectionHeader">
            <span className="statusDot taken" />
            <span className="statusSectionTitle">Taken ({takenMeds.length})</span>
          </div>
          <div className="statusCards">
            {takenMeds.map(({ medicine, time }, idx) => (
              <MedicineCard key={`${medicine.id}-${time}-${idx}`} medicine={medicine} time={time} disabled />
            ))}
          </div>
        </div>
      )}

      {/* FAB */}
      <button className="fab" onClick={() => setAddSheetOpen(true)} aria-label="Add medicine" id="fab-add">
        +
      </button>

      {/* Add Medicine Bottom Sheet */}
      <BottomSheet isOpen={addSheetOpen} onClose={() => setAddSheetOpen(false)} title="Add Medicine">
        <div className="addOptionsList">
          <button className="addOptionItem" onClick={() => { setAddSheetOpen(false); setActiveScreen('addManual'); }} id="add-manually-option">
            <div className="addOptionIcon">💊</div>
            <div className="addOptionInfo">
              <div className="addOptionTitle">Add Manually</div>
              <div className="addOptionDesc">Enter medicine details step by step</div>
            </div>
            <span className="addOptionArrow">›</span>
          </button>
          <button className="addOptionItem" onClick={() => { setAddSheetOpen(false); setActiveScreen('scanPrescription'); }} id="scan-prescription-option">
            <div className="addOptionIcon">📷</div>
            <div className="addOptionInfo">
              <div className="addOptionTitle">Scan Prescription</div>
              <div className="addOptionDesc">Take a photo or choose from gallery</div>
            </div>
            <span className="addOptionArrow">›</span>
          </button>
        </div>
      </BottomSheet>

      {/* Medicine Detail Bottom Sheet */}
      <BottomSheet isOpen={!!detailMed} onClose={() => { setDetailMed(null); setDetailMedTime(null); }} title="">
        {detailMed && (
          <>
            <div className="medDetailHeader">
              <div className="medDetailName">{detailMed.name}</div>
              <div className="medDetailDosage">{detailMed.strength} {detailMed.unit} · {detailMed.intakeAdvice}</div>
            </div>
            <div className="medDetailActions">
              <button className="medDetailPrimaryBtn" onClick={handleMarkTaken} id="mark-taken-btn">
                Mark as Taken
              </button>
              <div>
                <div className="snoozeLabel">Snooze</div>
                <div className="snoozeChips">
                  <button className="snoozeChip">15 min</button>
                  <button className="snoozeChip">30 min</button>
                  <button className="snoozeChip">1 hour</button>
                </div>
              </div>
              <button className="skipBtn" onClick={handleSkip}>
                {skipConfirm ? 'Are you sure? Tap again to skip' : 'Skip this dose'}
              </button>
              <button className="viewDetailsLink">View Medicine Details</button>
            </div>
          </>
        )}
      </BottomSheet>
    </div>
  );
}
