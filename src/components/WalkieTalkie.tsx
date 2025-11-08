import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface Props {
  onSolved: () => void;
}

const WalkieTalkie = ({ onSolved }: Props) => {
  const [messagePlayed, setMessagePlayed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Inicializar Web Speech API
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "es-ES";

      recognitionRef.current.onresult = (event: any) => {
        const speechResult = event.results[0][0].transcript.toLowerCase();
        setTranscript(speechResult);

        // Verificar si dijo "eleven" o "once"
        if (speechResult.includes("eleven") || speechResult.includes("once")) {
          setShowSuccess(true);
          setTimeout(() => {
            onSolved();
          }, 2000);
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onSolved]);

  const handlePlayAudio = async () => {
    if (!audioRef.current) return;
    try {
      setIsPlaying(true);
      await audioRef.current.play();
      audioRef.current.onended = () => {
        setIsPlaying(false);
        setMessagePlayed(true);
      };
    } catch (err) {
      console.warn("Audio playback blocked:", err);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript("");
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-cover bg-center bg-no-repeat z-20 transition-all duration-1000"
      style={{
        backgroundImage: showSuccess ? "url(/bg1.jpg)" : "url(/bg2.webp)",
      }}
    >
      {/* Mensaje de éxito */}
      {showSuccess && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-40"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p>Segunda palabra desbloqueada</p>
          <h1 className="text-6xl font-bold text-white">Cumpleaños</h1>
        </motion.div>
      )}

      {/* Micrófono - top center */}
      {messagePlayed && !showSuccess && (
        <motion.div
          className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-xl italic text-white">
            "Martín... ¿cómo se llama la niña que mueve cosas con la mente?"
          </p>
          <button
            onClick={startListening}
            disabled={isListening}
            className={`px-8 py-4 rounded-full font-semibold text-lg transition-all ${
              isListening
                ? "bg-red-600 animate-pulse"
                : "bg-red-700 hover:bg-red-800"
            }`}
          >
            {isListening ? "🎤 Escuchando..." : "🎤 Presiona para hablar"}
          </button>
          {transcript && (
            <p className="text-white text-lg">
              Escuché: <span className="font-bold">{transcript}</span>
            </p>
          )}
        </motion.div>
      )}

      {/* Walkie Talkie - center bottom */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30">
        <motion.div
          className="relative cursor-pointer"
          onClick={handlePlayAudio}
          animate={
            isPlaying
              ? {
                  filter: [
                    "drop-shadow(0 0 20px rgba(255, 0, 0, 0.8))",
                    "drop-shadow(0 0 40px rgba(255, 0, 0, 1))",
                    "drop-shadow(0 0 20px rgba(255, 0, 0, 0.8))",
                  ],
                }
              : {}
          }
          transition={{
            duration: 0.5,
            repeat: isPlaying ? Infinity : 0,
            ease: "easeInOut",
          }}
        >
          <img
            src="/walkietalkie.webp"
            alt="Walkie Talkie"
            className="h-[40] w-auto select-none"
          />
        </motion.div>
      </div>

      <audio ref={audioRef} src="/audio/walkietalkie.wav" />
    </div>
  );
};

export default WalkieTalkie;
