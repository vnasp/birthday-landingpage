import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  onSolved: () => void;
}

const WalkieTalkie = ({ onSolved }: Props) => {
  const [input, setInput] = useState("");
  const [messagePlayed, setMessagePlayed] = useState(false);

  const handleCheck = () => {
    if (input.trim().toLowerCase() === "eleven") {
      onSolved();
    }
  };

  return (
    <motion.div
      key="walkie"
      className="flex flex-col items-center text-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-2xl mb-4">Walkie-Talkie misterioso</h2>
      <motion.div
        className="bg-gray-900 border-2 border-gray-700 rounded-xl p-6 shadow-lg w-64 h-64 flex flex-col items-center justify-center"
        whileHover={{ scale: 1.05 }}
        onClick={() => {
          setMessagePlayed(true);
          // 🔊 Aquí puedes reproducir tu grabación con efecto de radio
        }}
      >
        <div className="h-2 w-20 bg-green-400 animate-pulse mb-2"></div>
        <p className="text-sm text-gray-400">
          {messagePlayed ? "📡 Mensaje recibido..." : "Toca para escuchar"}
        </p>
      </motion.div>

      {messagePlayed && (
        <div className="mt-6">
          <p className="mb-2 italic">
            "Martín... ¿cómo se llama la niña que mueve cosas con la mente?"
          </p>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="text-black p-2 rounded-md text-center"
            placeholder="Escribe aquí..."
          />
          <button
            onClick={handleCheck}
            className="ml-2 bg-red-700 hover:bg-red-800 px-4 py-2 rounded-lg font-semibold"
          >
            Enviar
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default WalkieTalkie;
