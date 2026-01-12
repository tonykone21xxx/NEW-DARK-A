
import React from 'react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Marc Dubreuil",
      school: "CER Centre Ville - Nantes",
      quote: "Avant, je perdais 2h par jour à rappeler des numéros. Depuis Chloé, mon téléphone ne sonne plus pendant les leçons, mais mon planning est plein à 100%. C'est mathématique : moins de stress, plus de profit.",
      avatar: "MD",
      role: "Gérant depuis 15 ans",
      metric: "+20% CA"
    },
    {
      name: "Sarah Lemoine",
      school: "Permis Éclair - Bordeaux",
      quote: "L'IA gère les dossiers CPF et les demandes NEPH bien mieux que nous. On a réduit nos erreurs administratives à zéro. Mes moniteurs sont ravis, ils ont enfin leurs plannings à jour en temps réel sur leur mobile.",
      avatar: "SL",
      role: "Directrice Pédagogique",
      metric: "0 Erreur Admin"
    },
    {
      name: "Karim Benani",
      school: "Drive Safe - Paris 12",
      quote: "J'étais sceptique sur le 'Chat Tuteur'. Mais les élèves adorent. Ils révisent leur code le soir avec l'IA, posent des questions 'bêtes' sans honte. Résultat : on a gagné 10 points sur notre taux de réussite au code.",
      avatar: "KB",
      role: "Fondateur",
      metric: "94% Réussite"
    }
  ];

  return (
    <section id="temoignages" className="py-32 animate-section-fade-in relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-black uppercase tracking-[0.2em]">
            Confiance & Résultats
          </div>
          <h2 className="text-4xl md:text-6xl font-montserrat font-black uppercase italic mb-6 text-white">
            Parole aux <span className="gradient-text">Gérants</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
            Ils ont transformé leur auto-école avec l'IA. Voici leurs résultats concrets.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="relative group">
              <div className="absolute inset-0 bg-gray-800 rounded-[2.5rem] transform rotate-1 group-hover:rotate-0 transition-transform duration-300"></div>
              <div className="relative bg-gray-900 p-10 rounded-[2.5rem] border border-gray-800 h-full flex flex-col justify-between shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                
                <div className="mb-8">
                   <div className="flex justify-between items-center mb-6">
                     <div className="flex text-orange-500 gap-1 text-xs">
                      {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star"></i>)}
                    </div>
                    <span className="bg-green-900/30 text-green-400 border border-green-500/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">
                      {t.metric}
                    </span>
                   </div>
                  <i className="fas fa-quote-left text-4xl text-gray-800 absolute top-8 left-8 -z-10"></i>
                  <p className="text-gray-300 text-base leading-relaxed font-medium relative z-10">
                    "{t.quote}"
                  </p>
                </div>
                
                <div className="flex items-center gap-4 border-t border-gray-800 pt-6">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center font-bold text-gray-900 text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{t.name}</h4>
                    <p className="text-gray-500 text-xs font-medium">{t.school}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Logos strip */}
        <div className="mt-24 pt-12 border-t border-gray-900 flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-700 filter">
          {["CER Réseau", "ECF", "Code Rousseau", "EnPC", "Planète Permis"].map((brand, i) => (
             <span key={i} className="text-xl md:text-2xl font-black italic tracking-tighter text-gray-600 hover:text-orange-500 transition-colors cursor-default">
               {brand}
             </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
