import React, { useState } from 'react';

const PainPoints: React.FC = () => {
  const points = [
    {
      icon: "fa-phone-slash",
      title: "Stop aux Appels Manqués",
      desc: "Chaque appel manqué est un élève perdu. Notre IA décroche instantanément, 24/7, qualifie le besoin et note le RDV dans votre agenda.",
      stat: "100%",
      statLabel: "de réponse"
    },
    {
      icon: "fa-brain",
      title: "Zéro Charge Mentale",
      desc: "Libérez-vous de la gestion des plannings et des relances. L'IA gère les annulations, remplace les créneaux vides et optimise les tournées.",
      stat: "15h",
      statLabel: "gagnées / sem"
    },
    {
      icon: "fa-chart-pie",
      title: "Croissance Garantie",
      desc: "En automatisant l'administratif, vous vous concentrez sur la pédagogie et le développement. Les auto-écoles équipées croissent 2x plus vite.",
      stat: "+30%",
      statLabel: "de C.A."
    }
  ];

  return (
    <section id="solutions" className="py-32 relative overflow-hidden animate-section-fade-in">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-500/10 to-transparent -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-montserrat font-black mb-6 uppercase italic text-white leading-tight">
            Pourquoi passer à <span className="gradient-text">l'AutoPilot ?</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto font-medium">
            Le métier change. Ne laissez pas l'administratif freiner votre pédagogie.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {points.map((p, i) => (
            <div key={i} className="group relative">
              <div className="absolute inset-0 bg-gray-800 rounded-[2.5rem] shadow-xl translate-y-2 group-hover:translate-y-4 transition-transform duration-300 -z-10"></div>
              <div className="relative glass p-10 rounded-[2.5rem] border-white/5 h-full flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:bg-gray-800/60 bg-gray-800/40">
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-16 h-16 bg-gray-700 border border-gray-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:border-blue-500/50 transition-all duration-300 shadow-sm">
                      <i className={`fas ${p.icon} text-2xl text-gray-400 group-hover:text-blue-500 transition-colors`}></i>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black gradient-text">{p.stat}</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{p.statLabel}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-white leading-tight">{p.title}</h3>
                  <p className="text-gray-400 leading-relaxed font-medium">
                    {p.desc}
                  </p>
                </div>
                
                <div className="mt-8 pt-8 border-t border-white/5">
                  <span className="text-blue-500 font-bold text-sm flex items-center gap-2 group-hover:translate-x-2 transition-transform cursor-pointer">
                    En savoir plus <i className="fas fa-arrow-right"></i>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainPoints;