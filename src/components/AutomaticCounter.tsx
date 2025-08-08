import React, { useState } from 'react';
import { ArrowLeft, Upload, Video, CheckCircle, AlertCircle, PlayCircle } from 'lucide-react';
import type { Player, FallData } from '../App';

interface AutomaticCounterProps {
  onBack: () => void;
  onComplete: (data: FallData) => void;
}

const AutomaticCounter: React.FC<AutomaticCounterProps> = ({ onBack, onComplete }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processingComplete, setProcessingComplete] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setUploadedFile(file);
      setProcessingComplete(false);
    }
  };

  const simulateProcessing = async () => {
    setIsProcessing(true);
    setProgress(0);

    // Simulate AI processing with progress updates
    const steps = [
      { progress: 10, message: 'Uploading video...' },
      { progress: 25, message: 'Analyzing video frames...' },
      { progress: 45, message: 'Detecting players...' },
      { progress: 65, message: 'Identifying fall patterns...' },
      { progress: 80, message: 'Processing fall events...' },
      { progress: 95, message: 'Generating report...' },
      { progress: 100, message: 'Analysis complete!' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProgress(step.progress);
    }

    setIsProcessing(false);
    setProcessingComplete(true);

    // Generate mock results after processing
    setTimeout(() => {
      generateMockResults();
    }, 1000);
  };

  const generateMockResults = () => {
    // Simulate AI-detected results
    const mockPlayers: Player[] = [
      { id: '1', name: 'Player #10', falls: 3 },
      { id: '2', name: 'Player #7', falls: 1 },
      { id: '3', name: 'Player #23', falls: 2 },
      { id: '4', name: 'Player #15', falls: 0 },
      { id: '5', name: 'Player #9', falls: 4 }
    ];

    const totalFalls = mockPlayers.reduce((sum, player) => sum + player.falls, 0);
    const mockData: FallData = {
      players: mockPlayers,
      matchDuration: 5400, // 90 minutes
      totalFalls
    };

    onComplete(mockData);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
        <h2 className="text-2xl font-semibold text-gray-900">Automatic Detection</h2>
      </div>

      {/* Upload Section */}
      {!uploadedFile && (
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="text-center">
            <Video className="h-16 w-16 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Upload Match Video
            </h3>
            <p className="text-gray-600 mb-6">
              Upload a football match video and our AI will automatically detect and count player falls
            </p>
            
            <div className="max-w-md mx-auto">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="h-8 w-8 text-blue-500 mb-4" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">MP4, AVI, MOV (MAX. 2GB)</p>
                </div>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* File Info & Processing */}
      {uploadedFile && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Video className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{uploadedFile.name}</h4>
                <p className="text-sm text-gray-500">
                  {formatFileSize(uploadedFile.size)} • {uploadedFile.type}
                </p>
              </div>
              {!isProcessing && !processingComplete && (
                <button
                  onClick={simulateProcessing}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <PlayCircle className="h-4 w-4" />
                  <span>Start Analysis</span>
                </button>
              )}
            </div>
          </div>

          {/* Processing Status */}
          {isProcessing && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-center">
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Processing Video...
                </h3>
                <p className="text-gray-600 mb-6">
                  Our AI is analyzing the video to detect player falls
                </p>
                
                <div className="max-w-md mx-auto">
                  <div className="bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600">{progress}% complete</div>
                </div>
              </div>
            </div>
          )}

          {/* Processing Complete */}
          {processingComplete && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Analysis Complete!
                </h3>
                <p className="text-gray-600 mb-6">
                  The AI has successfully analyzed your video and detected all player falls
                </p>
                
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">10</div>
                    <div className="text-sm text-gray-600">Total Falls</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">5</div>
                    <div className="text-sm text-gray-600">Players</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">90m</div>
                    <div className="text-sm text-gray-600">Duration</div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 mb-4">
                  Click below to view the detailed results
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* AI Features Info */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Detection Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">Player Recognition</h4>
              <p className="text-sm text-gray-600">Automatically identifies and tracks individual players</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">Fall Detection</h4>
              <p className="text-sm text-gray-600">Detects various types of falls and tumbles</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">Timestamp Tracking</h4>
              <p className="text-sm text-gray-600">Records exact time of each fall event</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">Detailed Analytics</h4>
              <p className="text-sm text-gray-600">Comprehensive statistics and insights</p>
            </div>
          </div>
        </div>
      </div>

      {/* Support Note */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-amber-800">Supported Video Formats</h4>
            <p className="text-sm text-amber-700">
              MP4, AVI, MOV, WMV formats are supported. For best results, use high-quality videos with clear player visibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomaticCounter;