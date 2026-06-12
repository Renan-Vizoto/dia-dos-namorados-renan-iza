import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SpotifyHeroProps {
  coverImage: string;
  songTitle: string;
  artist: string;
  audioSrc: string;
}

export function SpotifyHero({ coverImage, songTitle, artist, audioSrc }: SpotifyHeroProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) {
      console.warn('audioRef.current é null');
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        audio.load();
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.error('Erro ao reproduzir áudio:', err);
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <audio ref={audioRef} src={audioSrc} preload="auto" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <motion.p
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="text-center text-rose-200 text-2xl font-semibold capitalize tracking-wide mb-6"
        >
          Feliz Dia Dos Namorados 💕
        </motion.p>
        <div className="bg-gradient-to-br from-rose-900/40 to-pink-900/40 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-rose-500/20">
          {/* Cover Art */}
          <motion.div
            animate={{
              scale: isPlaying ? [1, 1.02, 1] : 1,
            }}
            transition={{
              duration: 2,
              repeat: isPlaying ? Infinity : 0,
              ease: 'easeInOut',
            }}
            className="relative aspect-square rounded-2xl overflow-hidden mb-8 shadow-2xl"
          >
            <ImageWithFallback
              src={coverImage}
              alt={songTitle}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            
            {/* Floating hearts */}
            <AnimatePresence>
              {isPlaying && (
                <>
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20, x: Math.random() * 100 - 50 }}
                      animate={{
                        opacity: [0, 1, 0],
                        y: -200,
                        x: Math.random() * 150 - 75,
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 1,
                        ease: 'easeOut',
                      }}
                      className="absolute bottom-0 left-1/2"
                    >
                      <Heart className="w-6 h-6 fill-rose-400 text-rose-400" />
                    </motion.div>
                  ))}
                </>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Song Info */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">{songTitle}</h1>
            <p className="text-rose-200/80 text-lg">{artist}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="relative h-1.5 bg-white/20 rounded-full overflow-hidden mb-2">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-rose-400 to-pink-500"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="flex justify-between text-sm text-rose-200/60">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Play Button */}
          <div className="flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg hover:shadow-rose-500/50 transition-all"
            >
              <AnimatePresence mode="wait">
                {isPlaying ? (
                  <motion.div
                    key="pause"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Pause className="w-8 h-8 text-white fill-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="play"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
