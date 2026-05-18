import { AppProvider, useApp } from './context/AppContext';
import TopBar from './components/TopBar/TopBar';
import BottomNav from './components/BottomNav/BottomNav';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import AddManualScreen from './screens/AddManualScreen/AddManualScreen';
import ScanScreen from './screens/ScanScreen/ScanScreen';
import FamilyScreen from './screens/FamilyScreen/FamilyScreen';
import StockScreen from './screens/StockScreen/StockScreen';
import ReportsScreen from './screens/ReportsScreen/ReportsScreen';

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
      {activeTab === 'family' ? <FamilyScreen /> 
        : activeTab === 'stock' ? <StockScreen /> 
        : activeTab === 'reports' ? <ReportsScreen /> 
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
