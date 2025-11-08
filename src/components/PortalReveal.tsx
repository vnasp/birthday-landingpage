import { motion } from "framer-motion";

// Generar partículas aleatorias - cantidad moderada
const particles = Array.from({ length: 75 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: 2.5 + Math.random() * 3,
  delay: Math.random() * 3,
  size: 2 + Math.random() * 5,
}));

function PortalReveal() {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center bg-[url('/bg4.webp')] bg-cover bg-top">
      <div className="relative flex flex-col items-center justify-center text-center w-full h-screen overflow-hidden px-6">
        {/* Partículas brillantes */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              background: `radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 200, 100, 0.5) 40%, transparent 70%)`,
              boxShadow: `0 0 ${
                particle.size * 3
              }px rgba(255, 255, 255, 0.6), 0 0 ${
                particle.size * 5
              }px rgba(255, 150, 100, 0.3)`,
            }}
            animate={{
              y: [0, -35, 0],
              x: [0, Math.sin(particle.id) * 25, 0],
              opacity: [0.4, 0.9, 0.4],
              scale: [1, 1.6, 1],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Resplandor pulsante del portal */}
        <motion.div
          className="absolute w-[800px] h-[800px] bg-linear-to-r from-purple-600/30 via-red-600/30 to-orange-600/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ repeat: Infinity, duration: 4 }}
        />

        {/* Contenido principal */}
        <motion.div
          className="relative z-10 px-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.p
            className="mb-8 text-2xl text-gray-200 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Mensaje secreto descifrado:
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="mb-12"
            style={{ fontFamily: '"ITC Benguiat W01", serif' }}
          >
            <div className="text-4xl md:text-5xl font-bold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">
              Feliz Cumpleaños
            </div>
            <div className="text-6xl md:text-6xl font-bold text-white mt-4 drop-shadow-[0_0_30px_rgba(255,100,100,0.9)]">
              Martín
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="bg-linear-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-2xl max-w-2xl mx-auto"
            style={{
              boxShadow:
                "0 10px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            <div className="flex items-center gap-6">
              {/* Imagen de Fortnite */}
              <div className="shrink-0">
                <img
                  src="/fortnite.webp"
                  alt="Fortnite"
                  className="w-32 h-32 object-cover rounded-lg shadow-lg"
                />
              </div>

              {/* Código */}
              <div className="flex-1 text-left">
                <p className="text-2xl md:text-3xl font-bold text-white mb-2">
                  🎁 Tu Regalo:
                </p>
                <p className="text-xl md:text-2xl font-mono text-yellow-400 bg-black/40 px-4 py-3 rounded-lg inline-block border-2 border-yellow-600/30">
                  FORTNITE-2025-GIFT
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default PortalReveal;
