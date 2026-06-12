import { motion } from 'motion/react';
import { Quote, Heart, Sparkles, Star } from 'lucide-react';

export function LoveQuotes() {
  const quotes = [
    {
      text: 'Você é meu hoje e todos os meus amanhãs.',
      icon: Heart,
    },
    {
      text: '4 anos juntos, e cada dia me apaixono mais por você.',
      icon: Sparkles,
    },
    {
      text: 'Nosso amor é a prova de que os contos de fadas existem.',
      icon: Star,
    },
  ];

  return (
    <div className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Palavras do Coração
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {quotes.map((quote, index) => {
            const Icon = quote.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-rose-900/60 to-pink-900/60 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-rose-500/20 h-full flex flex-col items-center justify-center text-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="mb-6"
                  >
                    <Icon className="w-12 h-12 text-rose-300" />
                  </motion.div>

                  <Quote className="w-8 h-8 text-rose-400/40 mb-4" />
                  
                  <p className="text-white text-lg md:text-xl leading-relaxed font-medium">
                    {quote.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Special Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-rose-900/70 via-pink-900/70 to-rose-900/70 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-rose-500/30 text-center">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="inline-block mb-6"
            >
              <Heart className="w-16 h-16 fill-rose-400 text-rose-400" />
            </motion.div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Para o Amor da Minha Vida
            </h3>
            <p className="text-rose-100 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
              Cada momento ao seu lado é mágico. Obrigado por aceitar passar o resto da vida comigo. 
              Você é minha vida, minha melhor amiga, a minha princesa, minha futura esposa, e o eterno amor da minha vida. 
              Eu te amo mil milhôes e te escolho todos os dias 💕
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
