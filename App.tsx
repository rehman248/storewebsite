import { CartProvider } from './context/CartContext';
import Nav from './components/Nav';
import Hero from './components/Hero';
import AdjustabilityDiagram from './components/AdjustabilityDiagram';
import Build from './components/Build';
import Specs from './components/Specs';
import Reviews from './components/Reviews';
import Configure from './components/Configure';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-carbon">
        <Nav />
        <main>
          <Hero />
          <AdjustabilityDiagram />
          <Build />
          <Specs />
          <Reviews />
          <Configure />
        </main>
        <Footer />
        <CartDrawer />
        <CheckoutModal />
      </div>
    </CartProvider>
  );
}
