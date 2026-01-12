
import React, { useState } from 'react';
import { ai, API_KEY_ERROR_MESSAGE } from '../services/gemini';

const GroundingFAQ: React.FC = () => {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [links, setLinks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setAnswer(null);
    setLinks([]);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `En tant qu'expert AutoPilot AI, réponds de manière concise et précise à cette question sur le permis de conduire français, le CPF ou les démarches administratives (NEPH, ANTS) : ${query}`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      setAnswer(response.text);
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        setLinks(chunks.filter((c: any) => c.web).map((c: any) => c.web));
      }
    } catch (err: any) {
      console.error("Grounding FAQ error:", err);
      if (err.message?.includes("API key")) {
        setAnswer("Erreur : " + API_KEY_ERROR_MESSAGE + " Veuillez vérifier votre configuration.");
      } else {
        setAnswer("Désolé, je n'ai pas pu récupérer l'information en temps réel. Veuillez réessayer.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    "Comment utiliser son CPF pour le permis ?",
    "Délais actuels pour le numéro NEPH ?",
    "Prix moyen d'un forfait 20h en 2024 ?",
    "Passer son permis en candidat libre ?"
  ];

  return (
    <section className="py-24 animate-section-fade-in relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-black uppercase tracking-[0.2em] animate-pulse-slow">
            Information en Temps Réel
          </div>
          <h2 className="text-4xl font-montserrat font-black uppercase italic mb-4 text-white">
            Centre d'<span className="gradient-text">Aide Intelligent</span>
          </h2>
          <p className="text-gray-400">Obtenez des réponses instantanées et sourcées en temps réel grâce à notre IA. Posez n'importe quelle question sur la réglementation actuelle du permis de conduire.</p>
        </div>

        <div className="glass p-8 rounded-[2.5rem] border-white/5 bg-gray-900/50 shadow-2xl">
          <form onSubmit={handleSearch} className="flex gap-4 mb-8">
            <div className="flex-1 relative">
              <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-gray-500"></i>
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ex: Comment activer mon compte CPF ?"
                className="w-full bg-gray-950 border border-gray-800 rounded-2xl pl-14 pr-6 py-4 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 outline-none transition-all shadow-inner text-white placeholder-gray-500"
              />
            </div>
            <button 
              type="submit"
              disabled={isLoading}
              className="bg-orange-500 hover:bg-orange-600 px-8 rounded-2xl font-bold text-white transition-all disabled:opacity-50 hover:scale-105 active:scale-95 shadow-lg"
            >
              {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Demander"}
            </button>
          </form>

          {answer ? (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="p-6 bg-gray-800 rounded-2xl border border-gray-700 mb-6 shadow-md">
                <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">{answer}</p>
              </div>
              
              {links.length > 0 && (
                <div className="space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Sources vérifiées par Google Search :</p>
                  <div className="flex flex-wrap gap-3">
                    {links.map((link, idx) => (
                      <a 
                        key={idx} 
                        href={link.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-purple-400 hover:text-white flex items-center gap-2 bg-purple-900/30 px-4 py-2 rounded-full border border-purple-500/20 transition-all hover:bg-purple-600 hover:scale-[1.02] active:scale-98 shadow-sm"
                      >
                        <i className="fas fa-external-link-alt text-[10px]"></i>
                        {link.title || "Source officielle"}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {suggestedQuestions.map((q, i) => (
                <button 
                  key={i} 
                  onClick={() => { setQuery(q); }}
                  className="text-left p-4 bg-gray-950/50 rounded-xl border border-gray-800 hover:border-orange-500/30 hover:bg-gray-800 transition-all text-xs text-gray-400 font-medium hover:scale-[1.01] active:scale-99 shadow-sm"
                >
                  <i className="fas fa-lightbulb text-purple-500/50 mr-2"></i>
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GroundingFAQ;
