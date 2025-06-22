import React from 'react';
import type { Medication } from '../types/Medication';
import { MedicationCard } from './MedicationCard';

interface DashboardProps {
  medications: Medication[];
  onDelete: (id: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ medications, onDelete }) => {
  if (medications.length === 0) {
    return (
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Medications</h1>
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-4.5V4.875c0-1.036-.84-1.875-1.875-1.875s-1.875.84-1.875 1.875v3.375h-4.5A3.375 3.375 0 002.25 11.625v2.625c0 1.035.84 1.875 1.875 1.875h4.5v3.375c0 1.036.84 1.875 1.875 1.875s1.875-.84 1.875-1.875v-3.375h4.5a1.875 1.875 0 001.875-1.875z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No medications yet</h3>
            <p className="text-gray-600 mb-6">Get started by adding your first medication to track.</p>
            <a 
              href="/add" 
              className="inline-flex items-center px-6 py-3 bg-apple-blue text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Medication
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Medications</h1>
          <span className="text-sm text-gray-600">
            {medications.length} medication{medications.length !== 1 ? 's' : ''}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {medications.map((medication) => (
            <MedicationCard
              key={medication.id}
              medication={medication}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};