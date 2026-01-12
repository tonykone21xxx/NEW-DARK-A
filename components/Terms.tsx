
import React from 'react';

const Terms: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 animate-section-fade-in">
      <button onClick={onBack} className="mb-12 text-orange-500 hover:text-gray-900 transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
        <i className="fas fa-arrow-left"></i> Retour
      </button>
      
      <h1 className="text-4xl md:text-6xl font-montserrat font-black mb-12 uppercase italic text-gray-900">
        Conditions Générales de <span className="gradient-text">Vente (CGV)</span>
      </h1>
      
      <div className="space-y-12 text-gray-700 leading-relaxed text-lg">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Objet</h2>
          <p>Les présentes CGV régissent les relations contractuelles entre AutoPilot Technologies SAS et ses clients professionnels (Auto-écoles) dans le cadre de l'abonnement aux services AutoPilot AI.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Services</h2>
          <p>AutoPilot AI propose une suite d'outils basés sur l'intelligence artificielle pour automatiser les tâches administratives et pédagogiques des auto-écoles.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Tarifs et Paiement</h2>
          <p>Nos tarifs sont communiqués sur devis. Le paiement s'effectue par prélèvement mensuel. Tout mois commencé est dû.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Résiliation</h2>
          <p>Sauf mention contraire dans le contrat spécifique, nos abonnements sont sans engagement et peuvent être résiliés à tout moment avec un préavis de 30 jours.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Responsabilité</h2>
          <p>AutoPilot AI s'efforce de fournir une disponibilité de service de 99,9%. La société ne saurait être tenue responsable des interruptions de service liées à des causes externes.</p>
        </section>
      </div>
    </div>
  );
};

export default Terms;