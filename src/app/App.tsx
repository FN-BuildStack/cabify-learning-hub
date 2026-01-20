import { useState } from 'react';
import { Dashboard } from '@/app/components/Dashboard';
import { ModuleView } from '@/app/components/ModuleView';

export default function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'module'>('dashboard');
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const handleSelectModule = (moduleId: string) => {
    setSelectedModule(moduleId);
    setCurrentView('module');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedModule(null);
  };

  return (
    <div 
      className="min-h-screen bg-white"
      style={{
        fontFamily: "'Poppins', sans-serif"
      }}
    >
      {currentView === 'dashboard' && (
        <Dashboard onSelectModule={handleSelectModule} />
      )}
      
      {currentView === 'module' && selectedModule && (
        <ModuleView 
          moduleId={selectedModule} 
          onBack={handleBackToDashboard}
        />
      )}
    </div>
  );
}