import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';
import { Employee } from '../types';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (employee: Omit<Employee, 'id'>) => void;
}

export default function AddEmployeeModal({ isOpen, onClose, onConfirm }: AddEmployeeModalProps) {
  const [formData, setFormData] = React.useState({
    fullName: '',
    nric: '',
    email: '',
    maritalStatus: 'Single' as any,
    positionLevel: 'Executive' as any,
    gtlSumCovered: '50K',
    ghsPlan: 'RB150',
    ghsType: 'EO' as any
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (isOpen) {
      setFormData({
        fullName: '',
        nric: '',
        email: '',
        maritalStatus: 'Single',
        positionLevel: 'Executive',
        gtlSumCovered: '50K',
        ghsPlan: 'RB150',
        ghsType: 'EO'
      });
      setErrors({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.nric.trim()) newErrors.nric = 'NRIC is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onConfirm(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 flex flex-col">
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <div>
            <h3 className="text-xl font-black text-[#001F3F]">Add Employee</h3>
            <p className="text-sm text-gray-400 font-bold mt-1">Insert employee information</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-[#001F3F]">Full Name</label>
                <input
                  type="text"
                  placeholder="Ahmad Faizal bin Roslan"
                  className={cn(
                    "w-full px-4 py-3 rounded-xl border-2 transition-all outline-none",
                    errors.fullName ? "border-red-100 bg-red-50 focus:border-red-300" : "border-gray-100 focus:border-[#0052CC]"
                  )}
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
                {errors.fullName && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.fullName}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#001F3F]">NRIC</label>
                <input
                  type="text"
                  placeholder="960707-43-5111"
                  className={cn(
                    "w-full px-4 py-3 rounded-xl border-2 transition-all outline-none",
                    errors.nric ? "border-red-100 bg-red-50 focus:border-red-300" : "border-gray-100 focus:border-[#0052CC]"
                  )}
                  value={formData.nric}
                  onChange={(e) => setFormData({ ...formData, nric: e.target.value })}
                />
                {errors.nric && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.nric}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#001F3F]">Email Address</label>
                <input
                  type="email"
                  placeholder="faizal@gmail.com"
                  className={cn(
                    "w-full px-4 py-3 rounded-xl border-2 transition-all outline-none",
                    errors.email ? "border-red-100 bg-red-50 focus:border-red-300" : "border-gray-100 focus:border-[#0052CC]"
                  )}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#001F3F]">Marital Status</label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 transition-all outline-none appearance-none bg-white focus:border-[#0052CC] font-medium"
                    value={formData.maritalStatus}
                    onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value as any })}
                  >
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#001F3F]">Position Level</label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 transition-all outline-none appearance-none bg-white focus:border-[#0052CC] font-medium"
                    value={formData.positionLevel}
                    onChange={(e) => setFormData({ ...formData, positionLevel: e.target.value as any })}
                  >
                    <option value="Executive">Executive</option>
                    <option value="Senior Executive">Senior Executive</option>
                    <option value="Assistant Manager">Assistant Manager</option>
                    <option value="Manager">Manager</option>
                    <option value="Director">Director</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 italic leading-relaxed">
              Note: All added employees are subject to the insurance or takaful company's AMLA and other regulatory screenings. Coverage is not confirmed until approval is received from the insurance or takaful provider.
            </p>
          </form>
        </div>

        <div className="px-8 py-6 border-t border-gray-100 flex items-center justify-center gap-4 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-12 py-4 rounded-xl text-sm font-black text-white bg-[#FF5C5C] hover:bg-[#FF4545] transition-all active:scale-95 shadow-lg shadow-red-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-12 py-4 rounded-xl text-sm font-black text-white bg-[#007BFF] hover:bg-[#0069D9] transition-all shadow-lg shadow-blue-100 active:scale-95"
          >
            Add Employee
          </button>
        </div>
      </div>
    </div>
  );
}
