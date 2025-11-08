import { useState, useMemo } from "react";
import { motion } from "framer-motion";

interface Props {
  onSolved: () => void;
}

const originalLetters = ["F", "E", "L", "I", "Z", "R", "A", "N", "D", "O", "M"];

const LightsPuzzle = ({ onSolved }: Props) => {
  const [activeLetters, setActiveLetters] = useState<string[]>([]);
  const correct = ["F", "E", "L", "I", "Z"];

  const letters = useMemo(() => {
    return [...originalLetters].sort(() => Math.random() - 0.5);
  }, []);

  const handleClick = (letter: string) => {
    if (activeLetters.includes(letter)) {
      setActiveLetters(activeLetters.filter((l) => l !== letter));
    } else {
      setActiveLetters([...activeLetters, letter]);
    }

    // Opción: validar orden libre
    const all = correct.every((l) => [...activeLetters, letter].includes(l));
    if (all && activeLetters.length + 1 >= correct.length) {
      setTimeout(() => onSolved(), 800);
    }
  };

  return (
    <motion.div
      key="lights"
      className="flex flex-col items-center text-center p-4 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
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
    </motion.div>
  );
};

export default LightsPuzzle;
