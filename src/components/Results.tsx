import React from 'react';
import { BarChart3, Clock, Trophy, Users, Download, RefreshCw } from 'lucide-react';
import type { FallData } from '../App';

interface ResultsProps {
  data: FallData;
  onNewSession: () => void;
}

const Results: React.FC<ResultsProps> = ({ data, onNewSession }) => {
  const { players, matchDuration, totalFalls } = data;
  
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}m ${secs}s`;
    }
    return `${mins}m ${secs}s`;
  };

  const maxFalls = Math.max(...players.map(p => p.falls), 1);
  const avgFalls = players.length > 0 ? (totalFalls / players.length).toFixed(1) : '0';
  
  const sortedPlayers = [...players].sort((a, b) => b.falls - a.falls);
  const topPlayer = sortedPlayers[0];

  const exportResults = () => {
    const results = {
      matchDuration: formatTime(matchDuration),
      totalFalls,
      averageFalls: avgFalls,
      players: players.map(p => ({
        name: p.name,
        falls: p.falls
      })),
      generatedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `footslip-results-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Match Results</h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={exportResults}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button
            onClick={onNewSession}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            <span>New Session</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Falls</p>
              <p className="text-3xl font-bold text-red-600">{totalFalls}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <BarChart3 className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Players</p>
              <p className="text-3xl font-bold text-blue-600">{players.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Falls</p>
              <p className="text-3xl font-bold text-orange-600">{avgFalls}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Trophy className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Duration</p>
              <p className="text-3xl font-bold text-green-600">{formatTime(matchDuration)}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Top Player Highlight */}
      {topPlayer && topPlayer.falls > 0 && (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-100">
          <div className="flex items-center space-x-4">
            <div className="bg-red-100 p-3 rounded-full">
              <Trophy className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Most Falls</h3>
              <p className="text-2xl font-bold text-red-600">
                {topPlayer.name} - {topPlayer.falls} falls
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Player Statistics */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Player Statistics</h3>
        
        {players.length > 0 ? (
          <div className="space-y-4">
            {sortedPlayers.map((player, index) => (
              <div key={player.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                  #{index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{player.name}</h4>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{player.falls}</div>
                    <div className="text-xs text-gray-500">falls</div>
                  </div>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(player.falls / maxFalls) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No player data available</p>
          </div>
        )}
      </div>

      {/* Match Insights */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Match Insights</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900">Fall Rate</h4>
              <p className="text-sm text-blue-700">
                {matchDuration > 0 ? ((totalFalls / matchDuration) * 60).toFixed(2) : '0'} falls per minute
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900">Clean Players</h4>
              <p className="text-sm text-green-700">
                {players.filter(p => p.falls === 0).length} player(s) with no falls
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900">Peak Performance</h4>
              <p className="text-sm text-purple-700">
                {maxFalls > 0 ? `Highest individual falls: ${maxFalls}` : 'No falls recorded'}
              </p>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-medium text-orange-900">Match Quality</h4>
              <p className="text-sm text-orange-700">
                {totalFalls < players.length ? 'Low-contact match' : totalFalls > players.length * 2 ? 'High-contact match' : 'Moderate-contact match'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;