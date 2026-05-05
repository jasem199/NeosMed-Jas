import { AppProvider, useApp } from './context/AppContext';
import TopBar from './components/TopBar/TopBar';
import BottomNav from './components/BottomNav/BottomNav';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import AddManualScreen from './screens/AddManualScreen/AddManualScreen';
import ScanScreen from './screens/ScanScreen/ScanScreen';

function AppContent() {
  const { activeScreen } = useApp();

  if (activeScreen === 'addManual') {
    return <AddManualScreen />;
  }

  if (activeScreen === 'scanPrescription') {
    return <ScanScreen />;
  }

  return (
    <>
      <TopBar />
      <HomeScreen />
      <BottomNav />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
