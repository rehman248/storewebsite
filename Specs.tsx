const SPECS: [string, string][] = [
  ['Overall height', '1220 &ndash; 1290 mm'],
  ['Seat height', '460 &ndash; 520 mm'],
  ['Seat width', '520 mm'],
  ['Recline range', '90&deg; &ndash; 180&deg;'],
  ['Armrest travel', '&plusmn;50 mm vertical, 90 mm lateral'],
  ['Backrest tilt tension', '5-stage adjustable'],
  ['Gas lift class', 'Class 4, 4,000+ cycles'],
  ['Frame material', 'Cold-rolled steel, powder coated'],
  ['Foam density', '55kg/m&sup3; cold-cure'],
  ['Cover material', 'Tri-layer breathable weave'],
  ['Max load', '136 kg / 300 lb'],
  ['Assembled weight', '24.5 kg'],
  ['Warranty', '10 years, frame &amp; gas lift'],
];

export default function Specs() {
  const mid = Math.ceil(SPECS.length / 2);
  const columns = [SPECS.slice(0, mid), SPECS.slice(mid)];

  return (
    <section id="specs" className="border-y border-steel bg-graphite py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal">Spec sheet</p>
        <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-bone sm:text-5xl">
          The numbers, in full.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-x-16 md:grid-cols-2">
          {columns.map((col, ci) => (
            <dl key={ci} className="flex flex-col border-b border-steel">
              {col.map(([label, value]) => (
                <div key={label} className="flex items-baseline justify-between gap-6 border-t border-steel py-4">
                  <dt className="font-mono text-xs uppercase tracking-widest text-mute">{label}</dt>
                  <dd
                    className="text-right font-mono text-sm text-bone"
                    dangerouslySetInnerHTML={{ __html: value }}
                  />
                </div>
              ))}
            </dl>
          ))}
        </div>
      </div>
    </section>
  );
}
