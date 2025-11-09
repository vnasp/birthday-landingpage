import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LightsPuzzle from "./components/LightsPuzzle";
import WalkieTalkie from "./components/WalkieTalkie";
import MonsterQuiz from "./components/MonsterQuiz";
import PortalReveal from "./components/PortalReveal";
import Logo from "./components/Logo";
import FogAnimation from "./components/FogAnimation";
import Countdown from "./components/Countdown";

function App() {
  const [stage, setStage] = useState(0);
  const [audioOn, setAudioOn] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const checkUnlocked = () => {
      const targetDate = new Date("2025-11-11T00:00:00-03:00").getTime(); // UTC-3 para Chile

      const now = new Date().getTime();

      console.log("Target:", new Date(targetDate));
      console.log("Now:", new Date(now));
      console.log("Is unlocked:", now >= targetDate);

      if (now >= targetDate) {
        setIsUnlocked(true);
      }
    };

    checkUnlocked();

    // Verificar cada 10 segundos para detectar el cambio de fecha rápidamente
    const interval = setInterval(checkUnlocked, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Detectar si es Safari
    const ua = navigator.userAgent;
    const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(ua);
    setIsSafari(isSafariBrowser);
  }, []);

  useEffect(() => {
    // Establecer volumen del audio ambiental
    if (audioRef.current && isUnlocked) {
      audioRef.current.volume = 0.3; // 30% del volumen original

      // Si NO es Safari, reproducir automáticamente
      if (!isSafari) {
        audioRef.current
          .play()
          .then(() => {
            setAudioOn(true);
          })
          .catch((error) => {
            console.log("Autoplay bloqueado:", error);
            // Si falla el autoplay, mostrar botón para todos
            setIsSafari(true);
          });
      }
    }
  }, [isUnlocked, isSafari]);

  const handleAudioToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audioOn) {
      audio.pause();
    } else {
      audio.play();
    }
    setAudioOn(!audioOn);
  };

  const handleSolved = (_word: string) => {
    setStage((prev) => prev + 1);
  };

  // Si no está desbloqueado, mostrar countdown
  if (!isUnlocked) {
    return <Countdown />;
  }

  return (
    <div className="relative min-h-screen bg-black text-white flex items-center justify-center bg-[url('/bg1.webp')] bg-cover bg-center p-4 overflow-hidden">
      <FogAnimation />

      <audio ref={audioRef} src="./audio/ost.mp3" loop className="hidden" />

      {isSafari && (
        <button
          onClick={handleAudioToggle}
          className="absolute top-4 right-4 group z-20"
          aria-label="Activar o pausar sonido"
        >
          <motion.div
            animate={
              audioOn
                ? {
                    scale: [1, 1.15, 1],
                    boxShadow: [
                      "0 0 8px #ff0000",
                      "0 0 20px #ff3333",
                      "0 0 8px #ff0000",
                    ],
                  }
                : {
                    scale: 1,
                    boxShadow: "0 0 4px #330000",
                  }
            }
            transition={{ repeat: audioOn ? Infinity : 0, duration: 1.5 }}
            className={`h-4 w-4 rounded-full transition-all duration-500 ${
              audioOn ? "bg-red-600" : "bg-red-900"
            }`}
          />
          <span className="absolute top-8 right-0 text-xs text-red-500 opacity-0 group-hover:opacity-100 transition">
            {audioOn ? "ON" : "OFF"}
          </span>
        </button>
      )}

      <AnimatePresence mode="wait">
        {stage === 0 && (
          <motion.div
            key="intro"
            className="text-center p-6 relative z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Logo />
            <p className="text-xl mb-6 tracking-widest">
              Martín, ayuda a Eleven a cerrar el portal del Upside Down.
            </p>
            <p className="text-xl mb-6 tracking-widest">
              Supera las tres pruebas para descubrir tu código secreto.
            </p>
            <button
              onClick={() => setStage(1)}
              className="bg-red-700 hover:bg-red-800 px-6 py-3 rounded-lg text-lg font-semibold transition"
            >
              Comenzar
            </button>
          </motion.div>
        )}

        {stage === 1 && (
          <motion.div
            key="lights"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <LightsPuzzle onSolved={() => handleSolved("FELIZ")} />
          </motion.div>
        )}

        {stage === 2 && (
          <motion.div
            key="walkie"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <WalkieTalkie onSolved={() => handleSolved("CUMPLEAÑOS")} />
          </motion.div>
        )}

        {stage === 3 && (
          <motion.div
            key="monster"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <MonsterQuiz onSolved={() => handleSolved("MARTÍN")} />
          </motion.div>
        )}

        {stage === 4 && (
          <motion.div
            key="portal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <PortalReveal />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
