export interface Employee {
  id: string;
  nric: string;
  fullName: string;
  email: string;
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed';
  positionLevel: 'Executive' | 'Manager' | 'Senior Executive' | 'Director' | 'Assistant Manager';
  gtlSumCovered: string;
  ghsPlan: string;
  ghsType: 'EO' | 'EF' | 'ES';
  spouseInfo?: {
    fullName: string;
    relationship: string;
    icNumber: string;
    contactNumber: string;
  };
  familyMembers?: {
    fullName: string;
    relationship: string;
    icNumber: string;
    contactNumber: string;
  }[];
}

export interface OnboardingData {
  companyName: string;
  registrationNumber: string;
  numberOfEmployees: string;
  industry: string;
  hasExistingCoverage: boolean;
  policyExpiryDate: string;
  personInCharge: string;
  picContactNumber: string;
  annualBudget: string;
  importantBenefits: string[];
  providerType: 'Takaful only' | 'Open to both';
  marriedPercentage: string;
  averageAgeGroup: string;
  purchaseOption: 'Fully Online' | 'Advisor-Assisted' | null;
  foreignWorkersPercentage: string;
  selectedPlanId: string | null;
  employees: Employee[];
  consentTimestamp: string | null;
}

export const INITIAL_DATA: OnboardingData = {
  companyName: '',
  registrationNumber: '',
  numberOfEmployees: '50',
  industry: 'Healthcare',
  hasExistingCoverage: false,
  policyExpiryDate: '',
  personInCharge: '',
  picContactNumber: '',
  annualBudget: '',
  importantBenefits: [],
  providerType: 'Takaful only',
  marriedPercentage: '',
  averageAgeGroup: '',
  purchaseOption: null,
  foreignWorkersPercentage: '',
  selectedPlanId: 'takaful-2',
  consentTimestamp: null,
  employees: [
    {
      id: '1',
      nric: '901020-05-6773',
      fullName: 'Faizal Hussein Bin Maarof',
      email: 'faizal.hussein88@mail.com',
      maritalStatus: 'Married',
      positionLevel: 'Executive',
      gtlSumCovered: '50K',
      ghsPlan: 'RB150',
      ghsType: 'EO'
    },
    {
      id: '2',
      nric: '940123-10-5312',
      fullName: 'Fazriena Binti Baba',
      email: 'fazri3na.baba99@mail.com',
      maritalStatus: 'Single',
      positionLevel: 'Manager',
      gtlSumCovered: '50K',
      ghsPlan: 'RB150',
      ghsType: 'EO'
    },
    {
      id: '3',
      nric: '890920-07-1234',
      fullName: 'Toh Kai Sin',
      email: 'gracey.kaisin88@mail.com',
      maritalStatus: 'Single',
      positionLevel: 'Senior Executive',
      gtlSumCovered: '50K',
      ghsPlan: 'RB150',
      ghsType: 'EO'
    },
    {
      id: '4',
      nric: '911011-05-1231',
      fullName: 'Amirul Hakim',
      email: 'amirulhakim@mail.com',
      maritalStatus: 'Married',
      positionLevel: 'Senior Executive',
      gtlSumCovered: '50K',
      ghsPlan: 'RB150',
      ghsType: 'EO'
    },
    {
      id: '5',
      nric: '950123-12-1234',
      fullName: 'Wong Mei Li',
      email: 'wongmeili@mail.com',
      maritalStatus: 'Single',
      positionLevel: 'Assistant Manager',
      gtlSumCovered: '50K',
      ghsPlan: 'RB150',
      ghsType: 'EO'
    }
  ]
};
