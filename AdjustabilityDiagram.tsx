import { useState } from 'react';

type SliderDef = {
  key: 'recline' | 'lumbar' | 'armrest' | 'height';
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
};

const SLIDERS: SliderDef[] = [
  { key: 'recline', label: 'Recline', unit: 'deg', min: 90, max: 180, step: 1, format: (v) => `${v}\u00b0` },
  { key: 'lumbar', label: 'Lumbar depth', unit: 'mm', min: 0, max: 40, step: 1, format: (v) => `${v}mm` },
  { key: 'armrest', label: 'Armrest height', unit: 'mm', min: -50, max: 50, step: 1, format: (v) => `${v > 0 ? '+' : ''}${v}mm` },
  { key: 'height', label: 'Seat height', unit: 'mm', min: 0, max: 60, step: 1, format: (v) => `${v}mm` },
];

const DEFAULTS = { recline: 112, lumbar: 18, armrest: 0, height: 30 };

export default function AdjustabilityDiagram() {
  const [values, setValues] = useState(DEFAULTS);

  const set = (key: SliderDef['key'], v: number) => setValues((prev) => ({ ...prev, [key]: v }));

  // normalize to visual deltas
  const reclineDeg = values.recline - 180; // 0 at fully upright(180), negative tilts back
  const lumbarPush = (values.lumbar / 40) * 10;
  const armrestY = -(values.armrest / 50) * 22;
  const seatLift = -(values.height / 60) * 34;

  return (
    <section id="adjustability" className="border-y border-steel bg-graphite py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal">Four points of adjustment</p>
        <h2 className="mt-3 max-w-xl font-display text-4xl font-bold leading-tight text-bone sm:text-5xl">
          Dial it in until it disappears.
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-mute">
          Every setting below moves the diagram in real time &mdash; the same range you get on the
          physical chair, in millimetres and degrees, not vague notches.
        </p>

        <div className="mt-14 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col gap-8">
            {SLIDERS.map((s) => (
              <div key={s.key}>
                <div className="mb-2 flex items-baseline justify-between">
                  <label htmlFor={s.key} className="font-mono text-xs uppercase tracking-widest text-mute">
                    {s.label}
                  </label>
                  <span className="font-mono text-sm text-ignition">{s.format(values[s.key])}</span>
                </div>
                <input
                  id={s.key}
                  type="range"
                  min={s.min}
                  max={s.max}
                  step={s.step}
                  value={values[s.key]}
                  onChange={(e) => set(s.key, Number(e.target.value))}
                  className="h-1 w-full cursor-pointer appearance-none rounded-full bg-steel accent-ignition"
                />
              </div>
            ))}
            <button
              onClick={() => setValues(DEFAULTS)}
              className="mt-2 w-fit font-mono text-xs uppercase tracking-widest text-mute underline decoration-steel-light underline-offset-4 transition-colors hover:text-bone"
            >
              Reset to factory position
            </button>
          </div>

          <div className="flex items-center justify-center rounded-sm border border-steel bg-carbon py-10">
            <svg viewBox="0 0 420 420" className="w-full max-w-sm" role="img" aria-label="Interactive chair adjustment diagram">
              {/* base */}
              <g stroke="#3A4150" strokeWidth="6" strokeLinecap="round" fill="none">
                <line x1="210" y1="360" x2="150" y2="395" />
                <line x1="210" y1="360" x2="270" y2="395" />
                <line x1="210" y1="360" x2="210" y2="400" />
                <line x1="210" y1="360" x2="150" y2="330" />
                <line x1="210" y1="360" x2="270" y2="330" />
              </g>
              <circle cx="210" cy="360" r="12" fill="#1B1F27" stroke="#3A4150" strokeWidth="2" />

              {/* gas lift + seat, shift with seat height */}
              <g style={{ transform: `translateY(${seatLift}px)`, transition: 'transform 200ms ease' }}>
                <line x1="210" y1="358" x2="210" y2="300" stroke="#3A4150" strokeWidth="10" strokeLinecap="round" />
                <circle cx="210" cy="320" r="7" fill="#E6432E" />

                {/* seat pan */}
                <rect x="150" y="280" width="140" height="24" rx="10" fill="#1B1F27" stroke="#3A4150" strokeWidth="2" />

                {/* armrest, shifts independently */}
                <g style={{ transform: `translateY(${armrestY}px)`, transition: 'transform 200ms ease' }}>
                  <rect x="270" y="228" width="14" height="56" rx="6" fill="#1B1F27" stroke="#3A4150" strokeWidth="2" />
                  <rect x="256" y="220" width="46" height="14" rx="6" fill="#2A303C" stroke="#3A4150" strokeWidth="1.5" />
                </g>

                {/* backrest, rotates around hinge at seat back */}
                <g
                  style={{
                    transform: `rotate(${reclineDeg}deg)`,
                    transformOrigin: '158px 285px',
                    transition: 'transform 200ms ease',
                  }}
                >
                  <rect x="128" y="70" width="60" height="220" rx="26" fill="#1B1F27" stroke="#3A4150" strokeWidth="2" />
                  <rect
                    x="140"
                    y="150"
                    width={22 + lumbarPush}
                    height="60"
                    rx="10"
                    fill="#E6432E"
                    opacity="0.85"
                    style={{ transition: 'width 200ms ease' }}
                  />
                  <rect x="130" y="72" width="56" height="60" rx="20" fill="none" stroke="#4C8CA8" strokeWidth="1.5" opacity="0.6" />
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
