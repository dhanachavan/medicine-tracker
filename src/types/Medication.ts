export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  timesOfDay: TimeOfDay[];
  startDate: Date;
  endDate?: Date;
  notes?: string;
  color: string;
  isPaused?: boolean;
  schedule?: string[];
  refillDate?: string;
}

export type TimeOfDay = 'Morning' | 'Afternoon' | 'Evening' | 'Bedtime';

export const TIMES_OF_DAY: TimeOfDay[] = ['Morning', 'Afternoon', 'Evening', 'Bedtime'];

export const MEDICATION_COLORS = [
  '#3B82F6', // Blue
  '#EF4444', // Red
  '#10B981', // Green
  '#F59E0B', // Amber
  '#8B5CF6', // Purple
  '#F97316', // Orange
  '#06B6D4', // Cyan
  '#84CC16', // Lime
  '#EC4899', // Pink
  '#6B7280', // Gray
];