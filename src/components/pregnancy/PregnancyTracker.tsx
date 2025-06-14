import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Baby, Calendar, Heart, Plus, CheckCircle } from 'lucide-react';
import { PregnancyData, Appointment } from '../../types';
import { formatDate, getWeekOfPregnancy, getDaysUntilDueDate } from '../../utils/dateUtils';

interface PregnancyTrackerProps {
  pregnancyData: PregnancyData;
  onUpdatePregnancy: (data: Partial<PregnancyData>) => void;
}

export const PregnancyTracker: React.FC<PregnancyTrackerProps> = ({
  pregnancyData,
  onUpdatePregnancy
}) => {
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [setupData, setSetupData] = useState({
    dueDate: '',
    lastPeriodDate: ''
  });
  const [appointmentData, setAppointmentData] = useState({
    date: '',
    time: '',
    type: '',
    doctor: '',
    notes: ''
  });

  const milestones = [
    { week: 4, title: "Missed Period", description: "First sign of pregnancy" },
    { week: 6, title: "Heartbeat Detectable", description: "Baby's heart starts beating" },
    { week: 8, title: "First Prenatal Visit", description: "Schedule your first appointment" },
    { week: 12, title: "End of First Trimester", description: "Risk of miscarriage decreases" },
    { week: 16, title: "Baby's Sex Revealed", description: "Gender can be determined" },
    { week: 20, title: "Anatomy Scan", description: "Detailed ultrasound examination" },
    { week: 24, title: "Viability Milestone", description: "Baby could survive outside womb" },
    { week: 28, title: "Third Trimester", description: "Final stretch begins" },
    { week: 32, title: "Baby's Lungs Develop", description: "Lungs are maturing rapidly" },
    { week: 36, title: "Full Term Approaching", description: "Baby is almost ready" },
    { week: 40, title: "Due Date", description: "Your baby is ready to meet you!" }
  ];

  const handleSetupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentWeek = getWeekOfPregnancy(setupData.lastPeriodDate);
    onUpdatePregnancy({
      isPregnant: true,
      dueDate: setupData.dueDate,
      lastPeriodDate: setupData.lastPeriodDate,
      currentWeek,
      appointments: [],
      milestones: milestones.map(m => ({
        id: `milestone-${m.week}`,
        week: m.week,
        title: m.title,
        description: m.description,
        completed: m.week <= currentWeek
      }))
    });
    setShowSetupModal(false);
  };

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      ...appointmentData
    };
    onUpdatePregnancy({
      appointments: [...pregnancyData.appointments, newAppointment]
    });
    setAppointmentData({ date: '', time: '', type: '', doctor: '', notes: '' });
    setShowAppointmentModal(false);
  };

  const daysUntilDue = pregnancyData.dueDate ? getDaysUntilDueDate(pregnancyData.dueDate) : null;
  const completedMilestones = pregnancyData.milestones?.filter(m => m.completed).length || 0;
  const totalMilestones = pregnancyData.milestones?.length || 0;

  if (!pregnancyData.isPregnant) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Pregnancy Tracker</h1>
          <p className="text-gray-600">Track your pregnancy journey week by week</p>
        </div>

        <Card className="text-center py-12">
          <Baby className="mx-auto text-purple-400 mb-4" size={64} />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Ready to Start Your Journey?</h3>
          <p className="text-gray-600 mb-6">Set up your pregnancy tracking to monitor your progress and milestones</p>
          <Button onClick={() => setShowSetupModal(true)}>
            Start Tracking Pregnancy
          </Button>
        </Card>

        <Modal isOpen={showSetupModal} onClose={() => setShowSetupModal(false)} title="Setup Pregnancy Tracking">
          <form onSubmit={handleSetupSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={setupData.dueDate}
                onChange={(e) => setSetupData(prev => ({ ...prev, dueDate: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Menstrual Period Date
              </label>
              <input
                type="date"
                value={setupData.lastPeriodDate}
                onChange={(e) => setSetupData(prev => ({ ...prev, lastPeriodDate: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div className="flex space-x-3">
              <Button type="button" variant="outline" onClick={() => setShowSetupModal(false)} fullWidth>
                Cancel
              </Button>
              <Button type="submit" fullWidth>
                Start Tracking
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Pregnancy Journey</h1>
        <p className="text-gray-600">Week {pregnancyData.currentWeek} of your beautiful journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="text-center">
            <Baby className="mx-auto text-purple-500 mb-2" size={32} />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Current Week</h3>
            <p className="text-3xl font-bold text-purple-600 mb-1">{pregnancyData.currentWeek}</p>
            <p className="text-gray-600">weeks pregnant</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <Calendar className="mx-auto text-pink-500 mb-2" size={32} />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Due Date</h3>
            <p className="text-xl font-bold text-pink-600 mb-1">
              {daysUntilDue !== null ? `${daysUntilDue} days` : '--'}
            </p>
            <p className="text-gray-600">{pregnancyData.dueDate ? formatDate(pregnancyData.dueDate) : ''}</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <Heart className="mx-auto text-red-500 mb-2" size={32} />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Milestones</h3>
            <p className="text-3xl font-bold text-red-600 mb-1">{completedMilestones}</p>
            <p className="text-gray-600">of {totalMilestones} reached</p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h3>
          <Button onClick={() => setShowAppointmentModal(true)} size="sm">
            <Plus size={16} className="mr-1" />
            Add Appointment
          </Button>
        </div>

        <div className="space-y-3">
          {pregnancyData.appointments.length === 0 ? (
            <div className="text-center py-6">
              <Calendar className="mx-auto text-gray-400 mb-2" size={32} />
              <p className="text-gray-600">No appointments scheduled</p>
            </div>
          ) : (
            pregnancyData.appointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{appointment.type}</p>
                  <p className="text-sm text-gray-600">
                    {formatDate(appointment.date)} at {appointment.time}
                  </p>
                  <p className="text-sm text-gray-600">Dr. {appointment.doctor}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Pregnancy Milestones</h3>
        <div className="space-y-3">
          {pregnancyData.milestones?.map((milestone) => (
            <div key={milestone.id} className="flex items-start space-x-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                milestone.completed ? 'bg-green-500' : 'bg-gray-300'
              }`}>
                {milestone.completed && <CheckCircle className="text-white" size={16} />}
              </div>
              <div className="flex-1">
                <p className={`font-medium ${milestone.completed ? 'text-green-700' : 'text-gray-700'}`}>
                  Week {milestone.week}: {milestone.title}
                </p>
                <p className="text-sm text-gray-600">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Modal isOpen={showAppointmentModal} onClose={() => setShowAppointmentModal(false)} title="Add Appointment">
        <form onSubmit={handleAppointmentSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Appointment Type
            </label>
            <input
              type="text"
              value={appointmentData.type}
              onChange={(e) => setAppointmentData(prev => ({ ...prev, type: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., Prenatal Checkup, Ultrasound"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={appointmentData.date}
                onChange={(e) => setAppointmentData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                value={appointmentData.time}
                onChange={(e) => setAppointmentData(prev => ({ ...prev, time: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Doctor/Healthcare Provider
            </label>
            <input
              type="text"
              value={appointmentData.doctor}
              onChange={(e) => setAppointmentData(prev => ({ ...prev, doctor: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Doctor's name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (optional)
            </label>
            <textarea
              value={appointmentData.notes}
              onChange={(e) => setAppointmentData(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={2}
              placeholder="Any additional notes..."
            />
          </div>

          <div className="flex space-x-3">
            <Button type="button" variant="outline" onClick={() => setShowAppointmentModal(false)} fullWidth>
              Cancel
            </Button>
            <Button type="submit" fullWidth>
              Save Appointment
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};