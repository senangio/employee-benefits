import React from 'react';
import { Plus, Upload, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight, ExternalLink, MoreHorizontal, Maximize2, Minimize2, Trash2, Pencil } from 'lucide-react';
import { OnboardingData, Employee } from '../../types';
import { cn } from '../../lib/utils';
import AddSpouseModal from '../AddSpouseModal';
import AddFamilyModal from '../AddFamilyModal';
import EditEmployeeModal from '../EditEmployeeModal';
import AddEmployeeModal from '../AddEmployeeModal';
import UploadExcelModal from '../UploadExcelModal';

interface StepProps {
  data: OnboardingData;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function InsuredDetails({ data, onUpdate, onNext, onBack }: StepProps) {
  const [isFullView, setIsFullView] = React.useState(false);
  const [isSpouseModalOpen, setIsSpouseModalOpen] = React.useState(false);
  const [isFamilyModalOpen, setIsFamilyModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false);
  const [activeEmployeeId, setActiveEmployeeId] = React.useState<string | null>(null);
  const [previousGhsType, setPreviousGhsType] = React.useState<Record<string, string>>({});

  const planDetails: Record<string, any> = {
    'takaful-1': { name: 'TAKAFUL 1', price: '150', color: 'blue' },
    'takaful-2': { name: 'TAKAFUL 2', price: '200', color: 'blue' },
    'takaful-3': { name: 'TAKAFUL 3', price: '300', color: 'purple' },
  };

  const selectedPlan = planDetails[data.selectedPlanId || 'takaful-2'];

  const updateEmployee = (id: string, updates: Partial<Employee>) => {
    const newEmployees = data.employees.map(emp => 
      emp.id === id ? { ...emp, ...updates } : emp
    );
    onUpdate({ employees: newEmployees });
  };

  const removeEmployee = (id: string) => {
    onUpdate({ employees: data.employees.filter(emp => emp.id !== id) });
  };

  const handleAddEmployee = (newEmployeeData: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      id: Math.random().toString(36).substr(2, 9),
      ...newEmployeeData
    };
    onUpdate({ employees: [...data.employees, newEmployee] });
    setIsAddModalOpen(false);
  };

  const handleUploadExcel = (file: File) => {
    // In a real app, we would parse the file here
    console.log('Uploading file:', file.name);
    // For demo, we'll just close the modal
    setIsUploadModalOpen(false);
  };

  const totalContribution = parseInt(selectedPlan?.price || '0') * parseInt(data.numberOfEmployees || '0');

  const handleGhsTypeChange = (id: string, value: string) => {
    const employee = data.employees.find(e => e.id === id);
    if (!employee) return;

    if (value === 'ES') {
      setPreviousGhsType(prev => ({ ...prev, [id]: employee.ghsType }));
      setActiveEmployeeId(id);
      setIsSpouseModalOpen(true);
      // We don't update the state yet, wait for modal confirmation
    } else if (value === 'EF') {
      setPreviousGhsType(prev => ({ ...prev, [id]: employee.ghsType }));
      setActiveEmployeeId(id);
      setIsFamilyModalOpen(true);
    } else {
      updateEmployee(id, { ghsType: value as any });
    }
  };

  const handleSpouseConfirm = (spouseInfo: any) => {
    if (activeEmployeeId) {
      updateEmployee(activeEmployeeId, { 
        ghsType: 'ES',
        spouseInfo 
      });
    }
    setIsSpouseModalOpen(false);
    setActiveEmployeeId(null);
  };

  const handleSpouseCancel = () => {
    setIsSpouseModalOpen(false);
    setActiveEmployeeId(null);
  };

  const handleFamilyConfirm = (familyMembers: any[]) => {
    if (activeEmployeeId) {
      updateEmployee(activeEmployeeId, { 
        ghsType: 'EF',
        familyMembers 
      });
    }
    setIsFamilyModalOpen(false);
    setActiveEmployeeId(null);
  };

  const handleFamilyCancel = () => {
    setIsFamilyModalOpen(false);
    setActiveEmployeeId(null);
  };

  const handleEditConfirm = (updates: Partial<Employee>) => {
    if (activeEmployeeId) {
      updateEmployee(activeEmployeeId, updates);
    }
    setIsEditModalOpen(false);
    setActiveEmployeeId(null);
  };

  return (
    <div className={cn("w-full mx-auto transition-all duration-500 pb-20 overflow-x-hidden", isFullView ? "max-w-full px-6" : "max-w-[1440px] px-10")}>
      {/* Selected Plan Summary Header */}
      <div className="bg-white rounded-[32px] p-12 border border-blue-50 shadow-sm mb-12 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
        <div className="flex items-start gap-12">
          <div className="text-[#0052CC] font-black text-lg tracking-tighter whitespace-nowrap pt-1">
            {selectedPlan?.name}
          </div>
          <div className="space-y-3">
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Selected Plan</div>
            <h3 className="text-3xl font-black text-[#001F3F]">Group Plan - Employee Benefits</h3>
            <div className="flex gap-8 text-[11px] text-gray-400 font-bold">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Company Size: 15-50
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Industry: {data.industry || 'Healthcare'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-l border-gray-100 pl-12 hidden lg:flex">
          <a href="#" className="flex items-center gap-2 text-xs text-[#0052CC] font-bold hover:text-[#0041a3] transition-all hover:translate-x-1">
            View Product Disclosure Sheet <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a href="#" className="flex items-center gap-2 text-xs text-[#0052CC] font-bold hover:text-[#0041a3] transition-all hover:translate-x-1">
            View Policy Wording <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="flex items-center gap-12">
          <div className="text-right">
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-3">Total Contribution</div>
            <div className="text-5xl font-black text-[#001F3F] leading-none mb-3">RM {totalContribution.toLocaleString()}.00</div>
            <div className="text-[10px] text-gray-400 font-bold italic">Excluding SST, Stamp Duty & Other Charges</div>
          </div>
          <button 
            onClick={onNext}
            className="bg-[#007BFF] text-white px-14 py-5 rounded-2xl font-black text-sm hover:bg-[#0069D9] transition-all shadow-xl shadow-blue-100 flex items-center gap-4 active:scale-95 group"
          >
            Submit 
            <div className="bg-white/20 p-1.5 rounded-full group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[32px] p-12 border border-gray-50 shadow-sm mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-3xl font-black text-[#001F3F] mb-3">Insured Details</h2>
              <p className="text-sm text-gray-400 font-bold">Manage and review the coverage details for each employee</p>
            </div>
            <button 
              onClick={() => setIsFullView(!isFullView)}
              className="p-3 hover:bg-gray-100 rounded-2xl transition-all text-gray-400 hover:text-[#0052CC] hidden lg:flex"
              title={isFullView ? "Exit Full View" : "Full View"}
            >
              {isFullView ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>
          <div className="flex flex-row items-center gap-4">
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 bg-white border-2 border-gray-100 text-[#001F3F] px-8 py-4 rounded-2xl text-xs font-black hover:bg-gray-50 hover:border-gray-200 transition-all active:scale-95"
            >
              Add Employee <Plus className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center gap-2 bg-white border-2 border-gray-100 text-[#001F3F] px-8 py-4 rounded-2xl text-xs font-black hover:bg-gray-50 hover:border-gray-200 transition-all active:scale-95"
            >
              Upload Excel File <Upload className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            <table className="w-full border-collapse min-w-[1100px]">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest w-[60px]">No.</th>
                  <th className="px-6 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest w-[140px]">NRIC</th>
                  <th className="px-6 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Name</th>
                  <th className="px-6 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</th>
                  <th className="px-6 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest w-[140px]">Marital Status</th>
                  <th className="px-6 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest w-[160px]">Position Level</th>
                  <th className="px-6 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest w-[180px]">GTL Sum (RM)</th>
                  <th className="px-6 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest w-[140px]">GHS Plan</th>
                  <th className="px-6 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest w-[120px]">GHS Type</th>
                  <th className="px-6 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest w-[80px]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.employees.map((emp, index) => (
                  <tr key={emp.id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-6 py-6 text-xs text-gray-400 font-bold">{index + 1}</td>
                    <td className="px-6 py-6 text-xs font-black text-[#001F3F]">{emp.nric}</td>
                    <td className="px-6 py-6 text-xs font-black text-[#001F3F]">{emp.fullName}</td>
                    <td className="px-6 py-6 text-xs text-gray-500 font-medium">{emp.email}</td>
                    <td className="px-6 py-6">
                      <span className="text-xs font-bold text-[#001F3F]">{emp.maritalStatus}</span>
                    </td>
                    <td className="px-6 py-6 text-xs font-bold text-[#001F3F]">{emp.positionLevel}</td>
                    <td className="px-6 py-6">
                      <select 
                        value={emp.gtlSumCovered}
                        onChange={(e) => updateEmployee(emp.id, { gtlSumCovered: e.target.value })}
                        className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs font-black text-[#001F3F] focus:outline-none focus:ring-2 focus:ring-[#0052CC]/10 w-full cursor-pointer hover:border-blue-200 transition-all"
                      >
                        <option value="50K">50K</option>
                        <option value="100K">100K</option>
                        <option value="150K">150K</option>
                      </select>
                    </td>
                    <td className="px-6 py-6">
                      <select 
                        value={emp.ghsPlan}
                        onChange={(e) => updateEmployee(emp.id, { ghsPlan: e.target.value })}
                        className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs font-black text-[#001F3F] focus:outline-none focus:ring-2 focus:ring-[#0052CC]/10 w-full cursor-pointer hover:border-blue-200 transition-all"
                      >
                        <option value="RB150">RB150</option>
                        <option value="RB200">RB200</option>
                        <option value="RB300">RB300</option>
                      </select>
                    </td>
                    <td className="px-6 py-6">
                      <select 
                        value={emp.ghsType}
                        onChange={(e) => handleGhsTypeChange(emp.id, e.target.value)}
                        className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs font-black text-[#001F3F] focus:outline-none focus:ring-2 focus:ring-[#0052CC]/10 w-full cursor-pointer hover:border-blue-200 transition-all"
                      >
                        <option value="EO">EO</option>
                        <option value="EF">EF</option>
                        <option value="ES">ES</option>
                      </select>
                      {emp.ghsType === 'ES' && (
                        <div className="mt-2 flex flex-col gap-1">
                          {emp.spouseInfo ? (
                            <button 
                              onClick={() => {
                                setActiveEmployeeId(emp.id);
                                setIsSpouseModalOpen(true);
                              }}
                              className="text-[10px] text-[#0052CC] font-bold flex items-center gap-1 hover:underline"
                            >
                              <Plus className="w-3 h-3" /> Spouse Added (Edit)
                            </button>
                          ) : (
                            <button 
                              onClick={() => {
                                setActiveEmployeeId(emp.id);
                                setIsSpouseModalOpen(true);
                              }}
                              className="text-[10px] text-red-500 font-bold flex items-center gap-1 hover:underline"
                            >
                              <Plus className="w-3 h-3" /> Add Spouse Info
                            </button>
                          )}
                        </div>
                      )}
                      {emp.ghsType === 'EF' && (
                        <div className="mt-2 flex flex-col gap-1">
                          {emp.familyMembers && emp.familyMembers.length > 0 ? (
                            <button 
                              onClick={() => {
                                setActiveEmployeeId(emp.id);
                                setIsFamilyModalOpen(true);
                              }}
                              className="text-[10px] text-[#0052CC] font-bold flex items-center gap-1 hover:underline"
                            >
                              <Plus className="w-3 h-3" /> {emp.familyMembers.length} Family Added (Edit)
                            </button>
                          ) : (
                            <button 
                              onClick={() => {
                                setActiveEmployeeId(emp.id);
                                setIsFamilyModalOpen(true);
                              }}
                              className="text-[10px] text-red-500 font-bold flex items-center gap-1 hover:underline"
                            >
                              <Plus className="w-3 h-3" /> Add Family Info
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            setActiveEmployeeId(emp.id);
                            setIsEditModalOpen(true);
                          }}
                          className="p-3 hover:bg-blue-50 rounded-2xl transition-all text-gray-400 hover:text-[#0052CC] active:scale-90"
                          title="Edit Employee"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => removeEmployee(emp.id)}
                          className="p-3 hover:bg-red-50 rounded-2xl transition-all text-gray-400 hover:text-red-500 active:scale-90"
                          title="Remove Employee"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={onNext}
          className="bg-[#007BFF] text-white px-16 py-5 rounded-[24px] font-black text-base hover:bg-[#0069D9] transition-all shadow-xl shadow-blue-100 active:scale-95"
        >
          Update Changes
        </button>
      </div>

      <AddSpouseModal 
        isOpen={isSpouseModalOpen}
        onClose={handleSpouseCancel}
        onConfirm={handleSpouseConfirm}
        initialData={data.employees.find(e => e.id === activeEmployeeId)?.spouseInfo}
      />

      <AddFamilyModal 
        isOpen={isFamilyModalOpen}
        onClose={handleFamilyCancel}
        onConfirm={handleFamilyConfirm}
        initialData={data.employees.find(e => e.id === activeEmployeeId)?.familyMembers}
      />

      <EditEmployeeModal 
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setActiveEmployeeId(null);
        }}
        onConfirm={handleEditConfirm}
        employee={data.employees.find(e => e.id === activeEmployeeId) || null}
      />

      <AddEmployeeModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onConfirm={handleAddEmployee}
      />

      <UploadExcelModal 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUploadExcel}
      />
    </div>
  );
}
