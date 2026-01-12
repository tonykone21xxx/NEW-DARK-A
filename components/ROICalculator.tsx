
import React, { useState, useMemo } from 'react';

const ROICalculator: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [clientsPerMonth, setClientsPerMonth] = useState(15);
  const [averagePackage, setAveragePackage] = useState(1200);

  const stats = useMemo(() => {
    // Variables basées sur les standards des auto-écoles françaises
    const hourlyAdminCost = 22; // Coût moyen incluant charges patronales
    const adminHoursPerStudentLifeCycle = 6; // Temps moyen cumulé par dossier
    const automationRate = 0.65; // Taux d'automatisation des tâches récurrentes
    const missedLeadsRate = 0.08; // 8% des appels/demandes sont manqués ou tardifs
    const conversionImprovement = 0.45; // Taux de récupération des leads manqués grâce au 24/7

    const annualVolume = clientsPerMonth * 12;

    // Économie de temps
    const hoursSpentAnnual = annualVolume * adminHoursPerStudentLifeCycle;
    const hoursSavedYear = Math.round(hoursSpentAnnual * automationRate);
    const moneySavedTimeYear = hoursSavedYear * hourlyAdminCost;
    
    // Croissance du Chiffre d'Affaires
    const recoveredStudentsYear = Math.round(annualVolume * missedLeadsRate * conversionImprovement);
    const extraRevenueYear = recoveredStudentsYear * averagePackage;

    const totalImpactYear = moneySavedTimeYear + extraRevenueYear;
    const totalImpactMonth = Math.round(totalImpactYear / 12);

    return {
      annualVolume,
      hoursSavedYear,
      moneySavedTimeYear,
      recoveredStudentsYear,
      extraRevenueYear,
      totalImpactYear,
      totalImpactMonth
    };
  }, [clientsPerMonth, averagePackage]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 animate-section-fade-in">
      <button onClick={onBack} className="mb-12 text-orange-500 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
        <i className="fas fa-arrow-left"></i> Retour à l'accueil
      </button>

      <div className="grid lg:grid-cols-5 gap-12 items-start">
        <div className="lg:col-span-3 space-y-12">
          <div>
            <h1 className="text-4xl md:text-6xl font-montserrat font-black mb-8 uppercase italic leading-tight text-white">
              Calcul de <span className="gradient-text">Rentabilité</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Estimez précisément l'impact de l'IA AutoPilot sur votre établissement en fonction de votre flux d'élèves mensuel.
            </p>
          </div>

          <div className="space-y-12 glass p-10 rounded-[2.5rem] border-white/5 shadow-xl bg-gray-900/40">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <label className="font-bold text-gray-300 uppercase tracking-widest text-xs">Nouveaux élèves / mois</label>
                <div className="text-right">
                  <span className="gradient-text font-black text-3xl">{clientsPerMonth}</span>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">~{stats.annualVolume} inscrits par an</p>
                </div>
              </div>
              <input 
                type="range" min="5" max="80" step="1" 
                value={clientsPerMonth} 
                onChange={(e) => setClientsPerMonth(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all duration-300"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase">
                <span>Indépendant</span>
                <span>Multi-agences</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <label className="font-bold text-gray-300 uppercase tracking-widest text-xs">Forfait moyen (B / AAC)</label>
                <span className="text-purple-400 font-black text-2xl">{averagePackage}€</span>
              </div>
              <input 
                type="range" min="900" max="2300" step="50" 
                value={averagePackage} 
                onChange={(e) => setAveragePackage(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-8 rounded-3xl bg-gray-900 border border-gray-800 group hover:border-purple-500/30 transition-all hover:shadow-lg hover:scale-[1.02]">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <i className="fas fa-clock text-purple-400"></i>
                </div>
                <div className="text-purple-400 font-black text-3xl">{stats.hoursSavedYear}h</div>
              </div>
              <div className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Temps administratif libéré par an</div>
              <p className="mt-2 text-xs text-gray-500 italic">Soit environ {Math.round(stats.hoursSavedYear/52)}h gagnées chaque semaine grâce à l'IA.</p>
            </div>

            <div className="p-8 rounded-3xl bg-gray-900 border border-gray-800 group hover:border-orange-500/30 transition-all hover:shadow-lg hover:scale-[1.02]">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-orange-900/30 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <i className="fas fa-user-plus text-orange-400"></i>
                </div>
                <div className="text-orange-400 font-black text-3xl">+{stats.recoveredStudentsYear}</div>
              </div>
              <div className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Ventes additionnelles par an</div>
              <p className="mt-2 text-xs text-gray-500 italic">Élèves récupérés grâce à la réactivité 24/7 de nos agents IA.</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 sticky top-32">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-tr from-orange-500 to-purple-500 rounded-[3rem] blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
            <div className="relative glass p-10 rounded-[3rem] border-white/5 bg-gray-900 shadow-2xl">
              <div className="text-center mb-10">
                <div className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">Potentiel de Croissance</div>
                <div className="text-6xl font-montserrat font-black text-white mb-2 italic tracking-tighter">
                  +<span className="gradient-text">{stats.totalImpactYear.toLocaleString()}</span>€
                </div>
                <div className="text-sm font-bold text-purple-400 mb-4">Par an</div>
                <div className="inline-block px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-xs font-bold text-gray-300">
                  <span className="text-orange-500">+{stats.totalImpactMonth.toLocaleString()}€</span> / mois
                </div>
              </div>

              <div className="space-y-5 mb-10">
                <div className="flex justify-between items-center py-3 border-b border-gray-800">
                  <span className="text-sm text-gray-400 flex items-center gap-2">
                    <i className="fas fa-wallet text-xs opacity-50"></i> Gain de productivité
                  </span>
                  <span className="font-bold text-white">+{stats.moneySavedTimeYear.toLocaleString()}€</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-800">
                  <span className="text-sm text-gray-400 flex items-center gap-2">
                    <i className="fas fa-chart-line text-xs opacity-50"></i> Chiffre d'Affaires capté
                  </span>
                  <span className="font-bold text-white">+{stats.extraRevenueYear.toLocaleString()}€</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-sm text-orange-500 font-bold italic uppercase tracking-tighter">ROI sur investissement</span>
                  <span className="font-bold text-orange-500 italic">X 8.5</span>
                </div>
              </div>

              <div className="p-6 bg-purple-900/20 rounded-2xl border border-purple-500/20 mb-8">
                <p className="text-[10px] text-purple-300 text-center leading-relaxed font-medium">
                  Cette simulation est basée sur une auto-école moyenne économisant 70% de son temps de secrétariat grâce à nos agents Chloé & Pierre (nos agents IA).
                </p>
              </div>

              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-6 rounded-2xl uppercase tracking-tighter text-xl transition-all hover:scale-[1.03] shadow-2xl shadow-orange-500/30 active:scale-98">
                Activer mon AutoPilot
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;
