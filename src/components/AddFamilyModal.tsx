import React from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface FamilyMember {
  fullName: string;
  relationship: string;
  icNumber: string;
  contactNumber: string;
}

interface AddFamilyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (familyMembers: FamilyMember[]) => void;
  initialData?: FamilyMember[];
}

export default function AddFamilyModal({ isOpen, onClose, onConfirm, initialData }: AddFamilyModalProps) {
  const [members, setMembers] = React.useState<FamilyMember[]>(
    initialData && initialData.length > 0 
      ? initialData 
      : [{ fullName: '', relationship: '', icNumber: '', contactNumber: '' }]
  );

  const [errors, setErrors] = React.useState<Record<number, Record<string, string>>>({});

  React.useEffect(() => {
    if (isOpen) {
      if (initialData && initialData.length > 0) {
        setMembers(initialData);
      } else {
        setMembers([{ fullName: '', relationship: '', icNumber: '', contactNumber: '' }]);
      }
      setErrors({});
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<number, Record<string, string>> = {};
    let isValid = true;

    members.forEach((member, index) => {
      const memberErrors: Record<string, string> = {};
      if (!member.fullName.trim()) memberErrors.fullName = 'Full Name is required';
      if (!member.relationship) memberErrors.relationship = 'Relationship is required';
      
      const icRegex = /^\d{12}$/;
      if (!member.icNumber) {
        memberErrors.icNumber = 'IC Number is required';
      } else if (!icRegex.test(member.icNumber.replace(/-/g, ''))) {
        memberErrors.icNumber = 'IC Number must be exactly 12 digits';
      }

      const contactRegex = /^\d+$/;
      if (!member.contactNumber) {
        memberErrors.contactNumber = 'Contact Number is required';
      } else if (!contactRegex.test(member.contactNumber.replace(/[-+]/g, ''))) {
        memberErrors.contactNumber = 'Contact Number must be numeric';
      }

      if (Object.keys(memberErrors).length > 0) {
        newErrors[index] = memberErrors;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onConfirm(members);
    }
  };

  const addMember = () => {
    setMembers([...members, { fullName: '', relationship: '', icNumber: '', contactNumber: '' }]);
  };

  const removeMember = (index: number) => {
    if (members.length > 1) {
      setMembers(members.filter((_, i) => i !== index));
      const newErrors = { ...errors };
      delete newErrors[index];
      setErrors(newErrors);
    }
  };

  const updateMember = (index: number, updates: Partial<FamilyMember>) => {
    const newMembers = [...members];
    newMembers[index] = { ...newMembers[index], ...updates };
    setMembers(newMembers);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-[32px] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 flex flex-col">
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <h3 className="text-xl font-black text-[#001F3F]">Add Family Members</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          <form onSubmit={handleSubmit} className="space-y-12">
            {members.map((member, index) => (
              <div key={index} className="relative p-6 rounded-2xl border-2 border-gray-50 bg-gray-50/30">
                {members.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMember(index)}
                    className="absolute -top-3 -right-3 p-2 bg-white border border-gray-100 rounded-full text-red-500 shadow-sm hover:bg-red-50 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#001F3F]">Full Name *</label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border-2 transition-all outline-none",
                        errors[index]?.fullName ? "border-red-100 bg-red-50 focus:border-red-300" : "border-gray-100 focus:border-[#0052CC]"
                      )}
                      value={member.fullName}
                      onChange={(e) => updateMember(index, { fullName: e.target.value })}
                    />
                    {errors[index]?.fullName && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors[index].fullName}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#001F3F]">Relationship *</label>
                    <select
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border-2 transition-all outline-none appearance-none bg-white",
                        errors[index]?.relationship ? "border-red-100 bg-red-50 focus:border-red-300" : "border-gray-100 focus:border-[#0052CC]"
                      )}
                      value={member.relationship}
                      onChange={(e) => updateMember(index, { relationship: e.target.value })}
                    >
                      <option value="">Select relationship</option>
                      <option value="Son">Son</option>
                      <option value="Daughter">Daughter</option>
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Father-in-law">Father-in-law</option>
                      <option value="Mother-in-law">Mother-in-law</option>
                      <option value="Others">Others</option>
                    </select>
                    {errors[index]?.relationship && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors[index].relationship}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#001F3F]">IC Number *</label>
                    <input
                      type="text"
                      placeholder="e.g., 901020-05-6773"
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border-2 transition-all outline-none",
                        errors[index]?.icNumber ? "border-red-100 bg-red-50 focus:border-red-300" : "border-gray-100 focus:border-[#0052CC]"
                      )}
                      value={member.icNumber}
                      onChange={(e) => updateMember(index, { icNumber: e.target.value })}
                    />
                    {errors[index]?.icNumber && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors[index].icNumber}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#001F3F]">Contact Number *</label>
                    <input
                      type="text"
                      placeholder="e.g., 012-3456789"
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border-2 transition-all outline-none",
                        errors[index]?.contactNumber ? "border-red-100 bg-red-50 focus:border-red-300" : "border-gray-100 focus:border-[#0052CC]"
                      )}
                      value={member.contactNumber}
                      onChange={(e) => updateMember(index, { contactNumber: e.target.value })}
                    />
                    {errors[index]?.contactNumber && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors[index].contactNumber}</p>}
                  </div>
                </div>
              </div>
            ))}
          </form>
        </div>

        <div className="px-8 py-6 border-t border-gray-100 flex items-center justify-between flex-shrink-0">
          <button
            type="button"
            onClick={addMember}
            className="px-6 py-3 rounded-xl text-sm font-bold bg-[#0052CC] text-white hover:bg-[#0041A3] transition-all flex items-center gap-2 shadow-lg shadow-blue-100 active:scale-95"
          >
            Add Family Member <Plus className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-8 py-3 rounded-xl text-sm font-bold bg-[#0052CC] text-white hover:bg-[#0041A3] transition-all shadow-lg shadow-blue-100 active:scale-95"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
