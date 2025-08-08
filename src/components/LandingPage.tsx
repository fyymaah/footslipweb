import React from 'react';
import { Hand, Video, BarChart3, Users } from 'lucide-react';
import type { Mode } from '../App';

interface LandingPageProps {
  onModeSelect: (mode: Mode) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onModeSelect }) => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Track Football Falls with Precision
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Professional football fall tracking system with manual counting and AI-powered automatic detection
        </p>
      </div>

      {/* Mode Selection Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div 
          onClick={() => onModeSelect('manual')}
          className="bg-white rounded-xl shadow-lg p-8 cursor-pointer transform hover:scale-105 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-200"
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-green-100 p-4 rounded-full">
              <Hand className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">Manual Counter</h3>
            <p className="text-gray-600">
              Manually track falls for multiple players during live matches with real-time counting
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                Multi-player
              </div>
              <div className="flex items-center">
                <BarChart3 className="h-4 w-4 mr-1" />
                Live stats
              </div>
            </div>
          </div>
        </div>

        <div 
          onClick={() => onModeSelect('automatic')}
          className="bg-white rounded-xl shadow-lg p-8 cursor-pointer transform hover:scale-105 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-200"
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <Video className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">Automatic Detection</h3>
            <p className="text-gray-600">
              Upload match videos and let AI automatically detect and count player falls
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Video className="h-4 w-4 mr-1" />
                AI-powered
              </div>
              <div className="flex items-center">
                <BarChart3 className="h-4 w-4 mr-1" />
                Detailed report
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Why Choose FootSlip?
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-green-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Real-time Analytics</h4>
            <p className="text-gray-600 text-sm">
              Get instant statistics and insights about player performance
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Video className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">AI Detection</h4>
            <p className="text-gray-600 text-sm">
              Advanced computer vision for accurate fall detection in videos
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Multi-player Support</h4>
            <p className="text-gray-600 text-sm">
              Track multiple players simultaneously with detailed breakdowns
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;