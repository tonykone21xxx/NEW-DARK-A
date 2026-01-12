import React, { useState, useRef, useEffect } from 'react';
import { ai, createPcmBlob, decode, decodeAudioData, API_KEY_ERROR_MESSAGE } from '../services/gemini';
import { LiveServerMessage, Modality } from '@google/genai';

const VoiceJoin: React.FC = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);
  
  const audioContextInRef = useRef<AudioContext | null>(null);
  const audioContextOutRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);

  // Effect to clean up resources when component unmounts
  useEffect(() => {
    return () => {
      stopSession();
    };
  }, []);

  const startJoinSession = async () => {
    setIsConnecting(true);
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Create new audio contexts for each session
      audioContextInRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      audioContextOutRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsConnected(true);
            setIsConnecting(false);
            setupAudioInput();
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio && audioContextOutRef.current) {
              setIsAgentSpeaking(true);
              const ctx = audioContextOutRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              
              const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(ctx.destination);
              source.onended = () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) setIsAgentSpeaking(false);
              };
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }
          },
          onerror: (e: ErrorEvent) => {
            console.error('Live session error:', e);
            alert("Erreur de session en direct. Veuillez réessayer. " + (e.message?.includes("API key") ? API_KEY_ERROR_MESSAGE : ""));
            stopSession();
          },
          onclose: () => {
            console.debug('Live session closed.');
            // Only stop session if it's currently connected, to avoid redundant calls or state issues
            if (isConnected) {
              stopSession();
            }
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: "Tu es l'agent de croissance d'AutoPilot AI, propulsé par l'IA Gemini. Ton but est de recruter des nouvelles AUTO-ÉCOLES. Demande poliment le nom du gérant, le nom de l'auto-école et leur ville. Explique que nous allons les recontacter pour un audit gratuit. Sois extrêmement professionnelle, dynamique et invitante.",
        },
      });

      sessionPromiseRef.current = sessionPromise;
    } catch (err: any) {
      console.error("Failed to start live session:", err);
      setIsConnecting(false);
      if (err.name === "NotAllowedError") {
        alert("Accès au microphone refusé. Veuillez autoriser l'accès pour utiliser la voix.");
      } else if (err.message?.includes("API key")) {
        alert(API_KEY_ERROR_MESSAGE);
      } else {
        alert("Impossible de démarrer la session vocale. " + err.message);
      }
      stopSession(); // Ensure full cleanup even on initial error
    }
  };

  const setupAudioInput = () => {
    if (!audioContextInRef.current || !streamRef.current) return;
    const source = audioContextInRef.current.createMediaStreamSource(streamRef.current);
    const processor = audioContextInRef.current.createScriptProcessor(4096, 1, 1);
    processorRef.current = processor;
    processor.onaudioprocess = (e) => {
      const inputData = e.inputBuffer.getChannelData(0);
      const pcmBlob = createPcmBlob(inputData);
      sessionPromiseRef.current?.then(session => session.sendRealtimeInput({ media: pcmBlob }));
    };
    source.connect(processor);
    processor.connect(audioContextInRef.current.destination);
  };

  const stopSession = () => {
    // Stop all playing audio sources
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
    nextStartTimeRef.current = 0;
    setIsAgentSpeaking(false);

    // Disconnect and close audio input processing
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop()); // Stop microphone
      streamRef.current = null;
    }
    if (audioContextInRef.current) {
      audioContextInRef.current.close().catch(e => console.error("Error closing input audio context:", e));
      audioContextInRef.current = null;
    }
    if (audioContextOutRef.current) {
      audioContextOutRef.current.close().catch(e => console.error("Error closing output audio context:", e));
      audioContextOutRef.current = null;
    }

    // Close the GenAI live session
    sessionPromiseRef.current?.then(s => s.close()).catch(e => console.error("Error closing GenAI session:", e));
    sessionPromiseRef.current = null;
    
    setIsConnected(false);
    setIsConnecting(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="relative group p-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-[3rem] transition-all hover:from-blue-500/40 hover:to-purple-500/40 shadow-2xl animate-section-fade-in">
        <div className="glass p-12 rounded-[2.9rem] text-center bg-white/80 backdrop-blur-xl border-gray-200">
          <h3 className="text-3xl font-montserrat font-black mb-4 uppercase italic tracking-tight text-gray-900">
            Vous voulez <span className="gradient-text">passer à l'IA ?</span>
          </h3>
          <p className="text-gray-700 text-lg mb-10 leading-relaxed">
            Inscrivez votre établissement par la voix avec notre agent IA propulsé par l'IA. Dites simplement "Je souhaite rejoindre AutoPilot AI".
          </p>

          <div className="flex flex-col items-center gap-6">
            {!isConnected ? (
              <button 
                onClick={startJoinSession}
                disabled={isConnecting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black text-xl uppercase tracking-tighter flex items-center gap-4 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/30"
              >
                {isConnecting ? <><i className="fas fa-circle-notch fa-spin"></i> Initialisation de l'IA...</> : <><i className="fas fa-microphone"></i> S'inscrire Vocalement</>}
              </button>
            ) : (
              <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-300 w-full">
                <div className="flex items-center gap-3 h-20">
                  {[...Array(10)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-1.5 bg-blue-400 rounded-full animate-pulse-dynamic shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                      style={{ 
                        height: isAgentSpeaking ? `${Math.random() * 50 + 10}px` : '8px',
                        animationDelay: `${i * 0.1}s` 
                      }}
                    ></div>
                  ))}
                </div>
                <button onClick={stopSession} className="text-red-500 font-black hover:text-red-600 transition-colors uppercase tracking-[0.2em] text-xs flex items-center gap-2 px-4 py-2 bg-red-500/5 rounded-full border border-red-500/20 shadow-md hover:shadow-lg active:scale-95">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                  Arrêter l'inscription
                </button>
              </div>
            )}
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-700 font-black mt-4">
              Service B2B • Réponse garantie sous 24h
            </p>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes pulse-dynamic {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        .animate-pulse-dynamic {
          animation: pulse-dynamic 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default VoiceJoin;