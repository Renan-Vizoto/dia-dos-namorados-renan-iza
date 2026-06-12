import { SpotifyHero } from './components/SpotifyHero';
import { CountdownTimer } from './components/CountdownTimer';
import { PhotoCarousel } from './components/PhotoCarousel';
import { LoveStory } from './components/LoveStory';
import { LoveQuotes } from './components/LoveQuotes';
import { PhotoGrid } from './components/PhotoGrid';
import { FloatingHearts } from './components/FloatingHearts';
import {
  heroCoverImage,
  heroAudioSrc,
  momentosInesqueciveis,
  nossasMemorias,
  gradeDefotos,
} from './data/midia';

export default function App() {
  const weddingDate = new Date('2027-12-05T00:00:00');

  return (
    <div className="min-h-screen bg-rose-950 relative">
      <FloatingHearts />
      <div className="relative z-10">
        <SpotifyHero
          coverImage={heroCoverImage}
          songTitle="Can't Help Falling in Love"
          artist="Pelo o amor da minha vida 💕"
          audioSrc={heroAudioSrc}
        />

        <CountdownTimer weddingDate={weddingDate} />

        <LoveStory />

        <PhotoCarousel photos={momentosInesqueciveis} title="Momentos Inesquecíveis" />

        <LoveQuotes />

        <PhotoCarousel photos={nossasMemorias} title="Nossas Memórias" />

        <PhotoGrid photos={gradeDefotos} />

        <footer className="py-12 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-rose-200 text-lg mb-2">
              Feito com muito amor para celebrar nosso relacionamento 💕
            </p>
            <p className="text-rose-300/60">
              4 anos juntos • Noivos • Casamento em 05/12/2027
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
