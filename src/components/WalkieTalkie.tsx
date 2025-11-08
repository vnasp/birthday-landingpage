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
  const [errorMessage, setErrorMessage] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Evitar problemas si se renderiza del lado del servidor
    if (typeof window === "undefined") return;

    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "es-ES";

      recognition.onresult = (event: any) => {
        const speechResult = event.results[0][0].transcript.toLowerCase();
        setTranscript(speechResult);

        const cleanResult = speechResult.trim().replace(/\s+/g, "");
        if (
          cleanResult.includes("eleven") ||
          cleanResult.includes("once") ||
          cleanResult.includes("11") ||
          speechResult.match(/\b11\b/) ||
          speechResult.match(/\bonce\b/) ||
          speechResult.match(/\beleven\b/)
        ) {
          setShowSuccess(true);
          setTimeout(() => {
            onSolved();
          }, 3000);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);

        if (event.error === "no-speech") {
          setErrorMessage(
            "No te escucho, dilo de nuevo un poco más fuerte (sin gritar)."
          );
          setTimeout(() => setErrorMessage(""), 4000);
          return;
        }

        if (
          event.error === "not-allowed" ||
          event.error === "service-not-allowed"
        ) {
          setErrorMessage(
            "Safari bloqueó el micrófono para este sitio. Revisa los permisos del micrófono para este dominio."
          );
          setTimeout(() => setErrorMessage(""), 5000);
        }
      };

      recognitionRef.current = recognition;
    } else {
      setErrorMessage(
        "Tu navegador no soporta reconocimiento de voz. Pídele ayuda a un adulto para escribir la respuesta."
      );
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

      // Bajar volumen del audio ambiental
      const ambientAudio = document.querySelector(
        'audio[src*="ost.mp3"]'
      ) as HTMLAudioElement | null;
      const originalVolume = ambientAudio?.volume ?? 0.3;

      if (ambientAudio) {
        ambientAudio.volume = 0.05;
      }

      audioRef.current.volume = 1;

      await audioRef.current.play();
      audioRef.current.onended = () => {
        setIsPlaying(false);
        setMessagePlayed(true);

        if (ambientAudio) {
          ambientAudio.volume = originalVolume;
        }
      };
    } catch (err) {
      console.warn("Audio playback blocked:", err);
    }
  };

  const startListening = () => {
    if (!recognitionRef.current || isListening) return;

    try {
      setTranscript("");
      setErrorMessage("");
      setIsListening(true);

      // Safari se lleva mejor si llamamos start directamente en el click
      recognitionRef.current.start();
    } catch (err: any) {
      console.error("Error starting recognition:", err);
      setIsListening(false);

      if (
        err.name === "NotAllowedError" ||
        err.message?.toLowerCase().includes("not allowed")
      ) {
        setErrorMessage(
          "No se pudo acceder al micrófono. Revisa los permisos para este sitio en Safari."
        );
        setTimeout(() => setErrorMessage(""), 5000);
      } else {
        setErrorMessage("Ocurrió un problema al iniciar el micrófono.");
        setTimeout(() => setErrorMessage(""), 5000);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 bg-cover bg-center bg-no-repeat z-20 transition-all duration-1000 flex flex-col"
      style={{
        backgroundImage: showSuccess ? "url(/bg1.jpg)" : "url(/bg2.webp)",
      }}
    >
      {/* Mensaje de éxito */}
      {showSuccess && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-40"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p>Segunda palabra desbloqueada</p>
          <h1 className="text-6xl font-bold text-white uppercase">
            Cumpleaños
          </h1>
        </motion.div>
      )}

      {/* Micrófono - top */}
      {messagePlayed && !showSuccess && (
        <motion.div
          className="shrink-0 pt-8 pb-4 px-4 z-30 flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
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

          {errorMessage && (
            <p className="text-red-400 text-lg animate-pulse font-semibold text-center max-w-md">
              {errorMessage}
            </p>
          )}

          {transcript && (
            <p className="text-white text-lg text-center max-w-md">
              Escuché: <span className="font-bold">{transcript}</span>
            </p>
          )}
        </motion.div>
      )}

      {/* Espaciador flexible */}
      <div className="grow" />

      {/* Walkie Talkie - bottom */}
      {!showSuccess && (
        <div className="shrink-0 pb-8 z-30 flex justify-center">
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
              className="max-h-[70vh] w-auto select-none"
            />
          </motion.div>
        </div>
      )}

      <audio ref={audioRef} src="/audio/walkietalkie.wav" />
    </div>
  );
};

export default WalkieTalkie;
