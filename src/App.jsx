import { AppProvider, useApp } from './context/AppContext';
import TopBar from './components/TopBar/TopBar';
import BottomNav from './components/BottomNav/BottomNav';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import AddManualScreen from './screens/AddManualScreen/AddManualScreen';
import ScanScreen from './screens/ScanScreen/ScanScreen';
import CareScreen from './screens/CareScreen/CareScreen';
import FamilyScreen from './screens/FamilyScreen/FamilyScreen';
import StockScreen from './screens/StockScreen/StockScreen';
import ReportsScreen from './screens/ReportsScreen/ReportsScreen';
import AlertsScreen from './screens/AlertsScreen/AlertsScreen';

function AppContent() {
  const { activeScreen, activeTab } = useApp();

  if (activeScreen === 'addManual') {
    return <AddManualScreen />;
  }

  if (activeScreen === 'scanPrescription') {
    return <ScanScreen />;
  }

  return (
    <>
      <TopBar />
      {activeTab === 'care' ? <CareScreen />
        : activeTab === 'family' ? <FamilyScreen /> 
        : activeTab === 'medicine' ? <StockScreen /> 
        : activeTab === 'reports' ? <ReportsScreen /> 
        : activeTab === 'notifications' ? <AlertsScreen />
        : <HomeScreen />}
      <BottomNav />
    </>
  );
}

export default function App() {
  return (
    <div className="appWrapper">
      <AppProvider>
        <AppContent />
      </AppProvider>
    </div>
  );
}
