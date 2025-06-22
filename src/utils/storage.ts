import type { Medication } from '../types/Medication';

const STORAGE_KEY = 'medicine-tracker-medications';

export const saveMedications = (medications: Medication[]): void => {
  try {
    const serializedMedications = medications.map(med => ({
      ...med,
      startDate: med.startDate.toISOString(),
      endDate: med.endDate?.toISOString(),
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializedMedications));
  } catch (error) {
    console.error('Failed to save medications to localStorage:', error);
  }
};

export const loadMedications = (): Medication[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    return parsed.map((med: {
      id: string;
      name: string;
      dosage: string;
      frequency: string;
      timesOfDay: string[];
      startDate: string;
      endDate?: string;
      notes?: string;
      color: string;
    }) => ({
      ...med,
      startDate: new Date(med.startDate),
      endDate: med.endDate ? new Date(med.endDate) : undefined,
    }));
  } catch (error) {
    console.error('Failed to load medications from localStorage:', error);
    return [];
  }
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};