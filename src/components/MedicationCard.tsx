import React from 'react';
import { format } from 'date-fns';
import type { Medication } from '../types/Medication';

interface MedicationCardProps {
  medication: Medication;
  onDelete: (id: string) => void;
}

export const MedicationCard: React.FC<MedicationCardProps> = ({ medication, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${medication.name}?`)) {
      onDelete(medication.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 border-l-4"
         style={{ borderLeftColor: medication.color }}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900 leading-tight">
            {medication.name}
          </h3>
          <button
            onClick={handleDelete}
            className="text-gray-400 hover:text-red-500 transition-colors duration-200"
            aria-label="Delete medication"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium text-gray-700">Dosage:</span>
            <span className="ml-2">{medication.dosage}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium text-gray-700">Frequency:</span>
            <span className="ml-2">{medication.frequency}</span>
          </div>
          
          <div className="flex items-start text-sm text-gray-600">
            <span className="font-medium text-gray-700 mt-0.5">Time of Day:</span>
            <div className="ml-2 flex flex-wrap gap-1">
              {medication.timesOfDay.map((time) => (
                <span
                  key={time}
                  className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
                >
                  {time}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium text-gray-700">Start Date:</span>
            <span className="ml-2">{format(medication.startDate, 'MMM dd, yyyy')}</span>
          </div>
          
          {medication.endDate && (
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium text-gray-700">End Date:</span>
              <span className="ml-2">{format(medication.endDate, 'MMM dd, yyyy')}</span>
            </div>
          )}
          
          {medication.notes && (
            <div className="pt-2 border-t border-gray-100">
              <span className="font-medium text-gray-700 text-sm">Notes:</span>
              <p className="text-sm text-gray-600 mt-1">{medication.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};