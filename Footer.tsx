export default function Footer() {
  return (
    <footer className="border-t border-steel bg-carbon px-6 py-6 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="font-display text-sm font-semibold text-bone">
          NOVA<span className="text-ignition">SEAT</span>
        </p>
        <p className="font-mono text-[11px] uppercase tracking-widest text-mute">
          &copy; {new Date().getFullYear()} NovaSeat Gaming &mdash; Made for the long session.
        </p>
      </div>
    </footer>
  );
}
