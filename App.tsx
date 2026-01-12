
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import DynamicLogiciels from './components/DynamicLogiciels';
import LiveVoiceAgent from './components/LiveVoiceAgent';
import ChatTutor from './components/ChatTutor';
import Testimonials from './components/Testimonials';
import BookingForm from './components/BookingForm';
import CTA from './components/CTA';
import Footer from './components/Footer';
import MentionsLegales from './components/MentionsLegales';
import PrivacyPolicy from './components/PrivacyPolicy';
import Terms from './components/Terms';
import ROICalculator from './components/ROICalculator';
import GroundingFAQ from './components/GroundingFAQ';
import VoiceDemo from './components/VoiceDemo';
import WhatsAppDemo from './components/WhatsAppDemo';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'mentions' | 'privacy' | 'terms' | 'roi'>('home');

  // Handle scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const renderContent = () => {
    switch (view) {
      case 'mentions':
        return <MentionsLegales onBack={() => setView('home')} />;
      case 'privacy':
        return <PrivacyPolicy onBack={() => setView('home')} />;
      case 'terms':
        return <Terms onBack={() => setView('home')} />;
      case 'roi':
        return <ROICalculator onBack={() => setView('home')} />;
      default:
        return (
          <>
            <section className="relative bg-black">
              <Hero onNavigate={(v) => setView(v as any)} />
            </section>
            
            <section id="top-voice-demo" className="py-24 bg-gray-950 border-y border-gray-900">
              <VoiceDemo />
            </section>

            <div className="space-y-0">
              <section id="pain-points" className="py-32 bg-black border-b border-gray-900">
                <PainPoints />
              </section>

              {/* WhatsAppDemo has its own dark styling */}
              <WhatsAppDemo />

              <section id="logiciels" className="py-32 bg-gray-950 border-y border-gray-900">
                <DynamicLogiciels />
              </section>

              <section id="clara-voice" className="py-32 bg-black border-y border-gray-900">
                <LiveVoiceAgent />
              </section>

              <section id="clara-chat" className="py-32 bg-gray-950 border-y border-gray-900">
                <ChatTutor />
              </section>

              <section className="bg-black border-y border-gray-900">
                 <GroundingFAQ />
              </section>

              <section className="bg-gray-950 border-y border-gray-900">
                 <Testimonials />
              </section>

              <section id="contact-section" className="py-32 bg-black">
                <BookingForm />
              </section>

              <section className="bg-gray-950 border-t border-gray-900">
                <CTA onNavigate={(v) => setView(v as any)} />
              </section>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black font-sans selection:bg-orange-500/40 text-gray-100">
      <Navbar onNavigate={(v) => setView(v as any)} currentView={view} />
      <main className="overflow-x-hidden pt-20">
        {renderContent()}
      </main>
      <Footer onNavigate={(v) => setView(v as any)} />
    </div>
  );
};

export default App;
