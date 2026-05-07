import { useState } from 'react';
import { Menu, X, ShoppingCart, MessageCircle, ArrowRight, Plus, Minus } from 'lucide-react';
import { products, CATEGORY_LABELS, SIZES } from '../data/products';
import { Category, Product } from '../types';
import { useCart } from '../hooks/useCart';
import { useWhatsApp } from '../hooks/useWhatsApp';
import CartModal from '../components/CartModal';

interface ResellerProps {
  onBack: () => void;
}

export default function Reseller({ onBack }: ResellerProps) {
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [viewMode, setViewMode] = useState<'home' | 'catalog' | 'info'>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category>('textil');
  const cart = useCart('reseller');
  const { generateOrderMessage, sendToWhatsApp } = useWhatsApp();

  const categories: Category[] = ['textil', 'hogar', 'accesorios'];
  const filteredProducts = products.filter((p) => p.category === selectedCategory);

  const handleSendOrder = () => {
    if (cart.items.length === 0) return;
    const message = generateOrderMessage(cart.items, 'reseller');
    sendToWhatsApp(message);
    cart.clearCart();
    setShowCart(false);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-950 shadow-sm sticky top-0 z-40 border-b border-blue-700">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="lg:hidden text-blue-300"
          >
            {showMenu ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex items-center justify-center flex-1 lg:flex-initial">
            <img src="/img/mi_logo.png" alt="NEXUS" className="h-16" />
          </div>

          <button
            onClick={() => setShowCart(true)}
            className="relative p-2 text-blue-300 hover:bg-blue-300/10 rounded-full transition-colors"
          >
            <ShoppingCart size={28} />
            {cart.getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-400 text-slate-900 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                {cart.getTotalItems()}
              </span>
            )}
          </button>
        </div>

        {showMenu && (
          <div className="lg:hidden border-t border-gray-800 p-4 space-y-3 bg-gray-950">
            <button
              onClick={onBack}
              className="w-full px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
            >
              Volver al inicio
            </button>
          </div>
        )}
      </header>

      {/* Home View */}
      {viewMode === 'home' && (
        <div className="bg-gradient-to-b from-slate-800 to-slate-900 px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Bienvenido, Revendedor
              </h1>
              <p className="text-blue-200">
                Haz pedidos por volumen con precios mayoristas.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-8">
              <div className="bg-gray-800 border border-blue-700 rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">👑</div>
                <p className="text-blue-300 font-semibold text-xs">
                  Productos de calidad
                </p>
              </div>
              <div className="bg-gray-800 border border-blue-700 rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">📈</div>
                <p className="text-blue-300 font-semibold text-xs">
                  Precios mayoristas
                </p>
              </div>
              <div className="bg-gray-800 border border-blue-700 rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">🤝</div>
                <p className="text-blue-300 font-semibold text-xs">
                  Soporte constante
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setViewMode('catalog')}
                className="bg-gray-800 border-2 border-blue-600 hover:border-blue-400 text-white rounded-2xl p-6 transition-all hover:shadow-lg hover:shadow-blue-500/20 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">👔</div>
                  <ArrowRight
                    size={20}
                    className="text-blue-400 group-hover:translate-x-1 transition-transform"
                  />
                </div>
                <h3 className="text-lg font-bold mb-1">CATALOGO PRO</h3>
                <p className="text-slate-200 text-sm mb-4">
                  Pedidos por volumen con botones rapidos.
                </p>
                <div className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold text-sm inline-flex items-center gap-2">
                  Ver catalogo <span>→</span>
                </div>
              </button>

              <button
                onClick={() => setViewMode('info')}
                className="bg-gray-800 border-2 border-blue-600 hover:border-blue-400 text-white rounded-2xl p-6 transition-all hover:shadow-lg hover:shadow-blue-500/20 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">ℹ️</div>
                  <ArrowRight
                    size={20}
                    className="text-blue-400 group-hover:translate-x-1 transition-transform"
                  />
                </div>
                <h3 className="text-lg font-bold mb-1">INFORMACION</h3>
                <p className="text-slate-200 text-sm mb-4">
                  Consejos y estrategias de negocio.
                </p>
                <div className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold text-sm inline-flex items-center gap-2">
                  Ver informacion <span>→</span>
                </div>
              </button>
            </div>

            <div className="bg-gray-800 border-2 border-yellow-600 rounded-2xl p-6 text-center">
              <h3 className="text-white font-bold mb-2">
                ¿Dudas o consultas?
              </h3>
              <p className="text-slate-200 text-sm mb-4">
                Escribenos por WhatsApp
              </p>
              <button
                onClick={() =>
                  sendToWhatsApp(
                    'Hola, tengo dudas sobre el programa de revendedores'
                  )
                }
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full font-semibold text-sm inline-flex items-center gap-2"
              >
                <MessageCircle size={16} />
                Contactar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Catalog View - Compact list for bulk orders */}
      {viewMode === 'catalog' && (
        <div className="max-w-5xl mx-auto px-4 py-8">
          <button
            onClick={() => setViewMode('home')}
            className="mb-6 text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
          >
            ← Volver
          </button>

          <div className="bg-gray-800 border border-slate-700 rounded-xl p-4 mb-8">
            <p className="text-slate-300 font-semibold mb-3">Categorias:</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>
          </div>

          {/* Product List - compact for bulk */}
          <div className="space-y-3 mb-8">
            {filteredProducts.map((product) => (
              <ResellerProductRow
                key={product.id}
                product={product}
                onAddToCart={(size, color, qty) => {
                  cart.addItem(product, size, color, qty);
                }}
              />
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setViewMode('home')}
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Volver al Inicio
            </button>
          </div>
        </div>
      )}

      {/* Info View */}
      {viewMode === 'info' && (
        <div className="max-w-3xl mx-auto px-4 py-8">
          <button
            onClick={() => setViewMode('home')}
            className="mb-6 text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
          >
            ← Volver
          </button>

          <div className="space-y-6">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-yellow-500 mb-6">
                Opciones de Revendedor
              </h3>
              <div className="space-y-6">
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                  <h4 className="text-white font-bold text-lg mb-2">
                    Opcion 1: Vender con NEXUS
                  </h4>
                  <p className="text-gray-400 mb-3">
                    Usas nuestra marca y nuestros diseños
                  </p>
                  <div className="bg-yellow-500/10 rounded-lg p-3">
                    <p className="text-blue-300 font-semibold">
                      Comision promedio: $3 - $5 por producto
                    </p>
                  </div>
                </div>
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                  <h4 className="text-white font-bold text-lg mb-2">
                    Opcion 2: Crear Tu Marca
                  </h4>
                  <p className="text-gray-400 mb-3">
                    Logo gratis, compras barato, vendes mas caro
                  </p>
                  <div className="bg-green-500/10 rounded-lg p-3 space-y-1">
                    <p className="text-green-500 font-semibold">Ejemplo:</p>
                    <p className="text-gray-300 text-sm">
                      Compra: $8 | Venta: $15 | Ganancia: $7
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-yellow-500 mb-4">
                Consejos para Revendedores
              </h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex gap-4">
                  <span className="text-yellow-500 text-xl font-bold">1</span>
                  <span>
                    Comienza con un lote pequeño para conocer la demanda
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="text-yellow-500 text-xl font-bold">2</span>
                  <span>Aprovecha los diseños nuevos cada semana</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-yellow-500 text-xl font-bold">3</span>
                  <span>
                    Promociona en redes sociales para maximizar ventas
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {showCart && (
        <CartModal
          items={cart.items}
          mode="reseller"
          onClose={() => setShowCart(false)}
          onUpdateQuantity={cart.updateQuantity}
          onRemoveItem={cart.removeItem}
          onSendOrder={handleSendOrder}
        />
      )}
    </div>
  );
}

/* Compact row component for reseller bulk ordering */
function ResellerProductRow({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (size: string, color: string, qty: number) => void;
}) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const canAdd = () => {
    if (product.hasSizes && !selectedSize) return false;
    if (!selectedColor) return false;
    return true;
  };

  const handleAdd = (qty: number) => {
    if (!canAdd()) return;
    onAddToCart(selectedSize, selectedColor, qty);
    setQuantity(1);
  };

  return (
    <div className="bg-gray-800 border border-slate-700 rounded-xl p-4">
      <div className="flex gap-4 items-start">
        {/* Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-20 h-20 object-contain rounded-lg bg-white p-1 shrink-0"
        />

        <div className="flex-1 min-w-0">
          {/* Name + Category */}
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-white font-bold text-sm truncate">
              {product.name}
            </h3>
            <span className="bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded text-xs font-semibold shrink-0">
              {CATEGORY_LABELS[product.category]}
            </span>
          </div>

          {/* Size selector (compact) */}
          {product.hasSizes && (
            <div className="flex gap-1.5 mb-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-8 h-8 rounded text-xs font-bold transition-all ${
                    selectedSize === size
                      ? 'bg-yellow-500 text-gray-900'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          {/* Color selector (compact) */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-2 py-1 rounded text-xs font-semibold transition-all ${
                  selectedColor === color
                    ? 'bg-yellow-500 text-gray-900'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {color}
              </button>
            ))}
          </div>

          {/* Quantity + Quick add buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 bg-gray-700 rounded-lg border border-gray-600">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1.5 text-gray-300 hover:text-yellow-500"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center text-sm font-semibold text-white">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-1.5 text-gray-300 hover:text-yellow-500"
              >
                <Plus size={14} />
              </button>
            </div>

            {/* Quick add buttons */}
            <button
              onClick={() => handleAdd(5)}
              disabled={!canAdd()}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-700 text-yellow-400 hover:bg-yellow-500 hover:text-gray-900 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              +5
            </button>
            <button
              onClick={() => handleAdd(10)}
              disabled={!canAdd()}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-700 text-yellow-400 hover:bg-yellow-500 hover:text-gray-900 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              +10
            </button>

            <button
              onClick={() => handleAdd(quantity)}
              disabled={!canAdd()}
              className="ml-auto px-4 py-1.5 rounded-lg text-xs font-bold bg-yellow-500 text-gray-900 hover:bg-yellow-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
