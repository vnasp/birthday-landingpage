import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface Props {
  onSolved: () => void;
}

const ALL_MONSTERS = [
  "Demogorgon",
  "Abyssal Devourer",
  "Mind Flayer",
  "Cerebral Reaver",
  "Gorgona",
  "Chupacabras",
];

const CORRECT = new Set(["demogorgon", "mind flayer"]);

const MonsterQuiz = ({ onSolved }: Props) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [solved, setSolved] = useState(false);
  const solvedRef = useRef(false);

  const toggle = (name: string) => {
    if (solved) return; // No permitir más interacciones después de resolver
    setError(null);
    setSelected((prev) => {
      let newSelected: string[];

      if (prev.includes(name)) {
        newSelected = prev.filter((p) => p !== name);
      } else {
        // Solo permitir seleccionar hasta 2
        if (prev.length >= 2) return prev;
        newSelected = [...prev, name];
      }

      // Si seleccionó exactamente 2, validar automáticamente
      if (newSelected.length === 2) {
        setTimeout(() => validateAnswer(newSelected), 300);
      }

      return newSelected;
    });
  };

  const validateAnswer = (selectedMonsters: string[]) => {
    if (solved || solvedRef.current) return; // Evitar validaciones duplicadas

    const lower = new Set(selectedMonsters.map((s) => s.trim().toLowerCase()));

    // Requerimos que seleccione exactamente los dos correctos
    const isCorrect =
      lower.size === CORRECT.size && [...CORRECT].every((c) => lower.has(c));

    if (isCorrect) {
      solvedRef.current = true; // Marcar inmediatamente para evitar doble llamada
      setSolved(true);
      setShowSuccess(true);
      setTimeout(() => onSolved(), 3000);
    } else {
      setZoomLevel((prev) => Math.min(prev + 0.1, 2)); // Incrementa zoom hasta máximo 2x
      setError("No es correcto. ¡Los monstruos se acercan!");
      // Limpiar selección después de mostrar error
      setTimeout(() => {
        setSelected([]);
        setError(null);
      }, 1500);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-cover bg-center bg-no-repeat z-20 flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url(/bg3.webp)",
      }}
      animate={{
        scale: zoomLevel,
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
    >
      {/* Mensaje de éxito */}
      {showSuccess && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-40"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-2xl mb-2">Tercera palabra desbloqueada</p>
          <h1 className="text-6xl font-bold text-white uppercase">Martín</h1>
        </motion.div>
      )}

      {/* Contenido principal */}
      {!showSuccess && (
        <motion.div
          className="flex flex-col items-center text-center p-6 relative z-30 max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-2xl mb-6 text-white font-bold drop-shadow-lg">
            Desde el Upside Down...
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            {ALL_MONSTERS.map((m) => {
              const isSelected = selected.includes(m);

              return (
                <motion.button
                  key={m}
                  onClick={() => toggle(m)}
                  whileTap={{ scale: 0.98 }}
                  className={`card-energy w-36 h-36 rounded-xl bg-indigo-950/70 overflow-hidden shadow-lg p-0 focus:outline-none transition-all ${
                    isSelected ? "selected" : ""
                  }`}
                >
                  <div className="absolute inset-0  flex items-center justify-center p-4">
                    <span className="text-white font-semibold text-lg text-center">
                      {m}
                    </span>
                    <div className="particles">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {error && (
            <p className="mt-4 text-yellow-300 font-semibold text-lg">
              {error}
            </p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default MonsterQuiz;
