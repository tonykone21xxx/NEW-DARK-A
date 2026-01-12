import React from 'react';

interface CTAProps {
  onNavigate: (view: string) => void;
}

const CTA: React.FC<CTAProps> = ({ onNavigate }) => {
  return (
    <section className="py-24 px-6 animate-section-fade-in">
      <div className="max-w-6xl mx-auto bg-purple-600 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-purple-500/20 group">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10">
          <h2 className="text-4xl md:text-7xl font-montserrat font-black mb-8 italic uppercase tracking-tighter text-white group-hover:text-purple-50 transition-colors">
            Prêt à passer la <span className="text-blue-200">5ème vitesse ?</span>
          </h2>
          <p className="text-purple-100 text-xl md:text-2xl max-w-2xl mx-auto mb-12 font-medium group-hover:text-white transition-colors">
            Rejoignez les 50+ auto-écoles françaises qui utilisent déjà AutoPilot AI et notre intelligence artificielle pour dominer leur secteur.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href="#contact-section" className="bg-blue-600 text-white px-12 py-5 rounded-2xl font-black text-xl uppercase tracking-tighter hover:scale-105 transition-transform hover:shadow-2xl inline-flex items-center justify-center relative overflow-hidden group">
              Demander une Démo
              <div className="absolute inset-0 bg-blue-400/30 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </a>
            <button 
              onClick={() => onNavigate('roi')}
              className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-12 py-5 rounded-2xl font-black text-xl uppercase tracking-tighter hover:bg-white/30 transition-all hover:scale-105 active:scale-95 relative overflow-hidden group"
            >
              Calculer mon ROI
              <div className="absolute inset-0 bg-white/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </button>
          </div>
          <p className="mt-8 text-purple-200 text-sm font-bold uppercase tracking-widest opacity-60">
            Support 24/7
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;