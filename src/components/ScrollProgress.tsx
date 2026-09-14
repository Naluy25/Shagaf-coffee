import { useScrollProgress } from '@/hooks/useReveal';

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 pointer-events-none">
      <div
        className="h-full bg-gradient-to-l from-gold-300 via-gold-400 to-gold-300 origin-right"
        style={{ transform: `scaleX(${progress})`, transformOrigin: 'right', transition: 'transform 0.1s linear' }}
      />
    </div>
  );
}
