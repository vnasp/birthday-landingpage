import { motion } from "framer-motion";
import GlitchText from "./GlitchText";

interface Props {
  words: string[];
}

const PortalReveal = ({ words }: Props) => {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="relative flex flex-col items-center justify-center text-center w-full h-screen overflow-hidden px-6">
        <motion.div
          className="absolute w-[600px] h-[600px] bg-linear-to-r from-red-800 via-purple-800 to-black rounded-full blur-3xl opacity-70"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{ repeat: Infinity, duration: 4 }}
        ></motion.div>

        <div className="relative z-10 px-6">
          <h2 className="text-3xl mb-4 text-white font-bold">
            Has salvado Hawkins
          </h2>
          <p className="mb-6 text-xl text-gray-300">
            Mensaje secreto descifrado:
          </p>
          <GlitchText text={words.join(" ")} className="text-4xl mb-10" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="text-2xl font-mono text-green-400 bg-black/50 p-6 rounded-lg border-2 border-green-400"
          >
            🎁 Código: FORTNITE-2025-GIFT
          </motion.div>
        </div>
        {/* 🔊 Aquí puedes agregar sonido de "portal" o viento dimensional */}
      </div>
    </div>
  );
};

export default PortalReveal;
