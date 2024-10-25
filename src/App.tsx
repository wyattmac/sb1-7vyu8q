import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Projects from './components/Projects';
import Clients from './components/Clients';
import Schedule from './components/Schedule';
import Sidebar from './components/Sidebar';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'projects':
        return <Projects />;
      case 'clients':
        return <Clients />;
      case 'schedule':
        return <Schedule />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 ml-64 min-h-screen">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;