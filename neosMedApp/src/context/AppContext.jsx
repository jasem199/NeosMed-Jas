import { createContext, useContext, useState, useCallback } from 'react';
import { MOCK_MEDICINES } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [medicines, setMedicines] = useState(MOCK_MEDICINES);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [takenMap, setTakenMap] = useState({});
  // takenMap shape: { 'YYYY-MM-DD': { 'med-id': { taken: bool, skipped: bool, snoozed: bool, time: string } } }
  const [activeScreen, setActiveScreen] = useState('home'); // home | addManual | scanPrescription | scanReview | scanConfirm
  const [activeTab, setActiveTab] = useState('medication');
  const [addStep, setAddStep] = useState(1);

  const getDateKey = useCallback((date) => {
    const d = date || selectedDate;
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }, [selectedDate]);

  const isToday = useCallback((date) => {
    const today = new Date();
    const d = date || selectedDate;
    return d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate();
  }, [selectedDate]);

  const isFuture = useCallback((date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const d = new Date(date || selectedDate);
    d.setHours(0, 0, 0, 0);
    return d > today;
  }, [selectedDate]);

  const isPast = useCallback((date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const d = new Date(date || selectedDate);
    d.setHours(0, 0, 0, 0);
    return d < today;
  }, [selectedDate]);

  const markTaken = useCallback((medId, time) => {
    const key = getDateKey();
    const mapKey = time ? `${medId}_${time}` : medId;
    setTakenMap(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [mapKey]: { taken: true, skipped: false, snoozed: false, timestamp: new Date().toISOString() }
      }
    }));
  }, [getDateKey]);

  const unmarkTaken = useCallback((medId, time) => {
    const key = getDateKey();
    const mapKey = time ? `${medId}_${time}` : medId;
    setTakenMap(prev => {
      if (!prev[key] || !prev[key][mapKey]) return prev;
      const newDayMap = { ...prev[key] };
      delete newDayMap[mapKey];
      return {
        ...prev,
        [key]: newDayMap
      };
    });
  }, [getDateKey]);

  const markSkipped = useCallback((medId, time) => {
    const key = getDateKey();
    const mapKey = time ? `${medId}_${time}` : medId;
    setTakenMap(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [mapKey]: { taken: false, skipped: true, snoozed: false, timestamp: new Date().toISOString() }
      }
    }));
  }, [getDateKey]);

  const isMedTaken = useCallback((medId, time) => {
    const key = getDateKey();
    const mapKey = time ? `${medId}_${time}` : medId;
    return takenMap[key]?.[mapKey]?.taken || false;
  }, [getDateKey, takenMap]);

  const isMedSkipped = useCallback((medId, time) => {
    const key = getDateKey();
    const mapKey = time ? `${medId}_${time}` : medId;
    return takenMap[key]?.[mapKey]?.skipped || false;
  }, [getDateKey, takenMap]);

  const addMedicine = useCallback((med) => {
    const newMed = { ...med, id: `med-${Date.now()}` };
    setMedicines(prev => [...prev, newMed]);
    return newMed;
  }, []);

  const addMedicinesBulk = useCallback((meds) => {
    const newMeds = meds.map((med, i) => ({ ...med, id: `med-${Date.now()}-${i}` }));
    setMedicines(prev => [...prev, ...newMeds]);
    return newMeds;
  }, []);

  const getMedicinesByCategory = useCallback((category) => {
    return medicines.filter(m => m.timeCategories.includes(category));
  }, [medicines]);

  const getTakenCount = useCallback(() => {
    const key = getDateKey();
    const dayMap = takenMap[key] || {};
    return Object.values(dayMap).filter(v => v.taken).length;
  }, [getDateKey, takenMap]);

  const getTotalScheduled = useCallback(() => {
    return medicines.reduce((sum, m) => sum + (m.times ? m.times.length : 1), 0);
  }, [medicines]);

  const getLowStockMedicines = useCallback(() => {
    return medicines.filter(m => m.stock <= m.lowStockThreshold);
  }, [medicines]);

  const value = {
    medicines,
    selectedDate,
    setSelectedDate,
    takenMap,
    activeScreen,
    setActiveScreen,
    activeTab,
    setActiveTab,
    addStep,
    setAddStep,
    getDateKey,
    isToday,
    isFuture,
    isPast,
    markTaken,
    unmarkTaken,
    markSkipped,
    isMedTaken,
    isMedSkipped,
    addMedicine,
    addMedicinesBulk,
    getMedicinesByCategory,
    getTakenCount,
    getTotalScheduled,
    getLowStockMedicines,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
