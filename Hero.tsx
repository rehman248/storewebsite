import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section id="top" className="grain relative flex min-h-screen items-center overflow-hidden bg-carbon pt-24">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[520px] w-[520px] rounded-full bg-ignition/10 blur-[140px]" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-[360px] w-[360px] rounded-full bg-signal/10 blur-[120px]" />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-signal">
            Pro X &mdash; Ergonomic Racing Seat
          </p>
          <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-bone sm:text-6xl lg:text-7xl">
            Built for the
            <br />
            marathon,
            <br />
            <span className="text-ignition">not the sprint.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-mute">
            Eight-hour raids. Back-to-back scrims. Deadline week. The NovaSeat Pro X holds
            your spine in a neutral position long after cheaper chairs give out &mdash;
            engineered with a cold-cure foam core and a Class-4 gas lift rated for 4,000+
            cycles.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#configure"
              className="rounded-sm bg-ignition px-7 py-3.5 font-mono text-sm uppercase tracking-widest text-carbon transition-transform hover:-translate-y-0.5"
            >
              Configure yours &mdash; $549
            </a>
            <a
              href="#adjustability"
              className="flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-mute transition-colors hover:text-bone"
            >
              See it move
              <ArrowDown size={14} />
            </a>
          </div>

          <div className="mt-14 flex gap-10 border-t border-steel pt-6">
            <div>
              <p className="font-display text-3xl font-bold text-bone">4</p>
              <p className="font-mono text-[11px] uppercase tracking-widest text-mute">Axes adjustable</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-bone">180&deg;</p>
              <p className="font-mono text-[11px] uppercase tracking-widest text-mute">Full recline</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-bone">10yr</p>
              <p className="font-mono text-[11px] uppercase tracking-widest text-mute">Frame warranty</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          className="relative flex items-center justify-center"
        >
          <ChairSilhouette />
        </motion.div>
      </div>
    </section>
  );
}

function ChairSilhouette() {
  return (
    <svg
      viewBox="0 0 420 460"
      className="w-full max-w-md drop-shadow-[0_0_60px_rgba(230,67,46,0.08)]"
      aria-hidden="true"
    >
      <rect x="70" y="40" width="140" height="230" rx="24" fill="#1B1F27" stroke="#3A4150" strokeWidth="2" />
      <rect x="86" y="60" width="108" height="190" rx="16" fill="none" stroke="#2A303C" strokeWidth="1.5" />
      <rect x="40" y="240" width="220" height="60" rx="20" fill="#1B1F27" stroke="#3A4150" strokeWidth="2" />
      <rect x="240" y="150" width="70" height="18" rx="9" fill="#1B1F27" stroke="#3A4150" strokeWidth="2" />
      <line x1="150" y1="300" x2="150" y2="360" stroke="#3A4150" strokeWidth="10" strokeLinecap="round" />
      <circle cx="150" cy="330" r="8" fill="#E6432E" />
      <g stroke="#3A4150" strokeWidth="6" strokeLinecap="round">
        <line x1="150" y1="380" x2="90" y2="420" />
        <line x1="150" y1="380" x2="210" y2="420" />
        <line x1="150" y1="380" x2="150" y2="430" />
        <line x1="150" y1="380" x2="90" y2="345" />
        <line x1="150" y1="380" x2="210" y2="345" />
      </g>
      <circle cx="150" cy="380" r="14" fill="#1B1F27" stroke="#3A4150" strokeWidth="2" />
    </svg>
  );
}
