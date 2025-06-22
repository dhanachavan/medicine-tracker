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
