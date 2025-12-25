
import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { createBlob, decode, decodeAudioData } from '../utils/audio';

interface LiveAssistantProps {
  onClose: () => void;
  isOpen: boolean;
}

export const LiveAssistant: React.FC<LiveAssistantProps> = ({ isOpen, onClose }) => {
  const [isActive, setIsActive] = useState(false);
  const [transcription, setTranscription] = useState<{ user: string; model: string }>({ user: '', model: '' });
  const [isConnecting, setIsConnecting] = useState(false);
  
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<{ input: AudioContext; output: AudioContext } | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const startSession = async () => {
    setIsConnecting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = { input: inputCtx, output: outputCtx };

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          systemInstruction: 'You are a helpful and friendly assistant for the Post Explorer app. You help users explore social media posts and answer questions in a conversational way. Keep responses concise and engaging.',
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setIsConnecting(false);
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle Transcription
            if (message.serverContent?.inputTranscription) {
              setTranscription(prev => ({ ...prev, user: message.serverContent!.inputTranscription!.text }));
            }
            if (message.serverContent?.outputTranscription) {
              setTranscription(prev => ({ ...prev, model: prev.model + message.serverContent!.outputTranscription!.text }));
            }
            if (message.serverContent?.turnComplete) {
              setTranscription(prev => ({ ...prev, model: '' })); // Reset model turn text for next one, or keep it as history
            }

            // Handle Audio Output
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio && audioContextRef.current) {
              const outCtx = audioContextRef.current.output;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outCtx.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), outCtx, 24000, 1);
              const source = outCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outCtx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => cleanup(),
          onerror: () => cleanup(),
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setIsConnecting(false);
    }
  };

  const cleanup = () => {
    setIsActive(false);
    setIsConnecting(false);
    sessionRef.current?.close();
    audioContextRef.current?.input.close();
    audioContextRef.current?.output.close();
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
  };

  useEffect(() => {
    if (!isOpen && isActive) cleanup();
    return () => cleanup();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
      <button 
        onClick={onClose}
        className="absolute top-10 right-8 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all active:scale-90"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="flex-1 flex flex-col items-center justify-center space-y-12 w-full max-w-sm">
        {/* Visualizer */}
        <div className="relative">
          <div className={`w-32 h-32 rounded-full flex items-center justify-center z-10 relative bg-white transition-all duration-500 ${isActive ? 'scale-110 shadow-[0_0_50px_rgba(255,255,255,0.4)]' : 'scale-100 shadow-xl'}`}>
            <svg className={`w-12 h-12 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
          </div>
          {isActive && (
            <>
              <div className="absolute inset-0 rounded-full bg-blue-400/30 animate-ping" />
              <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-pulse delay-75 scale-125" />
            </>
          )}
        </div>

        <div className="text-center space-y-4">
          <h2 className="text-white text-2xl font-black tracking-tight">
            {isConnecting ? 'Initializing Live API...' : isActive ? 'Listening...' : 'Conversational AI'}
          </h2>
          <p className="text-slate-400 text-sm font-medium px-4">
            {isActive 
              ? "Tell me what you're looking for in your posts." 
              : "Experience real-time voice interaction powered by Gemini 2.5."}
          </p>
        </div>

        {/* Transcriptions */}
        <div className="w-full bg-white/5 rounded-3xl p-6 min-h-[120px] border border-white/10 flex flex-col justify-center space-y-3">
          {transcription.user && (
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest text-left">You</p>
          )}
          <p className="text-white text-sm font-medium italic">{transcription.user || "Voice transcription will appear here..."}</p>
          
          {transcription.model && (
            <>
              <hr className="border-white/5 my-2" />
              <p className="text-blue-400 text-xs font-bold uppercase tracking-widest text-left">Assistant</p>
              <p className="text-white/80 text-sm leading-relaxed">{transcription.model}</p>
            </>
          )}
        </div>

        {!isActive ? (
          <button 
            onClick={startSession}
            disabled={isConnecting}
            className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black shadow-2xl active:scale-95 transition-all flex items-center justify-center space-x-3 disabled:opacity-50"
          >
            {isConnecting ? (
              <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <span>Start Conversation</span>
              </>
            )}
          </button>
        ) : (
          <button 
            onClick={cleanup}
            className="w-full py-4 bg-red-500 text-white rounded-2xl font-black shadow-2xl active:scale-95 transition-all flex items-center justify-center space-x-3"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
            </svg>
            <span>Stop Assistant</span>
          </button>
        )}
      </div>
      
      <p className="mt-auto text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">Powered by Gemini 2.5 Native Audio</p>
    </div>
  );
};
