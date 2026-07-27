import { motion } from 'motion/react';

const LAYERS = [
  {
    title: 'Cold-cure foam core',
    detail:
      'Molded, not cut. Cold-cure foam holds its shape under sustained load instead of packing down into a permanent seat-shaped dent within a year.',
  },
  {
    title: 'Aircraft-grade steel frame',
    detail:
      'A single welded steel skeleton runs from the base through the backrest, rated to 300lb, so the chair flexes at the joints you want and nowhere else.',
  },
  {
    title: 'Class-4 gas lift',
    detail:
      'Certified to 4,000+ extension cycles and independently tested against sudden drop &mdash; the difference between a smooth adjustment and a slow sink.',
  },
  {
    title: 'Breathable weave cover',
    detail:
      'A tri-layer knit that moves air where PU leather traps it, so hour six feels like hour one.',
  },
];

export default function Build() {
  return (
    <section id="build" className="bg-carbon py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal">What's inside</p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-bone sm:text-5xl">
              Four layers,
              <br />
              one reason.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-mute">
              Cheap chairs cut corners you can't see until month eight. We built the Pro X
              from the frame out, so the part you never look at is the part that lasts.
            </p>
          </div>

          <div className="flex flex-col">
            {LAYERS.map((layer, i) => (
              <motion.div
                key={layer.title}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex gap-6 border-t border-steel py-6 last:border-b"
              >
                <span className="font-mono text-sm text-ignition">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-bone">{layer.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-mute">{layer.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
