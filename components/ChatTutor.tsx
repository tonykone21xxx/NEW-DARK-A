import React, { useState, useRef, useEffect } from 'react';
import { GeminiChatService, generateSpeech, decodeBase64, decodeAudioData, generateIllustration, API_KEY_ERROR_MESSAGE } from '../services/gemini';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  image?: string;
  isGeneratingImage?: boolean;
  timestamp: string; // Added timestamp for display
}

const CHAT_TUTOR_SYSTEM_INSTRUCTION = "Tu es Chloé, l'assistante AutoPilot AI spécialisée dans le Code de la Route. Ton rôle est d'expliquer les règles de conduite françaises de manière pédagogique et précise, en couvrant les priorités, les panneaux, et la sécurité routière. Si l'utilisateur demande une image ou une illustration, dis-lui que tu peux en générer une via le bouton d'illustration.";

const ChatTutor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const chatServiceRef = useRef<GeminiChatService | null>(null); // Ref for the chat service instance

  // Initialize chat service on mount
  useEffect(() => {
    chatServiceRef.current = new GeminiChatService(CHAT_TUTOR_SYSTEM_INSTRUCTION);
    setMessages([
      { role: 'assistant', text: "Bonjour ! Je suis Chloé, ton assistante Code de la Route propulsée par AutoPilot AI. Tu as une question sur une priorité, un panneau ou une règle de sécurité ? Je peux même t'illustrer les situations !", timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) }
    ]);
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSpeak = async (text: string) => {
    if (isReading) {
      audioSourceRef.current?.stop();
      setIsReading(false);
      return;
    }

    setIsReading(true);
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      const base64 = await generateSpeech(text);
      if (!base64) throw new Error("No audio data received from API.");

      const data = decodeBase64(base64);
      const buffer = await decodeAudioData(data, audioContextRef.current, 24000, 1);
      
      const source = audioContextRef.current.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContextRef.current.destination);
      
      source.onended = () => {
        setIsReading(false);
        audioSourceRef.current = null;
      };
      
      audioSourceRef.current = source;
      source.start();
    } catch (e: any) {
      console.error("Speech generation or playback error:", e);
      if (e.message?.includes("API key")) {
        alert(API_KEY_ERROR_MESSAGE);
      } else {
        alert("Erreur lors de la lecture du message : " + e.message);
      }
      setIsReading(false);
    }
  };

  const handleIllustrate = async (index: number, context: string) => {
    setMessages(prevMessages => 
      prevMessages.map((msg, i) => 
        i === index ? { ...msg, isGeneratingImage: true } : msg
      )
    );

    try {
      const imageUrl = await generateIllustration(context);
      setMessages(prevMessages => 
        prevMessages.map((msg, i) => 
          i === index ? { ...msg, image: imageUrl || undefined, isGeneratingImage: false } : msg
        )
      );
      if (!imageUrl) {
        alert("Impossible de générer l'illustration. Veuillez réessayer.");
      }
    } catch (error: any) {
      console.error("Illustration error:", error);
      setMessages(prevMessages => 
        prevMessages.map((msg, i) => 
          i === index ? { ...msg, isGeneratingImage: false } : msg
        )
      );
      if (error.message?.includes("API key")) {
        alert(API_KEY_ERROR_MESSAGE);
      } else {
        alert("Erreur lors de la génération de l'illustration : " + error.message);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !chatServiceRef.current) return;

    const userMsg = input;
    setInput('');
    const userTimestamp = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { role: 'user', text: userMsg, timestamp: userTimestamp }]);
    setIsTyping(true);

    try {
      const response = await chatServiceRef.current.sendMessage(userMsg);
      const assistantTimestamp = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
      setMessages(prev => [...prev, { role: 'assistant', text: response || "Je n'ai pas compris, peux-tu répéter ?", timestamp: assistantTimestamp }]);
    } catch (error: any) {
      console.error("Chat API error:", error);
      const errorTimestamp = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
      if (error.message?.includes("API key")) {
        setMessages(prev => [...prev, { role: 'assistant', text: "Erreur de connexion avec Chloé : " + API_KEY_ERROR_MESSAGE, timestamp: errorTimestamp }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', text: "Erreur de connexion avec Chloé : " + error.message, timestamp: errorTimestamp }]);
      }
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section id="tuteur" className="py-24 animate-section-fade-in relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-montserrat font-black uppercase italic mb-4 text-white">
            Le <span className="gradient-text">Coach Visuel IA</span>
          </h2>
          <p className="text-gray-400">Posez vos questions et demandez des illustrations pour mieux comprendre le code, propulsé par l'IA.</p>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-[2.6rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative glass rounded-[2.5rem] overflow-hidden border-white/5 shadow-2xl flex flex-col h-[700px] bg-gray-900">
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-gray-900/50 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-blue-400 flex items-center justify-center shadow-lg text-white">
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full animate-pulse-fast"></div>
                </div>
                <div>
                  <h4 className="font-bold text-white">Chloé IA</h4>
                  <p className="text-xs text-green-400 uppercase tracking-widest font-bold">Expert Pédagogique Gemini</p>
                </div>
              </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-950/50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-5 rounded-[2rem] shadow-lg transition-all duration-300 ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-gray-800 text-gray-100 rounded-tl-none border border-gray-700'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    
                    {msg.image && (
                      <div className="mt-4 rounded-xl overflow-hidden border border-gray-700 animate-in fade-in zoom-in duration-500 shadow-lg">
                        <img src={msg.image} alt="Illustration du code" className="w-full h-auto object-cover" />
                      </div>
                    )}

                    {msg.isGeneratingImage && (
                      <div className="mt-4 aspect-video bg-gray-900 rounded-xl flex flex-col items-center justify-center border border-gray-700 border-dashed animate-pulse-slow">
                        <i className="fas fa-magic text-purple-400 text-xl mb-2 animate-spin-slow"></i>
                        <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Génération de l'image par l'IA...</span>
                      </div>
                    )}

                    {msg.role === 'assistant' && !msg.image && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        <button 
                          onClick={() => handleSpeak(msg.text)}
                          className="text-[10px] text-blue-400 hover:text-white font-bold flex items-center gap-2 px-3 py-1.5 bg-blue-900/20 rounded-full transition-all border border-blue-500/20 hover:bg-blue-500 active:scale-95 shadow-sm hover:shadow-md"
                          disabled={isGeneratingImage(i, messages)} // Disable speak while image is generating for this message
                        >
                          <i className={`fas ${isReading && audioSourceRef.current && (audioSourceRef.current as any).buffer === messages[i].text ? 'fa-volume-high animate-pulse' : 'fa-volume-up'}`}></i>
                          {isReading && audioSourceRef.current && (audioSourceRef.current as any).buffer === messages[i].text ? "Chloé parle..." : "Écouter"}
                        </button>
                        <button 
                          onClick={() => handleIllustrate(i, msg.text)}
                          className="text-[10px] text-purple-400 hover:text-white font-bold flex items-center gap-2 px-3 py-1.5 bg-purple-900/20 rounded-full transition-all border border-purple-500/20 hover:bg-purple-500 active:scale-95 shadow-sm hover:shadow-md"
                          disabled={msg.isGeneratingImage || isReading || isGeneratingImage(i, messages)} // Disable illustrate while generating or reading
                        >
                          <i className="fas fa-image"></i>
                          {msg.isGeneratingImage ? "Génération..." : "Illustrer (par l'IA)"}
                        </button>
                      </div>
                    )}
                    <span className={`block mt-2 text-[10px] ${msg.role === 'user' ? 'text-white/70 text-right' : 'text-gray-500 text-left'}`}>{msg.timestamp}</span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 p-4 rounded-2xl border border-gray-700">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-6 bg-gray-900 border-t border-white/5 flex gap-4">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Expliquez-moi la priorité à droite..." 
                className="flex-1 bg-gray-800 border border-gray-700 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all shadow-inner text-white placeholder-gray-500"
              />
              <button 
                type="submit"
                disabled={isTyping}
                className="bg-purple-600 hover:bg-purple-700 w-14 h-14 rounded-2xl flex items-center justify-center transition-all active:scale-90 shadow-lg shadow-purple-600/30 disabled:opacity-50 text-white"
              >
                <i className="fas fa-paper-plane text-lg"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes pulse-fast {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        .animate-pulse-fast {
          animation: pulse-fast 1.5s ease-in-out infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ChatTutor;

// Helper to disable buttons when a specific image is generating for that message
function isGeneratingImage(index: number, messages: Message[]) {
  return messages[index]?.isGeneratingImage;
}