
import React from 'react';

const PrivacyPolicy: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 animate-section-fade-in">
      <button onClick={onBack} className="mb-12 text-orange-500 hover:text-gray-900 transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
        <i className="fas fa-arrow-left"></i> Retour
      </button>
      
      <h1 className="text-4xl md:text-6xl font-montserrat font-black mb-12 uppercase italic text-gray-900">
        Politique de <span className="gradient-text">Confidentialité (RGPD)</span>
      </h1>
      
      <div className="space-y-12 text-gray-700 leading-relaxed text-lg">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Collecte des données</h2>
          <p>AutoPilot AI collecte les données strictement nécessaires au bon fonctionnement de ses services d'automatisation pour auto-écoles. Cela inclut :</p>
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li>Noms et coordonnées des gérants d'auto-écoles.</li>
            <li>Coordonnées des élèves (pour la prise de rendez-vous et le tutorat).</li>
            <li>Données de navigation sur notre plateforme.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Utilisation des données</h2>
          <p>Vos données sont utilisées uniquement pour :</p>
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li>La fourniture de nos services d'IA (chatbots, voicebots).</li>
            <li>La gestion des plannings de conduite.</li>
            <li>L'amélioration de l'expérience utilisateur.</li>
            <li>La facturation et le support client.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Sécurité</h2>
          <p>Nous mettons en œuvre toutes les mesures de sécurité nécessaires pour protéger vos données personnelles contre tout accès non autorisé, altération ou divulgation.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Vos droits</h2>
          <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Contactez-nous à dpo@autopilot-ai.fr pour exercer ces droits.</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;