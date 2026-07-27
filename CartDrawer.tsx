import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, updateQty, removeItem, subtotal, openCheckout } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black/60 transition-opacity duration-300 ${
          isDrawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeDrawer}
        aria-hidden="true"
      />
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-graphite shadow-2xl transition-transform duration-300 ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-steel px-6 py-5">
          <h2 className="font-display text-xl font-bold text-bone">Your cart</h2>
          <button aria-label="Close cart" onClick={closeDrawer} className="text-mute hover:text-bone">
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
              <p className="font-display text-lg text-bone">Cart's empty.</p>
              <p className="font-mono text-xs uppercase tracking-widest text-mute">
                Configure a Pro X to get started
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-5">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 border-b border-steel pb-5">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-sm border border-steel bg-carbon">
                    <ChairIcon />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-display text-base font-semibold text-bone">{item.name}</p>
                        <p className="font-mono text-[11px] uppercase tracking-widest text-mute">{item.color}</p>
                      </div>
                      <button
                        aria-label={`Remove ${item.name} (${item.color})`}
                        onClick={() => removeItem(item.id)}
                        className="text-mute hover:text-ignition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-3 rounded-sm border border-steel px-2 py-1">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="text-mute hover:text-bone"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-4 text-center font-mono text-sm text-bone">{item.qty}</span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="text-mute hover:text-bone"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="font-mono text-sm text-bone">${item.price * item.qty}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-steel px-6 py-5">
            <div className="mb-4 flex items-baseline justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-mute">Subtotal</span>
              <span className="font-display text-xl font-bold text-bone">${subtotal.toLocaleString()}</span>
            </div>
            <button
              onClick={openCheckout}
              className="w-full rounded-sm bg-ignition py-3.5 font-mono text-sm uppercase tracking-widest text-carbon transition-transform hover:-translate-y-0.5"
            >
              Checkout
            </button>
            <p className="mt-3 text-center font-mono text-[11px] text-mute">Shipping & taxes calculated at checkout</p>
          </div>
        )}
      </aside>
    </>
  );
}

function ChairIcon() {
  return (
    <svg viewBox="0 0 60 60" className="h-9 w-9" aria-hidden="true">
      <rect x="18" y="8" width="24" height="30" rx="6" fill="none" stroke="#3A4150" strokeWidth="2.5" />
      <rect x="10" y="36" width="40" height="8" rx="4" fill="none" stroke="#3A4150" strokeWidth="2.5" />
      <line x1="30" y1="44" x2="30" y2="50" stroke="#3A4150" strokeWidth="3" strokeLinecap="round" />
      <circle cx="30" cy="52" r="3" fill="#E6432E" />
    </svg>
  );
}
