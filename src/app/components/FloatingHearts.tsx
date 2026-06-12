import { useMemo } from 'react';
import { motion } from 'motion/react';

interface HeartData {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  swayX: number;
  color: string;
  rotateStart: number;
}

const HEART_COLORS = [
  '#fb7185',
  '#f43f5e',
  '#fda4af',
  '#fecdd3',
  '#ff6b9d',
  '#e11d48',
  '#ffb3c1',
];

function HeartSVG({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.261 4.068 1 6.5 1 8.28 1 10.047 1.988 12 4.104 13.953 1.988 15.72 1 17.5 1 19.932 1 23 3.261 23 7.191c0 4.105-5.37 8.863-11 14.402z" />
    </svg>
  );
}

function generateHearts(count: number): HeartData[] {
  return Array.from({ length: count }, (_, i) => {
    const s = i * 137.508;
    return {
      id: i,
      left: (s * 9.7 + i * 13.3) % 100,
      size: 10 + ((s * 3.1 + i * 7.7) % 26),
      duration: 14 + ((s * 2.3 + i * 5.1) % 16),
      delay: -((s * 1.7 + i * 4.9) % 22),
      opacity: 0.07 + ((s * 0.013 + i * 0.019) % 0.2),
      swayX: (30 + ((s * 1.1 + i * 3.3) % 55)) * (i % 2 === 0 ? 1 : -1),
      color: HEART_COLORS[i % HEART_COLORS.length],
      rotateStart: -15 + ((s * 0.5 + i * 2.1) % 30),
    };
  });
}

function FloatingHeart({ heart }: { heart: HeartData }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${heart.left}%`,
        bottom: '-5%',
        opacity: heart.opacity,
      }}
      animate={{
        y: [0, -window.innerHeight * 1.2],
        x: [0, heart.swayX, 0, -heart.swayX * 0.6, 0],
        rotate: [heart.rotateStart, heart.rotateStart * -0.5, heart.rotateStart * 0.8, heart.rotateStart * -0.3, heart.rotateStart],
        opacity: [0, heart.opacity, heart.opacity, heart.opacity, 0],
      }}
      transition={{
        duration: heart.duration,
        delay: heart.delay,
        repeat: Infinity,
        ease: 'linear',
        times: [0, 0.25, 0.5, 0.75, 1],
      }}
    >
      <HeartSVG color={heart.color} size={heart.size} />
    </motion.div>
  );
}

export function FloatingHearts() {
  const hearts = useMemo(() => generateHearts(40), []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {hearts.map((heart) => (
        <FloatingHeart key={heart.id} heart={heart} />
      ))}
    </div>
  );
}
