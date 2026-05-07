import { useState, useEffect } from 'react';
import ModeSelector from './pages/ModeSelector';
import ClientMode from './pages/ClientMode';
import Reseller from './pages/Reseller';

function App() {
  const [mode, setMode] = useState<'selector' | 'client' | 'reseller'>('selector');

  useEffect(() => {
    document.title = 'NEXUS - Sublimacion y DTF';
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {mode === 'selector' && <ModeSelector onSelect={setMode} />}
      {mode === 'client' && <ClientMode onBack={() => setMode('selector')} />}
      {mode === 'reseller' && <Reseller onBack={() => setMode('selector')} />}
    </div>
  );
}

export default App;
