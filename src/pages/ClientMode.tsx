import { useState } from 'react';
import { ShoppingCart, Menu, X, MessageCircle } from 'lucide-react';
import { products, CATEGORY_LABELS } from '../data/products';
import { Category } from '../types';
import { useCart } from '../hooks/useCart';
import { useWhatsApp } from '../hooks/useWhatsApp';
import ProductCard from '../components/ProductCard';
import CartModal from '../components/CartModal';

interface ClientModeProps {
  onBack: () => void;
}

export default function ClientMode({ onBack }: ClientModeProps) {
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [viewMode, setViewMode] = useState<'home' | 'catalog'>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category>('textil');
  const cart = useCart('client');
  const { generateOrderMessage, sendToWhatsApp } = useWhatsApp();

  const handleSendOrder = () => {
    if (cart.items.length === 0) return;
    const message = generateOrderMessage(cart.items, 'client');
    sendToWhatsApp(message);
    cart.clearCart();
    setShowCart(false);
  };

  const categories: Category[] = ['textil', 'hogar', 'accesorios'];
  const filteredProducts = products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="lg:hidden text-blue-900"
          >
            {showMenu ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex items-center justify-center flex-1 lg:flex-initial">
            <img src="/img/mi_logo.png" alt="NEXUS" className="h-16" />
          </div>

          <button
            onClick={() => setShowCart(true)}
            className="relative p-2 text-blue-900 hover:bg-blue-100 rounded-full transition-colors"
          >
            <ShoppingCart size={28} />
            {cart.getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-900 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                {cart.getTotalItems()}
              </span>
            )}
          </button>
        </div>

        {showMenu && (
          <div className="lg:hidden border-t p-4 space-y-3 bg-gray-50">
            <button
              onClick={onBack}
              className="w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Volver al inicio
            </button>
          </div>
        )}
      </header>

      {/* Home View */}
      {viewMode === 'home' && (
        <div className="bg-gradient-to-b from-gray-50 to-white">
          <div className="bg-white px-4 py-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Elige tu producto base
                </h1>
                <p className="text-gray-600">
                  Selecciona la base, elige talla y color, y envianos tu diseño.
                </p>
              </div>

              <div className="bg-blue-100 border border-blue-300 rounded-full px-4 py-2 inline-flex items-center gap-2 mb-8">
                <span className="text-blue-900 font-semibold text-sm">
                  Cotizacion final via WhatsApp
                </span>
              </div>

              {/* Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <button
                  onClick={() => setViewMode('catalog')}
                  className="bg-blue-900 hover:bg-blue-800 text-white rounded-2xl p-6 transition-all transform hover:scale-105 shadow-lg"
                >
                  <div className="text-4xl mb-3">👕</div>
                  <h3 className="text-xl font-bold mb-2">CATALOGO</h3>
                  <p className="text-blue-100 text-sm mb-4">Ver productos base</p>
                  <div className="inline-flex items-center gap-1 text-sm font-semibold">
                    Ver productos <span>→</span>
                  </div>
                </button>

                <button
                  onClick={() => setShowCart(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white rounded-2xl p-6 transition-all transform hover:scale-105 shadow-lg relative"
                >
                  <div className="text-4xl mb-3">🛒</div>
                  <h3 className="text-xl font-bold mb-2">CARRITO</h3>
                  <p className="text-orange-100 text-sm mb-4">Ver mi pedido</p>
                  {cart.getTotalItems() > 0 && (
                    <div className="absolute -top-2 -right-2 bg-blue-900 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center">
                      {cart.getTotalItems()}
                    </div>
                  )}
                  <div className="inline-flex items-center gap-1 text-sm font-semibold">
                    Ver mi pedido <span>→</span>
                  </div>
                </button>

                <button
                  onClick={() => sendToWhatsApp('Hola, quiero cotizar productos base')}
                  className="bg-green-500 hover:bg-green-600 text-white rounded-2xl p-6 transition-all transform hover:scale-105 shadow-lg"
                >
                  <div className="text-4xl mb-3">✈️</div>
                  <h3 className="text-xl font-bold mb-2">ENVIAR PEDIDO</h3>
                  <p className="text-green-100 text-sm mb-4">Por WhatsApp</p>
                  <div className="inline-flex items-center gap-1 text-sm font-semibold">
                    Por WhatsApp <span>→</span>
                  </div>
                </button>
              </div>

              {/* WhatsApp Contact */}
              <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-6 mb-8 flex items-start gap-4">
                <div className="text-3xl">💬</div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">
                    ¿Diseño personalizado?
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Escribenos y lo hacemos realidad
                  </p>
                </div>
                <button
                  onClick={() => sendToWhatsApp('Hola, quiero un diseño personalizado')}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-semibold text-sm transition-colors whitespace-nowrap"
                >
                  Quiero uno
                </button>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">🎨</div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">
                    Tu diseño, tu estilo
                  </h4>
                  <p className="text-gray-600 text-xs">
                    Sublimacion y DTF de alta calidad
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">📦</div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">
                    Envios rapidos
                  </h4>
                  <p className="text-gray-600 text-xs">
                    A todo el pais en 48 horas
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">✓</div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">
                    Calidad garantizada
                  </h4>
                  <p className="text-gray-600 text-xs">
                    Productos premium autenticos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Catalog View */}
      {viewMode === 'catalog' && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={() => setViewMode('home')}
            className="mb-6 text-blue-900 hover:text-blue-800 font-semibold flex items-center gap-1"
          >
            ← Volver
          </button>

          {/* Category Filter */}
          <div className="bg-white border border-blue-200 rounded-xl p-4 mb-8 shadow-sm">
            <p className="text-gray-700 font-semibold mb-3">Categorias:</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                    selectedCategory === cat
                      ? 'bg-blue-900 text-white shadow-md'
                      : 'bg-blue-50 text-gray-700 hover:bg-blue-100'
                  }`}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid - 2 cols mobile, 4 cols desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                mode="client"
                onAddToCart={(selectedSize, selectedColor, quantity) => {
                  cart.addItem(product, selectedSize, selectedColor, quantity);
                }}
              />
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setViewMode('home')}
              className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Volver al Inicio
            </button>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {showCart && (
        <CartModal
          items={cart.items}
          mode="client"
          onClose={() => setShowCart(false)}
          onUpdateQuantity={cart.updateQuantity}
          onRemoveItem={cart.removeItem}
          onSendOrder={handleSendOrder}
        />
      )}
    </div>
  );
}
