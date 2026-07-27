import { useState, type FormEvent } from 'react';
import { X, Lock, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

type Step = 'form' | 'processing' | 'success';

function formatCardNumber(v: string) {
  return v
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim();
}

function formatExpiry(v: string) {
  const digits = v.replace(/\D/g, '').slice(0, 4);
  if (digits.length < 3) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export default function CheckoutModal() {
  const { isCheckoutOpen, closeCheckout, items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<Step>('form');
  const [card, setCard] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  const shipping = items.length > 0 ? 0 : 0;
  const total = subtotal + shipping;

  const handleClose = () => {
    closeCheckout();
    if (step === 'success') {
      setStep('form');
      setCard('');
      setExpiry('');
      setCvc('');
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStep('processing');

    // ---------------------------------------------------------------
    // NOTE FOR THE SITE OWNER:
    // This is a front-end only simulation — no card is actually charged.
    // To take real payments, replace this block with a call to your
    // payment provider, e.g. Stripe Checkout / Payment Intents:
    //   1. Create a backend endpoint that creates a Stripe Checkout
    //      Session or PaymentIntent using your secret key.
    //   2. Call that endpoint here instead of setTimeout, redirect to
    //      the returned Checkout URL (or confirm the PaymentIntent
    //      client-side with @stripe/stripe-js).
    //   3. Only show the success state after the provider confirms
    //      the payment succeeded.
    // ---------------------------------------------------------------
    setTimeout(() => {
      setOrderNumber(`NS-${Math.floor(100000 + Math.random() * 900000)}`);
      setStep('success');
      clearCart();
    }, 1400);
  };

  if (!isCheckoutOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-4 py-8">
      <div className="relative flex max-h-full w-full max-w-lg flex-col overflow-y-auto rounded-sm border border-steel bg-graphite">
        <button
          aria-label="Close checkout"
          onClick={handleClose}
          className="absolute right-5 top-5 text-mute hover:text-bone"
        >
          <X size={22} />
        </button>

        {step === 'success' ? (
          <div className="flex flex-col items-center px-8 py-16 text-center">
            <CheckCircle2 size={48} className="text-ignition" />
            <h2 className="mt-5 font-display text-2xl font-bold text-bone">Order confirmed</h2>
            <p className="mt-2 font-mono text-sm text-mute">Order #{orderNumber}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-mute">
              We'll email your shipping confirmation once the Pro X leaves the warehouse &mdash;
              typically within 2 business days.
            </p>
            <button
              onClick={handleClose}
              className="mt-8 rounded-sm border border-steel-light px-6 py-3 font-mono text-xs uppercase tracking-widest text-bone hover:border-bone"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-8 py-8">
            <h2 className="font-display text-2xl font-bold text-bone">Checkout</h2>
            <p className="mt-1 font-mono text-xs uppercase tracking-widest text-mute">
              {items.reduce((n, i) => n + i.qty, 0)} item{items.reduce((n, i) => n + i.qty, 0) !== 1 ? 's' : ''}
            </p>

            <fieldset className="mt-6 flex flex-col gap-4" disabled={step === 'processing'}>
              <legend className="mb-1 font-mono text-xs uppercase tracking-widest text-signal">Shipping</legend>
              <div className="grid grid-cols-2 gap-3">
                <Field label="First name" required />
                <Field label="Last name" required />
              </div>
              <Field label="Email" type="email" required />
              <Field label="Address" required />
              <div className="grid grid-cols-3 gap-3">
                <Field label="City" required />
                <Field label="State" required />
                <Field label="ZIP" required />
              </div>
            </fieldset>

            <fieldset className="mt-8 flex flex-col gap-4" disabled={step === 'processing'}>
              <legend className="mb-1 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-signal">
                <Lock size={12} /> Payment
              </legend>
              <Field
                label="Card number"
                required
                value={card}
                onChange={(v) => setCard(formatCardNumber(v))}
                placeholder="4242 4242 4242 4242"
                inputMode="numeric"
              />
              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="Expiry"
                  required
                  value={expiry}
                  onChange={(v) => setExpiry(formatExpiry(v))}
                  placeholder="MM/YY"
                  inputMode="numeric"
                />
                <Field
                  label="CVC"
                  required
                  value={cvc}
                  onChange={(v) => setCvc(v.replace(/\D/g, '').slice(0, 4))}
                  placeholder="123"
                  inputMode="numeric"
                />
              </div>
            </fieldset>

            <div className="mt-8 border-t border-steel pt-5">
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-mono text-mute">Subtotal</span>
                <span className="font-mono text-bone">${subtotal.toLocaleString()}</span>
              </div>
              <div className="mt-1 flex items-baseline justify-between text-sm">
                <span className="font-mono text-mute">Shipping</span>
                <span className="font-mono text-bone">Free</span>
              </div>
              <div className="mt-3 flex items-baseline justify-between border-t border-steel pt-3">
                <span className="font-mono text-xs uppercase tracking-widest text-mute">Total</span>
                <span className="font-display text-xl font-bold text-bone">${total.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={step === 'processing'}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-sm bg-ignition py-3.5 font-mono text-sm uppercase tracking-widest text-carbon transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {step === 'processing' ? 'Processing…' : `Pay $${total.toLocaleString()}`}
            </button>
            <p className="mt-3 flex items-center justify-center gap-1.5 font-mono text-[11px] text-mute">
              <Lock size={11} /> Secure checkout
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  type = 'text',
  required,
  value,
  onChange,
  placeholder,
  inputMode,
}: {
  label: string;
  type?: string;
  required?: boolean;
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  inputMode?: 'numeric' | 'text';
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[11px] uppercase tracking-widest text-mute">{label}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        placeholder={placeholder}
        inputMode={inputMode}
        className="rounded-sm border border-steel bg-carbon px-3 py-2.5 text-sm text-bone outline-none focus:border-ignition"
      />
    </label>
  );
}
