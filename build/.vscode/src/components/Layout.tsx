import React from 'react';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
  onBack?: () => void;
  onGetStarted?: () => void;
  title?: string;
  step?: number;
  totalSteps?: number;
}

export default function Layout({ children, showNav = true, onBack, onGetStarted, title, step, totalSteps }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          {onBack && (
            <button 
              onClick={onBack}
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
          <img 
            src="https://senang.io/wp-content/uploads/2021/04/senang-logo-1.png" 
            alt="Senang Logo" 
            className="h-8 w-auto"
            referrerPolicy="no-referrer"
          />
        </div>
        
        {showNav && (
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
              <a href="#" className="hover:text-[#0052CC] transition-colors">Benefits</a>
              <a href="#" className="hover:text-[#0052CC] transition-colors">Solutions</a>
              <a href="#" className="hover:text-[#0052CC] transition-colors">Resources</a>
            </nav>
            <button 
              onClick={onGetStarted}
              className="bg-[#001F3F] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#002F5F] transition-colors"
            >
              Get Started
            </button>
            <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
              <HelpCircle className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#0052CC] rounded-lg flex items-center justify-center font-black text-xl">S</div>
              <span className="text-2xl font-black tracking-tighter">SENANG</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
              SenangNVS Sdn. Bhd. (1292191-A) is a licensed agent and Islamic financial advisor registered with Bank Negara Malaysia.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <a href="#" className="text-sm font-bold hover:text-[#0052CC] transition-colors">Home</a>
            <a href="#" className="text-sm font-bold hover:text-[#0052CC] transition-colors">How It Works</a>
            <a href="#" className="text-sm font-bold hover:text-[#0052CC] transition-colors">Benefits</a>
            <a href="#" className="text-sm font-bold hover:text-[#0052CC] transition-colors">FAQ</a>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-black mb-4">SenangNVS Sdn. Bhd.</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                Worq Co Working Space, Unit 3.07,<br />
                Level 3, KL Gateway Mall Gateway Mall,<br />
                No 2, Jalan Kerinchi, Pantai Dalam,<br />
                59200 Kuala Lumpur.
              </p>
            </div>
            <div className="space-y-2">
              <a href="mailto:customercare@senang.io" className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors">
                <div className="w-4 h-4 rounded-full bg-[#0052CC] flex items-center justify-center text-[8px]">✉</div>
                customercare@senang.io
              </a>
              <a href="tel:+60189559931" className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors">
                <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-[8px]">📞</div>
                +6018-955 9931
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
