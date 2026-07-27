import { useState } from 'react';
import { Check } from 'lucide-react';
import { useCart, type Colorway } from '../context/CartContext';

const COLORWAYS: { name: Colorway; swatch: string }[] = [
  { name: 'Carbon Black', swatch: '#1B1F27' },
  { name: 'Ignition Red', swatch: '#E6432E' },
  { name: 'Steel Grey', swatch: '#4C8CA8' },
];

export default function Configure() {
  const [color, setColor] = useState<Colorway>('Carbon Black');
  const { addItem } = useCart();

  return (
    <section id="configure" className="grain relative overflow-hidden bg-graphite py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-ignition/10 blur-[120px]" />

      <div className="relative mx-auto max-w-3xl px-6 text-center md:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal">Configure</p>
        <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-bone sm:text-5xl">
          Your next chair should outlast your next three.
        </h2>

        <div className="mt-10 flex flex-col items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-mute">Colorway &mdash; {color}</span>
          <div className="flex gap-3">
            {COLORWAYS.map((c) => (
              <button
                key={c.name}
                aria-label={c.name}
                aria-pressed={color === c.name}
                onClick={() => setColor(c.name)}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors"
                style={{ borderColor: color === c.name ? '#E6432E' : '#3A4150', backgroundColor: c.swatch }}
              >
                {color === c.name && <Check size={16} className="text-bone" />}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-8 font-mono text-lg text-bone">
          $549 <span className="text-mute line-through">$649</span>
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => addItem(color)}
            className="rounded-sm bg-ignition px-8 py-4 font-mono text-sm uppercase tracking-widest text-carbon transition-transform hover:-translate-y-0.5"
          >
            Add to cart
          </button>
          <a
            href="#specs"
            className="rounded-sm border border-steel-light px-8 py-4 font-mono text-sm uppercase tracking-widest text-mute transition-colors hover:border-bone hover:text-bone"
          >
            Compare specs
          </a>
        </div>

        <p className="mt-6 font-mono text-xs text-mute">Free shipping &middot; 30-night trial &middot; 10-year frame warranty</p>
      </div>
    </section>
  );
}
