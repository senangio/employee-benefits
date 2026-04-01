import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';
import { Employee } from '../types';

interface EditEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (updates: Partial<Employee>) => void;
  employee: Employee | null;
}

export default function EditEmployeeModal({ isOpen, onClose, onConfirm, employee }: EditEmployeeModalProps) {
  const [formData, setFormData] = React.useState({
    fullName: '',
    nric: '',
    email: '',
    maritalStatus: '' as any,
    positionLevel: '' as any,
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (isOpen && employee) {
      setFormData({
        fullName: employee.fullName,
        nric: employee.nric,
        email: employee.email,
        maritalStatus: employee.maritalStatus,
        positionLevel: employee.positionLevel,
      });
      setErrors({});
    }
  }, [isOpen, employee]);

  if (!isOpen || !employee) return null;

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
      <div className="bg-white rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-xl font-black text-[#001F3F]">Edit Employee</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-[#001F3F]">Full Name *</label>
              <input
                type="text"
                placeholder="Enter full name"
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
              <label className="text-sm font-bold text-[#001F3F]">NRIC *</label>
              <input
                type="text"
                placeholder="e.g., 901020-05-6773"
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
              <label className="text-sm font-bold text-[#001F3F]">Email Address *</label>
              <input
                type="email"
                placeholder="Enter email address"
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
              <label className="text-sm font-bold text-[#001F3F]">Marital Status *</label>
              <select
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 transition-all outline-none appearance-none bg-white focus:border-[#0052CC]"
                value={formData.maritalStatus}
                onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value as any })}
              >
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-[#001F3F]">Position Level *</label>
              <select
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 transition-all outline-none appearance-none bg-white focus:border-[#0052CC]"
                value={formData.positionLevel}
                onChange={(e) => setFormData({ ...formData, positionLevel: e.target.value as any })}
              >
                <option value="Executive">Executive</option>
                <option value="Senior Executive">Senior Executive</option>
                <option value="Assistant Manager">Assistant Manager</option>
                <option value="Manager">Manager</option>
                <option value="Director">Director</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-xl text-sm font-bold bg-[#0052CC] text-white hover:bg-[#0041A3] transition-all shadow-lg shadow-blue-100 active:scale-95"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
