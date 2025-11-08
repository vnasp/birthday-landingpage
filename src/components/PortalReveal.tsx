import { motion } from "framer-motion";
import GlitchText from "./GlitchText";

interface Props {
  words: string[];
}

const PortalReveal = ({ words }: Props) => {
  return (
    <motion.div
      key="portal"
      className="relative flex flex-col items-center justify-center text-center w-full h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="absolute w-[600px] h-[600px] bg-linear-to-r from-red-800 via-purple-800 to-black rounded-full blur-3xl opacity-70 animate-pulse"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{ repeat: Infinity, duration: 4 }}
      ></motion.div>

      <div className="relative z-10">
        <h2 className="text-3xl mb-4">Has salvado Hawkins</h2>
        <p className="mb-6">Mensaje secreto descifrado:</p>
        <GlitchText text={words.join(" ")} className="text-4xl mb-10" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 2 }}
          className="text-2xl font-mono text-green-400"
        >
          🎁 Código: FORTNITE-2025-GIFT
        </motion.div>
      </div>
      {/* 🔊 Aquí puedes agregar sonido de “portal” o viento dimensional */}
    </motion.div>
  );
};

export default PortalReveal;
