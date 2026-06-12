import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Calendar, Sparkles } from 'lucide-react';

interface CountdownTimerProps {
  weddingDate: Date;
}

export function CountdownTimer({ weddingDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const targetTime = weddingDate.getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [weddingDate]);

  const timeBlocks = [
    { value: timeLeft.days, label: 'Dias', icon: Calendar },
    { value: timeLeft.hours, label: 'Horas', icon: Heart },
    { value: timeLeft.minutes, label: 'Minutos', icon: Sparkles },
    { value: timeLeft.seconds, label: 'Segundos', icon: Heart },
  ];

  return (
    <div className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nossa Contagem Regressiva
          </h2>
          <p className="text-rose-200 text-lg md:text-xl">
            Faltam apenas...
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {timeBlocks.map((block, index) => {
            const Icon = block.icon;
            return (
              <motion.div
                key={block.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-rose-900/50 to-pink-900/50 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-rose-500/20 shadow-xl">
                  <div className="absolute -top-3 -right-3">
                    <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-full p-2 shadow-lg">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  <div className="overflow-hidden h-16 md:h-20 flex items-center justify-start mb-2">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.div
                        key={block.value}
                        initial={{ y: 40, opacity: 0, filter: 'blur(4px)' }}
                        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                        exit={{ y: -40, opacity: 0, filter: 'blur(4px)' }}
                        transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                        className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-rose-300 to-pink-400 select-none"
                      >
                        {block.value.toString().padStart(2, '0')}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  
                  <p className="text-rose-200/80 text-sm md:text-base font-medium uppercase tracking-wider">
                    {block.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="inline-block bg-gradient-to-r from-rose-900/50 to-pink-900/50 backdrop-blur-lg rounded-full px-8 py-4 border border-rose-500/20">
            <p className="text-rose-100 text-lg md:text-xl">
              💍 05 de Dezembro de 2027 💍
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
