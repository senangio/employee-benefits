import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ConsentModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onClose: () => void;
}

export default function ConsentModal({ isOpen, onAccept, onClose }: ConsentModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-[32px] p-12 shadow-2xl z-[101]"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#001F3F] mb-4">Company Acknowledgement & Consent</h2>
              <p className="text-gray-400 text-sm">
                To proceed, you are required the company acknowledgement and accept the consent.
              </p>
            </div>

            <div className="space-y-6 text-gray-700 leading-relaxed mb-10">
              <p className="font-medium">
                By submitting employee details to obtain quotations for employee benefits, the company confirms that:
              </p>
              
              <ul className="space-y-4 list-disc pl-6">
                <li>
                  All necessary consents have been obtained from the employees for the use and disclosure of their personal data; and
                </li>
                <li>
                  The data may be shared with insurance or takaful providers and their affiliated business partners for quotation, marketing, or promotional purposes, in accordance with applicable data protection laws.
                </li>
              </ul>
            </div>

            <div className="flex justify-center">
              <button
                onClick={onAccept}
                className="bg-[#007BFF] text-white px-12 py-4 rounded-xl font-bold hover:bg-[#0069D9] transition-all transform hover:scale-105"
              >
                I ACCEPT
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
