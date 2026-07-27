import { Star } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Priya M.',
    role: 'Software engineer, 10hr desk days',
    quote:
      'I stopped needing a lumbar cushion within a week. The adjustable lumbar bump actually sits where my back curves.',
    rating: 5,
  },
  {
    name: 'Daniyal R.',
    role: 'Competitive Valorant player',
    quote:
      'Recline lock at 112 degrees is my ranked-queue setting now. No wobble even leaning hard into a fight.',
    rating: 5,
  },
  {
    name: 'Sara K.',
    role: 'Twitch streamer, 6hr broadcasts',
    quote:
      'The armrests go low enough that they finally clear my desk lip. Small thing, changed everything about my setup.',
    rating: 4,
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="bg-carbon py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal">From the fleet</p>
        <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-bone sm:text-5xl">
          Hour eight, still seated.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <div key={r.name} className="flex flex-col rounded-sm border border-steel bg-graphite p-7">
              <div className="mb-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < r.rating ? 'fill-ignition text-ignition' : 'text-steel-light'}
                  />
                ))}
              </div>
              <p className="flex-1 text-sm leading-relaxed text-bone">&ldquo;{r.quote}&rdquo;</p>
              <div className="mt-6 border-t border-steel pt-4">
                <p className="font-display text-sm font-semibold text-bone">{r.name}</p>
                <p className="font-mono text-[11px] uppercase tracking-widest text-mute">{r.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
