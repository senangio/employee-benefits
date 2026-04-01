import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Building2, Infinity, Users, AlertCircle, Check } from 'lucide-react';
import { OnboardingData } from '../../types';
import { cn } from '../../lib/utils';

interface StepProps {
  data: OnboardingData;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const BENEFITS = [
  'Hospitalisation',
  'Outpatient and Inpatient Coverage',
  'Term Life',
  'Critical Illness'
];

const AGE_GROUPS = [
  '25-40',
  '41-50',
  '51-60',
  'Above 60 years'
];

export default function CoverageNeeds({ data, onUpdate, onNext, onBack }: StepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleBenefit = (benefit: string) => {
    const current = data.importantBenefits || [];
    const next = current.includes(benefit)
      ? current.filter(b => b !== benefit)
      : [...current, benefit];
    onUpdate({ importantBenefits: next });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!data.annualBudget || isNaN(parseFloat(data.annualBudget))) {
      newErrors.annualBudget = 'Please enter a valid annual budget.';
    }

    if (!data.importantBenefits || data.importantBenefits.length === 0) {
      newErrors.importantBenefits = 'Please select at least one benefit.';
    }

    if (!data.marriedPercentage || isNaN(parseFloat(data.marriedPercentage))) {
      newErrors.marriedPercentage = 'Please enter the percentage of married employees.';
    }

    if (!data.averageAgeGroup) {
      newErrors.averageAgeGroup = 'Please select an average age group.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  const isFormValid = 
    data.annualBudget && 
    !isNaN(parseFloat(data.annualBudget)) &&
    data.importantBenefits.length > 0 &&
    data.marriedPercentage &&
    !isNaN(parseFloat(data.marriedPercentage)) &&
    data.averageAgeGroup;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl p-10 border border-gray-100 shadow-sm">
      <h2 className="text-3xl font-bold text-[#001F3F] mb-2">Coverage Needs</h2>
      <p className="text-gray-500 mb-10">Help us tailor the perfect employee benefits plan for your team's specific requirements.</p>

      <div className="space-y-10">
        {/* Budget */}
        <div>
          <label className="block text-sm font-bold text-[#001F3F] mb-3">What is your company's annual EB budget per employee? (RM) <span className="text-red-500">*</span></label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">RM</div>
            <input 
              type="number"
              value={data.annualBudget}
              onChange={(e) => onUpdate({ annualBudget: e.target.value })}
              placeholder="Enter budget amount"
              className={cn(
                "w-full bg-gray-50 border rounded-xl pl-12 pr-4 py-4 text-[#001F3F] focus:outline-none focus:ring-2 focus:ring-[#0052CC] transition-all",
                errors.annualBudget ? "border-red-500" : "border-gray-100"
              )}
            />
          </div>
          {errors.annualBudget && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.annualBudget}</p>}
        </div>

        {/* Important Benefit */}
        <div>
          <label className="block text-sm font-bold text-[#001F3F] mb-3">What is the most important benefit? (Select all that apply) <span className="text-red-500">*</span></label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {BENEFITS.map(benefit => {
              const isSelected = data.importantBenefits.includes(benefit);
              return (
                <button
                  key={benefit}
                  onClick={() => toggleBenefit(benefit)}
                  className={cn(
                    "flex items-center justify-between px-6 py-4 rounded-xl border text-left transition-all",
                    isSelected 
                      ? "bg-[#0052CC]/5 border-[#0052CC] text-[#0052CC]" 
                      : "bg-gray-50 border-gray-100 text-gray-600 hover:border-gray-200"
                  )}
                >
                  <span className="font-medium text-sm">{benefit}</span>
                  <div className={cn(
                    "w-5 h-5 rounded-md border flex items-center justify-center transition-all",
                    isSelected ? "bg-[#0052CC] border-[#0052CC]" : "bg-white border-gray-300"
                  )}>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                </button>
              );
            })}
          </div>
          {errors.importantBenefits && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.importantBenefits}</p>}
        </div>

        {/* Demographics */}
        <div className="bg-gray-50/50 border border-gray-100 rounded-3xl p-8 space-y-8">
          <div className="flex items-center gap-3 text-[#001F3F] font-bold">
            <Users className="w-5 h-5" />
            Employee demographics
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Percentage of married employees (%) <span className="text-red-500">*</span></label>
              <input 
                type="number"
                value={data.marriedPercentage}
                onChange={(e) => onUpdate({ marriedPercentage: e.target.value })}
                placeholder="e.g. 45"
                className={cn(
                  "w-full bg-white border rounded-xl px-4 py-3 text-[#001F3F] focus:outline-none focus:ring-2 focus:ring-[#0052CC]",
                  errors.marriedPercentage ? "border-red-500" : "border-gray-100"
                )}
              />
              {errors.marriedPercentage && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.marriedPercentage}</p>}
            </div>
            
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Average age group <span className="text-red-500">*</span></label>
              <select 
                value={data.averageAgeGroup}
                onChange={(e) => onUpdate({ averageAgeGroup: e.target.value })}
                className={cn(
                  "w-full bg-white border rounded-xl px-4 py-3 text-[#001F3F] focus:outline-none focus:ring-2 focus:ring-[#0052CC] appearance-none",
                  errors.averageAgeGroup ? "border-red-500" : "border-gray-100"
                )}
              >
                <option value="">Select Age Group</option>
                {AGE_GROUPS.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
              {errors.averageAgeGroup && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.averageAgeGroup}</p>}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <button 
            onClick={onBack}
            className="px-10 py-4 rounded-xl font-bold text-[#001F3F] hover:bg-gray-50 transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          <button 
            onClick={handleNext}
            disabled={!isFormValid}
            className="bg-[#001F3F] text-white px-10 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-[#002F5F] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
