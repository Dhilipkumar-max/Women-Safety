import React, { useState } from 'react';
import { Navigation } from './components/layout/Navigation';
import { Dashboard } from './components/dashboard/Dashboard';
import { PeriodTracker } from './components/period/PeriodTracker';
import { PregnancyTracker } from './components/pregnancy/PregnancyTracker';
import { SafetyHub } from './components/safety/SafetyHub';
import { Profile } from './components/profile/Profile';
import { useLocalStorage } from './hooks/useLocalStorage';
import { PeriodEntry, PregnancyData, EmergencyContact, UserProfile } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  
  // Local storage for data persistence
  const [periodEntries, setPeriodEntries] = useLocalStorage<PeriodEntry[]>('periodEntries', []);
  const [pregnancyData, setPregnancyData] = useLocalStorage<PregnancyData>('pregnancyData', {
    isPregnant: false,
    appointments: [],
    milestones: []
  });
  const [emergencyContacts, setEmergencyContacts] = useLocalStorage<EmergencyContact[]>('emergencyContacts', []);
  const [userProfile, setUserProfile] = useLocalStorage<UserProfile>('userProfile', {
    name: '',
    age: 0,
    avgCycleLength: 28,
    avgPeriodLength: 5,
    emergencyContacts: [],
    healthReminders: []
  });

  const handleAddPeriodEntry = (entry: Omit<PeriodEntry, 'id'>) => {
    const newEntry: PeriodEntry = {
      ...entry,
      id: Date.now().toString()
    };
    setPeriodEntries([...periodEntries, newEntry]);
  };

  const handleUpdatePeriodEntry = (id: string, updates: Partial<PeriodEntry>) => {
    setPeriodEntries(entries => 
      entries.map(entry => entry.id === id ? { ...entry, ...updates } : entry)
    );
  };

  const handleUpdatePregnancy = (updates: Partial<PregnancyData>) => {
    setPregnancyData(prev => ({ ...prev, ...updates }));
  };

  const handleUpdateContacts = (contacts: EmergencyContact[]) => {
    setEmergencyContacts(contacts);
  };

  const handleUpdateProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  };

  const handleExportData = () => {
    const data = {
      periodEntries,
      pregnancyData,
      emergencyContacts,
      userProfile,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `womens-health-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearData = () => {
    setPeriodEntries([]);
    setPregnancyData({
      isPregnant: false,
      appointments: [],
      milestones: []
    });
    setEmergencyContacts([]);
    setUserProfile({
      name: '',
      age: 0,
      avgCycleLength: 28,
      avgPeriodLength: 5,
      emergencyContacts: [],
      healthReminders: []
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <Dashboard
            periodEntries={periodEntries}
            pregnancyData={pregnancyData}
            onTabChange={setActiveTab}
          />
        );
      case 'period':
        return (
          <PeriodTracker
            periodEntries={periodEntries}
            onAddEntry={handleAddPeriodEntry}
            onUpdateEntry={handleUpdatePeriodEntry}
          />
        );
      case 'pregnancy':
        return (
          <PregnancyTracker
            pregnancyData={pregnancyData}
            onUpdatePregnancy={handleUpdatePregnancy}
          />
        );
      case 'safety':
        return (
          <SafetyHub
            emergencyContacts={emergencyContacts}
            onUpdateContacts={handleUpdateContacts}
          />
        );
      case 'profile':
        return (
          <Profile
            profile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            onExportData={handleExportData}
            onClearData={handleClearData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-teal-50">
      <div className="flex h-screen">
        {/* Sidebar Navigation for larger screens */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col flex-grow bg-white shadow-xl">
            <div className="flex items-center flex-shrink-0 px-6 py-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Women's Health
              </h1>
            </div>
            <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 lg:pl-64">
          <main className="flex-1 overflow-y-auto">
            <div className="px-4 py-6 lg:px-8 lg:py-8 pb-20 lg:pb-8">
              {renderContent()}
            </div>
          </main>
        </div>

        {/* Bottom navigation for mobile */}
        <div className="lg:hidden">
          <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>
    </div>
  );
}

export default App;