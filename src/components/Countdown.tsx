import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Generar partículas aleatorias
const particles = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: 3 + Math.random() * 4,
  delay: Math.random() * 3,
  size: 3 + Math.random() * 6,
}));

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Reproducir el audio del reloj
    if (audioRef.current) {
      audioRef.current.volume = 1;
      audioRef.current.play();
    }
  }, []);

  useEffect(() => {
    // Usar el mismo formato que en App.tsx para consistencia
    const targetDate = new Date("2025-11-11T00:00:00-03:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center bg-[url('/bg0.webp')] bg-cover bg-top">
      <audio ref={audioRef} src="./audio/clock.mp3" loop className="hidden" />

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
              background: `radial-gradient(circle, rgba(255, 150, 100, 0.9) 0%, rgba(255, 100, 50, 0.5) 40%, transparent 70%)`,
              boxShadow: `0 0 ${
                particle.size * 3
              }px rgba(255, 150, 100, 0.6), 0 0 ${
                particle.size * 5
              }px rgba(255, 100, 50, 0.3)`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(particle.id) * 20, 0],
              opacity: [0.4, 0.9, 0.4],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Resplandor pulsante */}
        <motion.div
          className="absolute w-[600px] h-[600px] bg-linear-to-r from-red-800/40 via-orange-600/40 to-yellow-600/40 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ repeat: Infinity, duration: 3 }}
        />

        {/* Contenido */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="text-xl md:text-3xl text-white mb-12 mt-10">
            <span className="text-2xl md:text-5xl font-bold">Martín,</span>{" "}
            <br /> el Upside Down te llama. <br />
            <span className="text-lg md:text-xl">
              Solo los que cumplen <i>eleven</i> pueden cruzar.
            </span>
          </p>
          <p className="text-xl md:text-3xl text-gray-300 mb-12">
            El portal se abrirá el
          </p>

          <motion.h1
            className="text-2xl md:text-4xl font-bold text-white mb-24 drop-shadow-[0_0_20px_rgba(255,100,100,0.8)]"
            style={{ fontFamily: '"ITC Benguiat W01", serif' }}
            animate={{
              scale: [1, 1.05, 1],
              textShadow: [
                "0 0 20px rgba(255,100,100,0.8)",
                "0 0 30px rgba(255,150,150,1)",
                "0 0 20px rgba(255,100,100,0.8)",
              ],
            }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            11 Noviembre 2025
          </motion.h1>

          {/* Contador */}
          <div className="grid grid-cols-4 gap-4 md:gap-8 mb-8">
            {[
              { value: timeLeft.days, label: "Días" },
              { value: timeLeft.hours, label: "Horas" },
              { value: timeLeft.minutes, label: "Minutos" },
              { value: timeLeft.seconds, label: "Segundos" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="count-cell backdrop-blur-sm rounded-xl p-4 md:p-6 min-w-20 md:min-w-[120px]">
                  <motion.div
                    key={item.value}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-4xl md:text-6xl font-bold text-white font-mono"
                  >
                    {String(item.value).padStart(2, "0")}
                  </motion.div>
                </div>
                <p className="text-sm md:text-lg text-white mt-3 uppercase tracking-wider">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Countdown;
