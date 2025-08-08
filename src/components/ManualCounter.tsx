import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Minus, Play, Pause, RotateCcw, User, Clock } from 'lucide-react';
import type { Player, FallData } from '../App';

interface ManualCounterProps {
  onBack: () => void;
  onComplete: (data: FallData) => void;
}

const ManualCounter: React.FC<ManualCounterProps> = ({ onBack, onComplete }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [isMatchActive, setIsMatchActive] = useState(false);
  const [matchTime, setMatchTime] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isMatchActive && startTime) {
      interval = setInterval(() => {
        setMatchTime(Math.floor((Date.now() - startTime.getTime()) / 1000));
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMatchActive, startTime]);

  const addPlayer = () => {
    if (newPlayerName.trim()) {
      const newPlayer: Player = {
        id: Date.now().toString(),
        name: newPlayerName.trim(),
        falls: 0
      };
      setPlayers([...players, newPlayer]);
      setNewPlayerName('');
    }
  };

  const removePlayer = (id: string) => {
    setPlayers(players.filter(p => p.id !== id));
  };

  const updateFalls = (id: string, change: number) => {
    setPlayers(players.map(player => 
      player.id === id 
        ? { 
            ...player, 
            falls: Math.max(0, player.falls + change),
            lastFallTime: change > 0 ? new Date() : player.lastFallTime
          }
        : player
    ));
  };

  const startMatch = () => {
    setIsMatchActive(true);
    setStartTime(new Date());
  };

  const pauseMatch = () => {
    setIsMatchActive(false);
  };

  const resetMatch = () => {
    setIsMatchActive(false);
    setMatchTime(0);
    setStartTime(null);
    setPlayers(players.map(p => ({ ...p, falls: 0, lastFallTime: undefined })));
  };

  const finishMatch = () => {
    const totalFalls = players.reduce((sum, player) => sum + player.falls, 0);
    const data: FallData = {
      players,
      matchDuration: matchTime,
      totalFalls
    };
    onComplete(data);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </button>
        <h2 className="text-2xl font-semibold text-gray-900">Manual Counter</h2>
      </div>

      {/* Match Control */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-gray-500" />
              <span className="text-2xl font-mono font-bold text-gray-900">
                {formatTime(matchTime)}
              </span>
            </div>
            {isMatchActive && (
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                LIVE
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {!isMatchActive && matchTime === 0 ? (
              <button
                onClick={startMatch}
                disabled={players.length === 0}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play className="h-4 w-4" />
                <span>Start Match</span>
              </button>
            ) : (
              <>
                <button
                  onClick={isMatchActive ? pauseMatch : startMatch}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {isMatchActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  <span>{isMatchActive ? 'Pause' : 'Resume'}</span>
                </button>
                <button
                  onClick={resetMatch}
                  className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset</span>
                </button>
                {matchTime > 0 && (
                  <button
                    onClick={finishMatch}
                    className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <span>Finish Match</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Add Player */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Players</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
            placeholder="Enter player name..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          <button
            onClick={addPlayer}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Add Player
          </button>
        </div>
      </div>

      {/* Players Grid */}
      {players.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map((player) => (
            <div key={player.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <h4 className="font-semibold text-gray-900">{player.name}</h4>
                </div>
                <button
                  onClick={() => removePlayer(player.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
              
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {player.falls}
                </div>
                <div className="text-sm text-gray-500">Falls</div>
              </div>
              
              <div className="flex justify-center space-x-2">
                <button
                  onClick={() => updateFalls(player.id, -1)}
                  disabled={player.falls === 0}
                  className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <button
                  onClick={() => updateFalls(player.id, 1)}
                  className="bg-green-100 text-green-600 p-2 rounded-lg hover:bg-green-200 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              {player.lastFallTime && (
                <div className="text-xs text-gray-500 mt-2 text-center">
                  Last fall: {player.lastFallTime.toLocaleTimeString()}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {players.length === 0 && (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No Players Added</h3>
          <p className="text-gray-500">Add players to start tracking falls</p>
        </div>
      )}
    </div>
  );
};

export default ManualCounter;