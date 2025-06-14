import React from 'react';
import { Home, Calendar, Baby, Shield, User } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'period', label: 'Period', icon: Calendar },
    { id: 'pregnancy', label: 'Pregnancy', icon: Baby },
    { id: 'safety', label: 'Safety', icon: Shield },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      {/* Desktop Sidebar Navigation */}
      <nav className="hidden lg:flex lg:flex-col lg:flex-1 lg:px-4 lg:py-4">
        <div className="space-y-2">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${
                activeTab === id
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-pink-50 hover:text-pink-600'
              }`}
            >
              <Icon size={20} className="mr-3" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 shadow-lg z-50">
        <div className="flex justify-around">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 min-w-0 flex-1 ${
                activeTab === id
                  ? 'text-pink-600 bg-pink-50'
                  : 'text-gray-600 hover:text-pink-500 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} className="mb-1" />
              <span className="text-xs font-medium truncate">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};