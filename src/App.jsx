import { SharedStateProvider } from './context/SharedStateProvider.jsx';
import AppContent from './components/Content.jsx';

function App() {
  return (
    <SharedStateProvider>
      <AppContent />
    </SharedStateProvider>
  );
}

export default App;
