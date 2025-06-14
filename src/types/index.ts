export interface PeriodEntry {
  id: string;
  startDate: string;
  endDate?: string;
  flow: 'light' | 'medium' | 'heavy';
  symptoms: string[];
  mood: 'happy' | 'sad' | 'anxious' | 'neutral' | 'irritated';
  notes?: string;
}

export interface PregnancyData {
  isPregnant: boolean;
  dueDate?: string;
  lastPeriodDate?: string;
  currentWeek?: number;
  appointments: Appointment[];
  milestones: Milestone[];
}

export interface Appointment {
  id: string;
  date: string;
  time: string;
  type: string;
  doctor: string;
  notes?: string;
}

export interface Milestone {
  id: string;
  week: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  isPrimary: boolean;
}

export interface HealthReminder {
  id: string;
  title: string;
  description: string;
  time: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  isActive: boolean;
}

export interface UserProfile {
  name: string;
  age: number;
  avgCycleLength: number;
  avgPeriodLength: number;
  emergencyContacts: EmergencyContact[];
  healthReminders: HealthReminder[];
}