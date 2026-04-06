import { useState, useEffect } from 'react';
import type { Medication } from './types/Medication';
import { saveMedications, loadMedications } from './utils/storage';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { AddMedication } from './components/AddMedication';

function App() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [currentPath, setCurrentPath] = useState('/');

  // Load medications from localStorage on component mount
  useEffect(() => {
    const storedMedications = loadMedications();
    setMedications(storedMedications);
  }, []);

  // Save medications to localStorage whenever medications change
  useEffect(() => {
    saveMedications(medications);
  }, [medications]);

  const handleAddMedication = (medication: Medication) => {
    setMedications(prev => [...prev, medication]);
    setCurrentPath('/'); // Navigate back to dashboard after adding
  };

  const handleDeleteMedication = (id: string) => {
    setMedications(prev => prev.filter(med => med.id !== id));
  };

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
  };

  const renderCurrentView = () => {
    switch (currentPath) {
      case '/add':
        return (
          <AddMedication
            onAdd={handleAddMedication}
            onCancel={() => setCurrentPath('/')}
          />
        );
      case '/medications':
      case '/schedule':
      case '/reminders':
      case '/reports':
      case '/settings':
        return (
          <div className="flex-1 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <div className="mx-auto w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Coming Soon</h3>
              <p className="text-gray-600">This feature is under development.</p>
            </div>
          </div>
        );
      default:
        return (
          <Dashboard
            medications={medications}
            onDelete={handleDeleteMedication}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPath={currentPath} onNavigate={handleNavigate} />
      {renderCurrentView()}
    </div>
  );
}

export default App;
