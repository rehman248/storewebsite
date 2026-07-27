import { useEffect, useState } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const LINKS = [
  { href: '#adjustability', label: 'Adjustability' },
  { href: '#build', label: 'Build' },
  { href: '#specs', label: 'Specs' },
  { href: '#reviews', label: 'Reviews' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { itemCount, openDrawer } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? 'bg-carbon/90 backdrop-blur border-b border-steel' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" className="font-display text-xl font-bold tracking-wide text-bone">
          NOVA<span className="text-ignition">SEAT</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-xs uppercase tracking-widest text-mute transition-colors hover:text-bone"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#configure"
            className="rounded-sm border border-ignition bg-ignition/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-ignition transition-colors hover:bg-ignition hover:text-carbon"
          >
            Configure
          </a>
          <button aria-label={`Cart, ${itemCount} item${itemCount === 1 ? '' : 's'}`} onClick={openDrawer} className="relative text-bone hover:text-ignition">
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-ignition font-mono text-[10px] text-carbon">
                {itemCount}
              </span>
            )}
          </button>
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <button aria-label={`Cart, ${itemCount} item${itemCount === 1 ? '' : 's'}`} onClick={openDrawer} className="relative text-bone">
            <ShoppingCart size={22} />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-ignition font-mono text-[10px] text-carbon">
                {itemCount}
              </span>
            )}
          </button>
          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="text-bone"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-steel bg-carbon px-6 py-4 md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2 font-mono text-sm uppercase tracking-widest text-mute hover:text-bone"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#configure"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-sm border border-ignition bg-ignition/10 px-4 py-3 text-center font-mono text-sm uppercase tracking-widest text-ignition"
          >
            Configure
          </a>
        </nav>
      )}
    </header>
  );
}
