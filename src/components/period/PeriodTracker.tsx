import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Calendar, Plus, TrendingUp, Droplets } from 'lucide-react';
import { PeriodEntry } from '../../types';
import { formatDate, daysBetween, addDays } from '../../utils/dateUtils';

interface PeriodTrackerProps {
  periodEntries: PeriodEntry[];
  onAddEntry: (entry: Omit<PeriodEntry, 'id'>) => void;
  onUpdateEntry: (id: string, entry: Partial<PeriodEntry>) => void;
}

export const PeriodTracker: React.FC<PeriodTrackerProps> = ({
  periodEntries,
  onAddEntry,
  onUpdateEntry
}) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    flow: 'medium' as const,
    symptoms: [] as string[],
    mood: 'neutral' as const,
    notes: ''
  });

  const symptoms = [
    'Cramps', 'Headache', 'Bloating', 'Fatigue', 'Mood swings',
    'Breast tenderness', 'Nausea', 'Back pain', 'Acne', 'Cravings'
  ];

  const moods = [
    { value: 'happy', label: 'Happy', emoji: '😊' },
    { value: 'neutral', label: 'Neutral', emoji: '😐' },
    { value: 'sad', label: 'Sad', emoji: '😢' },
    { value: 'anxious', label: 'Anxious', emoji: '😰' },
    { value: 'irritated', label: 'Irritated', emoji: '😤' }
  ];

  const getNextPeriodPrediction = () => {
    if (periodEntries.length === 0) return null;
    
    const avgCycle = periodEntries.length > 1 
      ? periodEntries.slice(-3).reduce((sum, entry, index, arr) => {
          if (index === 0) return sum;
          return sum + daysBetween(arr[index - 1].startDate, entry.startDate);
        }, 0) / Math.max(1, periodEntries.length - 1)
      : 28;
    
    const lastPeriod = periodEntries[periodEntries.length - 1];
    return addDays(new Date(lastPeriod.startDate), Math.round(avgCycle));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEntry(formData);
    setFormData({
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      flow: 'medium',
      symptoms: [],
      mood: 'neutral',
      notes: ''
    });
    setShowModal(false);
  };

  const toggleSymptom = (symptom: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const nextPeriod = getNextPeriodPrediction();
  const daysUntilNext = nextPeriod ? daysBetween(new Date(), nextPeriod) : null;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Period Tracker</h1>
        <p className="text-gray-600">Track your cycle and predict your next period</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <div className="text-center">
            <Calendar className="mx-auto text-pink-500 mb-2" size={32} />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Next Period</h3>
            {daysUntilNext !== null ? (
              <>
                <p className="text-3xl font-bold text-pink-600 mb-1">{daysUntilNext}</p>
                <p className="text-gray-600">days remaining</p>
                <p className="text-sm text-gray-500 mt-2">{formatDate(nextPeriod!)}</p>
              </>
            ) : (
              <p className="text-gray-600">Start tracking to see predictions</p>
            )}
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <TrendingUp className="mx-auto text-purple-500 mb-2" size={32} />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Cycle Length</h3>
            <p className="text-3xl font-bold text-purple-600 mb-1">
              {periodEntries.length > 1 ? '28' : '--'}
            </p>
            <p className="text-gray-600">days average</p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Recent Periods</h3>
          <Button onClick={() => setShowModal(true)} size="sm">
            <Plus size={16} className="mr-1" />
            Add Entry
          </Button>
        </div>

        <div className="space-y-3">
          {periodEntries.length === 0 ? (
            <div className="text-center py-8">
              <Droplets className="mx-auto text-gray-400 mb-2" size={48} />
              <p className="text-gray-600">No periods tracked yet</p>
              <p className="text-gray-500 text-sm">Add your first entry to start tracking</p>
            </div>
          ) : (
            periodEntries.slice(-5).reverse().map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{formatDate(entry.startDate)}</p>
                  <p className="text-sm text-gray-600">
                    {entry.flow} flow • {entry.symptoms.length} symptoms
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">
                    {moods.find(m => m.value === entry.mood)?.emoji}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Period Entry">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Flow Intensity
            </label>
            <div className="flex space-x-2">
              {['light', 'medium', 'heavy'].map((flow) => (
                <button
                  key={flow}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, flow: flow as any }))}
                  className={`flex-1 p-2 rounded-lg border-2 transition-colors ${
                    formData.flow === flow
                      ? 'border-pink-500 bg-pink-50 text-pink-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {flow.charAt(0).toUpperCase() + flow.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Symptoms
            </label>
            <div className="grid grid-cols-2 gap-2">
              {symptoms.map((symptom) => (
                <button
                  key={symptom}
                  type="button"
                  onClick={() => toggleSymptom(symptom)}
                  className={`p-2 text-sm rounded-lg border transition-colors ${
                    formData.symptoms.includes(symptom)
                      ? 'border-pink-500 bg-pink-50 text-pink-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mood
            </label>
            <div className="flex space-x-2">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, mood: mood.value as any }))}
                  className={`flex-1 p-2 rounded-lg border-2 transition-colors ${
                    formData.mood === mood.value
                      ? 'border-pink-500 bg-pink-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-lg mb-1">{mood.emoji}</div>
                    <div className="text-xs">{mood.label}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              rows={3}
              placeholder="Any additional notes..."
            />
          </div>

          <div className="flex space-x-3">
            <Button type="button" variant="outline" onClick={() => setShowModal(false)} fullWidth>
              Cancel
            </Button>
            <Button type="submit" fullWidth>
              Save Entry
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};