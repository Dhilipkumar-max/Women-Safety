import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { User, Settings, Bell, Download, Trash2 } from 'lucide-react';
import { UserProfile, HealthReminder } from '../../types';

interface ProfileProps {
  profile: UserProfile;
  onUpdateProfile: (profile: Partial<UserProfile>) => void;
  onExportData: () => void;
  onClearData: () => void;
}

export const Profile: React.FC<ProfileProps> = ({
  profile,
  onUpdateProfile,
  onExportData,
  onClearData
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(profile);

  const handleSave = () => {
    onUpdateProfile(editData);
    setIsEditing(false);
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      onClearData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Profile</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-200 rounded-full flex items-center justify-center">
              <User className="text-pink-600" size={32} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{profile.name || 'User'}</h2>
              <p className="text-gray-600">{profile.age ? `${profile.age} years old` : 'Age not set'}</p>
            </div>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant="outline"
            size="sm"
          >
            <Settings size={16} className="mr-1" />
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                value={editData.age}
                onChange={(e) => setEditData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Average Cycle Length (days)
              </label>
              <input
                type="number"
                value={editData.avgCycleLength}
                onChange={(e) => setEditData(prev => ({ ...prev, avgCycleLength: parseInt(e.target.value) }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Average Period Length (days)
              </label>
              <input
                type="number"
                value={editData.avgPeriodLength}
                onChange={(e) => setEditData(prev => ({ ...prev, avgPeriodLength: parseInt(e.target.value) }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            <Button onClick={handleSave} fullWidth>
              Save Changes
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Cycle Length</p>
              <p className="text-lg font-semibold text-gray-800">{profile.avgCycleLength} days</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Period Length</p>
              <p className="text-lg font-semibold text-gray-800">{profile.avgPeriodLength} days</p>
            </div>
          </div>
        )}
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Data Management</h3>
        <div className="space-y-3">
          <Button
            onClick={onExportData}
            variant="secondary"
            fullWidth
            className="justify-center"
          >
            <Download size={16} className="mr-2" />
            Export My Data
          </Button>
          <Button
            onClick={handleClearData}
            variant="danger"
            fullWidth
            className="justify-center"
          >
            <Trash2 size={16} className="mr-2" />
            Clear All Data
          </Button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Export your data to keep a backup or clear all data to start fresh.
        </p>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Notifications</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Period Reminders</p>
              <p className="text-sm text-gray-600">Get notified before your period starts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Appointment Reminders</p>
              <p className="text-sm text-gray-600">Get notified about upcoming appointments</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Health Tips</p>
              <p className="text-sm text-gray-600">Receive daily health and wellness tips</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
            </label>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">About</h3>
        <div className="space-y-2">
          <p className="text-gray-600">Women's Health & Safety App</p>
          <p className="text-gray-600">Version 1.0.0</p>
          <p className="text-sm text-gray-500 mt-4">
            Your health data is stored locally on your device and never shared without your consent.
          </p>
        </div>
      </Card>
    </div>
  );
};