import React from 'react';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { OnboardingData } from '../../types';
import { cn } from '../../lib/utils';

interface StepProps {
  data: OnboardingData;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function PlanSelection({ data, onUpdate, onNext, onBack }: StepProps) {
  const plans = [
    {
      id: 'takaful-1',
      name: 'Takaful 1',
      price: '150',
      features: [
        'Higher Funeral Expenses – RM10,000',
        'Emergency outpatient hours covered: 10 PM to 8 AM',
        'Government hospital daily cash allowance – RM200/day',
        'Hospitalisation limit: 180 days (normally 120)',
        'Free 24/7 teleconsultation access'
      ],
      tag: null,
      color: 'blue'
    },
    {
      id: 'takaful-2',
      name: 'Takaful 2',
      price: '200',
      features: [
        'Includes all benefits from Takaful 1',
        'Personal accident coverage up to RM50,000',
        'Family coverage extension available',
        'Pre- and post-hospitalisation up to 30 days',
        'Specialist outpatient treatment support'
      ],
      tag: 'POPULAR',
      color: 'blue'
    },
    {
      id: 'takaful-3',
      name: 'Takaful 3',
      price: '300',
      features: [
        'Includes all benefits from Takaful 1 & 2',
        'Mental health wellbeing app & risk mitigation',
        'Resources for physical, mental, financial support',
        'Second opinions from top specialists',
        'Maternity and newborn care add-on'
      ],
      tag: 'PREMIUM',
      color: 'purple'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-[#001F3F] mb-6">
          Please select your desired Takaful provider for your employee benefits.
        </h2>
        <p className="text-gray-500 text-lg">Compare our plans and choose the coverage that best fits your needs.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        {plans.map(plan => (
          <div 
            key={plan.id}
            className={cn(
              "relative bg-white rounded-[40px] p-10 border-2 transition-all flex flex-col",
              data.selectedPlanId === plan.id 
                ? (plan.color === 'purple' ? "border-[#7B61FF] shadow-xl shadow-purple-100" : "border-[#0052CC] shadow-xl shadow-blue-100")
                : "border-gray-100 hover:border-gray-200"
            )}
          >
            {plan.tag && (
              <div className={cn(
                "absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase text-white",
                plan.color === 'purple' ? "bg-[#7B61FF]" : "bg-[#007BFF]"
              )}>
                {plan.tag}
              </div>
            )}

            <div className="text-center mb-10">
              <div className={cn(
                "inline-block px-6 py-2 rounded-2xl text-sm font-bold mb-6",
                plan.color === 'purple' ? "bg-purple-50 text-[#7B61FF]" : "bg-blue-50 text-[#007BFF]"
              )}>
                {plan.name}
              </div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-black text-[#001F3F]">RM{plan.price}</span>
                <span className="text-gray-400 font-bold">/month</span>
              </div>
            </div>

            <div className="space-y-5 mb-10 flex-1">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                    plan.color === 'purple' ? "bg-purple-50 text-[#7B61FF]" : "bg-blue-50 text-[#007BFF]"
                  )}>
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-sm text-gray-600 leading-snug">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onUpdate({ selectedPlanId: plan.id })}
              className={cn(
                "w-full py-4 rounded-2xl font-bold transition-all transform hover:scale-[1.02]",
                data.selectedPlanId === plan.id
                  ? (plan.color === 'purple' ? "bg-[#7B61FF] text-white" : "bg-[#0052CC] text-white")
                  : (plan.color === 'purple' ? "bg-purple-50 text-[#7B61FF] hover:bg-purple-100" : "bg-[#007BFF] text-white hover:bg-[#0069D9]")
              )}
            >
              {data.selectedPlanId === plan.id ? 'Selected' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>

      <div className="text-center text-gray-400 text-xs mb-16 max-w-2xl mx-auto">
        Recommendation generated is based on the information you have provided and does not constitute a binding financial advice. Please consult your licensed FAR for detailed analysis.
      </div>

      {/* Comparison Table */}
      <div className="mb-16 bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-10 border-b border-gray-100">
          <h3 className="text-2xl font-bold text-[#001F3F]">Full Plan Comparison</h3>
          <p className="text-gray-500 text-sm">Detailed breakdown of benefits across all Takaful plans.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Benefits & Coverage</th>
                <th className="px-6 py-6 text-[10px] font-black text-[#007BFF] uppercase tracking-widest border-b border-gray-100 text-center">Takaful 1</th>
                <th className="px-6 py-6 text-[10px] font-black text-[#007BFF] uppercase tracking-widest border-b border-gray-100 text-center">Takaful 2</th>
                <th className="px-6 py-6 text-[10px] font-black text-[#7B61FF] uppercase tracking-widest border-b border-gray-100 text-center">Takaful 3</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { label: 'Funeral Expenses', v1: 'RM10,000', v2: 'RM10,000', v3: 'RM10,000' },
                { label: 'Emergency Outpatient (10PM-8AM)', v1: 'Included', v2: 'Included', v3: 'Included' },
                { label: 'Gov Hospital Cash Allowance', v1: 'RM200/day', v2: 'RM200/day', v3: 'RM200/day' },
                { label: 'Hospitalisation Limit', v1: '180 Days', v2: '180 Days', v3: '180 Days' },
                { label: '24/7 Teleconsultation', v1: 'Unlimited', v2: 'Unlimited', v3: 'Unlimited' },
                { label: 'Personal Accident Coverage', v1: '-', v2: 'RM50,000', v3: 'RM50,000' },
                { label: 'Family Coverage Extension', v1: '-', v2: 'Available', v3: 'Available' },
                { label: 'Pre/Post Hospitalisation (30 days)', v1: '-', v2: 'Included', v3: 'Included' },
                { label: 'Specialist Outpatient Support', v1: '-', v2: 'Included', v3: 'Included' },
                { label: 'Mental Health Wellbeing App', v1: '-', v2: '-', v3: 'Included' },
                { label: 'Maternity & Newborn Add-on', v1: '-', v2: '-', v3: 'Available' },
                { label: 'Second Medical Opinion', v1: '-', v2: '-', v3: 'Included' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-10 py-5 text-sm font-bold text-[#001F3F]">{row.label}</td>
                  <td className="px-6 py-5 text-sm text-center text-gray-600">{row.v1 === 'Included' || row.v1 === 'Unlimited' ? <Check className="w-4 h-4 mx-auto text-green-500" /> : row.v1}</td>
                  <td className="px-6 py-5 text-sm text-center text-gray-600">{row.v2 === 'Included' || row.v2 === 'Unlimited' || row.v2 === 'Available' ? <Check className="w-4 h-4 mx-auto text-green-500" /> : row.v2}</td>
                  <td className="px-6 py-5 text-sm text-center text-gray-600">{row.v3 === 'Included' || row.v3 === 'Unlimited' || row.v3 === 'Available' ? <Check className="w-4 h-4 mx-auto text-green-500" /> : row.v3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between">
        <button 
          onClick={onBack}
          className="px-10 py-4 rounded-xl font-bold text-[#001F3F] hover:bg-gray-50 transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <button 
          onClick={onNext}
          disabled={!data.selectedPlanId}
          className="bg-[#001F3F] text-white px-10 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-[#002F5F] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
