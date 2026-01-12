
import React, { useState } from 'react';

interface Module {
  title: string;
  role: string;
  introDesc: string; // New property for introductory description
  keyGains: string[]; // New property for bulleted key gains
  icon: string;
  colorClass: string;
  id: string;
}

const modules: Module[] = [
  {
    id: "accueil",
    title: "Module Accueil IA",
    role: "Chat & Voice - Propulsé par l'IA",
    introDesc: "Notre agent conversationnel propulsé par l'IA révolutionne votre accueil et ne manque jamais une opportunité de croissance.",
    keyGains: [
      "Inscriptions et gestions 24/7 via WhatsApp & Site Web.",
      "Automatisation complète des prises de rendez-vous.",
      "Réponses instantanées aux questions fréquentes des élèves.",
      "Conversion des leads optimisée, zéro appel manqué.",
      "Personnel administratif libéré pour des tâches essentielles.",
      "Satisfaction client accrue grâce à une disponibilité constante."
    ],
    icon: "fa-robot",
    colorClass: "from-orange-600 to-orange-400"
  },
  {
    id: "planning",
    title: "Module Planning Autonome",
    role: "Optimisation & Gestion - Propulsé par l'IA",
    introDesc: "Grâce à nos algorithmes d'IA, ce module transforme la complexité de votre planning en une fluidité opérationnelle.",
    keyGains: [
      "Synchronisation automatique des disponibilités moniteurs/élèves.",
      "Gestion intelligente des annulations et modifications.",
      "Optimisation des leçons en temps réel, maximisant l'utilisation des véhicules.",
      "Réduction drastique des conflits de planning et des appels administratifs.",
      "Moniteurs concentrés à 100% sur la pédagogie, non sur la logistique.",
      "Augmentation de votre capacité d'accueil et de vos revenus."
    ],
    icon: "fa-calendar-alt",
    colorClass: "from-purple-600 to-purple-400"
  },
  {
    id: "tuteur",
    title: "Module Tuteur Visuel",
    role: "Pédagogie Avancée - Propulsé par l'IA",
    introDesc: "Notre Tuteur Visuel, animé par l'IA, offre une expérience d'apprentissage inégalée pour le Code de la Route.",
    keyGains: [
      "Support pédagogique interactif et personnalisé 24h/24.",
      "Explications claires et concises des règles complexes du Code.",
      "Illustrations générées par IA en temps réel pour une meilleure compréhension.",
      "Réduction du stress et de l'anxiété liés à l'apprentissage du Code.",
      "Amélioration significative des taux de réussite des élèves à l'examen.",
      "Accroissement de la réputation de votre auto-école grâce à une pédagogie innovante."
    ],
    icon: "fa-lightbulb",
    colorClass: "from-pink-600 to-pink-400"
  }
];

const DynamicLogiciels: React.FC = () => {
  const [activeModuleId, setActiveModuleId] = useState<string>(modules[0].id);
  const activeModule = modules.find(m => m.id === activeModuleId)!;

  return (
    <section id="logiciels" className="py-24 relative overflow-hidden animate-section-fade-in">
      {/* Animated Background Orb */}
      <div className="absolute top-1/2 left-1/2 w-[700px] h-[500px] bg-orange-500/10 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2 animate-float-lg -z-20"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-montserrat font-black uppercase italic mb-4 text-white">
            Nos <span className="gradient-text">Logiciels</span> Intelligents
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Chaque module, propulsé par l'IA, est conçu pour transformer une tâche complexe en une opération simple et automatisée, libérant ainsi le potentiel de votre auto-école et garantissant une croissance sans précédent.
          </p>
        </div>

        <div className="relative glass p-4 md:p-8 rounded-[3.5rem] border-white/5 shadow-2xl bg-gray-900/40">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent blur-[100px] rounded-[3.5rem] -z-10"></div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Tabs / Navigation */}
            <div className="lg:w-1/3 flex flex-col gap-4 p-4">
              {modules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => setActiveModuleId(module.id)}
                  className={`group relative flex items-center gap-4 p-5 rounded-2xl text-left transition-all duration-300
                    ${activeModuleId === module.id 
                      ? `bg-gradient-to-r ${module.colorClass} text-white shadow-xl scale-105 active-module-glow-border`
                      : 'bg-gray-900 hover:bg-gray-800 text-gray-400 hover:border-orange-500/30 border border-transparent'
                    }`}
                >
                  {/* Active module glow */}
                  {activeModuleId === module.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-transparent blur-xl opacity-70 animate-pulse-light rounded-2xl"></div>
                  )}
                  <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center text-2xl 
                    ${activeModuleId === module.id ? 'bg-white/20 scale-110 shadow-lg' : 'bg-gray-800 group-hover:bg-gray-700 group-hover:scale-105 text-gray-500'} transition-all duration-300`}>
                    <i className={`fas ${module.icon}`}></i>
                  </div>
                  <div className="relative z-10">
                    <div className={`font-bold text-sm uppercase tracking-widest ${activeModuleId === module.id ? 'text-white' : 'text-orange-500 group-hover:text-orange-400'}`}>
                      {module.role}
                    </div>
                    <h3 className={`text-xl font-bold ${activeModuleId === module.id ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                      {module.title}
                    </h3>
                  </div>
                </button>
              ))}
            </div>

            {/* Content Display */}
            <div 
              key={activeModule.id} // Key to re-trigger animation on content change
              className="lg:w-2/3 p-6 md:p-10 bg-gray-950 rounded-3xl border border-gray-800 flex flex-col justify-between animate-in fade-in slide-in-from-top-4 duration-500 shadow-xl"
            >
              <div className="text-center mb-8">
                <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-5xl 
                  bg-gradient-to-tr ${activeModule.colorClass} shadow-xl glow-orange transform animate-bounce-custom text-white`}>
                  <i className={`fas ${activeModule.icon}`}></i>
                </div>
                <h3 className="text-4xl font-bold font-montserrat italic mb-4 text-white">{activeModule.title}</h3>
                <p className={`text-base font-bold uppercase tracking-widest text-orange-500 mb-6`}>{activeModule.role}</p>
                <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                  {activeModule.introDesc}
                </p>

                <ul className="text-left space-y-3 max-w-2xl mx-auto">
                  {activeModule.keyGains.map((gain, index) => (
                    <li key={index} className="flex items-start text-gray-300 text-base animate-slide-in-up" style={{animationDelay: `${0.1 * index}s`}}>
                      <i className="fas fa-check-circle text-purple-500 mr-3 mt-1 text-xl animate-fade-in-scale"></i>
                      <span className="flex-1">{gain}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center mt-auto">
                <button className="inline-flex items-center gap-3 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/30">
                  Découvrir le module <i className="fas fa-arrow-right text-base"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Custom Keyframes */}
      <style>{`
        @keyframes float-lg {
          0% { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); }
          25% { transform: translate(-50%, -50%) translateY(-15px) rotate(5deg); }
          50% { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); }
          75% { transform: translate(-50%, -50%) translateY(15px) rotate(-5deg); }
          100% { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); }
        }
        .animate-float-lg {
          animation: float-lg 15s ease-in-out infinite;
        }

        @keyframes bounce-custom {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-custom {
          animation: bounce-custom 3s infinite ease-in-out;
        }

        @keyframes pulse-light {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        .animate-pulse-light {
          animation: pulse-light 3s infinite ease-in-out;
        }

        .active-module-glow-border {
          box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.5), 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in-up {
          animation: slideInUp 0.6s ease-out forwards;
          opacity: 0; /* Hidden by default */
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale {
          animation: fadeInScale 0.4s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default DynamicLogiciels;
