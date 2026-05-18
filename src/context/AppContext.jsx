import { createContext, useContext, useState, useCallback } from 'react';
import { MOCK_MEDICINES } from '../data/mockData';
import { MOCK_FAMILY_MEMBERS } from '../data/mockFamilyData';

const AppContext = createContext(null);

const generateMockTakenMap = () => {
  const map = {};
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    
    if (i === 6) {
      map[dateKey] = {
        'med-1_Morning': { taken: true, skipped: false, timestamp: new Date().toISOString() },
        'med-2_Evening': { taken: true, skipped: false, timestamp: new Date().toISOString() }
      };
    } else if (i === 5) {
      map[dateKey] = {
        'med-1_Morning': { taken: true, skipped: false, timestamp: new Date().toISOString() },
        'med-2_Evening': { taken: false, skipped: true, timestamp: new Date().toISOString() }
      };
    } else if (i === 4) {
      map[dateKey] = {
        'med-1_Morning': { taken: true, skipped: false, timestamp: new Date().toISOString() },
        'med-2_Evening': { taken: true, skipped: false, timestamp: new Date().toISOString() }
      };
    } else if (i === 3) {
      map[dateKey] = {
        'med-1_Morning': { taken: false, skipped: true, timestamp: new Date().toISOString() },
        'med-2_Evening': { taken: true, skipped: false, timestamp: new Date().toISOString() }
      };
    } else if (i === 2) {
      map[dateKey] = {
        'med-1_Morning': { taken: true, skipped: false, timestamp: new Date().toISOString() },
        'med-2_Evening': { taken: true, skipped: false, timestamp: new Date().toISOString() }
      };
    } else if (i === 1) {
      map[dateKey] = {
        'med-1_Morning': { taken: true, skipped: false, timestamp: new Date().toISOString() },
        'med-2_Evening': { taken: true, skipped: false, timestamp: new Date().toISOString() }
      };
    } else if (i === 0) {
      map[dateKey] = {
        'med-1_Morning': { taken: true, skipped: false, timestamp: new Date().toISOString() }
      };
    }
  }
  return map;
};

export function AppProvider({ children }) {
  const [medicines, setMedicines] = useState(MOCK_MEDICINES);
  const [familyMembers, setFamilyMembers] = useState(MOCK_FAMILY_MEMBERS);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [takenMap, setTakenMap] = useState(generateMockTakenMap());
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
    const newMed = { ...med, id: `med-${Date.now()}`, status: 'active' };
    setMedicines(prev => [...prev, newMed]);
    return newMed;
  }, []);

  const addMedicinesBulk = useCallback((meds) => {
    const newMeds = meds.map((med, i) => ({ ...med, id: `med-${Date.now()}-${i}`, status: 'active' }));
    setMedicines(prev => [...prev, ...newMeds]);
    return newMeds;
  }, []);

  const updateMedicine = useCallback((id, updates) => {
    setMedicines(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
  }, []);

  const deleteMedicine = useCallback((id) => {
    setMedicines(prev => prev.filter(m => m.id !== id));
  }, []);

  const refillMedicine = useCallback((id, amount) => {
    setMedicines(prev => prev.map(m => m.id === id ? { ...m, stock: (m.stock || 0) + parseInt(amount, 10) } : m));
  }, []);

  const archiveMedicine = useCallback((id) => {
    setMedicines(prev => prev.map(m => m.id === id ? { ...m, status: 'past' } : m));
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

  const addFamilyMember = useCallback((member) => {
    setFamilyMembers(prev => [...prev, { ...member, id: `fam-${Date.now()}` }]);
  }, []);

  const removeFamilyMember = useCallback((id) => {
    setFamilyMembers(prev => prev.filter(m => m.id !== id));
  }, []);

  const updateFamilyMemberPermissions = useCallback((id, permissions, notifications) => {
    setFamilyMembers(prev => prev.map(m => {
      if (m.id === id) {
        return { ...m, permissions: { ...m.permissions, ...permissions }, notifications: { ...m.notifications, ...notifications } };
      }
      return m;
    }));
  }, []);

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
    familyMembers,
    addFamilyMember,
    removeFamilyMember,
    updateFamilyMemberPermissions,
    updateMedicine,
    deleteMedicine,
    refillMedicine,
    archiveMedicine,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
