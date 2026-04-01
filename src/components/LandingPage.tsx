import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Shield, Zap, Users, ArrowRight } from 'lucide-react';
import Layout from './Layout';
import ConsentModal from './ConsentModal';

interface LandingPageProps {
  onStart: (consentTimestamp: string) => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  const [isConsentOpen, setIsConsentOpen] = useState(false);

  const handleStartClick = () => {
    setIsConsentOpen(true);
  };

  const handleAcceptConsent = () => {
    const timestamp = new Date().toISOString();
    setIsConsentOpen(false);
    onStart(timestamp);
  };

  return (
    <Layout onGetStarted={handleStartClick}>
      <ConsentModal 
        isOpen={isConsentOpen} 
        onAccept={handleAcceptConsent}
        onClose={() => setIsConsentOpen(false)}
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold mb-6">
              <Shield className="w-3 h-3" />
              Licensed by Bank Negara Malaysia
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-[#001F3F] leading-tight mb-6">
              Get Your Employee Benefits Quote in Minutes
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Answer a few simple questions and receive a personalized EB plan tailored for your Malaysian company. No paperwork, no hassle.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleStartClick}
                className="bg-[#001F3F] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-[#002F5F] transition-all transform hover:scale-105"
              >
                Start Now <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-[#007BFF] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#0069D9] transition-all transform hover:scale-105">
                Learn More
              </button>
            </div>
            
            <div className="mt-12 grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CheckCircle2 className="w-4 h-4 text-[#007BFF]" />
                No credit card required
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Zap className="w-4 h-4 text-[#007BFF]" />
                Instant quote
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Users className="w-4 h-4 text-[#007BFF]" />
                Malaysian compliant
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1000" 
                alt="Professional" 
                className="w-full h-[500px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-lg flex items-center gap-3 border border-white/20">
                <div className="w-10 h-10 bg-[#001F3F] rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Premium Protection</div>
                  <div className="text-sm font-bold text-[#001F3F]">Verified Coverage</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-gray-50 py-12 px-6 border-y border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale">
          <div className="flex items-center gap-2 font-bold text-xl">MALAYSIAN COMPLIANT</div>
          <div className="w-12 h-12 bg-gray-400 rounded-full" />
          <div className="w-12 h-12 bg-gray-400 rounded-full" />
          <div className="w-12 h-12 bg-gray-400 rounded-full" />
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-4">Ready to simplify your EB process?</h2>
          <p className="text-gray-500">Join hundreds of Malaysian companies who have streamlined their employee benefits with us.</p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#007BFF] px-3 py-1 rounded-full text-[10px] font-bold uppercase mb-6">Integration</div>
            <h3 className="text-2xl font-bold text-[#001F3F] mb-4">Seamless HR Sync</h3>
            <p className="text-gray-500 mb-8">Connect your existing payroll and HR systems directly to our platform for automated benefit updates.</p>
            <div className="h-40 bg-gray-900 rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent" />
              <div className="p-4 font-mono text-[10px] text-blue-400">
                0.4.02 <br />
                98% Sync <br />
                6.2.16
              </div>
            </div>
          </div>

          <div className="bg-[#001F3F] p-8 rounded-3xl text-white flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">24/7 Expert Claims Support</h3>
              <p className="text-white/60 mb-8">Dedicated concierge service for your employees to handle claims without your intervention.</p>
            </div>
            <button className="text-white font-bold flex items-center gap-2 hover:gap-4 transition-all">
              Talk to an Expert <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-[#007BFF]" />
            </div>
            <h3 className="text-2xl font-bold text-[#001F3F] mb-4">Instant Onboarding</h3>
            <p className="text-gray-500 mb-8">Get your team covered in less than 24 hours. Fast, transparent, and built for the modern Malaysian workforce.</p>
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" referrerPolicy="no-referrer" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-500 flex items-center justify-center text-white text-[10px] font-bold">500+</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-[#001F3F] rounded-[40px] p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent pointer-events-none" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">Ready to transform your company culture?</h2>
          <p className="text-white/60 mb-10 max-w-2xl mx-auto relative z-10">Join the insurance revolution. Fast, transparent, and built for the modern Malaysian workforce.</p>
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <button 
              onClick={handleStartClick}
              className="bg-white text-[#001F3F] px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Get Your Quote Now
            </button>
            <button className="border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all transform hover:scale-105">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* PIDM Banner */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white border border-gray-100 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
          <img 
            src="https://www.pidm.gov.my/PIDM/media/PIDM/PIDM-Logo.png" 
            alt="PIDM Logo" 
            className="h-12 w-auto"
            referrerPolicy="no-referrer"
          />
          <p className="text-sm text-gray-500 flex-1">
            Benefits payable under the eligible certificate/policy/product are protected by Perbadanan Insurans Deposit Malaysia (PIDM), subject to coverage limits. Please refer to the <a href="#" className="text-[#0052CC] font-medium hover:underline">PIDM Tips Brochure</a> or contact your insurance/takaful provider, or visit the <a href="#" className="text-[#0052CC] font-medium hover:underline">PIDM website</a>.
          </p>
        </div>
      </div>
    </Layout>
  );
}
