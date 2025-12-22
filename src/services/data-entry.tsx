import React from 'react';
import ServicesProcess from '../components/ServicesProcess';
import '../styles/globals.css';

export default function DataEntryPage() {
  return (
    <div className="min-h-screen bg-[#0a0e27]">
      {/* Header with Logo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e27]/80 backdrop-blur-xl border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <span className="text-white text-xl">T</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg blur opacity-30 -z-10" />
              </div>
              <span className="text-2xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Tekzura
              </span>
            </div>
            <a
              href="/"
              className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg hover:scale-105 transition-transform"
            >
              Back to Home
            </a>
          </div>
        </div>
      </header>

      <div className="pt-20">
        <ServicesProcess serviceType="data" />
      </div>
    </div>
  );
}
