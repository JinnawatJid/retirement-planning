'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import LandingPage from '@/components/LandingPage';
import RetirementForm from '@/components/RetirementForm';
import ResultsPage from '@/components/ResultsPage';
import DonationModal from '@/components/DonationModal';

interface FormData {
  name: string;
  avatar: string;
  startAge: number;
  salary: number;
  monthlySavings: number;
  retireAge: number;
  monthlyExpense: number;
  lifeExpectancy: number;
}

type ViewState = 'landing' | 'form' | 'results';

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [formData, setFormData] = useState<FormData | null>(null);
  const [showDonationModal, setShowDonationModal] = useState(false);

  // Check for URL parameters on load (for shared results)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const startAge = urlParams.get('startAge');
    
    if (startAge) {
      const data: FormData = {
        name: urlParams.get('name') || 'Anonymous',
        avatar: urlParams.get('avatar') || '/avatar/Tisha.png',
        startAge: parseInt(startAge) || 22,
        salary: parseInt(urlParams.get('salary') || '30000'),
        monthlySavings: parseInt(urlParams.get('monthlySavings') || '5000'),
        retireAge: parseInt(urlParams.get('retireAge') || '60'),
        monthlyExpense: parseInt(urlParams.get('monthlyExpense') || '20000'),
        lifeExpectancy: parseInt(urlParams.get('lifeExpectancy') || '80'),
      };
      setFormData(data);
      setCurrentView('results');
    }
  }, []);

  const handleStartCalculator = () => {
    setCurrentView('form');
  };

  const handleFormClose = () => {
    setCurrentView('landing');
  };

  const handleCalculate = (data: FormData) => {
    setFormData(data);
    setCurrentView('results');
  };

  const handleResultsClose = () => {
    setCurrentView('landing');
    setFormData(null);
    // Clear URL parameters
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  const handleDonation = () => {
    setShowDonationModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onDonationClick={handleDonation} />
      
      {currentView === 'landing' && (
        <LandingPage onStartCalculator={handleStartCalculator} />
      )}
      
      {currentView === 'form' && (
        <RetirementForm 
          onClose={handleFormClose}
          onCalculate={handleCalculate}
        />
      )}
      
      {currentView === 'results' && formData && (
        <ResultsPage 
          data={formData}
          onClose={handleResultsClose}
        />
      )}

      <DonationModal
        isOpen={showDonationModal}
        onClose={() => setShowDonationModal(false)}
      />
    </div>
  );
}