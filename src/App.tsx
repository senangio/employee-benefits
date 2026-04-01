import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import OnboardingFlow from './components/OnboardingFlow';

export default function App() {
  const [view, setView] = useState<'landing' | 'onboarding'>('landing');
  const [consentTimestamp, setConsentTimestamp] = useState<string>('');

  const handleStart = (timestamp: string) => {
    setConsentTimestamp(timestamp);
    setView('onboarding');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {view === 'landing' ? (
        <LandingPage onStart={handleStart} />
      ) : (
        <OnboardingFlow initialConsentTimestamp={consentTimestamp} />
      )}
    </div>
  );
}
