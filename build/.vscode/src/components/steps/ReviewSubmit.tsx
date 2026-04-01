import React, { useState } from 'react';
import { CheckCircle2, ArrowLeft, Loader2 } from 'lucide-react';
import { OnboardingData } from '../../types';
import { cn } from '../../lib/utils';

interface StepProps {
  data: OnboardingData;
  onBack: () => void;
}

export default function ReviewSubmit({ data, onBack }: StepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [declarations, setDeclarations] = useState({
    tax: true,
    accuracy: true,
    commission: true,
    consent: true,
    terms: true,
    quotation: true
  });

  const allChecked = Object.values(declarations).every(v => v);

  const handleSubmit = async () => {
    if (!allChecked) return;
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 bg-white rounded-[40px] shadow-sm border border-gray-100">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-4xl font-black text-[#001F3F] mb-4">Submission Successful!</h2>
        <p className="text-gray-500 mb-10 px-12">
          Your premium quotation has been submitted successfully. Our team will review your details and contact {data.personInCharge} at {data.picContactNumber} within 24 hours.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-[#0052CC] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#0041A3] transition-all"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="bg-white rounded-[40px] p-12 border border-gray-100 shadow-sm mb-8">
        <div className="mb-10">
          <h2 className="text-2xl font-black text-[#001F3F] mb-2">Premium Summary Details</h2>
          <p className="text-gray-400 font-bold text-sm">Please review the summary of your premium quotation.</p>
        </div>

        <div className="space-y-6 mb-10">
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Takaful Provider</div>
            <div className="text-lg font-black text-[#001F3F]">Takaful 2</div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Group Employee Benefits Plan 1</div>
            <div className="text-lg font-black text-[#001F3F]">Group Plan - Employee Benefits 1</div>
          </div>
        </div>

        <div className="mb-10">
          <div className="text-sm font-bold text-[#001F3F] mb-4">Estimated Premium Details</div>
          <div className="overflow-hidden rounded-xl border border-gray-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0052CC] text-white">
                  <th className="px-4 py-4 text-xs font-bold border-r border-white/20">Scheme</th>
                  <th className="px-4 py-4 text-xs font-bold border-r border-white/20">Coverage Description</th>
                  <th className="px-4 py-4 text-xs font-bold text-right border-r border-white/20">Premium (RM)</th>
                  <th className="px-4 py-4 text-xs font-bold text-right border-r border-white/20">8% Service Tax (RM)</th>
                  <th className="px-4 py-4 text-xs font-bold text-right">Total Inclusive 8% Service Tax (RM)</th>
                </tr>
              </thead>
              <tbody className="text-xs text-[#001F3F]">
                <tr className="border-b border-gray-100">
                  <td rowSpan={6} className="px-4 py-4 font-medium border-r border-gray-100 align-top">Compulsory</td>
                  <td className="px-4 py-4 border-r border-gray-100">Hospitalisation</td>
                  <td className="px-4 py-4 text-right border-r border-gray-100">10,000.00</td>
                  <td className="px-4 py-4 text-right border-r border-gray-100">800.00</td>
                  <td className="px-4 py-4 text-right">10,800.00</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-4 border-r border-gray-100">Inpatient Coverage</td>
                  <td className="px-4 py-4 text-right border-r border-gray-100">2,000.00</td>
                  <td className="px-4 py-4 text-right border-r border-gray-100">160.00</td>
                  <td className="px-4 py-4 text-right">2,160.00</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-4 border-r border-gray-100">Outpatient Coverage</td>
                  <td className="px-4 py-4 text-right border-r border-gray-100">1,000.00</td>
                  <td className="px-4 py-4 text-right border-r border-gray-100">80.00</td>
                  <td className="px-4 py-4 text-right">1,080.00</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-4 border-r border-gray-100">Term Life</td>
                  <td className="px-4 py-4 text-right border-r border-gray-100">5,000.00</td>
                  <td className="px-4 py-4 text-right border-r border-gray-100">400.00</td>
                  <td className="px-4 py-4 text-right">5,400.00</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-4 border-r border-gray-100">Critical Illness</td>
                  <td className="px-4 py-4 text-right border-r border-gray-100">5,000.00</td>
                  <td className="px-4 py-4 text-right border-r border-gray-100">400.00</td>
                  <td className="px-4 py-4 text-right">5,400.00</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-4 border-r border-gray-100">MCO Charges</td>
                  <td className="px-4 py-4 text-right border-r border-gray-100">2,500.00</td>
                  <td className="px-4 py-4 text-right border-r border-gray-100">200.00</td>
                  <td className="px-4 py-4 text-right">2,700.00</td>
                </tr>
                <tr className="bg-gray-50 font-black">
                  <td colSpan={2} className="px-4 py-4 text-right border-r border-gray-100 uppercase">Total Gross Contribution</td>
                  <td className="px-4 py-4 text-right border-r border-gray-100">12,000.00</td>
                  <td className="px-4 py-4 text-right border-r border-gray-100">-</td>
                  <td className="px-4 py-4 text-right">14,040.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-10">
          <div className="text-sm font-bold text-[#001F3F] mb-4">Contribution Summary</div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase">Gross Contribution</span>
                <p className="text-[10px] text-gray-300 italic">Includes a 10% commission of RM 1,200.00</p>
              </div>
              <span className="text-sm font-black text-[#001F3F]">RM 12,000.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-gray-400 uppercase">SST (8%)</span>
              <span className="text-sm font-black text-[#001F3F]">RM 2,040.00</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <span className="text-sm font-black text-[#001F3F] uppercase">Total Contribution</span>
              <span className="text-xl font-black text-[#001F3F]">RM 14,040.00</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-12">
          {[
            { id: 'tax', text: 'The applicable government tax shall be based on the prevailing rate and is subject to change in accordance with the laws of Malaysia. Kindly note that this quotation is invalid should there be any material changes in the information provided. Waiting period of 30 days is applicable to all employees and their dependents. Waiting period of 120 days for Pre-Existing Conditions is applicable to all employees and their dependents. Waiting period of 120 days for Specific Illnesses is applicable to all employees and their dependents.' },
            { id: 'accuracy', text: 'I understand that I must accurately answer all questions in this proposal form and declare that I have done so. I agree that this proposal and declaration form form the basis of the contract with Takaful 2, accepting the policy\'s terms and conditions. Coverage will be effective only upon the Company\'s acceptance and payment of the applicable premium. I acknowledge that all terms have been explained to me, and I fully understand them. I consent to the use and processing of my personal data for this proposal and its disclosure to relevant third parties associated with Takaful 2. I authorize any medical professionals or institutions with knowledge of my health to disclose information to Takaful 2. A photocopy of this authorisation is as valid as the original. I consent to Takaful 2 using my information for marketing and promotional purposes, including disclosure to related companies and third parties.' },
            { id: 'commission', text: 'A commission free takaful or insurance coverage is available through the takaful or insurance operator\'s website. By continuing, I agree that I am opting out from this option.' },
            { id: 'consent', text: 'I hereby consent to the processing of my personal data for marketing and promotional purposes by other service providers and/or other related services of business partners, with whom Takaful 2 maintains business referral or other arrangements.' },
            { id: 'terms', text: 'I hereby confirm that I have read and understood the terms of the above, Product Disclosure Sheet, Policy Wording and agree to be bound by the terms and conditions stipulated therein.' },
            { id: 'quotation', text: 'I acknowledge that the insurance or takaful premium provided in this submission is a preliminary quotation and is subject to change based on the final quotation provided by the insurance or takaful provider.' }
          ].map((item) => (
            <label key={item.id} className="flex gap-4 cursor-pointer group">
              <div className="pt-1">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-300 text-[#0052CC] focus:ring-[#0052CC]"
                  checked={declarations[item.id as keyof typeof declarations]}
                  onChange={(e) => setDeclarations(prev => ({ ...prev, [item.id]: e.target.checked }))}
                />
              </div>
              <span className="text-[11px] text-[#001F3F] leading-relaxed group-hover:text-[#0052CC] transition-colors">
                {item.text}
                {item.id === 'terms' && (
                  <>
                    , <a href="#" className="text-[#0052CC] font-bold hover:underline">Product Disclosure Sheet</a>, <a href="#" className="text-[#0052CC] font-bold hover:underline">Policy Wording</a>
                  </>
                )}
              </span>
            </label>
          ))}
        </div>

        <div className="flex justify-center">
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting || !allChecked}
            className={cn(
              "w-full max-w-md bg-[#0052CC] text-white py-5 rounded-xl font-black text-sm flex items-center justify-center gap-3 transition-all shadow-lg shadow-blue-100 active:scale-[0.98]",
              (!allChecked || isSubmitting) && "opacity-50 cursor-not-allowed"
            )}
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit Quotation'}
          </button>
        </div>
      </div>

      <p className="text-[10px] text-gray-400 text-center italic mb-12">
        Disclaimer: Please note that the prices shown are for illustration purposes only and do not represent actual quotations. Final pricing is subject to underwriting, plan selection, and insurer or takaful provider approval.
      </p>

      <div className="flex justify-start">
        <button 
          onClick={onBack}
          className="px-10 py-4 rounded-xl font-bold text-[#001F3F] hover:bg-gray-50 transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
      </div>
    </div>
  );
}
