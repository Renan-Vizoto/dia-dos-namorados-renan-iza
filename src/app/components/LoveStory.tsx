import { motion } from 'motion/react';
import { Heart, Sparkles, Gem, Calendar } from 'lucide-react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: typeof Heart;
}

export function LoveStory() {
  const timeline: TimelineEvent[] = [
    {
      year: '2022 - 24/10',
      title: 'Nosso Início',
      description: 'Há 4 anos começamos essa jornada incrível juntos. Cada dia ao seu lado é um presente.',
      icon: Heart,
    },
    {
      year: '2026 - 02/05',
      title: 'O Pedido',
      description: 'E quando você disse sim, meu mundo ficou completo. Nosso noivado marcou o início de uma nova etapa.',
      icon: Gem,
    },
    {
      year: '2027 - 05/12',
      title: 'Nosso Grande Dia',
      description: 'Em breve, diremos o "sim" e celebraremos nosso amor, cercados de amor, felicidade e benções de Deus.',
      icon: Sparkles,
    },
  ];

  return (
    <div className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nossa História de Amor
          </h2>
          <p className="text-rose-200 text-lg md:text-xl">
            4 anos e 7 meses de amor, cumplicidade e sonhos compartilhados
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-500 via-pink-500 to-rose-500" />

          <div className="space-y-16">
            {timeline.map((event, index) => {
              const Icon = event.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row`}
                >
                  {/* Icon Circle */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-2xl border-4 border-pink-950"
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>

                  {/* Content Card */}
                  <div
                    className={`w-full md:w-[calc(50%-4rem)] ml-24 md:ml-0 ${
                      isEven ? 'md:pr-16' : 'md:pl-16'
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-br from-rose-900/50 to-pink-900/50 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-xl border border-rose-500/20"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Calendar className="w-5 h-5 text-rose-300" />
                        <span className="text-rose-300 font-bold text-xl">
                          {event.year}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                        {event.title}
                      </h3>
                      <p className="text-rose-100/80 text-base md:text-lg leading-relaxed">
                        {event.description}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
