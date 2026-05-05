import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import BottomSheet from '../BottomSheet/BottomSheet';
import './DatePicker.css';

const DAY_NAMES_SHORT = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const DAY_NAMES_FULL = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function getSaturdayBasedDay(date) {
  // Shift so Saturday = 0
  return (date.getDay() + 1) % 7;
}

export default function DatePicker() {
  const { selectedDate, setSelectedDate, isToday, isFuture } = useApp();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date(selectedDate));
  const [hasScrolled, setHasScrolled] = useState(false);
  const stripRef = useRef(null);
  const selectedRef = useRef(null);

  // Generate date range: 100 days back to 100 days forward
  const dateRange = useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = -100; i <= 100; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      d.setHours(0, 0, 0, 0);
      dates.push(d);
    }
    return dates;
  }, []);

  const isInitialRender = useRef(true);

  // Scroll to selected date
  useEffect(() => {
    const performScroll = (behavior = 'smooth') => {
      if (selectedRef.current && stripRef.current) {
        const container = stripRef.current;
        const el = selectedRef.current;
        const scrollLeft = el.offsetLeft - container.offsetWidth / 2 + el.offsetWidth / 2;
        container.scrollTo({ left: scrollLeft, behavior });
      }
    };

    if (isInitialRender.current) {
      performScroll('auto');
      // small timeout to ensure it centers after layout shifts
      setTimeout(() => performScroll('auto'), 50);
      isInitialRender.current = false;
    } else {
      // Small delay to ensure the ref is updated to the newly rendered date item
      const timer = setTimeout(() => performScroll('smooth'), 10);
      return () => clearTimeout(timer);
    }
  }, [selectedDate]);

  const handleDateSelect = useCallback((date) => {
    setSelectedDate(date);
  }, [setSelectedDate]);

  const handleTodaySnap = useCallback(() => {
    setSelectedDate(new Date());
  }, [setSelectedDate]);

  const isSameDay = (a, b) => {
    return a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();
  };

  // Format the date text line
  const formatDateText = () => {
    const d = selectedDate;
    const dayIndex = getSaturdayBasedDay(d);
    const dayName = DAY_NAMES_FULL[dayIndex];
    const monthName = MONTH_NAMES[d.getMonth()];
    if (isToday()) {
      return `Today, ${dayName} ${d.getDate()} ${monthName}`;
    }
    return `${dayName}, ${d.getDate()} ${monthName}`;
  };

  // Calendar helpers
  const calendarDays = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startOffset = getSaturdayBasedDay(firstDay);
    
    const days = [];
    // Pad start
    for (let i = startOffset - 1; i >= 0; i--) {
      const d = new Date(year, month, -i);
      days.push({ date: d, otherMonth: true });
    }
    // Current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const d = new Date(year, month, i);
      days.push({ date: d, otherMonth: false });
    }
    // Pad end
    const remaining = 7 - (days.length % 7);
    if (remaining < 7) {
      for (let i = 1; i <= remaining; i++) {
        const d = new Date(year, month + 1, i);
        days.push({ date: d, otherMonth: true });
      }
    }
    return days;
  }, [calendarMonth]);

  const handleCalendarSelect = (date) => {
    setSelectedDate(date);
    setCalendarOpen(false);
  };

  const handleOpenCalendar = () => {
    setCalendarMonth(new Date(selectedDate));
    setCalendarOpen(true);
  };

  return (
    <section className="datePickerSection" id="date-picker">
      {/* Date Strip Container */}
      <div className="dateStripContainer">
        {(!isToday()) && (
          <div className="calendarFixedWrapper">
            <button className="calendarIconBtn" onClick={handleOpenCalendar} aria-label="Open calendar" id="calendar-icon">
              <i className="ri-calendar-event-line"></i>
            </button>
          </div>
        )}
        <div className="dateStrip" ref={stripRef}>
          {dateRange.map((date, i) => {
          const dayIndex = getSaturdayBasedDay(date);
          const selected = isSameDay(date, selectedDate);
          const todayClass = isToday(date) ? ' today' : '';
          const selectedClass = selected ? ' selected' : '';
          return (
            <button
              key={i}
              ref={selected ? selectedRef : null}
              className={`dateItem${selectedClass}${todayClass}`}
              onClick={() => handleDateSelect(date)}
              aria-label={`${DAY_NAMES_FULL[dayIndex]} ${date.getDate()} ${MONTH_NAMES[date.getMonth()]}`}
              aria-pressed={selected}
            >
              <span className="dateItemDay">{DAY_NAMES_SHORT[dayIndex]}</span>
              <span className="dateItemNumber">{date.getDate()}</span>
            </button>
          );
        })}
        </div>
      </div>

      {/* Date Text Line */}
      <div className="dateTextLine">
        <span className="dateTextLabel">{formatDateText()}</span>
        {!isToday() && (
          <button className="todaySnapBtn" onClick={handleTodaySnap} id="today-snap-btn">
            {selectedDate > new Date() ? <><i className="ri-arrow-left-s-line"></i> Today</> : <>Today <i className="ri-arrow-right-s-line"></i></>}
          </button>
        )}
      </div>

      {/* Calendar Bottom Sheet */}
      <BottomSheet isOpen={calendarOpen} onClose={() => setCalendarOpen(false)} title="">
        <div className="calendarSheet">
          <div className="calendarHeader">
            <button className="calendarNavBtn" onClick={() => setCalendarMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))} aria-label="Previous month">
              <i className="ri-arrow-left-s-line"></i>
            </button>
            <span className="calendarMonthLabel">
              {MONTH_NAMES[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}
            </span>
            <button className="calendarNavBtn" onClick={() => setCalendarMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))} aria-label="Next month">
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </div>
          <div className="calendarWeekHeader">
            {DAY_NAMES_SHORT.map((d) => (
              <span key={d} className="calendarWeekDay">{d}</span>
            ))}
          </div>
          <div className="calendarGrid">
            {calendarDays.map(({ date, otherMonth }, i) => {
              const todayClass = isToday(date) ? ' today' : '';
              const selectedClass = isSameDay(date, selectedDate) ? ' selected' : '';
              const otherMonthClass = otherMonth ? ' otherMonth' : '';
              return (
                <button
                  key={i}
                  className={`calendarDay${selectedClass}${todayClass}${otherMonthClass}`}
                  onClick={() => handleCalendarSelect(date)}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      </BottomSheet>
    </section>
  );
}
