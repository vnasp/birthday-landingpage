import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  onSolved: () => void;
}

const MonsterQuiz = ({ onSolved }: Props) => {
  const [answer, setAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);

  const checkAnswer = () => {
    if (answer.trim().toLowerCase() === "demogorgon") {
      setRevealed(true);
      setTimeout(() => onSolved(), 1000);
    }
  };

  return (
    <motion.div
      key="monster"
      className="flex flex-col items-center text-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-2xl mb-4">Desde el Upside Down...</h2>
      <motion.div
        className="w-60 h-60 bg-[url('https://i.imgur.com/dD7qXkX.png')] bg-cover bg-center blur-sm hover:blur-none transition-all rounded-xl shadow-lg"
        whileHover={{ scale: 1.05 }}
      ></motion.div>
      {/* 🔊 Aquí podrías poner un rugido o sonido del Demogorgon */}

      <div className="mt-6">
        <p className="mb-2 italic">¿Cómo se llama esta criatura?</p>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="text-black p-2 rounded-md text-center"
          placeholder="Escribe aquí..."
        />
        <button
          onClick={checkAnswer}
          className="ml-2 bg-red-700 hover:bg-red-800 px-4 py-2 rounded-lg font-semibold"
        >
          Enviar
        </button>
      </div>

      {revealed && <p className="mt-4 text-green-400">¡Correcto!</p>}
    </motion.div>
  );
};

export default MonsterQuiz;
