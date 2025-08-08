import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import LandingPage from './components/LandingPage';
import ManualCounter from './components/ManualCounter';
import AutomaticCounter from './components/AutomaticCounter';
import Results from './components/Results';

export type Mode = 'landing' | 'manual' | 'automatic' | 'results';

export interface Player {
  id: string;
  name: string;
  falls: number;
  lastFallTime?: Date;
}

export interface FallData {
  players: Player[];
  matchDuration: number;
  totalFalls: number;
}

function App() {
  const [currentMode, setCurrentMode] = useState<Mode>('landing');
  const [fallData, setFallData] = useState<FallData>({
    players: [],
    matchDuration: 0,
    totalFalls: 0
  });

  const handleModeChange = (mode: Mode) => {
    setCurrentMode(mode);
  };

  const handleDataUpdate = (data: FallData) => {
    setFallData(data);
  };

  const renderCurrentMode = () => {
    switch (currentMode) {
      case 'manual':
        return (
          <ManualCounter
            onBack={() => handleModeChange('landing')}
            onComplete={(data) => {
              handleDataUpdate(data);
              handleModeChange('results');
            }}
          />
        );
      case 'automatic':
        return (
          <AutomaticCounter
            onBack={() => handleModeChange('landing')}
            onComplete={(data) => {
              handleDataUpdate(data);
              handleModeChange('results');
            }}
          />
        );
      case 'results':
        return (
          <Results
            data={fallData}
            onNewSession={() => handleModeChange('landing')}
          />
        );
      default:
        return <LandingPage onModeSelect={handleModeChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => handleModeChange('landing')}
            >
              <Activity className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">FootSlip</h1>
            </div>
            <div className="text-sm text-gray-600">
              Football Fall Counter
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {renderCurrentMode()}
      </main>
    </div>
  );
}

export default App;