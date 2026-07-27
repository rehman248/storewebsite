import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type Colorway = 'Carbon Black' | 'Ignition Red' | 'Steel Grey';

export type CartItem = {
  id: string;
  name: string;
  color: Colorway;
  price: number;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (color: Colorway, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
};

const PRICE = 549;
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);

  const addItem = (color: Colorway, qty = 1) => {
    setItems((prev) => {
      const id = `novaseat-pro-x-${color.toLowerCase().replace(/\s+/g, '-')}`;
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { id, name: 'NovaSeat Pro X', color, price: PRICE, qty }];
    });
    setDrawerOpen(true);
  };

  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const clearCart = () => setItems([]);

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items]);
  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        subtotal,
        itemCount,
        isDrawerOpen,
        openDrawer: () => setDrawerOpen(true),
        closeDrawer: () => setDrawerOpen(false),
        isCheckoutOpen,
        openCheckout: () => {
          setDrawerOpen(false);
          setCheckoutOpen(true);
        },
        closeCheckout: () => setCheckoutOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
