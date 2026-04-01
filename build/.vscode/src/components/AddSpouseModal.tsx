import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';

interface AddSpouseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (spouseInfo: {
    fullName: string;
    relationship: string;
    icNumber: string;
    contactNumber: string;
  }) => void;
  initialData?: {
    fullName: string;
    relationship: string;
    icNumber: string;
    contactNumber: string;
  };
}

export default function AddSpouseModal({ isOpen, onClose, onConfirm, initialData }: AddSpouseModalProps) {
  const [formData, setFormData] = React.useState({
    fullName: initialData?.fullName || '',
    relationship: initialData?.relationship || '',
    icNumber: initialData?.icNumber || '',
    contactNumber: initialData?.contactNumber || '',
  });

  React.useEffect(() => {
    if (isOpen && initialData) {
      setFormData({
        fullName: initialData.fullName,
        relationship: initialData.relationship,
        icNumber: initialData.icNumber,
        contactNumber: initialData.contactNumber,
      });
    } else if (isOpen) {
      setFormData({
        fullName: '',
        relationship: '',
        icNumber: '',
        contactNumber: '',
      });
    }
  }, [isOpen, initialData]);

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.relationship) newErrors.relationship = 'Relationship is required';
    
    // IC Number: Exactly 12 digits
    const icRegex = /^\d{12}$/;
    if (!formData.icNumber) {
      newErrors.icNumber = 'IC Number is required';
    } else if (!icRegex.test(formData.icNumber.replace(/-/g, ''))) {
      newErrors.icNumber = 'IC Number must be exactly 12 digits';
    }

    // Contact Number: Numeric
    const contactRegex = /^\d+$/;
    if (!formData.contactNumber) {
      newErrors.contactNumber = 'Contact Number is required';
    } else if (!contactRegex.test(formData.contactNumber.replace(/[-+]/g, ''))) {
      newErrors.contactNumber = 'Contact Number must be numeric';
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
          <h3 className="text-xl font-black text-[#001F3F]">Add Spouse</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
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
              <label className="text-sm font-bold text-[#001F3F]">Relationship *</label>
              <select
                className={cn(
                  "w-full px-4 py-3 rounded-xl border-2 transition-all outline-none appearance-none bg-white",
                  errors.relationship ? "border-red-100 bg-red-50 focus:border-red-300" : "border-gray-100 focus:border-[#0052CC]"
                )}
                value={formData.relationship}
                onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
              >
                <option value="">Select relationship</option>
                <option value="Spouse">Spouse</option>
                <option value="Partner">Partner</option>
              </select>
              {errors.relationship && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.relationship}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-[#001F3F]">IC Number *</label>
              <input
                type="text"
                placeholder="e.g., 901020-05-6773"
                className={cn(
                  "w-full px-4 py-3 rounded-xl border-2 transition-all outline-none",
                  errors.icNumber ? "border-red-100 bg-red-50 focus:border-red-300" : "border-gray-100 focus:border-[#0052CC]"
                )}
                value={formData.icNumber}
                onChange={(e) => setFormData({ ...formData, icNumber: e.target.value })}
              />
              {errors.icNumber && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.icNumber}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-[#001F3F]">Contact Number *</label>
              <input
                type="text"
                placeholder="e.g., 012-3456789"
                className={cn(
                  "w-full px-4 py-3 rounded-xl border-2 transition-all outline-none",
                  errors.contactNumber ? "border-red-100 bg-red-50 focus:border-red-300" : "border-gray-100 focus:border-[#0052CC]"
                )}
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
              />
              {errors.contactNumber && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.contactNumber}</p>}
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
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
