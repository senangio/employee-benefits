import React, { useState, useEffect } from 'react';
import { Info, ArrowRight, AlertCircle } from 'lucide-react';
import { OnboardingData } from '../../types';

interface StepProps {
  data: OnboardingData;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

const INDUSTRIES = [
  'Manufacturing',
  'Construction & Engineering',
  'Oil & Gas / Utilities',
  'Transportation & Logistics',
  'Trading, Retail & Wholesale',
  'Information Technology & Telecommunications',
  'Financial & Professional Services',
  'Education',
  'Healthcare & Pharmaceuticals',
  'Hospitality & Food & Beverage',
  'Government / GLC / Statutory Body',
  'Others'
];

export default function CompanyInfo({ data, onUpdate, onNext }: StepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (data.companyName.length < 3) {
      newErrors.companyName = 'Company name must be at least 3 characters.';
    }

    if (!data.registrationNumber) {
      newErrors.registrationNumber = 'Company registration number is required.';
    } else if (!/^[a-zA-Z0-9]+$/.test(data.registrationNumber)) {
      newErrors.registrationNumber = 'Registration number must be alphanumeric.';
    }

    const numEmployees = parseInt(data.numberOfEmployees);
    if (!data.numberOfEmployees || isNaN(numEmployees) || numEmployees <= 0) {
      newErrors.numberOfEmployees = 'Number of employees must be greater than 0.';
    }

    if (!data.industry) {
      newErrors.industry = 'Please select an industry.';
    }

    if (data.hasExistingCoverage && !data.policyExpiryDate) {
      newErrors.policyExpiryDate = 'Policy expiry date is required.';
    }

    if (!data.personInCharge) {
      newErrors.personInCharge = 'Person in charge is required.';
    }

    if (!data.picContactNumber) {
      newErrors.picContactNumber = 'Contact number is required.';
    } else if (!/^\d{9,12}$/.test(data.picContactNumber)) {
      newErrors.picContactNumber = 'Contact number must be 9-12 digits.';
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
    data.companyName.length >= 3 &&
    data.registrationNumber &&
    /^[a-zA-Z0-9]+$/.test(data.registrationNumber) &&
    parseInt(data.numberOfEmployees) > 0 &&
    data.industry &&
    (!data.hasExistingCoverage || data.policyExpiryDate) &&
    data.personInCharge &&
    /^\d{9,12}$/.test(data.picContactNumber);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl p-10 border border-gray-100 shadow-sm">
      <h2 className="text-3xl font-bold text-[#001F3F] mb-2">Company Information</h2>
      <p className="text-gray-500 mb-10">Please provide your company details to begin the onboarding process.</p>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-[#001F3F] mb-2">Company Name <span className="text-red-500">*</span></label>
            <input 
              type="text"
              value={data.companyName}
              onChange={(e) => onUpdate({ companyName: e.target.value })}
              placeholder="Enter company name"
              className={`w-full bg-gray-50 border ${errors.companyName ? 'border-red-500' : 'border-gray-100'} rounded-xl px-4 py-3 text-[#001F3F] focus:outline-none focus:ring-2 focus:ring-[#0052CC] transition-all`}
            />
            {errors.companyName && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.companyName}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-[#001F3F] mb-2">Company Registration Number <span className="text-red-500">*</span></label>
            <input 
              type="text"
              value={data.registrationNumber}
              onChange={(e) => onUpdate({ registrationNumber: e.target.value })}
              placeholder="e.g. 1234567A"
              className={`w-full bg-gray-50 border ${errors.registrationNumber ? 'border-red-500' : 'border-gray-100'} rounded-xl px-4 py-3 text-[#001F3F] focus:outline-none focus:ring-2 focus:ring-[#0052CC] transition-all`}
            />
            {errors.registrationNumber && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.registrationNumber}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-[#001F3F] mb-2">Number of Employees <span className="text-red-500">*</span></label>
            <input 
              type="number"
              value={data.numberOfEmployees}
              onChange={(e) => onUpdate({ numberOfEmployees: e.target.value })}
              placeholder="0"
              min="1"
              className={`w-full bg-gray-50 border ${errors.numberOfEmployees ? 'border-red-500' : 'border-gray-100'} rounded-xl px-4 py-3 text-[#001F3F] focus:outline-none focus:ring-2 focus:ring-[#0052CC] transition-all`}
            />
            {errors.numberOfEmployees && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.numberOfEmployees}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-[#001F3F] mb-2">Industry <span className="text-red-500">*</span></label>
            <select 
              value={data.industry}
              onChange={(e) => onUpdate({ industry: e.target.value })}
              className={`w-full bg-gray-50 border ${errors.industry ? 'border-red-500' : 'border-gray-100'} rounded-xl px-4 py-3 text-[#001F3F] focus:outline-none focus:ring-2 focus:ring-[#0052CC] transition-all appearance-none`}
            >
              <option value="">Select Industry</option>
              {INDUSTRIES.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
            {errors.industry && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.industry}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-[#001F3F] mb-2">Existing EB Coverage? <span className="text-red-500">*</span></label>
            <div className="flex gap-4">
              <button
                onClick={() => onUpdate({ hasExistingCoverage: true })}
                className={`flex-1 py-3 rounded-xl font-bold border transition-all ${data.hasExistingCoverage ? 'bg-[#001F3F] text-white border-[#001F3F]' : 'bg-gray-50 text-gray-500 border-gray-100 hover:border-gray-200'}`}
              >
                Yes
              </button>
              <button
                onClick={() => onUpdate({ hasExistingCoverage: false, policyExpiryDate: '' })}
                className={`flex-1 py-3 rounded-xl font-bold border transition-all ${!data.hasExistingCoverage ? 'bg-[#001F3F] text-white border-[#001F3F]' : 'bg-gray-50 text-gray-500 border-gray-100 hover:border-gray-200'}`}
              >
                No
              </button>
            </div>
          </div>

          {data.hasExistingCoverage && (
            <div>
              <label className="block text-sm font-bold text-[#001F3F] mb-2">Policy Expiry Date <span className="text-red-500">*</span></label>
              <input 
                type="date"
                value={data.policyExpiryDate}
                onChange={(e) => onUpdate({ policyExpiryDate: e.target.value })}
                className={`w-full bg-gray-50 border ${errors.policyExpiryDate ? 'border-red-500' : 'border-gray-100'} rounded-xl px-4 py-3 text-[#001F3F] focus:outline-none focus:ring-2 focus:ring-[#0052CC] transition-all`}
              />
              {errors.policyExpiryDate && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.policyExpiryDate}</p>}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-[#001F3F] mb-2">Person in Charge <span className="text-red-500">*</span></label>
            <input 
              type="text"
              value={data.personInCharge}
              onChange={(e) => onUpdate({ personInCharge: e.target.value })}
              placeholder="Full Name"
              className={`w-full bg-gray-50 border ${errors.personInCharge ? 'border-red-500' : 'border-gray-100'} rounded-xl px-4 py-3 text-[#001F3F] focus:outline-none focus:ring-2 focus:ring-[#0052CC] transition-all`}
            />
            {errors.personInCharge && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.personInCharge}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-[#001F3F] mb-2">PIC Contact Number <span className="text-red-500">*</span></label>
            <input 
              type="tel"
              value={data.picContactNumber}
              onChange={(e) => onUpdate({ picContactNumber: e.target.value })}
              placeholder="e.g. 0123456789"
              className={`w-full bg-gray-50 border ${errors.picContactNumber ? 'border-red-500' : 'border-gray-100'} rounded-xl px-4 py-3 text-[#001F3F] focus:outline-none focus:ring-2 focus:ring-[#0052CC] transition-all`}
            />
            {errors.picContactNumber && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.picContactNumber}</p>}
          </div>
        </div>

        <div className="flex justify-end pt-4">
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
