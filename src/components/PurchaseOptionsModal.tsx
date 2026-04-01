import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Laptop, PhoneCall, Check } from 'lucide-react';
import { cn } from '../lib/utils';

interface PurchaseOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (option: 'Fully Online' | 'Advisor-Assisted') => void;
  selectedOption: 'Fully Online' | 'Advisor-Assisted' | null;
}

export default function PurchaseOptionsModal({ isOpen, onClose, onSelect, selectedOption }: PurchaseOptionsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[40px] p-10 shadow-2xl overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-[#001F3F] mb-4">Purchase Options</h2>
              <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
                Choose how you would like to complete your purchase. We offer multiple options to suit your comfort level and preference.
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-center font-bold text-[#001F3F]">How would you like to proceed with the plan purchase?</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Fully Online */}
                <button
                  onClick={() => onSelect('Fully Online')}
                  className={cn(
                    "relative flex flex-col items-start p-8 rounded-3xl border-2 text-left transition-all group",
                    selectedOption === 'Fully Online'
                      ? "border-[#0052CC] bg-[#0052CC]/5"
                      : "border-gray-100 bg-gray-50 hover:border-gray-200"
                  )}
                >
                  <div className={cn(
                    "absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                    selectedOption === 'Fully Online' ? "border-[#0052CC] bg-[#0052CC]" : "border-gray-200 bg-white"
                  )}>
                    {selectedOption === 'Fully Online' && <Check className="w-3 h-3 text-white" />}
                  </div>
                  
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                    <Laptop className="w-6 h-6 text-[#0052CC]" />
                  </div>
                  
                  <h3 className="text-lg font-black text-[#001F3F] mb-2">Fully Online</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Minimal hassle, instant policy issuance.
                  </p>
                </button>

                {/* Advisor-Assisted */}
                <button
                  onClick={() => onSelect('Advisor-Assisted')}
                  className={cn(
                    "relative flex flex-col items-start p-8 rounded-3xl border-2 text-left transition-all group",
                    selectedOption === 'Advisor-Assisted'
                      ? "border-[#0052CC] bg-[#0052CC]/5"
                      : "border-gray-100 bg-gray-50 hover:border-gray-200"
                  )}
                >
                  <div className={cn(
                    "absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                    selectedOption === 'Advisor-Assisted' ? "border-[#0052CC] bg-[#0052CC]" : "border-gray-200 bg-white"
                  )}>
                    {selectedOption === 'Advisor-Assisted' && <Check className="w-3 h-3 text-white" />}
                  </div>
                  
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6 text-[#E91E63]" />
                  </div>
                  
                  <h3 className="text-lg font-black text-[#001F3F] mb-2">Advisor-Assisted</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Get help over phone/video call before buying.
                  </p>
                </button>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <button
                onClick={onClose}
                disabled={!selectedOption}
                className="bg-[#001F3F] text-white px-12 py-4 rounded-2xl font-bold hover:bg-[#002F5F] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
