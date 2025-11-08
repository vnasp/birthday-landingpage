import { useState, useMemo } from "react";
import { motion } from "framer-motion";

interface Props {
  onSolved: () => void;
}

const originalLetters = ["F", "E", "L", "I", "Z", "R", "A", "N", "D", "O", "M"];

const LightsPuzzle = ({ onSolved }: Props) => {
  const [sequence, setSequence] = useState<string[]>([]);
  const correct = ["F", "E", "L", "I", "Z"];

  // 🔀 Mezclar letras solo una vez (cuando el componente se monta)
  const letters = useMemo(() => {
    return [...originalLetters].sort(() => Math.random() - 0.5);
  }, []);

  const handleClick = (letter: string) => {
    const next = [...sequence, letter];
    setSequence(next);
    if (next.join("") === correct.join("")) {
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
        {letters.map((letter, i) => (
          <motion.button
            key={i}
            onClick={() => handleClick(letter)}
            whileTap={{ scale: 0.9 }}
            className={`text-2xl rounded-full h-14 w-14 border-2 border-gray-600 transition-all duration-200
              ${
                sequence.includes(letter)
                  ? "bg-yellow-400 text-black shadow-[0_0_10px_rgba(255,255,100,0.8)]"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
          >
            {letter}
          </motion.button>
        ))}
      </div>
      {/* 🔊 Aquí puedes añadir sonido de luces parpadeando */}
    </motion.div>
  );
};

export default LightsPuzzle;
