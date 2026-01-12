import React from 'react';

interface HeroProps {
  onNavigate: (view: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <header className="pt-40 pb-32 px-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-blue-500/10 to-purple-500/10 blur-[120px] rounded-full -z-10 animate-float-lg opacity-40"></div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full mb-10 shadow-sm animate-float-pulse cursor-default hover:bg-white/10 transition-colors">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
          <span className="text-gray-300 text-xs font-bold uppercase tracking-widest">Nouvelle IA Générative 2025</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-montserrat font-black mb-8 leading-[1.05] tracking-tight text-white drop-shadow-xl">
          Pilotez votre Auto-École<br />
          <span className="gradient-text">en mode automatique.</span>
        </h1>
        
        <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
          Ne perdez plus jamais un élève. Notre IA gère <span className="text-white font-bold">l'accueil, le planning et la pédagogie</span> 24h/24. 
          <br className="hidden md:block" />
          Augmentez votre chiffre d'affaires de <span className="text-blue-500 font-bold">+30%</span> sans surcharge mentale.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-5 items-center">
          <a href="#contact-section" className="w-full sm:w-auto bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg md:text-xl hover:bg-blue-700 transition-all hover:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.5)] hover:-translate-y-1 active:scale-95 flex items-center justify-center relative overflow-hidden group">
            <span className="relative z-10">Réserver une Démo</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </a>
          <button 
            onClick={() => onNavigate('roi')}
            className="w-full sm:w-auto bg-white/5 backdrop-blur-sm border border-white/10 text-white px-10 py-5 rounded-2xl font-bold text-lg md:text-xl hover:bg-white/10 transition-all hover:shadow-lg active:scale-95 flex items-center justify-center gap-3 group"
          >
            <i className="fas fa-chart-line text-purple-400 group-hover:scale-110 transition-transform"></i>
            Calculer mes gains
          </button>
        </div>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60 hover:opacity-100 transition-opacity duration-500">
          <div className="flex flex-col items-center gap-2 group cursor-default">
            <div className="w-12 h-12 bg-blue-900/20 border border-blue-500/20 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform text-blue-500">
              <i className="fas fa-check-circle text-xl"></i>
            </div>
            <span className="font-bold text-sm text-gray-400 group-hover:text-white transition-colors uppercase tracking-wide">Conforme RGPD</span>
          </div>
          <div className="flex flex-col items-center gap-2 group cursor-default">
             <div className="w-12 h-12 bg-purple-900/20 border border-purple-500/20 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform text-purple-500">
              <i className="fas fa-bolt text-xl"></i>
            </div>
            <span className="font-bold text-sm text-gray-400 group-hover:text-white transition-colors uppercase tracking-wide">Setup en 48h</span>
          </div>
          <div className="flex flex-col items-center gap-2 group cursor-default">
             <div className="w-12 h-12 bg-cyan-900/20 border border-cyan-500/20 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform text-cyan-500">
              <i className="fas fa-store text-xl"></i>
            </div>
            <span className="font-bold text-sm text-gray-400 group-hover:text-white transition-colors uppercase tracking-wide">Multi-Agences</span>
          </div>
          <div className="flex flex-col items-center gap-2 group cursor-default">
             <div className="w-12 h-12 bg-green-900/20 border border-green-500/20 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform text-green-500">
              <i className="fas fa-headset text-xl"></i>
            </div>
            <span className="font-bold text-sm text-gray-400 group-hover:text-white transition-colors uppercase tracking-wide">Support Français</span>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes float-lg {
          0% { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); }
          33% { transform: translate(-50%, -50%) translateY(-20px) rotate(3deg); }
          66% { transform: translate(-50%, -50%) translateY(10px) rotate(-3deg); }
          100% { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); }
        }
        .animate-float-lg {
          animation: float-lg 20s ease-in-out infinite;
        }
        @keyframes float-pulse {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        .animate-float-pulse {
          animation: float-pulse 4s ease-in-out infinite;
        }
      `}</style>
    </header>
  );
};

export default Hero;