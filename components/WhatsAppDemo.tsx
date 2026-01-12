import React, { useState, useRef, useEffect } from 'react';
import { GeminiChatService, API_KEY_ERROR_MESSAGE } from '../services/gemini';

interface Message {
  text: string;
  role: 'user' | 'assistant';
  timestamp: string;
}

// More sophisticated system instruction for a high-quality demo
const WHATSAPP_SYSTEM_INSTRUCTION = `
Tu es Chloé, l'IA Secrétaire d'élite de l'auto-école "AutoPilot Driving".
Ton objectif est de convertir le visiteur (un futur élève) en client ou de fixer un rendez-vous.
Règles de comportement :
1. Sois ultra-réactive, chaleureuse et professionnelle (style iMessage, phrases courtes et percutantes).
2. Si on demande des prix, annonce le "Pack Permis B" à 1190€ (20h) et mentionne immédiatement qu'il est éligible au CPF.
3. Si l'utilisateur hésite, rassure-le sur le taux de réussite (92%) et la flexibilité des horaires (7h-21h).
4. Ton but final est toujours de proposer une "Évaluation de départ" gratuite ou un appel téléphonique.
5. Utilise des émojis avec parcimonie mais pour rendre la conversation vivante (🚗, 📅, ✅).
6. Ne fais jamais de longs pavés de texte. Scinde tes réponses si nécessaire.
`;

const WhatsAppDemo: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatServiceRef = useRef<GeminiChatService | null>(null);

  useEffect(() => {
    chatServiceRef.current = new GeminiChatService(WHATSAPP_SYSTEM_INSTRUCTION);
    // Initial message from Chloé
    setMessages([
      { 
        text: "Bonjour ! 👋 Je suis Chloé d'AutoPilot. Je gère les inscriptions et les plannings. Vous cherchez des infos pour le permis B ou la conduite accompagnée ?", 
        role: 'assistant', 
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) 
      }
    ]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !chatServiceRef.current) return;

    const userMessage = input.trim();
    setInput('');
    const now = new Date();
    const userTimestamp = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    
    setMessages((prev) => [...prev, { text: userMessage, role: 'user', timestamp: userTimestamp }]);
    setIsTyping(true);

    try {
      const responseText = await chatServiceRef.current.sendMessage(userMessage);
      const assistantTimestamp = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
      setMessages((prev) => [...prev, { text: responseText, role: 'assistant', timestamp: assistantTimestamp }]);
    } catch (error: any) {
      console.error("Chat error:", error);
      const errorTimestamp = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
      if (error.message?.includes("API key")) {
        setMessages((prev) => [...prev, { text: "⚠️ " + API_KEY_ERROR_MESSAGE, role: 'assistant', timestamp: errorTimestamp }]);
      } else {
        setMessages((prev) => [...prev, { text: "Oups, je n'ai pas compris. Pouvez-vous reformuler ?", role: 'assistant', timestamp: errorTimestamp }]);
      }
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section id="whatsapp-demo" className="py-24 bg-transparent border-y border-white/5 animate-section-fade-in overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 relative z-10">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">
            Démonstration Interactive
          </div>
          <h2 className="text-4xl md:text-6xl font-montserrat font-black uppercase italic mb-6 text-white leading-tight">
            Votre secrétariat,<br />
            <span className="text-blue-500">version 2.0</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto font-light">
            Testez Chloé directement ci-dessous. Elle qualifie les prospects, répond aux questions et réserve les créneaux, <span className="text-white font-bold">sans intervention humaine.</span>
          </p>
        </div>

        <div className="relative group max-w-[500px] mx-auto">
          {/* Glow Effect */}
          <div className="absolute -inset-10 bg-blue-600/20 rounded-[4rem] blur-[60px] opacity-50 group-hover:opacity-75 transition duration-1000"></div>
          
          <div className="relative border-8 border-gray-800 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col h-[700px] bg-black">
            {/* iOS Dynamic Island / Notch area simulation */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-20"></div>

            {/* Chat Messages Area */}
            <div className="flex-1 px-5 pt-12 pb-4 flex flex-col bg-black">
              <div className="text-center mb-8 opacity-70">
                <div className="w-16 h-16 bg-gray-800 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl overflow-hidden">
                  <span className="text-3xl">🤖</span>
                </div>
                <h3 className="text-gray-200 text-xs font-medium">Chloé (IA)</h3>
                <p className="text-gray-500 text-[10px]">iMessage • Aujourd'hui</p>
              </div>

              <div className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} mb-2`}>
                    <div className={`px-4 py-2.5 max-w-[85%] text-[15px] leading-snug shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-[#007AFF] text-white rounded-2xl rounded-br-sm' 
                        : 'bg-[#262628] text-gray-100 rounded-2xl rounded-bl-sm'
                    }`}>
                      {msg.text}
                    </div>
                    {msg.role === 'user' && index === messages.length - 1 && !isTyping && (
                      <span className="text-[10px] text-gray-500 font-medium mt-1 mr-1">Distribué</span>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-start">
                    <div className="bg-[#262628] px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1.5 h-[38px]">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              <div className="mt-4 pt-2">
                <form onSubmit={handleSubmit} className="relative flex items-center gap-3">
                  <div className="p-2 bg-gray-800 rounded-full text-gray-400 cursor-pointer hover:text-white transition-colors">
                    <i className="fas fa-camera"></i>
                  </div>
                  <div className="flex-1 relative">
                    <input 
                      type="text" 
                      placeholder="iMessage" 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="w-full bg-[#1C1C1E] border border-gray-800 text-white rounded-full pl-4 pr-10 py-2 text-[15px] focus:outline-none focus:border-gray-700 placeholder-gray-500" 
                      disabled={isTyping}
                    />
                    {input.trim() ? (
                      <button 
                        type="submit"
                        disabled={isTyping}
                        className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#007AFF] text-white w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-90"
                      >
                        <i className="fas fa-arrow-up text-[10px] font-bold"></i>
                      </button>
                    ) : (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors cursor-pointer p-1">
                        <i className="fas fa-microphone text-sm"></i>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
            
            {/* iOS Home Indicator */}
            <div className="h-5 bg-black w-full flex justify-center items-end pb-2">
              <div className="w-1/3 h-1 bg-gray-100 rounded-full opacity-40"></div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default WhatsAppDemo;