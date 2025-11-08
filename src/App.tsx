import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LightsPuzzle from "./components/LightsPuzzle";
import WalkieTalkie from "./components/WalkieTalkie";
import MonsterQuiz from "./components/MonsterQuiz";
import PortalReveal from "./components/PortalReveal";
import Logo from "./components/Logo";
import FogAnimation from "./components/FogAnimation";

function App() {
  const [stage, setStage] = useState(0);
  const [words, setWords] = useState<string[]>([]);
  const [audioOn, setAudioOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  const handleSolved = (word: string) => {
    setWords((prev) => [...prev, word]);
    setStage((prev) => prev + 1);
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex items-center justify-center bg-[url('/bg1.jpg')] bg-cover bg-center p-4">
      <FogAnimation />

      <audio ref={audioRef} src="./audio/ost.mp3" loop className="hidden" />

      <button
        onClick={handleAudioToggle}
        className="absolute top-4 right-4 group"
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

      <AnimatePresence mode="wait">
        {stage === 0 && (
          <motion.div
            key="intro"
            className="text-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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

        {stage === 1 && <LightsPuzzle onSolved={() => handleSolved("FELIZ")} />}
        {stage === 2 && (
          <WalkieTalkie onSolved={() => handleSolved("CUMPLEAÑOS")} />
        )}
        {stage === 3 && <MonsterQuiz onSolved={() => handleSolved("MARTÍN")} />}
        {stage === 4 && <PortalReveal words={words} />}
      </AnimatePresence>
    </div>
  );
}

export default App;
