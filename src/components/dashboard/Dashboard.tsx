import React from 'react';
import { Card } from '../ui/Card';
import { Calendar, Heart, Baby, Shield, TrendingUp } from 'lucide-react';
import { PeriodEntry, PregnancyData } from '../../types';
import { formatDate, daysBetween, addDays } from '../../utils/dateUtils';

interface DashboardProps {
  periodEntries: PeriodEntry[];
  pregnancyData: PregnancyData;
  onTabChange: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  periodEntries,
  pregnancyData,
  onTabChange
}) => {
  const getNextPeriodDate = () => {
    if (periodEntries.length === 0) return null;
    
    const lastPeriod = periodEntries[periodEntries.length - 1];
    const avgCycle = 28; // Default cycle length
    return addDays(new Date(lastPeriod.startDate), avgCycle);
  };

  const getDaysUntilNextPeriod = () => {
    const nextPeriod = getNextPeriodDate();
    if (!nextPeriod) return null;
    return daysBetween(new Date(), nextPeriod);
  };

  const nextPeriodDays = getDaysUntilNextPeriod();

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Welcome Back
        </h1>
        <p className="text-xl text-gray-600">Your health journey at a glance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:scale-105 transition-transform" onClick={() => onTabChange('period')}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Period Tracker</h3>
              {nextPeriodDays !== null ? (
                <div>
                  <p className="text-3xl font-bold text-pink-600 mb-1">{nextPeriodDays} days</p>
                  <p className="text-sm text-gray-600">until next period</p>
                </div>
              ) : (
                <p className="text-gray-600">Start tracking your cycle</p>
              )}
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center">
              <Calendar className="text-pink-600" size={28} />
            </div>
          </div>
        </Card>

        <Card className="cursor-pointer hover:scale-105 transition-transform" onClick={() => onTabChange('pregnancy')}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Pregnancy</h3>
              {pregnancyData.isPregnant ? (
                <div>
                  <p className="text-3xl font-bold text-purple-600 mb-1">Week {pregnancyData.currentWeek}</p>
                  <p className="text-sm text-gray-600">of your journey</p>
                </div>
              ) : (
                <p className="text-gray-600">Track your pregnancy</p>
              )}
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
              <Baby className="text-purple-600" size={28} />
            </div>
          </div>
        </Card>

        <Card className="cursor-pointer hover:scale-105 transition-transform" onClick={() => onTabChange('safety')}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Safety Hub</h3>
              <p className="text-gray-600">Emergency contacts & alerts</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
              <Shield className="text-red-600" size={28} />
            </div>
          </div>
        </Card>

        <Card className="cursor-pointer hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Health Score</h3>
              <div className="flex items-center">
                <p className="text-3xl font-bold text-green-600 mr-2">85%</p>
                <TrendingUp className="text-green-600" size={20} />
              </div>
              <p className="text-sm text-gray-600">Looking great!</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
              <Heart className="text-green-600" size={28} />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Quick Tips</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-3 h-3 bg-pink-500 rounded-full mt-2"></div>
              <p className="text-gray-700">Stay hydrated - aim for 8 glasses of water daily</p>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-3 h-3 bg-purple-500 rounded-full mt-2"></div>
              <p className="text-gray-700">Regular exercise can help reduce menstrual cramps</p>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-3 h-3 bg-teal-500 rounded-full mt-2"></div>
              <p className="text-gray-700">Track your mood to identify patterns in your cycle</p>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
              <p className="text-gray-700">Get adequate sleep for hormonal balance</p>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {periodEntries.length > 0 ? (
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <Calendar className="text-pink-600" size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Last period logged</p>
                  <p className="text-sm text-gray-600">
                    {formatDate(periodEntries[periodEntries.length - 1].startDate)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No recent activity</p>
                <p className="text-gray-500 text-sm">Start tracking to see your activity here</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};