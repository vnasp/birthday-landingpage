import { useState, useMemo } from "react";
import { motion } from "framer-motion";

interface Props {
  onSolved: () => void;
}

const originalLetters = ["V", "E", "C", "N", "A", "R", "X", "D", "O", "M"];

const LightsPuzzle = ({ onSolved }: Props) => {
  const [activeLetters, setActiveLetters] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const correct = ["V", "E", "C", "N", "A"];

  const letters = useMemo(() => {
    return [...originalLetters].sort(() => Math.random() - 0.5);
  }, []);

  const handleClick = (letter: string) => {
    let newActiveLetters: string[];

    if (activeLetters.includes(letter)) {
      newActiveLetters = activeLetters.filter((l) => l !== letter);
    } else {
      newActiveLetters = [...activeLetters, letter];
    }

    setActiveLetters(newActiveLetters);

    // Validar: exactamente las 5 letras correctas, sin importar el orden
    if (newActiveLetters.length === correct.length) {
      const hasAllCorrect = correct.every((l) => newActiveLetters.includes(l));
      const hasOnlyCorrect = newActiveLetters.every((l) => correct.includes(l));

      if (hasAllCorrect && hasOnlyCorrect) {
        setShowSuccess(true);
        setTimeout(() => onSolved(), 3000);
      }
    }
  };

  return (
    <motion.div
      key="lights"
      className="flex flex-col items-center text-center p-4 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Mensaje de éxito */}
      {showSuccess && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-40"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex flex-col items-center gap-4">
            <p className="text-2xl text-white text-nowrap">
              Primera palabra desbloqueada
            </p>
            <h1 className="text-6xl font-bold text-white uppercase">Feliz</h1>
          </div>
        </motion.div>
      )}

      {!showSuccess && (
        <>
          <h2 className="text-2xl mb-4">
            Las luces parpadean... ¿Qué intentan decir?
          </h2>
          <div className="grid grid-cols-5 gap-4 mt-6">
            {letters.map((letter, i) => {
              const isActive = activeLetters.includes(letter);
              return (
                <button
                  key={i}
                  onClick={() => handleClick(letter)}
                  className="relative inline-block"
                >
                  <input
                    type="checkbox"
                    checked={isActive}
                    readOnly
                    className="absolute opacity-0 pointer-events-none"
                  />
                  <label className="cursor-pointer block h-[90px] w-[90px] bg-transparent border-0 rounded-[50px]">
                    <span className={`bulb ${isActive ? "active" : ""}`}>
                      <span className="filament-1"></span>
                      <span className="filament-2"></span>
                      <span className="reflections">
                        <span></span>
                      </span>
                      <span className="sparks">
                        <span className="spark1"></span>
                        <span className="spark2"></span>
                        <span className="spark3"></span>
                        <span className="spark4"></span>
                      </span>
                      <span
                        className={`bulb-center flex items-center justify-center text-4xl font-bold relative z-100 not-italic ${
                          isActive ? "text-black" : "text-white"
                        }`}
                      >
                        {letter}
                      </span>
                    </span>
                  </label>
                </button>
              );
            })}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default LightsPuzzle;
