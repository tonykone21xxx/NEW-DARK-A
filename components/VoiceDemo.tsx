import React, { useState, useRef } from 'react';
import { generateSpeech, decodeBase64, decodeAudioData, API_KEY_ERROR_MESSAGE } from '../services/gemini';

const VoiceDemo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const handlePlayDemo = async () => {
    if (isLoading || isPlaying) return;

    setIsLoading(true);
    try {
      const demoText = "Bonjour, je suis votre assistante virtuelle Chloé, propulsée par AutoPilot AI. Je suis là pour libérer vos moniteurs en gérant vos plannings, vos inscriptions CPF et en répondant à vos élèves 24 heures sur 24. Comment puis-je vous aider aujourd'hui ?";
      
      const base64Audio = await generateSpeech(demoText);
      
      if (!base64Audio) throw new Error("No audio data received or API key issue.");

      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }

      const audioData = decodeBase64(base64Audio);
      const buffer = await decodeAudioData(audioData, audioContextRef.current, 24000, 1);
      
      const source = audioContextRef.current.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContextRef.current.destination);
      
      source.onended = () => setIsPlaying(false);
      
      setIsPlaying(true);
      source.start();
    } catch (error: any) {
      console.error("Audio playback error:", error);
      if (error.message?.includes("API key")) {
        alert(API_KEY_ERROR_MESSAGE);
      } else {
        alert("Erreur lors de la lecture de la démo vocale : " + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="demo-voice" className="glass p-10 rounded-[2.5rem] max-w-4xl mx-auto border-white/10 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] -z-10 animate-blob"></div>
      
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="relative">
          <div className={`w-32 h-32 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-4xl text-white shadow-xl transition-all duration-500 ${isPlaying ? 'scale-110 ring-8 ring-blue-500/20 glow-blue' : 'group-hover:scale-105 group-hover:shadow-2xl'}`}>
            <i className={`fas ${isPlaying ? 'fa-volume-high animate-pulse' : 'fa-headset'}`}></i>
          </div>
          {isPlaying && (
            <div className="absolute -inset-2 rounded-full border-2 border-blue-400 border-dashed animate-[spin_8s_linear_infinite] opacity-70"></div>
          )}
        </div>

        <div className="text-center md:text-left flex-1">
          <h3 className="text-3xl font-montserrat font-black mb-3 italic uppercase tracking-tight text-white">
            Écoutez votre <span className="gradient-text">future secrétaire IA</span>
          </h3>
          <p className="text-gray-300 text-lg mb-6 max-w-xl font-light">
            Découvrez la voix professionnelle et accueillante de nos agents IA, propulsée par AutoPilot AI. Une expérience fluide qui rassure vos élèves dès le premier contact.
          </p>
          
          <button 
            onClick={handlePlayDemo}
            disabled={isLoading}
            className={`group relative overflow-hidden bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-3 disabled:opacity-70 mx-auto md:mx-0 shadow-lg hover:shadow-xl`}
          >
            {isLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
            )}
            {isPlaying ? "Lecture en cours..." : "Lancer la démo vocale"}
            <div className="absolute inset-0 bg-blue-100/50 translate-y-full group-hover:translate-x-0 transition-transform duration-300"></div>
          </button>
        </div>
      </div>
      <style>{`
        @keyframes blob {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(10deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        .animate-blob {
          animation: blob 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default VoiceDemo;