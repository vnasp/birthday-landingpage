import { motion } from "framer-motion";

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GlitchText = ({ text, className = "" }: GlitchTextProps) => {
  return (
    <motion.div
      className={`relative font-bold text-rojo text-shadow-lg ${className}`}
      animate={{
        textShadow: [
          "0 0 4px #ff0000",
          "2px 0 8px #ff0000",
          "-2px 0 8px #ff0000",
          "0 0 4px #ff0000",
        ],
      }}
      transition={{
        repeat: Infinity,
        duration: 0.6,
      }}
    >
      {text}
    </motion.div>
  );
};

export default GlitchText;
