
import React, { useState } from 'react';

const BookingForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="glass p-12 rounded-[3rem] text-center border-orange-500/30 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl text-white">
          <i className="fas fa-check text-3xl"></i>
        </div>
        <h3 className="text-3xl font-bold mb-4 gradient-text">Demande reçue !</h3>
        <p className="text-gray-300 mb-8">Un de nos conseillers AutoPilot AI (ou notre IA Chloé) vous rappellera dans les 15 minutes.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="text-purple-400 font-bold hover:underline hover:text-purple-300 transition-colors"
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <section id="contact" className="py-24 px-6 animate-section-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-montserrat font-black uppercase italic mb-4 text-white">
            Prendre <span className="gradient-text">Rendez-vous</span>
          </h2>
          <p className="text-gray-400 text-lg">Choisissez un créneau pour une démonstration personnalisée ou un appel de conseil.</p>
        </div>

        <div className="glass p-8 md:p-12 rounded-[3rem] border-white/5 shadow-2xl bg-gray-900/40">
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Nom de l'Auto-école</label>
              <input required type="text" placeholder="Ex: Auto-École du Centre" className="w-full bg-gray-950 border border-gray-800 rounded-2xl p-4 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 outline-none transition-all shadow-inner text-white placeholder-gray-600" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Téléphone</label>
              <input required type="tel" placeholder="06 12 34 56 78" className="w-full bg-gray-950 border border-gray-800 rounded-2xl p-4 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 outline-none transition-all shadow-inner text-white placeholder-gray-600" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Quand préférez-vous être rappelé ?</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['Dès que possible', 'Matin (9h-12h)', 'Après-midi (14h-18h)', 'Soir (18h-20h)'].map((time) => (
                  <button key={time} type="button" className="p-3 text-xs font-bold border border-gray-800 bg-gray-950 rounded-xl hover:bg-orange-500/20 hover:border-orange-500 transition-all focus:bg-orange-500 focus:text-white focus:shadow-md active:scale-95 text-gray-300">
                    {time}
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" className="md:col-span-2 bg-orange-500 hover:bg-orange-600 text-white font-black py-5 rounded-2xl uppercase tracking-tighter text-xl mt-4 shadow-xl shadow-orange-500/30 transition-all hover:scale-[1.02] active:scale-98">
              Valider mon rendez-vous
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
