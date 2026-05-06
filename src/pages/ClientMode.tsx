import { useState } from 'react';
import { ShoppingCart, Menu, X, MessageCircle, Truck, CheckCircle, Heart } from 'lucide-react';
import { products, combos } from '../data/products';
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
  const [viewMode, setViewMode] = useState<'home' | 'catalog' | 'combos'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('ROPA');
  const cart = useCart('client');
  const { generateOrderMessage, sendToWhatsApp } = useWhatsApp();

  const handleSendOrder = () => {
    if (cart.items.length === 0) {
      alert('Agrega productos al carrito');
      return;
    }
    const message = generateOrderMessage(cart.items, 'client', cart.getTotal());
    sendToWhatsApp(message);
    cart.clearCart();
    setShowCart(false);
  };

  const categories = Array.from(new Set(products.map(p => p.category)));
  const comboCategories = Array.from(new Set(combos.map(c => c.category)));
  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;
  const filteredCombos = Array.from(new Set(combos.map(c => c.category)))[0]
    ? combos.filter(c => c.category === comboCategories[0])
    : combos;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-red-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="lg:hidden text-gray-700"
          >
            {showMenu ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex items-center justify-center flex-1 lg:flex-initial">
            <img src="/img/mi_logo.png" alt="Vuelo Urbano" className="h-16" />
          </div>

          <button
            onClick={() => setShowCart(true)}
            className="relative p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
          >
            <ShoppingCart size={28} />
            {cart.getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
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
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
          {/* Hero Section */}
          <div className="bg-white px-4 py-8">
            <div className="max-w-3xl mx-auto">
              {/* Logo */}
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Estilo que te impulsa</h1>
                <p className="text-gray-600">Ropa urbana con actitud y libertad.</p>
              </div>

              {/* Badge */}
              <div className="bg-red-100 border border-red-300 rounded-full px-4 py-2 inline-flex items-center gap-2 mb-8">
                <span className="text-red-600 font-semibold text-sm">✨ Nuevos diseños cada semana</span>
              </div>

              {/* Action Cards - 3 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {/* Catalog Card */}
                <button
                  onClick={() => setViewMode('catalog')}
                  className="bg-red-600 hover:bg-red-700 text-white rounded-2xl p-6 transition-all transform hover:scale-105 shadow-lg"
                >
                  <div className="text-4xl mb-3">👕</div>
                  <h3 className="text-xl font-bold mb-2">CATÁLOGO</h3>
                  <p className="text-red-100 text-sm mb-4">Ver productos</p>
                  <div className="inline-flex items-center gap-1 text-sm font-semibold">
                    Ver productos <span>→</span>
                  </div>
                </button>

                {/* Cart Card */}
                <button
                  onClick={() => setShowCart(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white rounded-2xl p-6 transition-all transform hover:scale-105 shadow-lg relative"
                >
                  <div className="text-4xl mb-3">🛒</div>
                  <h3 className="text-xl font-bold mb-2">CARRITO</h3>
                  <p className="text-orange-100 text-sm mb-4">Ver mi pedido</p>
                  {cart.getTotalItems() > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center">
                      {cart.getTotalItems()}
                    </div>
                  )}
                  <div className="inline-flex items-center gap-1 text-sm font-semibold">
                    Ver mi pedido <span>→</span>
                  </div>
                </button>

                {/* WhatsApp Card */}
                <button
                  onClick={() => sendToWhatsApp('Hola, quiero hacer un pedido')}
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

              {/* WhatsApp Contact Card */}
              <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-6 mb-8 flex items-start gap-4">
                <div className="text-3xl">💬</div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">¿Diseño personalizado?</h3>
                  <p className="text-gray-600 text-sm mb-3">Escribenos y lo hacemos realidad</p>
                </div>
                <button
                  onClick={() => sendToWhatsApp('Hola, quiero un diseño personalizado')}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-semibold text-sm transition-colors flex items-center gap-1 whitespace-nowrap"
                >
                  Quiero uno
                </button>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">🚚</div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Envíos rápidos</h4>
                  <p className="text-gray-600 text-xs">A todo el país en 48 horas</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">✓</div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Calidad garantizada</h4>
                  <p className="text-gray-600 text-xs">Productos premium auténticos</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">❤️</div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Hecho con pasión</h4>
                  <p className="text-gray-600 text-xs">Para gente auténtica</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Catalog View */}
      {viewMode === 'catalog' && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Back Button */}
          <button
            onClick={() => setViewMode('home')}
            className="mb-6 text-red-600 hover:text-red-700 font-semibold flex items-center gap-1"
          >
            ← Volver
          </button>

          {/* Category Filter */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 mb-8 shadow-sm">
            <p className="text-gray-700 font-semibold mb-3">Categorías:</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                    selectedCategory === cat
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                mode="client"
                onAddToCart={(quantity) => {
                  cart.addItem(
                    product.id,
                    product.name,
                    quantity,
                    product.priceClient,
                    product.priceBase
                  );
                }}
              />
            ))}
          </div>

          {/* Back to Home */}
          <div className="text-center">
            <button
              onClick={() => setViewMode('home')}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
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
          total={cart.getTotal()}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={cart.updateQuantity}
          onRemoveItem={cart.removeItem}
          onSendOrder={handleSendOrder}
        />
      )}
    </div>
  );
}
