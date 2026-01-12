
import React, { useState, useRef, useEffect } from 'react';
import { ai, createPcmBlob, decode, decodeAudioData, API_KEY_ERROR_MESSAGE } from '../services/gemini';
import { LiveServerMessage, Modality } from '@google/genai';

const LiveVoiceAgent: React.FC = () => {
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

  const startSession = async () => {
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

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setIsAgentSpeaking(false);
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
          systemInstruction: "Tu es Chloé, l'assistante virtuelle d'une auto-école, propulsée par AutoPilot AI. Ton rôle est d'aider les futurs ÉLÈVES à s'inscrire ou à réserver des leçons. Tu informes sur : le forfait 20h (environ 1200€), l'éligibilité au CPF, et l'inscription au NEPH. Tu dois proposer de fixer une heure d'évaluation initiale. Ton ton est chaleureux, rassurant et professionnel.",
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
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
    nextStartTimeRef.current = 0;
    setIsAgentSpeaking(false);

    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (audioContextInRef.current) {
      audioContextInRef.current.close().catch(console.error);
      audioContextInRef.current = null;
    }
    if (audioContextOutRef.current) {
      audioContextOutRef.current.close().catch(console.error);
      audioContextOutRef.current = null;
    }

    sessionPromiseRef.current?.then(s => s.close()).catch(console.error);
    sessionPromiseRef.current = null;
    
    setIsConnected(false);
    setIsConnecting(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-12">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-black uppercase tracking-[0.2em]">
          Démonstration Vocale
        </div>
        <h2 className="text-4xl md:text-5xl font-montserrat font-black mb-6 italic uppercase tracking-tight text-white">
          Parlez à <span className="gradient-text">Chloé</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Découvrez la fluidité de nos agents vocaux. Pas de "Tapez 1". Une vraie conversation.
        </p>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-purple-600/20 rounded-[3rem] blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative glass p-16 rounded-[3rem] border-gray-800 text-center bg-gray-950 overflow-hidden flex flex-col items-center justify-center min-h-[500px]">
          
          {/* Animated Background Mesh */}
          <div className="absolute inset-0 opacity-20">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-orange-900/40 to-purple-900/40 blur-[100px] rounded-full animate-pulse-slow"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-12">
            
            {/* The Orb */}
            <div className="relative">
              <div className={`w-48 h-48 rounded-full flex items-center justify-center transition-all duration-1000 ${
                isConnected 
                  ? 'shadow-[0_0_100px_rgba(168,85,247,0.4)] scale-110' 
                  : 'shadow-[0_0_0_rgba(0,0,0,0)] bg-gray-900 border border-gray-800'
              }`}>
                {isConnected ? (
                  // Active State: Siri-like Orb
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-purple-600 animate-spin-slow opacity-80 blur-xl"></div>
                     <div className="absolute inset-2 bg-gray-950 rounded-full flex items-center justify-center z-10">
                        {isAgentSpeaking ? (
                          // Waveform animation
                          <div className="flex items-center gap-1.5 h-12">
                            {[...Array(5)].map((_, i) => (
                              <div 
                                key={i} 
                                className="w-1.5 bg-gradient-to-t from-orange-400 to-purple-500 rounded-full animate-wave"
                                style={{ animationDelay: `${i * 0.1}s` }}
                              ></div>
                            ))}
                          </div>
                        ) : (
                          // Listening / Idle
                          <div className="w-4 h-4 bg-white rounded-full animate-ping"></div>
                        )}
                     </div>
                  </div>
                ) : (
                  // Inactive State: Icon
                  <i className="fas fa-microphone-lines text-5xl text-gray-700"></i>
                )}
              </div>
              
              {/* Rings */}
              {isConnected && (
                 <>
                   <div className="absolute inset-0 rounded-full border border-purple-500/30 animate-ping-slow"></div>
                   <div className="absolute -inset-4 rounded-full border border-orange-500/20 animate-ping-slower"></div>
                 </>
              )}
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center gap-4">
               {!isConnected ? (
                <button 
                  onClick={startSession}
                  disabled={isConnecting}
                  className="bg-white text-gray-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-all flex items-center gap-3 disabled:opacity-50 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                >
                  {isConnecting ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-phone"></i>}
                  {isConnecting ? "Connexion..." : "Appeler Chloé"}
                </button>
              ) : (
                <button onClick={stopSession} className="bg-red-500/20 hover:bg-red-500 hover:text-white text-red-500 border border-red-500/50 px-10 py-4 rounded-full font-bold text-lg transition-all flex items-center gap-3 active:scale-95 backdrop-blur-md">
                  <i className="fas fa-phone-slash"></i>
                  Raccrocher
                </button>
              )}
              
              <p className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${isConnected ? 'text-green-400' : 'text-gray-600'}`}>
                {isConnected ? (isAgentSpeaking ? "Chloé parle..." : "Chloé vous écoute") : "Microphone désactivé"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes wave {
          0%, 100% { height: 10px; }
          50% { height: 40px; }
        }
        .animate-wave {
          animation: wave 0.5s ease-in-out infinite;
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-ping-slower {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1) translate(-50%, -50%); }
          50% { opacity: 0.3; transform: scale(1.1) translate(-50%, -50%); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LiveVoiceAgent;
