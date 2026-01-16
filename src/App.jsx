import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navigation from './components/Navigation';
import UnitList from './components/UnitList';
import WordStudy from './components/WordStudy';
import Exercises from './components/Exercises';
import Reading from './components/Reading';

const MainLayout = () => {
  const { activeTab } = useApp();

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <UnitList />;
      case 'study': return <WordStudy />;
      case 'quiz': return <Exercises />;
      case 'reading': return <Reading />;
      default: return <UnitList />;
    }
  };

  return (
    <div className="container">
      {renderContent()}
      <Navigation />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
