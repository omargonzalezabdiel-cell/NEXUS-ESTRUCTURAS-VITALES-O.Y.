import { useState, useEffect } from 'react';
import ModeSelector from './pages/ModeSelector';
import ClientMode from './pages/ClientMode';
import Reseller from './pages/Reseller';
import ResellerRegistration from './pages/ResellerRegistration';
import { ResellerData } from './pages/ResellerRegistration';

function App() {
  const [mode, setMode] = useState<'selector' | 'client' | 'reseller' | 'register'>('selector');
  const [resellerData, setResellerData] = useState<ResellerData | null>(null);

  useEffect(() => {
    document.title = 'Vuelo Urbano - Tienda de Moda Urbana';
  }, []);

  const handleRegisterReseller = (data: ResellerData) => {
    setResellerData(data);
    localStorage.setItem('resellerData', JSON.stringify(data));
    setMode('reseller');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {mode === 'selector' && <ModeSelector onSelect={setMode} />}
      {mode === 'client' && <ClientMode onBack={() => setMode('selector')} />}
      {mode === 'register' && <ResellerRegistration onBack={() => setMode('selector')} onComplete={handleRegisterReseller} />}
      {mode === 'reseller' && <Reseller onBack={() => setMode('selector')} />}
    </div>
  );
}

export default App;
