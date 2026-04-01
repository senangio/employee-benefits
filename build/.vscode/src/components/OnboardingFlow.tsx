import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OnboardingData, INITIAL_DATA } from '../types';
import Layout from './Layout';
import CompanyInfo from './steps/CompanyInfo';
import CoverageNeeds from './steps/CoverageNeeds';
import PlanSelection from './steps/PlanSelection';
import InsuredDetails from './steps/InsuredDetails';
import ReviewSubmit from './steps/ReviewSubmit';
import PurchaseOptionsModal from './PurchaseOptionsModal';

interface OnboardingFlowProps {
  initialConsentTimestamp?: string;
}

export default function OnboardingFlow({ initialConsentTimestamp }: OnboardingFlowProps) {
  const [step, setStep] = useState(1);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    ...INITIAL_DATA,
    consentTimestamp: initialConsentTimestamp || INITIAL_DATA.consentTimestamp
  });
  const totalSteps = 5;

  const nextStep = () => {
    if (step === 2 && !data.purchaseOption) {
      setIsPurchaseModalOpen(true);
      return;
    }
    setStep(prev => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const updateData = (newData: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const handlePurchaseOptionSelect = (option: 'Fully Online' | 'Advisor-Assisted') => {
    updateData({ purchaseOption: option });
  };

  const handlePurchaseModalClose = () => {
    if (data.purchaseOption) {
      setIsPurchaseModalOpen(false);
      setStep(3);
    } else {
      setIsPurchaseModalOpen(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <CompanyInfo data={data} onUpdate={updateData} onNext={nextStep} />;
      case 2:
        return <CoverageNeeds data={data} onUpdate={updateData} onNext={nextStep} onBack={prevStep} />;
      case 3:
        return <PlanSelection data={data} onUpdate={updateData} onNext={nextStep} onBack={prevStep} />;
      case 4:
        return <InsuredDetails data={data} onUpdate={updateData} onNext={nextStep} onBack={prevStep} />;
      case 5:
        return <ReviewSubmit data={data} onBack={prevStep} />;
      default:
        return null;
    }
  };

  return (
    <Layout 
      showNav={false} 
      onBack={step > 1 ? prevStep : undefined}
    >
      <div className="px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        <PurchaseOptionsModal 
          isOpen={isPurchaseModalOpen}
          onClose={handlePurchaseModalClose}
          onSelect={handlePurchaseOptionSelect}
          selectedOption={data.purchaseOption}
        />

        {/* PIDM Banner */}
        <div className="mt-12 bg-white border border-gray-100 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
          <img 
            src="https://www.pidm.gov.my/PIDM/media/PIDM/PIDM-Logo.png" 
            alt="PIDM Logo" 
            className="h-10 w-auto"
            referrerPolicy="no-referrer"
          />
          <p className="text-[10px] text-gray-400 leading-relaxed">
            Benefits payable under the eligible certificate/policy/product are protected by Perbadanan Insurans Deposit Malaysia (PIDM), subject to coverage limits. Please refer to the <a href="#" className="text-[#0052CC] font-medium hover:underline">PIDM Tips Brochure</a> or contact your insurance/takaful provider, or visit the <a href="#" className="text-[#0052CC] font-medium hover:underline">PIDM website</a>.
          </p>
        </div>
      </div>
    </Layout>
  );
}
