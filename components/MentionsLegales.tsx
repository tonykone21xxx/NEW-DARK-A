
import React from 'react';

const MentionsLegales: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 animate-section-fade-in">
      <button onClick={onBack} className="mb-12 text-orange-500 hover:text-gray-900 transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
        <i className="fas fa-arrow-left"></i> Retour
      </button>
      
      <h1 className="text-4xl md:text-6xl font-montserrat font-black mb-12 uppercase italic text-gray-900">
        Mentions <span className="gradient-text">Légales</span>
      </h1>
      
      <div className="space-y-12 text-gray-700 leading-relaxed text-lg">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Éditeur du site</h2>
          <p>Le site AutoPilot AI est édité par la société AutoPilot Technologies SAS, au capital de 10 000 euros, immatriculée au RCS de Paris sous le numéro 123 456 789.</p>
          <p className="mt-2">Siège social : 123 Avenue de l'IA, 75001 Paris, France.</p>
          <p>Email : contact@autopilot-ai.fr</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Hébergement</h2>
          <p>Le site est hébergé par Google Cloud Platform.</p>
          <p className="mt-2">Adresse de l'hébergeur : 8 rue de Londres, 75009 Paris, France.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Propriété Intellectuelle</h2>
          <p>L'ensemble des éléments constituant le site (textes, graphismes, logiciels, photographies, images, logos, marques, etc.) sont protégés par le droit de la propriété intellectuelle.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Contact</h2>
          <p>Pour toute question ou information, vous pouvez nous contacter par email à l'adresse suivante : support@autopilot-ai.fr</p>
        </section>
      </div>
    </div>
  );
};

export default MentionsLegales;