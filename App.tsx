import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { KlipperAssistant } from './components/KlipperAssistant';
import { Sidebar } from './components/Sidebar';
import { Sun, Moon } from './components/Icons';
import { STATIC_STEPS } from './data/steps';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />
      
      <button 
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-900 z-50"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>

      <div className="flex-grow w-full container mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <Sidebar
            steps={STATIC_STEPS}
            currentStep={currentStep}
            onStepSelect={setCurrentStep}
          />
          <main className="flex-1">
            <KlipperAssistant 
              steps={STATIC_STEPS}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default App;
